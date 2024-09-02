"use client";
import React from "react";
import { Squirrel } from "lucide-react";
import { Button } from "@components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center lg:space-y-10 space-y-5 w-screen h-screen">
      {/* <h1 className="text-6xl font-bold">404</h1> */}
      <Squirrel size={100} />
      <p className="text-2xl mb-5 px-4 text-center">
        You didn&apos;t break the internet, but we can&apos;t find what you are
        looking for.
      </p>
      <Button
        onClick={() => {
          window.history.back();
        }}
        className="max-w-xs"
      >
        Go back
      </Button>
    </div>
  );
}
