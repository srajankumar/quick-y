import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

const Logout = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["role"]);
  const [role, setRole] = useState("");
  //   const router = useRouter();

  useEffect(() => {
    // Fetch the role from cookies
    const storedRole = cookies.role;
    setRole(storedRole);
  }, [cookies.role]);

  const handleLogout = () => {
    // Clear the role cookie
    removeCookie("role", { path: "/" });

    // Redirect to "/"
    window.location.href = "/";
  };

  return (
    <div className="fixed top-5 right-5">
      <Button variant="destructive" onClick={handleLogout} className="mt-3">
        Logout
      </Button>
    </div>
  );
};

export default Logout;
