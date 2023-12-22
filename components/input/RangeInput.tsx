import {
  MotionValue,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function RangeInput({
  title,
  max,
  min,
  step,
  value,
  onChange,
  className = "",
}: {
  title?: string;
  max: number;
  min: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) {
  return (
    <div className="flex flex-col space-y-3 w-full">
      {title && <p className="text-base font-medium">{title}</p>}
      <motion.input
        className={`w-full h-3 bg-gray rounded-md ${className} accent-primary focus:outline-none outline-none border-none`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="flex flex-row justify-between px-2">
        <p className="text-sm font-medium">{value}</p>
        <p className="text-sm font-medium">{max}</p>
      </div>
    </div>
  );
}
