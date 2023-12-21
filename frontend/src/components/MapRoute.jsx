import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

function Map({ fromLatitude, fromLongitude, toLatitude, toLongitude }) {
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("mapId").setView([fromLatitude, fromLongitude], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );
      mapRef.current = map;
    }

    const map = mapRef.current;

    if (fromLatitude && fromLongitude && toLatitude && toLongitude) {
      const from = L.latLng(fromLatitude, fromLongitude);
      const to = L.latLng(toLatitude, toLongitude);

      // Create a routing control only if it doesn't exist
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [from, to],
          routeWhileDragging: true,
          show: true,
          createMarker: function (i, wp) {
            const iconUrl = i === 0 ? "/location.png" : "/location.png";
            const icon = L.icon({
              iconUrl: iconUrl,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            });
            return L.marker(wp.latLng, {
              icon: icon,
            });
          },
        }).addTo(map);

        // Listen for the route events to update estimated time
        routingControlRef.current.on("routesfound", (e) => {
          const route = e.routes[0];
          if (route && route.summary) {
            setEstimatedTime(route.summary.totalTime);
          }
        });
      } else {
        routingControlRef.current.setWaypoints([from, to]);
      }

      // Fit the map to the bounds of the markers and route
      const bounds = L.latLngBounds(from, to);
      map.fitBounds(bounds);
    }
  }, [fromLatitude, fromLongitude, toLatitude, toLongitude]);

  return (
    <div>
      <div id="mapId" style={{ height: "400px", width: "800px" }}>
        <style>{`
          #mapId {
            width: 100%;
            height: 100%;
          }

          /* Change text color to black */
          .leaflet-routing-container {
            color: black;
          }
        `}</style>
      </div>
      {estimatedTime && (
        <div className="text-lg cursor-default mt-5 font-semibold tracking-wide py-3">
          <p>Estimated Time: {formatTime(estimatedTime)}</p>
        </div>
      )}
    </div>
  );
}

// Helper function to format time in HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours} Hours ${minutes} Minutes ${remainingSeconds} Seconds`;
}

export default Map;
