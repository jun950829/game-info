import type { AppProps } from 'next/app'
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "@/styles/global-styles";
import theme from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>boilerplate</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}