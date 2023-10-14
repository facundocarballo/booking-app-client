import type { AppProps } from "next/app";
import { HomeContextProvider } from "@/src/contexts/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "leaflet/dist/leaflet.css";
import { BusinessContextProvider } from "@/src/contexts/business";
import { BranchContextProvider } from "@/src/contexts/branch";
import { ProductContextProvider } from "@/src/contexts/product";

// MapBox config
import mapboxgl from "mapbox-gl";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

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
