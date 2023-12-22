import { containerVariants } from "@data/variants";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ListWrapper({
  children,
  className = "space-y-5 items-center",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      exit="exit"
      className={`flex flex-col justify-start ${className} w-full`}
    >
      {children}
    </motion.div>
  );
}
