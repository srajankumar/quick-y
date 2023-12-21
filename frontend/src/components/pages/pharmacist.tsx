// PrescriptionPage.js
"use client";
// PrescriptionPage.js

import { useEffect, useState } from "react";
import axios from "axios";

// Define an interface for the prescription data
interface Prescription {
  _id: string;
  waitingtime: string;
  prescription: string;
}

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get<Prescription[]>(
          "http://localhost:3001/prescription/"
        );
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once

  return (
    <div>
      <h1>Prescription Page</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <strong>Waiting Time:</strong> {prescription.waitingtime},{" "}
            <strong>Prescription:</strong> {prescription.prescription}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionPage;
