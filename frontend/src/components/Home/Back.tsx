import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Back = () => {
  return (
    <Link href="/" className="fixed top-5 left-5">
      <Button>Back</Button>
    </Link>
  );
};

export default Back;
