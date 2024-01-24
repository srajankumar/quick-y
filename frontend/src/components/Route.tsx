import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const GoogleMap = dynamic(() => import("@/components/MapRoute"), {
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
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.9415206,
    toLongitude: 74.854157,
  },
  "Clinic 2": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
    toLatitude: 12.8994669,
    toLongitude: 74.8361301,
  },
  "Clinic 3": {
    fromLatitude: 12.8625882,
    fromLongitude: 74.8366402,
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
  userID: string;
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
    <div className="min-h-screen flex flex-col justify-center ">
      <div>
        <select
          className="border border-input text-xs md:text-base bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 mb-5 mt-2"
          onChange={(e) => handleAppointmentSelect(e.target.value)}
          value={selectedAppointment?._id || ""}
        >
          {appointments.map((appointment) => (
            <option key={appointment._id} value={appointment._id}>
              {appointment.name} - {appointment.clinic}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between cursor-default text-2xl font-semibold py-3 rounded-t-md tracking-wide mt-5">
        <div>{selectedAppointment?.name}</div>
        <div>{selectedAppointment?.clinic}</div>
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

      <div className="cursor-default text-lg font-semibold tracking-wide py-3">
        <p>Waiting Time: 05:00 mins</p>
      </div>
    </div>
  );
}
