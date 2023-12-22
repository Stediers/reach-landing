import { motion } from "framer-motion";
import React, { FC, useState } from "react";

export default function TabsComponent({
  titles,
  contents,
  activeTabClassName = "text-primary",
  tabClassName = "text-lg font-medium",
}: {
  titles: String[];
  contents: React.ReactElement[];
  activeTabClassName?: string;
  tabClassName?: string;
}) {
  const [activeTab, setActiveTab] = useState(0);

  if (titles.length !== contents.length) {
    throw new Error("Tab titles and contents must have the same length");
  }

  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex space-x-1 w-full justify-evenly">
        {titles.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${
              activeTab === index ? activeTabClassName : "hover:text-black/60"
            } ${tabClassName} relative px-3 py-1.5 transition`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {activeTab === index && (
              <motion.span
                layoutId="underline"
                layout
                className="absolute bottom-0 left-1/4 self-center border-b-2 border-primary w-1/2 "
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>
      {contents[activeTab]}
    </div>
  );
}
