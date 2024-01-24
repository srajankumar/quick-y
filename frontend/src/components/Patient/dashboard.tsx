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

interface Prescription {
  _id: string;
  waitingtime: number;
  prescription: string;
  userOwner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const userID = useGetUserID();
const username = useGetUsername();

const PrescriptionList = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  // useEffect(() => {
  //   const fetchPrescriptions = async () => {
  //     try {
  //       const response = await axios.get<Prescription[]>(
  //         `http://localhost:3001/prescription/${userID}`
  //       );

  //       setPrescriptions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching prescriptions:", error);
  //     }
  //   };

  //   fetchPrescriptions();
  // }, []);

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
          Hello {username} 👋
        </motion.h1>
        <Tabs defaultValue="prescriptions">
          <TabsList className="grid w-[49rem] grid-cols-2">
            <TabsTrigger value="prescriptions">Your Prescriptions</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="password">hello world</TabsContent>
          <TabsContent value="prescriptions">
            <div className="grid grid-cols-2 gap-5">
              {prescriptions.map((prescription, index) => (
                <motion.h1
                  key={prescription._id}
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  initial="hidden"
                  className="bg-green-400 rounded-xl p-5 w-96"
                  animate={isInView ? "show" : "hidden"}
                  transition={{ delay: index * 10000 }}
                >
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
                </motion.h1>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PrescriptionList;
