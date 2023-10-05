import React from "react";
import Head from "next/head";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import { Box, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { InputImage } from "@/src/components/inputs/InputImage";
import { InputInfo } from "@/src/components/inputs/InputInfo";

export default function UserProfilePage() {
  // Attributes
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
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

  const handleUpdateInfo = async () => {
    if (user === undefined) return;
    const res = await user.UpdateFirstName_Supabase(firstName);
    if (!res) {
      alert("Error updating the info in Supabase.");
    } else {
      console.log("todo ok");
    }
  };

  // Component
  React.useEffect(() => {
    if (user === undefined) {
      router.push("/");
    }
  }, []);
  if (user === undefined) return null;
  return (
    <>
      <Head>
        <title>{user?.first_name} Profile</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="15px" />
      <VStack w="full">
        <Box h="100px" />
        <InputImage
          handler={handleUploadImage}
          name={user.first_name === undefined ? "" : user.first_name}
        />
        <VStack display={{ lg: "flex", md: "flex", sm: "none" }} w="50%">
          <InputInfo
            handler={setFirstName}
            placeholder="Facundo"
            title="First Name"
            type="text"
            value={firstName}
          />
        </VStack>
        <VStack display={{ lg: "flex", md: "flex", sm: "none" }} w="50%">
          <InputInfo
            handler={setLastName}
            placeholder="Carballo"
            title="Last Name"
            type="text"
            value={lastName}
          />
        </VStack>
        <VStack display={{ lg: "flex", md: "flex", sm: "none" }} w="50%">
          <InputInfo
            handler={setPhoneNumber}
            placeholder="+54-9-11-2251-5318"
            title="Phone Number"
            type="tel"
            value={phoneNumber}
          />
        </VStack>
        <Button variant="callToAction" onClick={handleUpdateInfo}>
          Update
        </Button>
      </VStack>
    </>
  );
}
