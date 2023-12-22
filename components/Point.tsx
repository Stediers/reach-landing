import { State } from "@data/enums";
import { AiFillCloseSquare } from "react-icons/ai";
import { showSnackBar } from "./notifications/Snackbar";
import { AnimatePresence, motion } from "framer-motion";

export default function Point({
  point,
  setState,
  index,
  icon,
  iconStyle = "text-lg",
  showClose = true,
}: {
  point: string;
  setState: () => void;
  index: number;
  icon: JSX.Element;
  iconStyle?: string;
  showClose?: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex space-x-3 items-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        key={index}
      >
        {icon}
        <p className=" text-base shrink flex-1 break-word break-all">{point}</p>
        {showClose && (
          <AiFillCloseSquare
            className={`text-danger cursor-pointer shrink-0 mt-1 ${iconStyle}`}
            onClick={() => {
              showSnackBar({
                state: State.SUCCESS,
                message: "Point removed",
              });
              setState();
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
