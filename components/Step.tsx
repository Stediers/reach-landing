import { State } from "@data/enums";
import { motion } from "framer-motion";
import { AiOutlineCheck, AiOutlineExclamation } from "react-icons/ai";

export default function Step({
  step,
  onClick,
  active,
  completed,
}: {
  step: number;
  onClick: () => void;
  active: boolean;
  completed: boolean;
}) {
  return (
    <motion.div
      className={`rounded-full border-2 ${
        active
          ? `${
              completed ? "border-success" : "border-primary"
            } !rounded-lg !w-11 !h-11`
          : completed && "border-success"
      } w-10 h-10 flex items-center justify-center`}
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <span
        className={`${
          active
            ? `${completed ? "text-success" : "text-primary"}`
            : completed && "text-success"
        } font-medium text-md`}
      >
        {active ? step : completed ? <AiOutlineCheck /> : step}
      </span>
    </motion.div>
  );
}
