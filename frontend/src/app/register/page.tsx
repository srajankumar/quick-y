"use client";

import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import axios from "axios";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Role component for the dropdown
const Role = ({ selectedRole, onChange }) => {
  const roles = ["Doctor", "Patient", "Pharmacist"];

  return (
    <div>
      <label htmlFor="role">Role:</label>
      <select id="role" value={selectedRole} onChange={onChange}>
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

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:3001/auth/register`, {
        username,
        phone,
        email,
        password,
        role: selectedRole, // Include selected role in the request
      });
      alert("Registration Completed! Login to continue");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="John Miller"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="number"
          placeholder="6665554444"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="A Strong Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      {/* Include the Role component */}
      <Role
        selectedRole={selectedRole}
        onChange={(event) => setSelectedRole(event.target.value)}
      />
      <button type="submit">Create account</button>
      <div>
        <span>Already have an account?</span>
        <Link href="/admin/login">Login</Link>
      </div>
    </form>
  );
}
