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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

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
      <Table className="text-lg">
        <TableCaption className="text-base">
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Prescription ID</TableHead>
            <TableHead>Prescription</TableHead>
            <TableHead>Waiting Time</TableHead>
            <TableHead className="w-64">Updated At</TableHead>
            <TableHead>Download Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reversedUpdatedPrescriptions.map((prescription) => (
            <TableRow key={prescription._id} className="hover:shadow-xl">
              <TableCell className="font-medium">{prescription._id}</TableCell>
              <TableCell>{prescription.prescription}</TableCell>
              <TableCell>{prescription.waitingtime} minutes</TableCell>
              <TableCell>
                {new Date(prescription.updatedAt || "").toLocaleString() ||
                  "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  className="w-full"
                  onClick={() => downloadRow(prescription)}
                >
                  <Download className="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PrescriptionList;
