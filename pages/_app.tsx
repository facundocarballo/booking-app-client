import type { AppProps } from "next/app";
import { HomeContextProvider } from "@/src/contexts/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { BusinessContextProvider } from "@/src/contexts/business";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <HomeContextProvider>
          <BusinessContextProvider>
            <Component {...pageProps} />
          </BusinessContextProvider>
        </HomeContextProvider>
      </ChakraProvider>
    </>
  );
}
