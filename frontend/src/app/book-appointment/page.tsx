import Patient from "@/components/Patient/book-appointment";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Link href="/dashboard" className="fixed top-5 left-5">
        <Button>Back</Button>
      </Link>
      <Patient />
    </div>
  );
};

export default page;
