import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const GoogleMap = dynamic(() => import("@/components/Patient/MapRoute"), {
  ssr: false,
});

type RouteCoordinates = {
  [key: string]: {
    fromLatitude: number;
    fromLongitude: number;
    toLatitude: number;
    toLongitude: number;
  };
};

const routeCoordinates: RouteCoordinates = {
  "Clinic 1": {
    fromLatitude: 13.0448614,
    fromLongitude: 74.9780658,
    toLatitude: 12.8663104,
    toLongitude: 74.9257591,
  },
  "Clinic 2": {
    fromLatitude: 13.0448614,
    fromLongitude: 74.9780658,
    toLatitude: 12.8630325,
    toLongitude: 74.8368375,
  },
  "Clinic 3": {
    fromLatitude: 13.0448614,
    fromLongitude: 74.9780658,
    toLatitude: 12.9029797,
    toLongitude: 74.8357253,
  },
};

interface Appointment {
  _id: string;
  name: string;
  disease: string;
  age: string;
  clinic: string;
  userOwner: string;
  __v: number;
}

interface RouteMapProps {
  userID: string | null;
}

export default function RouteMap({ userID }: RouteMapProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // Fetch appointments based on the logged-in userID
        const response = await axios.get(
          `http://localhost:3001/appointment?userOwner=${userID}`
        );
        setAppointments(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAppointments();
  }, [userID]);

  const handleAppointmentSelect = (selectedId: string) => {
    const selected = appointments.find(
      (appointment) => appointment._id === selectedId
    );
    setSelectedAppointment(selected || null);
  };

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-between items-center py-5">
        <div className="flex justify-start items-center gap-3 cursor-default text-2xl font-semibold rounded-t-md tracking-wide">
          {/* <div>{selectedAppointment?.name}</div> */}
          <div>Your Location</div>
          <ArrowRight />
          <div>{selectedAppointment?.clinic}</div>
        </div>
        <div>
          <select
            className="border border-input text-xs md:text-base bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2"
            onChange={(e) => handleAppointmentSelect(e.target.value)}
            value={selectedAppointment?._id || ""}
          >
            <option value="" disabled>
              Select Clinic
            </option>
            {appointments.map((appointment) => (
              <option key={appointment._id} value={appointment._id}>
                {appointment.name} - {appointment.clinic}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedAppointment && (
        <GoogleMap
          fromLatitude={
            routeCoordinates[selectedAppointment.clinic].fromLatitude
          }
          fromLongitude={
            routeCoordinates[selectedAppointment.clinic].fromLongitude
          }
          toLatitude={routeCoordinates[selectedAppointment.clinic].toLatitude}
          toLongitude={routeCoordinates[selectedAppointment.clinic].toLongitude}
        />
      )}
    </div>
  );
}
