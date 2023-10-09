import { useColorModeValue } from "@chakra-ui/react";

export const Button = {
  baseStyle: {},
  sizes: {},
  variants: {
    navbar: () => ({
      bg: useColorModeValue("bgLight", "bgDark"),
      color: useColorModeValue("bgDark", "bgLight"),
      margin: "2px",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.02)",
        bg: useColorModeValue("gray.300", "gray.600"),
      },
    }),
    callToAction: () => ({
      bg: useColorModeValue("purple.300", "purple.600"),
      color: useColorModeValue("bgDark", "bgLight"),
      margin: "2px",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.10)",
        bg: useColorModeValue("purple.400", "purple.500"),
      },
    }),
    carrousel: () => ({
      bg: useColorModeValue("gray.200", "gray.600"),
      color: useColorModeValue("bgDark", "bgLight"),
      minW: "0.5",
      maxW: "0.1",
      _hover: {
        boxShadow: "md",
        transform: "scale(1.10)",
        bg: useColorModeValue("gray.400", "gray.500"),
      },
    }),
    switchSelected: () => ({
      bg: useColorModeValue("purple.300", "purple.600"),
      color: useColorModeValue("bgDark", "bgLight"),
      minW: '100px'
    }),
    switchUnselected: () => ({
      bg: useColorModeValue("bgLight", "bgDark"),
      color: useColorModeValue("bgDark", "bgLight"),
      minW: '100px',
      _hover: {
        boxShadow: "md",
        transform: "scale(1.10)",
        bg: useColorModeValue("gray.200", "gray.600"),
      },
    }),
    info: () => ({
      bg: useColorModeValue("bgLight", "bgDark"),
      color: useColorModeValue("bgDark", "bgLight"),
      _hover: {
        boxShadow: "md",
        transform: "scale(1.10)",
        bg: useColorModeValue("gray.200", "gray.600"),
      },
    }),
  },
};
