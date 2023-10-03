import React from "react";
import supabase from "../supabase";

export const LogInForm = () => {
  // Attributes
  const [email, setEmail] = React.useState<string | null>(null);
  const [password, setPassword] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  // Context
  // Methods
  const handleSignUp = async () => {
    if (email === null || password === null) {
      alert("Enter a valid email or password please.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("Data: ", data);
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
          <h3>LogIn</h3>
          <input
            placeholder="facu.carba.00@gmail.com"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button onClick={handleSignUp}>Log In</button>
        </>
      )}
    </>
  );
};
