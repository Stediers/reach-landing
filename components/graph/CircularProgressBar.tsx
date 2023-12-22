import { motion } from "framer-motion";

export default function CircularProgressBar({
  value,
  textStyles = "text-2xl text-info font-medium",
  color = "text-info",
  radius = 50,
  strokeWidth = 10,
}: {
  value: number;
  textStyles?: string;
  color?: string;
  radius?: number;
  strokeWidth?: number;
}) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-full relative">
      <svg
        className="flex items-center justify-center w-fit h-fit"
        width={radius * 2}
        height={radius * 2}
      >
        <circle
          className="text-gray-200"
          stroke-width={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r="40%"
          cx="50%"
          cy="50%"
        />
        <motion.circle
          initial={{ strokeDasharray: 0 }}
          animate={{ strokeDasharray: 314.159 }}
          transition={{ duration: 1 }}
          className={`${color}`}
          stroke-width={strokeWidth}
          stroke-dashoffset={314.159 - (314.159 * value) / 100}
          stroke-linecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40%"
          cx="50%"
          cy="50%"
        />
      </svg>
      <span
        className={`absolute flex items-center justify-center
       ${textStyles}`}
      >
        {value}%
      </span>
    </div>
  );
}
