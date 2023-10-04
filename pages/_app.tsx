import type { AppProps } from "next/app";
import { HomeContextProvider } from "@/src/contexts/home";
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <HomeContextProvider>
          <Component {...pageProps} />
        </HomeContextProvider>
      </ChakraProvider>
    </>
  );
}
