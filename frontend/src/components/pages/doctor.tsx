"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const doctor = () => {
  const [isWaitingTimeInputVisible, setWaitingTimeInputVisibility] =
    useState(false);

  const handleAllotWaitingTime = () => {
    setWaitingTimeInputVisibility(true);
  };

  const handleSendPrescription = () => {
    // Handle sending prescription logic here
  };

  return (
    <div>
      <h2 className="text-3xl pb-5 font-bold leading-7 text-gray-900">
        Welcome, {"Doctor Name"}
      </h2>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-[50rem]">
              <div className="rounded-md hover:shadow-xl shadow-md transition-all duration-300 cursor-default mr-5 mb-5 px-5 py-3">
                <div className="flex justify-between w-full">
                  <h1 className="text-lg font-semibold">Srajan Kumar</h1>
                  <div>10:30 pm</div>
                </div>
                <p className="text-muted-foreground">Fever</p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{"Srajan Kumar"}</DialogTitle>
              <DialogDescription className="text-lg tracking-wide">
                <div className="flex justify-between items-center">
                  <div>
                    <div>
                      {"19"} y.o | {"Fever"}
                    </div>
                    <div>Detected disease: Acne</div>
                  </div>
                  <div className="text-primary font-semibold">09:00 p.m</div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <Input
              type="number"
              placeholder="Waiting time (minutes)"
              className="mb-0"
            />
            <Textarea placeholder="Add prescription" />
            <div className="flex space-x-4">
              <Button disabled className="flex w-full" type="submit">
                Swap patient / doctor
              </Button>
              <Button className="flex w-full" type="submit">
                Send prescription
              </Button>
            </div>
            {/* <DialogFooter>
              <div className="flex">
                <Button className="flex w-full" type="submit">
                  Send prescription
                </Button>
                <Button className="flex w-full" type="submit">
                  Send prescription
                </Button>
              </div>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default doctor;
