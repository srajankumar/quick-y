"use client";

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

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const patient = () => {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
                  <Input type="text" />
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
                  <Input type="text" />
                </div>
              </div>
              <div className="col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add date
                </label>
                <div className="mt-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full text-muted-foreground justify-between"
                      >
                        {value
                          ? clinics.find((clinics) => clinics.value === value)
                              ?.label
                          : "Select a clinic..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {clinics.map((clinics) => (
                            <CommandItem
                              key={clinics.value}
                              value={clinics.value}
                              onSelect={(currentValue: any) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === clinics.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {clinics.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button className="px-5">Submit</Button>
        </div> */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/waiting">
            <Button className="px-5">Submit</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default patient;
