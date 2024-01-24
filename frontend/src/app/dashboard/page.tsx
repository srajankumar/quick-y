"use client";

import React, { useEffect, useState } from "react";
import PatientPage from "@/components/Patient/dashboard";
import DoctorPage from "@/components/pages/doctor";
import { useCookies } from "react-cookie";
import Logout from "@/components/Logout";
import PrescriptionList from "@/components/pages/pharmacist";
import Navbar from "@/components/Patient/Navbar";

const Page = () => {
  const [cookies, setCookies] = useCookies(["user_role"]);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch the role from cookies
    const storedRole = cookies.user_role;
    setRole(storedRole);
  }, [cookies.user_role]);

  return (
    <div className="my-40 px-5">
      <Navbar />
      {role === "Patient" && <PatientPage />}
      {role === "Doctor" && <DoctorPage />}
      {role === "Pharmacist" && <PrescriptionList />}
      <Logout />
    </div>
  );
};

export default Page;
