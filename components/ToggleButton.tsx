import { vibration } from "@helper_functions/vibrate";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ToggleButton({
  state,
  onClick,
}: {
  state: boolean;
  onClick: () => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <motion.div
      className={`${
        state ? "justify-end" : "justify-start"
      } flex rounded-full w-12 h-7 p-1 space-x-1 cursor-pointer`}
      onClick={() => {
        vibration({ duration: 50, pattern: [0, 50, 50, 50] });
        setLoading(true);
        setInterval(() => {
          setLoading(false);
        }, 3000);
        onClick();
      }}
      animate={{
        backgroundColor: state ? "#10B981" : "#EF4444",
        transition: {
          duration: 0.2,
        },
        justifyContent: state ? "flex-end" : "flex-start",
      }}
    >
      <motion.div className={`bg-white rounded-full w-5 h-5`} />
    </motion.div>
  );
}
