"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabSwitcher() {
  const path = usePathname();
  return (
    <div
      className={`w-full flex flex-col justify-center items-center space-y-5  pt-10`}
    >
      <div className="grid grid-cols-2 gap-2 w-fit bg-secondary p-3 lg:p-4 rounded-full">
        <Link
          key="Find Talent"
          href={"/"}
          className={`${
            path === "/" ? "text-white" : ""
          } lg:text-base w-full text-center relative rounded-full px-3 py-2 text-sm font-medium text-text transition focus-visible:outline-2`}
          style={{ isolation: "isolate" }}
        >
          {path === "/" && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-primary mix-blend-color-dodge rounded-full"
              style={{ borderRadius: 20 }}
            />
          )}
          Find Talent
        </Link>
        <Link
          key="Join Us"
          href={"/partner-program"}
          className={`${
            path === "/partner-program" ? "text-white" : "hover:scale-110"
          } lg:text-base w-full relative text-center rounded-full px-3 py-2 text-sm font-medium text-text transition focus-visible:outline-2`}
          style={{ isolation: "isolate" }}
        >
          {path === "/partner-program" && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-primary mix-blend-color-dodge rounded-full"
              style={{ borderRadius: 20 }}
            />
          )}
          Join Us
        </Link>
      </div>
    </div>
  );
}
