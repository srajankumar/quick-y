import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Login from "./Login";

const Navbar = () => {
  const [cookies, setCookies, removeCookie] = useCookies([
    "user_role",
    "access_token",
    "username",
  ]);
  const [role, setRole] = useState("");
  //   const router = useRouter();

  useEffect(() => {
    // Fetch the role from cookies
    const storedRole = cookies.user_role;
    setRole(storedRole);
  }, [cookies.user_role]);

  const handleLogout = () => {
    window.localStorage.removeItem("userID");

    // Clear the token, username, and role cookies
    removeCookie("access_token", { path: "/" });
    removeCookie("username", { path: "/" });
    removeCookie("user_role", { path: "/" });

    // Redirect to "/"
    window.location.href = "/";
  };
  return (
    <div className="fixed bg-white/50 backdrop-blur-md top-0 p-5 w-full flex justify-center left-0">
      <div className="flex max-w-6xl w-full justify-between items-center">
        <Link
          href="/dashboard"
          className="text-xl font-bold text-primary hover:scale-105 transition-all duration-200"
        >
          Quick-y
        </Link>
        <Login />
      </div>
    </div>
  );
};

export default Navbar;
