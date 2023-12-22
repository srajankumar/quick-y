"use client";

import React, { useEffect, useState } from "react";
import PatientPage from "@/components/pages/patient";
import DoctorPage from "@/components/pages/doctor";
import { useCookies } from "react-cookie";
import Logout from "@/components/Logout";
import PrescriptionList from "@/components/pages/pharmasist";

const Page = () => {
  const [cookies, setCookies] = useCookies(["user_role"]);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch the role from cookies
    const storedRole = cookies.user_role;
    setRole(storedRole);
  }, [cookies.user_role]);

  return (
    <div className="my-40">
      {role === "Patient" && <PatientPage />}
      {role === "Doctor" && <DoctorPage />}
      {role === "Pharmacist" && <PrescriptionList />}
      <Logout />
      {/* Add other role-based conditions as needed */}
    </div>
  );
};

export default Page;
