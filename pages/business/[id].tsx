import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { BusinessSettings } from "@/src/subpages/business/BusinessSettings";
import { useBusinessProvider } from "@/src/contexts/business";
import { Business } from "@/src/types/business";
import BusinessNotFound from "@/src/subpages/business/BusinessNotFound";

export default function BusinessProfilePage() {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(true);
  const [theBusiness, setTheBusiness] = React.useState<Business | undefined>(
    undefined
  );
  const router = useRouter();
  const url = router.asPath.split("/");
  const theBusinessId = url[url.length - 1];
  // Context
  const { user } = useHomeProvider();
  const { business } = useBusinessProvider();
  // Methods
  const handleGetTheBusiness = async () => {
    const finded = business?.find((b) => b.id === theBusinessId);
    if (finded === undefined) {
      // Busco el business por mi cuenta con una consulta.
      setLoading(false);
      return;
    }
    setTheBusiness(finded);
    setLoading(false);
  };
  React.useEffect(() => {
    if (user === undefined) {
      router.push("/");
    }
    handleGetTheBusiness();
  }, []);
  // Component
  if (loading) return null;
  if (theBusiness === undefined) return <BusinessNotFound />;
  return (
    <>
      <Head>
        <title>{theBusiness.name} - Profile</title>
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
