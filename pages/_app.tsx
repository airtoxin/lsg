import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AppRouter } from "./api/trpc/[trpc]";
import { withTRPC } from "@trpc/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="font-mono flex flex-col bg-gray-900 h-screen w-screen text-gray-50 overflow-hidden select-none">
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
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
