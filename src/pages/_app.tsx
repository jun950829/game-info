import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/global-styles";
import theme from "@/styles/theme";
import Layout from "@/components/layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>game-info</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
