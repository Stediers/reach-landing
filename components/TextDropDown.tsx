import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

export default function TextDropDown({
  title,
  body,
  className,
  bodyClassName,
}: {
  title: string;
  body: string;
  className?: string;
  bodyClassName?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.div
      className={`w-full rounded-lg flex flex-col space-y-1 cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
    >
      <div
        className="flex items-start justify-between text-base transition duration-75 w-full space-x-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-md">{title}</span>
        <AiOutlineCaretDown
          className={`text-lg transition duration-200 shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            className={`${bodyClassName}`}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.2,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.2,
                },
                opacity: {
                  duration: 0.05,
                },
              },
            }}
          >
            <p className="text-base/8">{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
