import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { InputImage } from "@/src/components/inputs/InputImage";

export default function BusinessProfilePage() {
  // Attributes
  const file = React.useRef<File | null>(null);
  const router = useRouter();
  // Context
  const { user } = useHomeProvider();
  // Methods
  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    file.current = event.target.files === null ? null : event.target.files[0];
    if (user === undefined || file.current === null) return;
    const res = await user.UpdatePhotoUrl_Supabase(file.current);
    if (!res) {
      alert("Error uploading the image to Supabase.");
    }
  };

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
      <InputImage
        handler={handleUploadImage}
        photoUrl={undefined}
        name={"Pelukeria Diego"}
      />
    </>
  );
}
