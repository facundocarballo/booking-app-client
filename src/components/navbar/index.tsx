import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Button,
  IconButton,
  Container,
  HStack,
  Spacer,
  Box,
  Collapse,
  Stack,
  Center,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useHomeProvider } from "@/src/contexts/home";
import { UserImage } from "./UserImage";
import { Title } from "./title";

export interface TheNavItem {
  label: string;
  href: string;
}

export interface TheNavBar {
  photoURL: string;
  title?: string;
  navItems: TheNavItem[];
}

export interface NavBarProps {
  props: TheNavBar;
}

export const NavBar = ({ props }: NavBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("bgLight", "bgDark");
  const { isOpen, onToggle } = useDisclosure();
  // Context
  const { user } = useHomeProvider();
  return (
    <Container
      maxW="100%"
      p={4}
      style={{ position: "fixed", zIndex: 100 }}
      bg={bg}
    >
      <HStack>
        <Image boxSize="50px" src={props.photoURL} alt="Booking App Logo" />
        {props.title != "" ? <Title title={props.title} /> : null}
        <Spacer />
        <Box display={{ lg: "flex", md: "none", sm: "none", base: "none" }}>
          {props.navItems.map((navItem, index) => (
            <NextLink href={navItem.href} passHref key={index}>
              <Button variant="navbar">{navItem.label}</Button>
            </NextLink>
          ))}
        </Box>
        <Button onClick={toggleColorMode} variant="navbar">
          {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>
        {user !== undefined ? (
          <NextLink href={`/user/${user.id}`}>
            <UserImage />
          </NextLink>
        ) : null}

        {/* Mobile */}
        <Box display={{ lg: "none", md: "flex", sm: "flex" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="navbar"
            aria-label={"Toggle Navigation"}
          />
        </Box>
      </HStack>

      {/* Mobile */}
      <Collapse in={isOpen} animateOpacity>
        <Stack bg={bg} p={4}>
          {props.navItems.map((navItem, index) => (
            <Center key={index}>
              <NextLink href={navItem.href} passHref>
                <Button w="100%" variant="navbar" onClick={onToggle}>
                  {navItem.label}
                </Button>
              </NextLink>
            </Center>
          ))}
        </Stack>
      </Collapse>
    </Container>
  );
};
