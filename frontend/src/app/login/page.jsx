"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

const Page = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // Navigate to the home page after successful login
        window.location.href = "/";
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  // Use useEffect to clear the state on component mount (page refresh)
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} // Set the value to control the input
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} // Set the value to control the input
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Page;
