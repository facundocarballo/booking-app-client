import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { Box, Divider } from "@chakra-ui/react";
import BusinessNotFound from "@/src/subpages/business/BusinessNotFound";
import { useBranchProvider } from "@/src/contexts/branch";
import { BranchProducts } from "@/src/subpages/branch/BranchProducts";
import { BranchBooks } from "@/src/subpages/branch/BranchBooks";
import { BookContextProvider } from "@/src/contexts/book";

export default function BranchProfilePage() {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const url = router.asPath.split("/");
  const branchSelectedId = url[url.length - 1];
  // Context
  const { user } = useHomeProvider();
  const { branches, branchSelected, setBranchesSelected } = useBranchProvider();
  // Methods
  const handleGetTheBusiness = async () => {
    const finded = branches?.find((b) => b.id === branchSelectedId);
    if (finded === undefined) {
      // Busco el business por mi cuenta con una consulta.
      setLoading(false);
      return;
    }
    setBranchesSelected(finded);
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
  if (branchSelected === undefined) return <BusinessNotFound />;
  return (
    <>
      <Head>
        <title>{branchSelected.name} - Profile</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="100px" />
      <BranchProducts />
      <Box h="30px" />
      <BookContextProvider>
        <BranchBooks />
      </BookContextProvider>
    </>
  );
}
