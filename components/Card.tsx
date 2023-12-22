import { dropUpVariants } from "@data/variants";
import { motion } from "framer-motion";

export default function Card({
  children,
  className = "bg-white",
  onClick,
  whileTap,
  whileHover,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  whileTap?: { scale: number };
  whileHover?: { scale: number };
}) {
  return (
    <motion.div
      className={`p-3 w-full border-[1px] overflow-hidden border-gray rounded-lg flex flex-col space-y-6 ${className}`}
      onClick={onClick}
      variants={dropUpVariants}
      whileTap={whileTap}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
}
