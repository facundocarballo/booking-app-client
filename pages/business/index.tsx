import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { Box, Divider } from "@chakra-ui/react";
import { MyBusiness } from "@/src/subpages/business/MyBusiness";
import { FavouriteBusiness } from "@/src/subpages/business/FavouriteBusiness";


export default function BusinessPasge() {
  // Attributes
  // Context
  const { user } = useHomeProvider();
  // Methods
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
      <Box h='100px' />
      <MyBusiness />
      <Box h='20px' />
      <Divider />
      <Box h='10px' />
      <FavouriteBusiness />
    </>
  );
}
