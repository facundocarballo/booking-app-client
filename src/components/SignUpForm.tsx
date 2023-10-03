import React from "react";
import supabase from "../supabase";

export const SignUpForm = () => {
  // Attributes
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [firstName, setFirstName] = React.useState<string | null>(null);
  const [lastName, setLastName] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  // Methods
  const handleSignUp = async () => {
    if (email === null || password === null) {
      alert("Enter a valid email or valid password please.");
      return;
    }

    try {
      setLoading(true);
      const resSignUp = await supabase.auth.signUp({
        email,
        password
      });
      console.log(resSignUp.data.user);
    } catch (err) {
      console.error("Error at sign up an user. ", err);
    } finally {
      setLoading(false);
    }
  };
  // Component
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input
            placeholder="facu.carba.00@gmail.com"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <input
            placeholder="First Name"
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <input
            placeholder="Last Name"
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </>
      )}
    </>
  );
};
