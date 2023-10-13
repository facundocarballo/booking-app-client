import { useBranchProvider } from "@/src/contexts/branch";
import { Branch } from "@/src/types/Branch";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Image,
  VStack,
  Spacer,
  Box,
  Spinner,
} from "@chakra-ui/react";
import React from "react";

interface ICarrouselImages {
  branch: Branch;
}
export const CarrouselImages = ({ branch }: ICarrouselImages) => {
  // Attributes
  const [idx, setIdx] = React.useState<number>(0);
  // Context
  // Methods
  const handleIncrementIdx = () => {
    if (!branch.images) return;
    if (idx + 1 < branch.images.length) return setIdx(idx + 1);
  };
  const handleDecrementIdx = () => {
    if (idx - 1 >= 0) return setIdx(idx - 1);
  };
  // Component
  if (!branch.images) return <Spinner />;

  if (branch.images.length === 0) {
    return (
      <VStack w="full">
        <Box h="50px" />
        <p>No images</p>
        <Box h="30px" />
      </VStack>
    );
  }
  return (
    <HStack w="full">
      <VStack w="5px">
        <Button
          isDisabled={idx === 0}
          variant="carrousel"
          onClick={handleDecrementIdx}
        >
          <ChevronLeftIcon />
        </Button>
      </VStack>
      <Spacer />
      <Image
        alt="img"
        src={branch.images[idx].photo_url}
        w="full"
        h="120px"
        borderRadius={10}
      />
      <Spacer />
      <VStack w="5px">
        <Button
          isDisabled={idx === branch.images.length - 1}
          variant="carrousel"
          onClick={handleIncrementIdx}
        >
          <ChevronRightIcon />
        </Button>
      </VStack>
    </HStack>
  );
};
