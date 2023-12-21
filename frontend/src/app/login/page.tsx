"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="min-h-screen flex justify-center w-96 px-5 flex-col"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-semibold">Login</h1>
      <div className="mt-3">
        <Label htmlFor="username">Username</Label>
        <Input
          className="mt-1"
          id="username"
          type="text"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="srajan"
        />
      </div>
      <div className="mt-3">
        <Label htmlFor="password">Password</Label>
        <Input
          className="mt-1"
          id="password"
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your Password"
        />
      </div>
      <div>
        <Button className="mt-3" type="submit">
          Login
        </Button>
        <div className="text-sm space-x-1 mt-3">
          <span>Do not have an account?</span>
          <Link href="/register" className="hover:text-primary">
            Register
          </Link>
        </div>
      </div>
    </form>
  );
}
