import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/routers/app";
import superjson from "superjson";
import "./App.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="App font-mono flex flex-col bg-gray-900 min-h-screen w-screen text-gray-50 overflow-hidden select-none">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : process.browser
      ? "/api/trpc"
      : "http://localhost:3000/api/trpc";

    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      "Cache-Control",
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`
    );
    ctx?.res?.setHeader("X-SSR", `1`);

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
