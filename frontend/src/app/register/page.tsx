"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SetStateAction, SyntheticEvent, useState } from "react";
import axios from "axios";
import React, { ChangeEvent } from "react";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

    try {
      await axios.post(`http://localhost:3001/auth/register`, {
        username,
        phone,
        email,
        password,
        role: selectedRole,
      });
      alert("Registration Completed! Login to continue");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className="min-h-screen flex justify-center w-96 px-5 flex-col"
      onSubmit={onSubmit}
    >
      {" "}
      <h1 className="text-2xl font-semibold">Register</h1>
      <div className="mt-3">
        <Label htmlFor="username">Username</Label>
        <Input
          className="mt-1"
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="srajan"
        />
      </div>
      <div className="mt-3">
        <Label htmlFor="phone">Phone</Label>
        <Input
          className="mt-1"
          id="phone"
          type="number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="6665554444"
        />
      </div>
      <div className="mt-3">
        <Label htmlFor="password">Password</Label>
        <Input
          className="mt-1"
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="A Strong Password"
        />
      </div>
      {/* Include the Role component */}
      <Role selectedRole={selectedRole} onChange={onChangeRole} />
      <div>
        <Button className="mt-3" type="submit">
          Create account
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
