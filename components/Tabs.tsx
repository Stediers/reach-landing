import { TabData } from "@data/types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

export default function AnimatedTabs({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full rounded-lg bg-gray/40">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`${
            activeTab === tab ? "text-white" : "hover:scale-110"
          } lg:text-base w-full relative rounded-full px-3 py-2 text-sm font-medium text-text transition focus-visible:outline-2`}
          style={{ isolation: "isolate" }}
        >
          {activeTab === tab && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-primary mix-blend-color-dodge"
              style={{ borderRadius: 5 }}
            />
          )}
          {tab}
        </button>
      ))}
    </div>
  );
}
