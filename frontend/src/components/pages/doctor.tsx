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

import { motion, useInView } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Doctor: React.FC = () => {
  const [patientData, setPatientData] = useState<PatientData[]>([]);
  const [waitingTime, setWaitingTime] = useState<string>("");
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

  const handleSendPrescription = async (patient: PatientData) => {
    try {
      // Send prescription
      const prescriptionResponse = await axios.post(
        "http://localhost:3001/prescription/prescribe",
        {
          waitingtime: waitingTime,
          prescription: prescriptionText,
          userOwner: userid,
          sent: true,
        }
      );

      console.log("Prescription sent successfully:", prescriptionResponse.data);

      setWaitingTime("");
      setPrescriptionText("");
    } catch (error) {
      console.error(
        "Error sending prescription or updating appointment:",
        error
      );

      // if (error.response) {
      //   console.error("Server responded with:", error.response.data);
      // }

      alert("Error sending prescription. Please try again.");
    }
  };

  const handleSendPrescriptionWrapper = (patient: PatientData) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await handleSendPrescription(patient);
    };
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  return (
    <div>
      <div>
        <motion.div
          initial="hidden"
          className="max-w-7xl w-full"
          ref={ref}
          animate={isInView ? "show" : "hidden"}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl mb-5"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            Hello, {username} <span className="wave">👋</span>
          </motion.h1>
          <Tabs defaultValue="appointments" className="w-[49rem]">
            {/* <TabsList className="grid grid-cols-2">
              <TabsTrigger value="appointments">
                Book an Appointment
              </TabsTrigger>
            </TabsList> */}
            <h1 className="text-lg border w-fit px-5 bg-black/25 hover:bg-black/30 cursor-pointer transition-colors duration-200 py-1 rounded-full">
              Appointments
            </h1>
            <TabsContent value="appointments">
              <div className="grid mt-4 gap-5">
                {patientData.map((patient) => (
                  <Dialog key={patient._id}>
                    <DialogTrigger asChild>
                      <div className="bg-green-100 rounded-xl p-5 hover:shadow-lg transition-colors duration-200 cursor-pointer">
                        <div className="flex justify-between w-full">
                          <h1 className="text-lg font-semibold">
                            {patient.name}
                          </h1>
                        </div>
                        <p className="text-muted-foreground">
                          {patient.disease}
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-xl">
                          {patient.name}
                        </DialogTitle>
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
                        onChange={(e) => setWaitingTime(e.target.value)}
                      />
                      <Textarea
                        placeholder="Add prescription"
                        value={prescriptionText}
                        onChange={(e) => setPrescriptionText(e.target.value)}
                      />
                      <div className="flex space-x-4">
                        {/* <Button disabled className="flex w-full" type="submit">
                  Swap patient / doctor
                </Button> */}
                        <Button
                          onClick={handleSendPrescriptionWrapper(patient)}
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
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Doctor;
