// Import necessary libraries and components
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

// Your component
const Patient = () => {
  const [name, setName] = React.useState("");
  const [disease, setDisease] = React.useState("");
  const [age, setAge] = React.useState<number | undefined>(undefined);
  const [clinic, setClinic] = React.useState("");
  const [userOwner, setUserOwner] = React.useState("65849134a7d019ae6a88544d"); // Set the default userOwner value

  const clinics = [
    {
      value: "clinic1",
      label: "Clinic 1",
    },
    {
      value: "clinic2",
      label: "Clinic 2",
    },
    {
      value: "clinic3",
      label: "Clinic 3",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleAppointmentSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/appointment/create-appointment",
        {
          name,
          disease,
          age,
          clinic,
          userOwner,
        }
      );

      console.log("Appointment created successfully:", response.data);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="pb-2">
            <h2 className="text-3xl font-bold leading-7 text-gray-900">
              Book an Appointment
            </h2>
            <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <Input
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
                  <Input
                    type="text"
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
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
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
                  <Input
                    type="text"
                    value={clinic}
                    onChange={(e) => setClinic(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/waiting">
            <Button onClick={handleAppointmentSubmit} className="px-5">
              Submit
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Patient;
