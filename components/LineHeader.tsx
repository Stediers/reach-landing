import { motion } from "framer-motion";

export default function LineHeader({
  title,
  titleClassName = "text-sm text-textsubtle font-medium",
}: {
  title: string;
  titleClassName?: string;
}) {
  return (
    <motion.div className="flex flex-row items-center justify-center space-x-3 w-full">
      <div className="h-px bg-gray w-1/2"></div>
      <p className={`${titleClassName} shrink-0 tracking-widest uppercase`}>
        {title}
      </p>
      <div className="h-px bg-gray w-1/2"></div>
    </motion.div>
  );
}
