"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

// const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Login() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookies] = useCookies(["access_token", "username", "user_role"]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
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
      toast({
        title: "Login Successful",
        variant: "success",
      });
      setUsername("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
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
          disabled={isLoading}
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
          disabled={isLoading}
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
        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Login{" "}
          {isLoading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              className="ml-2"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity=".5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          )}
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
