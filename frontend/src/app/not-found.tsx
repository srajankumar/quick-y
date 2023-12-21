import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const error = () => {
  return (
    <div>
      <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button>
              <Link href="/">Go back home </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default error;
