"use client";
import { useState, useEffect, SyntheticEvent } from "react";
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
  const [waitingTime, setWaitingTime] = useState<number>(0);
  const [prescription, setPrescription] = useState<string>("");

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

  const users = userID();
  const [presInfo, setPresInfo] = useState({
    waitingtime: "",
    prescription: "",
    userOwner: userID,
  });
  const clearForm = () => {
    setPresInfo({
      waitingtime: "",
      prescription: "",
      userOwner: userID,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPresInfo({ ...presInfo, [name]: value });
  };

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:3001/prescription/prescribe`,
        presInfo
      );
      alert("Information Added");
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };
  //   const handleSendPrescription = async (patientId: string) => {
  //     try {
  //       const userId = localStorage.getItem("userID");

  //       if (!userId) {
  //         console.error("User ID not found in localStorage");
  //         return;
  //       }

  //       console.log("Request Payload:", {
  //         waitingTime,
  //         prescription,
  //         userOwner: userId,
  //       });

  //       const response = await axios.post(
  //         "http://localhost:3001/prescription/prescribe",
  //         {
  //           waitingTime,
  //           prescription,
  //           userOwner: userId,
  //         }
  //       );

  //       console.log("Prescription sent successfully:", response.data);
  //       // Additional actions or UI updates can be added here
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         console.error("Axios Error Details:", {
  //           message: error.message,
  //           response: error.response?.data,
  //           status: error.response?.status,
  //         });
  //       } else {
  //         console.error("Error sending prescription:", error);
  //       }
  //     }
  //   };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2 className="text-3xl pb-5 font-bold leading-7 text-gray-900">
          Welcome, {patientData.length > 0 ? patientData[0].name : ""}
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
                  value={presInfo.waitingtime}
                  onChange={(e) => setWaitingTime(Number(e.target.value))}
                />
                <Textarea
                  placeholder="Add prescription"
                  value={presInfo.prescription}
                  onChange={(e) => setPrescription(e.target.value)}
                />
                <div className="flex space-x-4">
                  <Button disabled className="flex w-full" type="submit">
                    Swap patient / doctor
                  </Button>
                  <Button
                    //   onClick={() => handleSendPrescription(patient._id)}
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
    </form>
  );
};

export default Doctor;
