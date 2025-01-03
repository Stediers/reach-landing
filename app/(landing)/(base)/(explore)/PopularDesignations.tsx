"use client";

import { Button } from "@components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function PopularDesignations({
  designations,
  selectedDesignation,
}: {
  designations: string[];
  selectedDesignation: string;
}) {
  console.log("selectedDesignation", selectedDesignation);
  //scroll back to start on selectedDesignation change
  useEffect(() => {
    const element = document.getElementById("designations");
    if (element) {
      element.scrollLeft = 0;
    }
  }, [selectedDesignation]);
  return (
    <div className="border-y-2 border-border w-full py-5">
      <div
        className="grid grid-flow-col gap-x-5 lg:gap-x-10 justify-start items-center lg:space-x-5 lg:space-y-0 w-full px-5 lg:px-10 overflow-x-scroll"
        id="designations"
      >
        {selectedDesignation !== "All" && (
          <Button variant="default" className="!w-fit">
            {designations.find((d) => d.startsWith(selectedDesignation))}
          </Button>
        )}
        <Link href="/">
          <Button
            variant={selectedDesignation === "All" ? "default" : "close"}
            className="!w-fit"
          >
            All
          </Button>
        </Link>
        {designations.map(
          (designation) =>
            !selectedDesignation.startsWith(designation) && (
              <Link
                key={designation}
                href={`/?designation=${designation.replace("&", "-")}`}
              >
                <Button
                  key={designation}
                  className="!w-fit"
                  variant={
                    selectedDesignation.startsWith(designation)
                      ? "default"
                      : "close"
                  }
                >
                  {designation}
                </Button>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
