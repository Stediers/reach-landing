"use client";

import { Button } from "@components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
import * as motion from "motion/react-client";

export default function PopularDesignations({
  designations,
  selectedDesignation,
}: {
  designations: string[];
  selectedDesignation: string;
}) {
  useEffect(() => {
    const element = document.getElementById("designations");
    if (element) {
      element.scrollLeft = 0;
    }
  }, [selectedDesignation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-y-2 border-border w-full py-5"
    >
      <div
        className="grid grid-flow-col gap-x-5 lg:gap-x-10 justify-start items-center lg:space-x-5 lg:space-y-0 w-full px-5 lg:px-10 overflow-x-scroll"
        id="designations"
      >
        {selectedDesignation !== "All" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <Button variant="default" className="!w-fit">
              {designations.find((d) => d.startsWith(selectedDesignation))}
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.1,
          }}
        >
          <Link href="/">
            <Button
              variant={selectedDesignation === "All" ? "default" : "close"}
              className="!w-fit"
            >
              All
            </Button>
          </Link>
        </motion.div>

        {designations.map(
          (designation, index) =>
            !selectedDesignation.startsWith(designation) && (
              <motion.div
                key={designation}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: Math.min(0.1 * (index + 2), 0.8),
                }}
              >
                <Link href={`/?designation=${designation.replace("&", "-")}`}>
                  <Button
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
              </motion.div>
            )
        )}
      </div>
    </motion.div>
  );
}
