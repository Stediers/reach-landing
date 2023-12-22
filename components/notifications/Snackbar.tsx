import { State } from "@data/enums";
import { AnimatePresence, motion } from "framer-motion";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";

function SnackBar({ message, state }: { message: string; state: State }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full flex justify-center items-center lg:hidden z-50"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
      >
        <div
          className={`flex justify-center items-center w-full lg:py-5 py-3 px-5 ${
            state === State.SUCCESS ? "bg-success" : "bg-error"
          }`}
        >
          <p className="text-white text-base text-center lg:text-md">
            {message}
          </p>
        </div>
      </motion.div>
      <motion.div
        className="fixed bottom-10 right-5 hidden lg:flex justify-end items-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        key={"snackbar"}
      >
        <div
          className={`flex justify-center items-center w-full lg:py-5 py-3 px-5 space-x-3 ${
            state === State.SUCCESS ? "bg-success" : "bg-error"
          }`}
        >
          {state === State.SUCCESS ? (
            <AiOutlineCheckCircle className="text-white text-2xl cursor-pointer" />
          ) : (
            <AiOutlineExclamationCircle className="text-white text-2xl cursor-pointer" />
          )}
          <p className="text-white text-base text-center lg:text-md">
            {message}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export function showSnackBar({
  message,
  state,
}: {
  message: string;
  state: State;
}) {
  const container = document.createElement("div");
  container.setAttribute("id", "snackbar");
  document.body.appendChild(container);
  const root = createRoot(container);

  root.render(<SnackBar message={message} state={state} />);

  setTimeout(() => {
    const container = document.getElementById("snackbar");
    if (!container) return;
    root.unmount();
    document.body.removeChild(container);
  }, 3000);
}
