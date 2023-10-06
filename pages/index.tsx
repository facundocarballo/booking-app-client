import supabase from '@/src/supabase';
import Head from 'next/head'
import React from 'react'
import { NavBar } from '@/src/components/navbar';
import { theNavBarProps } from '@/src/handlers/navbar';
import { Welcome } from '@/src/components/welcome';
import { useHomeProvider } from '@/src/contexts/home';
import User from '@/src/types/user';


export default function Home() {
  const { user, setUser } = useHomeProvider();
  const checkUserAuth = async () => 
  {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const newUser = await User.CreateUserWithData(user);
      setUser(newUser);
    }
  }
  
  React.useEffect(() => {
    checkUserAuth()
  }, []);

  return (
    <>
      <Head>
        <title>Booking App</title>
        <meta name="description" content="App to organize your business and get new clients." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar props={theNavBarProps}/>
      {
        user === undefined ? <Welcome /> : null
      }
      {/* <Circle bg='red' size='100px' /> */}
      {/* <SignIn /> */}
    </>
  );
}
