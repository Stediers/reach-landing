import { motion } from "framer-motion";

export default function IconWrapper({
  icon,
  onClick,
  title,
  titleClassName = "text-textsubtle font-medium",
  whileTap,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: (e: any) => Promise<void>;
  titleClassName?: string;
  whileTap?: { scale: number };
}) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-2 w-full"
      onClick={onClick}
      whileTap={whileTap}
    >
      {icon}
      <p className={`${titleClassName} text-center text-sm`}>{title}</p>
    </motion.div>
  );
}
