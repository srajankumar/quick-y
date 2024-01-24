"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import React, { ChangeEvent } from "react";
import { useToast } from "@/components/ui/use-toast";

// Role component for the dropdown
interface RoleProps {
  selectedRole: string; // replace 'string' with the actual type of selectedRole
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}
const Role: React.FC<RoleProps> = ({ selectedRole, onChange }) => {
  const roles = ["Doctor", "Patient", "Pharmacist"];

  return (
    <div className="mt-3">
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role:
      </label>
      <select
        id="role"
        value={selectedRole}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
};

export default function Register() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("Doctor");

  const onChangeRole = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:3001/auth/register`, {
        username,
        phone,
        email,
        password,
        role: selectedRole,
      });

      toast({
        title: "Registration Completed",
        description: "Redirecting to login page.",
        variant: "success",
      });
      setUsername("");
      setPhone("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        toast({
          title: "Registration Failed",
          description:
            "Username already exists. Please choose a different one.",
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        console.error(err);
        toast({
          title: "Registration Failed",
          description:
            "An error occurred during registration. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <form
      className="min-h-screen flex justify-center w-96 px-5 flex-col"
      onSubmit={onSubmit}
    >
      <h1 className="text-2xl font-semibold">Register</h1>
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
        <Label htmlFor="phone">Phone</Label>
        <Input
          disabled={isLoading}
          className="mt-1"
          id="phone"
          type="number"
          value={phone}
          required
          onChange={(event) => setPhone(event.target.value)}
          placeholder="6665554444"
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
          placeholder="A Strong Password"
        />
      </div>
      {/* Include the Role component */}
      <Role selectedRole={selectedRole} onChange={onChangeRole} />
      <div>
        <Button disabled={isLoading} className="mt-3 w-full" type="submit">
          Create account
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
          <span>Already have an account?</span>
          <Link href="/login" className="hover:text-primary">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
}
