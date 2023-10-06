import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, Image, VStack, Spacer } from "@chakra-ui/react";
import React from "react";

const imgs: string[] = [
  "https://i.ibb.co/7nWy32G/chanchito-volador.png",
  "https://i.ibb.co/HF3VQXT/Captura-de-pantalla-2023-08-09-a-la-s-10-39-52.png",
  "https://i.ibb.co/PFFKNpC/Captura-de-pantalla-2023-08-09-a-la-s-10-41-21.png",
];

export const CarrouselImages = () => {
  // Attributes
  const [idx, setIdx] = React.useState<number>(0);
  // Context
  // Methods
  const handleIncrementIdx = () => {
    if (idx + 1 < imgs.length) return setIdx(idx + 1);
  };
  const handleDecrementIdx = () => {
    if (idx - 1 >= 0) return setIdx(idx - 1);
  };
  // Component
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
      <Image alt="img" src={imgs[idx]} w="full" h="120px" borderRadius={10} />
      <Spacer />
      <VStack w="5px">
        <Button
          isDisabled={idx === imgs.length - 1}
          variant="carrousel"
          onClick={handleIncrementIdx}
        >
          <ChevronRightIcon />
        </Button>
      </VStack>
    </HStack>
  );
};
