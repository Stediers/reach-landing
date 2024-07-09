"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SwitchText({ textArray }: { textArray: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === textArray.length) {
        next = 0;
      }
      setIndex(next);
      console.log("index", index, textArray[index]);
    }, 3 * 1000);
  }, [index, setIndex]);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={index}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {textArray.find((_, i) => i === index) || "Make your own path"}
      </motion.span>
    </AnimatePresence>
  );
}
