// pages/PrescriptionList.tsx
"use client";
// pages/PrescriptionList.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useGetUsername } from "@/hooks/useGetUsername";
import { useGetUserID } from "@/hooks/useGetUserID";
import Navbar from "./Navbar";
import Route from "@/components/Patient/Route";
interface Prescription {
  _id: string;
  waitingtime: number;
  prescription: string;
  userOwner: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  __v: number;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Patient from "./book-appointment";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const Dashboard = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const userID = useGetUserID();
  const username = useGetUsername();

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get<Prescription[]>(
          `${serverUrl}/prescription/`
        );

        const sortedPrescriptions = response.data.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );

        setPrescriptions(sortedPrescriptions);
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
          Hello {username} <span className="wave">👋</span>
        </motion.h1>
        <Tabs defaultValue="appointments" className="w-[49rem]">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="appointments">Book an Appointment</TabsTrigger>
            <TabsTrigger value="prescriptions">
              Your Prescriptions / Waiting Time
            </TabsTrigger>
            <TabsTrigger value="map">Route Map</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <Patient />
          </TabsContent>
          <TabsContent value="prescriptions">
            <div className="grid mt-4 grid-cols-2 gap-5">
              {prescriptions.map((prescription, index) => (
                <motion.h1
                  key={prescription._id}
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  initial="hidden"
                  className="bg-green-100 rounded-xl p-5 w-96 hover:shadow-lg transition-colors duration-200 cursor-pointer"
                  animate={isInView ? "show" : "hidden"}
                  transition={{ delay: index * 10000 }}
                >
                  <div>
                    <strong>Token Number:</strong> {prescription._id}
                  </div>
                  <div>
                    <strong>Waiting Time:</strong> {prescription.waitingtime}
                  </div>
                  <div>
                    <strong>Prescription:</strong> {prescription.prescription}
                  </div>
                  <div>
                    <strong>Created At:</strong>{" "}
                    {formatIndianTime(prescription.createdAt)}
                  </div>
                  <div>
                    <strong>Confirmed Slot:</strong>{" "}
                    {formatIndianTime(prescription.date)}
                  </div>
                </motion.h1>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="map">
            <Route userID={userID} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Dashboard;
