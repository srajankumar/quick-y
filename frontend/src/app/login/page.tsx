"use client";

import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useCookies } from "react-cookie";

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [, setCookies] = useCookies(["access_token", "username", "user_role"]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setCookies("username", username);
    console.log("API request sent!");
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      setCookies("user_role", response.data.role); // Store the user's role in cookies
      window.localStorage.setItem("userID", response.data.userID);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="John Miller"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Login</button>
        <div>
          <span>Do not have an account?</span>
          <Link href="/admin/register">Register</Link>
        </div>
      </div>
    </form>
  );
}
