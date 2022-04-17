import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <div className="App font-mono flex flex-col bg-gray-900 min-h-screen w-screen text-gray-50 overflow-hidden select-none">
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default MyApp;
