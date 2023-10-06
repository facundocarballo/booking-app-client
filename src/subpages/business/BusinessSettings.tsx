import { useBusinessProvider } from "@/src/contexts/business";
import React from "react";
import { VStack, Spinner } from "@chakra-ui/react";
import { InputImage } from "@/src/components/inputs/InputImage";
import { Business } from "@/src/types/business";
import { useRouter } from "next/router";

interface IBusinessSettings {
  id: string;
}
export const BusinessSettings = ({ id }: IBusinessSettings) => {
  // Attributes
  const [theBusiness, setTheBusiness] = React.useState<Business | undefined>(
    undefined
  );
  const file = React.useRef<File | null>(null);
  const router = useRouter();
  // Context
  const { business } = useBusinessProvider();
  // Methods
  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    file.current = event.target.files === null ? null : event.target.files[0];
    if (theBusiness === undefined || file.current === null) return;
    await theBusiness.UpdatePhotoUrl_Supabase(file.current);
  };

  const handleSetTheBusiness = () => {
    if (business === undefined) return;
    for (const b of business) {
      if (b.id === id) {
        setTheBusiness(b);
        return;
      }
    }
  };

  React.useEffect(() => {
    if (business === undefined) {
      router.push("/business");
      return;
    }
    handleSetTheBusiness();
  }, []);
  // Component
  return (
    <>
      {theBusiness === undefined ? (
        <Spinner />
      ) : (
        <VStack w="full">
          <InputImage
            handler={handleUploadImage}
            name={theBusiness?.name}
            photoUrl={theBusiness?.photo_url}
          />
        </VStack>
      )}
    </>
  );
};
