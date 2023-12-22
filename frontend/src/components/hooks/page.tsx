import React from "react";

export const userID = () => {
  return window.localStorage.getItem("userID");
};
