import type { AppProps } from "next/app";
import { HomeContextProvider } from "@/src/contexts/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { BusinessContextProvider } from "@/src/contexts/business";
import { BranchContextProvider } from "@/src/contexts/branch";
import { ProductContextProvider } from "@/src/contexts/product";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <HomeContextProvider>
          <BusinessContextProvider>
            <BranchContextProvider>
              <ProductContextProvider>
                <Component {...pageProps} />
              </ProductContextProvider>
            </BranchContextProvider>
          </BusinessContextProvider>
        </HomeContextProvider>
      </ChakraProvider>
    </>
  );
}
