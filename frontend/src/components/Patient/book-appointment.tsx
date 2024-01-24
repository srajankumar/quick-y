"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import axios from "axios";
import { userID } from "../hooks/page";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import CalendarDateRangePicker from "../ui/date-range-picker";
import { DateRange } from "react-day-picker";

const Patient = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = React.useState("");
  const [disease, setDisease] = React.useState("");
  const [age, setAge] = React.useState<string>("");
  const [clinic, setClinic] = React.useState("");
  const [selectedDateRange, setSelectedDateRange] = React.useState<
    DateRange | undefined
  >();
  const userId = userID();

  const clinics = [
    {
      value: "Clinic 1",
      label: "Clinic 1",
    },
    {
      value: "Clinic 2",
      label: "Clinic 2",
    },
    {
      value: "Clinic 3",
      label: "Clinic 3",
    },
  ];

  const handleAppointmentSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/appointment/create-appointment",
        {
          name,
          disease,
          age,
          clinic,
          userOwner: userId,
          fromDate: selectedDateRange?.from,
          toDate: selectedDateRange?.to,
        }
      );
      toast({
        title: "Appointment Created",
        variant: "success",
      });
      setName("");
      setDisease("");
      setAge("");
      setClinic("");
      setSelectedDateRange(undefined); // Reset the date range
      setIsLoading(false);
      // setTimeout(() => {
      //   window.location.href = "/waiting";
      // }, 1000);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          "Could not book an appointment. Please fill all the fields or try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="pb-2">
            <div className="mt-5 grid gap-x-6 gap-y-5 grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <Input
                    disabled={isLoading}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="disease"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Disease
                </label>
                <div className="mt-2">
                  <Textarea
                    className="h-36"
                    disabled={isLoading}
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <div className="mt-2">
                  <Input
                    disabled={isLoading}
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-3 ">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add Clinic
                </label>
                <div className="mt-2">
                  <select
                    disabled={isLoading}
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  >
                    <option value="" disabled>
                      Select Clinic
                    </option>
                    {clinics.map((clinicOption) => (
                      <option
                        key={clinicOption.value}
                        value={clinicOption.value}
                      >
                        {clinicOption.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <CalendarDateRangePicker
                    // Pass the selected date range to the CalendarDateRangePicker component
                    date={selectedDateRange}
                    onDateChange={setSelectedDateRange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={handleAppointmentSubmit}
            className="px-5 w-full"
          >
            Submit{" "}
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="ml-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                  opacity=".5"
                />
                <path
                  fill="currentColor"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    from="0 12 12"
                    repeatCount="indefinite"
                    to="360 12 12"
                    type="rotate"
                  />
                </path>
              </svg>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Patient;
