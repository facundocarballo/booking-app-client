import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
import BusinessNotFound from "@/src/subpages/business/BusinessNotFound";
import { BusinessBranches } from "@/src/subpages/business/BusinessBranches";
import { useProductProvider } from "@/src/contexts/product";

export default function ProductProfilePage() {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const url = router.asPath.split("/");
  const productSelectedId = url[url.length - 1];
  // Context
  const { user } = useHomeProvider();
  const { productSelected, setProductSelected, products } = useProductProvider();
  // Methods
  const handleGetTheBusiness = async () => {
    const finded = products?.find((b) => b.id === productSelectedId);
    if (finded === undefined) {
      // Busco el business por mi cuenta con una consulta.
      setLoading(false);
      return;
    }
    setProductSelected(finded);
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
  if (productSelected === undefined) return <BusinessNotFound />;
  return (
    <>
      <Head>
        <title>{productSelected.name} - Product Profile</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="100px" />
      <Heading>{productSelected.name} - Page</Heading>
    </>
  );
}
