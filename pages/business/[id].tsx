import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { BusinessSettings } from "@/src/subpages/business/BusinessSettings";

export default function BusinessProfilePage() {
  // Attributes
  const router = useRouter();
  const url = router.asPath.split("/");
  // Context
  const { user } = useHomeProvider();
  // Methods

  React.useEffect(() => {
    if (user === undefined) {
      router.push("/");
    }
  }, []);
  // Component
  return (
    <>
      <Head>
        <title>Business Profile</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="100px" />
      <BusinessSettings id={url[url.length - 1]} />
    </>
  );
}
