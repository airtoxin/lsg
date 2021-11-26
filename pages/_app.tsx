import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div className="font-mono flex flex-col bg-gray-900 h-screen w-screen text-gray-50 overflow-hidden select-none">
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
