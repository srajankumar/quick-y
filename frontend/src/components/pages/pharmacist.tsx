// Import necessary modules and components
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";

interface PrescriptionData {
  _id: string;
  waitingtime: number;
  prescription: string;
  userOwner: string;
  createdAt?: string;
  updatedAt?: string;
  __v: number;
}

const PrescriptionList: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionData[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get<PrescriptionData[]>(
          "http://localhost:3001/prescription"
        );
        console.log("Prescription Data:", response.data);
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };

    fetchPrescriptions();
  }, []); // Empty dependency array to fetch data when the component mounts

  // Filter prescriptions where updatedAt is not null
  const updatedPrescriptions = prescriptions.filter(
    (prescription) => prescription.updatedAt !== null
  );

  // Reverse the order of the updated prescriptions array
  const reversedUpdatedPrescriptions = [...updatedPrescriptions].reverse();

  const downloadRow = (row: PrescriptionData) => {
    const { _id, waitingtime, updatedAt, prescription } = row;
    const rowData = `ID: ${_id}\nWaiting Time: ${waitingtime} minutes\nUpdated At: ${
      new Date(updatedAt || "").toLocaleString() || "N/A"
    }\nPrescription: ${prescription}`;
    const blob = new Blob([rowData], { type: "text/plain" });
    const anchor = document.createElement("a");
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = `${_id}_data.txt`;
    anchor.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold my-5">Prescriptions</h2>
      <table style={{ textAlign: "left" }}>
        <thead>
          <tr className="bg-primary/90 text-white tracking-wider text-lg">
            <th className="pl-5 rounded-tl-xl py-3 border-r-2">ID</th>
            <th className="pl-5 py-3 border-r-2">Prescription</th>
            <th className="pl-5 py-3 border-r-2">Waiting Time</th>
            <th className="pl-5 py-3 border-r-2">Updated At</th>
            <th className="pl-5 rounded-tr-xl py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reversedUpdatedPrescriptions.map((prescription) => (
            <tr
              className="hover:shadow-2xl rounded-xl transition-all duration-300 cursor-default"
              key={prescription._id}
            >
              <td className="border-r-2 pl-5 pr-10 py-10">
                {prescription._id}
              </td>
              <td className="border-r-2 pl-5 pr-10 py-10">
                {prescription.prescription}
              </td>
              <td className="border-r-2 pl-5 pr-10 py-10">
                {prescription.waitingtime} minutes
              </td>
              <td className="border-r-2 pl-5 pr-10 py-10">
                {new Date(prescription.updatedAt || "").toLocaleString() ||
                  "N/A"}
              </td>
              <td className="pl-5 pr-10 py-10">
                <Button onClick={() => downloadRow(prescription)}>
                  Download Row
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionList;
