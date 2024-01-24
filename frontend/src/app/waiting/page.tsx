"use client";
import * as React from "react";
import Logout from "@/components/Logout";
import Route from "@/components/Patient/Route";

// Import statements...

const Waiting = () => {
  // Use state to manage the userID
  const [userID, setUserID] = React.useState<string>("");

  React.useEffect(() => {
    // Retrieve userID from local storage when the component mounts
    const storedUserID = localStorage.getItem("userID");
    // Update the state with the retrieved userID
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <Logout />
      {/* Pass the userID as a prop to the Route component */}
      {/* <Route userID={userID} /> */}
    </div>
  );
};

export default Waiting;
