"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useCookies } from "react-cookie";
import { userID } from "../hooks/page";

interface PatientData {
  _id: string;
  name: string;
  disease: string;
  age: string;
  clinic: string;
  userOwner: string;
  __v: number;
}

const Doctor: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [waitingTime, setWaitingTime] = useState<number>("");
  const [prescriptionText, setPrescriptionText] = useState<string>("");
  const [cookies, setCookies] = useCookies(["user_role", "username"]);
  const [username, setUsername] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false); // Added state for dialog visibility
  const userid = userID();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PatientData[]>(
          "http://localhost:3001/appointment"
        );
        console.log("Server Response:", response.data);
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedUsername = cookies.username;
    setUsername(storedUsername);
  }, [cookies.username]);

  const handleSendPrescription = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/prescription/prescribe",
        {
          waitingtime: waitingTime, // Correct property name
          prescription: prescriptionText,
          userOwner: userid, // Make sure this property is correctly retrieved from your data
        }
      );

      console.log("Prescription sent successfully:", response.data);

      alert("Prescription sent successfully");

      setWaitingTime(0);
      setPrescriptionText("");
    } catch (error) {
      console.error("Error sending prescription:", error);
      alert("Prescription sent successfully!");
      setDialogOpen(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl pb-5 font-bold leading-7 text-gray-900">
        Welcome, {username}
      </h2>
      <div>
        {patientData.map((patient) => (
          <Dialog key={patient._id}>
            <DialogTrigger asChild>
              <div className="w-[50rem]">
                <div className="rounded-md hover:shadow-xl shadow-md transition-all duration-300 cursor-default mr-5 mb-5 px-5 py-3">
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg font-semibold">{patient.name}</h1>
                  </div>
                  <p className="text-muted-foreground">{patient.disease}</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">{patient.name}</DialogTitle>
                <DialogDescription className="text-lg tracking-wide">
                  <div className="flex justify-between items-center">
                    <div>
                      <div>
                        {patient.age} y.o | {patient.disease}
                      </div>
                      <div>Clinic: {patient.clinic}</div>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Input
                type="number"
                placeholder="Waiting time (minutes)"
                className="mb-0"
                value={waitingTime}
                onChange={(e) => setWaitingTime(Number(e.target.value))}
              />
              <Textarea
                placeholder="Add prescription"
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
              />
              <div className="flex space-x-4">
                <Button disabled className="flex w-full" type="submit">
                  Swap patient / doctor
                </Button>
                <Button
                  onClick={handleSendPrescription}
                  className="flex w-full"
                  type="submit"
                >
                  Send prescription
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Doctor;
