import { useColorModeValue } from "@chakra-ui/react";

export const Container = {
  variants: {
    businessCard: () => ({
      bg: useColorModeValue("gray.200", "gray.700"),
      borderRadius: 10,
      margin: "2px",
      minW: "400px",
      minH: "220px",
      maxH: "220px",
      _hover: {
        boxShadow: "lg",
        transform: "scale(1.05)",
        bg: useColorModeValue("gray.300", "gray.600"),
        cursor: "pointer",
      },
    }),
    branchCard: () => ({
      bg: useColorModeValue("gray.200", "gray.700"),
      borderRadius: 10,
      margin: "2px",
      minW: "400px",
      minH: "280px",
      maxH: "280px",
      _hover: {
        boxShadow: "lg",
        cursor: "pointer",
      },
    }),
    productCard: () => ({
      bg: useColorModeValue("gray.200", "gray.700"),
      borderRadius: 10,
      margin: "2px",
      w: "300px",
      h: "180px",
      _hover: {
        boxShadow: "lg",
        transform: "scale(1.05)",
        cursor: "pointer",
      },
    }),
    switch: () => ({
      border: "10px solid #000",
      borderRadius: 10,
    }),
    clientCard: () => ({
      bg: useColorModeValue("gray.200", "gray.700"),
      borderRadius: 10,
      margin: "2px",
      w: "250px",
      h: "150px",
      _hover: {
        boxShadow: "lg",
        transform: "scale(1.05)",
        cursor: "pointer",
      },
    }),
  },
};
