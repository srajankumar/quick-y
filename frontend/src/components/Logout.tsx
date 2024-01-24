import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

const Logout = () => {
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
    <div className="fixed top-2.5 right-5">
      <Button variant="destructive" onClick={handleLogout} className="mt-3">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
