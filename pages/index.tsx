import supabase from "@/src/supabase";
import Head from "next/head";
import React from "react";
import { NavBar } from "@/src/components/navbar";
import { theNavBarProps } from "@/src/handlers/navbar";
import { useHomeProvider } from "@/src/contexts/home";
import User from "@/src/types/user";
import {
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Text,
  HStack,
  Spacer,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";
import { InputInfo } from "@/src/components/inputs/InputInfo";
import { InputPassword } from "@/src/components/inputs/InputPassword";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Home() {
  // Attributes
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingSignUp, setLoadingSignUp] = React.useState<boolean>(false);
  const [loadingLogIn, setLoadingLogIn] = React.useState<boolean>(false);
  const [welcomeOpen, setWelcomeOpen] = React.useState<boolean>(false);
  const [signUpOpen, setSignUpOpen] = React.useState<boolean>(false);
  const [logInOpen, setLogInOpen] = React.useState<boolean>(false);
  const [seePassword, setSeePassword] = React.useState<boolean>(false);
  const [showSignUpMessage, setShowSignUpMessage] =
    React.useState<boolean>(false);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const welcomeRef = React.useRef(null);
  const signUpRef = React.useRef(null);
  const logInRef = React.useRef(null);

  // Context
  const { user, setUser } = useHomeProvider();

  // Methods
  const onWelcomeClose = () => setWelcomeOpen(false);
  const onSignUpClose = () => setSignUpOpen(false);
  const onLogInClose = () => setLogInOpen(false);

  const checkUserAuth = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setLoading(true);
      const newUser = await User.CreateUserWithData(user);
      setUser(newUser);
      setLoading(false);
      return;
    }

    setWelcomeOpen(true);
  };

  const handleSignUp = async () => {
    setLoadingSignUp(true);
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    clearInputs();
    setWelcomeOpen(false);
    setShowSignUpMessage(true);
    setLoadingSignUp(false);
  };

  const handleLogIn = async () => {
    setLoadingLogIn(true);
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    clearInputs();
    await checkUserAuth();
    setLogInOpen(false);
    setWelcomeOpen(false);
    setLoading(false);
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  React.useEffect(() => {
    checkUserAuth();
  }, []);

  return (
    <>
      {/* WELCOME - Alert Dialog */}
      <AlertDialog
        isOpen={welcomeOpen}
        leastDestructiveRef={welcomeRef}
        onClose={onWelcomeClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Welcome to Booking App
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>
                {
                  "You are not logged in Booking App. Please Login or create your account."
                }
              </Text>
              <HStack w="full">
                <Spacer />
                <Button
                  variant="callToAction"
                  onClick={() => setLogInOpen(true)}
                >
                  Log In
                </Button>
                <Button
                  variant="callToAction"
                  onClick={() => setSignUpOpen(true)}
                >
                  Sign Up
                </Button>
              </HStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Sign Up - Alert Dialog */}
      <AlertDialog
        isOpen={signUpOpen}
        leastDestructiveRef={signUpRef}
        onClose={onSignUpClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sign Up
            </AlertDialogHeader>

            <AlertDialogBody>
              <InputInfo
                handler={setEmail}
                placeholder="youremail@bookingapp.com"
                title="Email"
                type="email"
                value={email}
              />
              <InputPassword
                handlerA={setPassword}
                valueA={password}
                valueB={confirmPassword}
                handlerB={setConfirmPassword}
              />
              <Box h="10px" />
              <HStack w="full">
                <Spacer />
                <Button variant="callToAction" onClick={handleSignUp}>
                  Sign Up
                </Button>
                {loadingSignUp ? <Spinner /> : null}
              </HStack>
              {showSignUpMessage ? (
                <Text variant="description">
                  Check your email and confirm your new account!
                </Text>
              ) : null}
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Log In - Alert Dialog */}
      <AlertDialog
        isOpen={logInOpen}
        leastDestructiveRef={logInRef}
        onClose={onLogInClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Log In
            </AlertDialogHeader>
            <AlertDialogBody>
              <InputInfo
                handler={setEmail}
                placeholder="youremail@bookingapp.com"
                title="Email"
                type="email"
                value={email}
              />
              <HStack w="full">
                <VStack w="full">
                  <InputInfo
                    handler={setPassword}
                    placeholder="12345"
                    title="Password"
                    type={seePassword ? "text" : "password"}
                    value={password}
                  />
                </VStack>
                <VStack>
                  <Box h="5px" />
                  <Button onClick={() => setSeePassword(!seePassword)}>
                    {seePassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </VStack>
              </HStack>
              <HStack w="full">
                <Spacer />
                <Button variant="callToAction" onClick={handleLogIn}>
                  Log In
                </Button>
                {loadingLogIn ? <Spinner /> : null}
              </HStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Head>
        <title>Booking App</title>
        <meta
          name="description"
          content="App to organize your business and get new clients."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps} />
      <Box h="100px" />
      {loading ? <Spinner /> : null}
      {/* {user === undefined ? <Welcome /> : null} */}
      {/* <Circle bg='red' size='100px' /> */}
      {/* <SignIn /> */}
    </>
  );
}
