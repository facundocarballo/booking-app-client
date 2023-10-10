import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { VStack, Box, Spinner } from "@chakra-ui/react";
import BusinessNotFound from "@/src/subpages/business/BusinessNotFound";
import { useBranchProvider } from "@/src/contexts/branch";
import { BranchProducts } from "@/src/subpages/branch/BranchProducts";
import { BranchBooks } from "@/src/subpages/branch/BranchBooks";
import { BookContextProvider } from "@/src/contexts/book";
import supabase from "@/src/supabase";
import User from "@/src/types/user";
import { Branch } from "@/src/types/branch";

export default function BranchStatsPage() {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(true);
  const router = useRouter();
  const url = router.asPath.split("/");
  const branchSelectedId = url[url.length - 1];
  // Context
  const { user, setUser } = useHomeProvider();
  const { branches, branchSelected, setBranchesSelected } = useBranchProvider();
  // Methods
  const handleGetTheBranchSelected = async () => {
    const finded = branches?.find((b) => b.id === branchSelectedId);
    if (finded === undefined) {
      // Busco el business por mi cuenta con una consulta.
      setLoading(false);
      return;
    }
    setBranchesSelected(finded);
    setLoading(false);
  };

  const checkUserAuth = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const newUser = await User.CreateUserWithData(user);
      const branch = await Branch.GetBranch(branchSelectedId);
      if (branch === undefined) {
        return;
      }
      if (branch.owner_id !== newUser.id) {
        return;
      }
      setUser(newUser);
      setBranchesSelected(branch);
      setLoading(false);
      return;
    }

    if (!user) {
      router.push("/");
    }
  };

  React.useEffect(() => {
    if (!user) {
      checkUserAuth();
      return;
    }
    handleGetTheBranchSelected();
  }, []);
  // Component
  if (loading)
    return (
      <VStack w="full">
        <Box h="100px" />
        <Spinner />
      </VStack>
    );
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
      <h2>Stats</h2>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
