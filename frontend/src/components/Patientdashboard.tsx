// pages/PrescriptionList.tsx
"use client";
// pages/PrescriptionList.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface Prescription {
  _id: string;
  waitingtime: number;
  prescription: string;
  userOwner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get<Prescription[]>(
          "http://localhost:3001/prescription/"
        );
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  const formatIndianTime = (utcDateTimeString: string) => {
    const indianDateTime = new Date(utcDateTimeString);
    return indianDateTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  };

  return (
    <div>
      <h1>Prescription List</h1>
      <ul>
        {prescriptions.map((prescription) => (
          <li key={prescription._id}>
            <div>
              <strong>Waiting Time:</strong> {prescription.waitingtime}
            </div>
            <div>
              <strong>Prescription:</strong> {prescription.prescription}
            </div>
            {/* Hide User ID */}

            <div>
              <strong>Created At:</strong>{" "}
              {formatIndianTime(prescription.createdAt)}
            </div>
            <div>
              <strong>Updated At:</strong>{" "}
              {formatIndianTime(prescription.updatedAt)}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionList;
