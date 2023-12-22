"use client";
import { useState, useEffect } from "react";
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
// Import necessary modules and components

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
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [prescriptionText, setPrescriptionText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PatientData[]>(
          "http://localhost:3001/appointment"
        );
        console.log("Server Response:", response.data);

        // Set the entire response data array in state
        setPatientData(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendPrescription = async () => {
    try {
      // Assuming you have a patient selected. If not, handle accordingly.
      const selectedPatient = patientData[0];

      // Send prescription data to the server
      const response = await axios.post(
        "http://localhost:3001/prescription/prescribe",
        {
          waitingTime: waitingTime,
          prescriptionText: prescriptionText,
        }
      );

      // Handle success, e.g., show a success message or perform other actions
      console.log("Prescription sent successfully:", response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message or log the error
      console.error("Error sending prescription:", error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl pb-5 font-bold leading-7 text-gray-900">
        Welcome, {patientData.length > 0 ? patientData[0].name : ""}
      </h2>
      <div>
        {/* Map through the patientData array to display each patient */}
        {patientData.map((patient) => (
          <Dialog key={patient._id}>
            <DialogTrigger asChild>
              <div className="w-[50rem]">
                <div className="rounded-md hover:shadow-xl shadow-md transition-all duration-300 cursor-default mr-5 mb-5 px-5 py-3">
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg font-semibold">{patient.name}</h1>
                    {/* Assuming 'date' is part of your patient data */}
                    {/* <div>{patient.date}</div> */}
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
                    {/* <div className="text-primary font-semibold">{patient.date}</div> */}
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
