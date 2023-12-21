import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

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

interface RouteMapProps {
  userName: string;
}

export default function RouteMap({ userName }: RouteMapProps) {
  const [routeIDs, setRouteIDs] = useState<string[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchDriverRoutes = async () => {
  //     try {
  //       const driverResponse = await axios.get(
  //         `${serverUrl}/driver/info?name=${userName}`
  //       );

  //       if (driverResponse.data.length === 0) {
  //         console.log("Driver not found");
  //         return;
  //       }

  //       const matchingDrivers = driverResponse.data.filter(
  //         (driver: { name: string }) => driver.name === userName
  //       );

  //       if (matchingDrivers.length === 0) {
  //         console.log("Driver not found");
  //         return;
  //       }

  //       const driverRouteIDs = matchingDrivers.map(
  //         (driver: { routeID: string }) => driver.routeID
  //       );

  //       setRouteIDs(driverRouteIDs);
  //       setSelectedRoute(driverRouteIDs[0]); // Set the default selection to the first route ID
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchDriverRoutes();
  // }, [userName]);

  useEffect(() => {
    // Remove the server-related code since we are hardcoding the routes
    const hardcodedRoutes = Object.keys(routeCoordinates);
    setRouteIDs(hardcodedRoutes);
    setSelectedRoute(hardcodedRoutes[0]); // Set the default selection to the first route ID
  }, []);

  const routeInformation = selectedRoute
    ? routeCoordinates[selectedRoute]
    : null;

  const handleRouteSelect = (selectedRoute: string) => {
    setSelectedRoute(selectedRoute);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center ">
      {/* <div>
        <select
          className="border border-input text-xs md:text-base bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 mb-5 mt-2"
          onChange={(e) => handleRouteSelect(e.target.value)}
          value={selectedRoute || ""}
        >
          {routeIDs.map((routeID) => (
            <option key={routeID} value={routeID}>
              {routeID}
            </option>
          ))}
        </select>
      </div> */}
      <div className="flex justify-between cursor-default text-2xl font-semibold py-3 rounded-t-md tracking-wide mt-5">
        <div>Srajan Kumar</div>
        <div>Shreya Clinic</div>
      </div>

      {routeInformation && (
        <GoogleMap
          fromLatitude={routeInformation.fromLatitude}
          fromLongitude={routeInformation.fromLongitude}
          toLatitude={routeInformation.toLatitude}
          toLongitude={routeInformation.toLongitude}
        />
      )}

      <div className="cursor-default text-lg font-semibold tracking-wide py-3">
        <p>Waiting Time: 05:00 pm</p>
      </div>
    </div>
  );
}
