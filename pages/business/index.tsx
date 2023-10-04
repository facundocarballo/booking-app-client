import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { Box, Divider } from "@chakra-ui/react";
import { MyBusiness } from "@/src/subpages/business/MyBusiness";
import { FavouriteBusiness } from "@/src/subpages/business/FavouriteBusiness";
import { useRouter } from "next/router";
import { BusinessContextProvider } from "@/src/contexts/business";

export default function BusinessPasge() {
  // Attributes
  const router = useRouter();
  const ref = React.useRef(true);
  // Context
  const { user } = useHomeProvider();
  // Methods
  React.useEffect(() => {
    if (user === undefined) {
      router.push("/");
      return;
    }
    if (!ref.current) return;
    ref.current = true;
    user.GetBusiness();
  });
  // Component
  return (
    <>
      <Head>
        <title>{user?.first_name} Business</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="100px" />
      <BusinessContextProvider>
        <MyBusiness />
        <Box h="20px" />
        <Divider />
        <Box h="10px" />
        <FavouriteBusiness />
      </BusinessContextProvider>
    </>
  );
}
