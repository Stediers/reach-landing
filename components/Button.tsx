"use client";
import { State } from "@data/enums";
import Link from "next/link";
import Loading from "@components/Loading";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LinkButton({
  buttonState = State.SUCCESS,
  buttonTextClassName = "text-base",
  className,
  text,
  onClick,
  link,
  disabled = false,
  icon,
  loadingColor = "white",
  newTab = false,
}: {
  buttonState?: State;
  buttonTextClassName?: string;
  className?: string;
  text: string;
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  loadingColor?: string;
  newTab?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  if (link) {
    return (
      <Link
        href={link}
        passHref
        rel={newTab ? "noopener noreferrer" : ""}
        target={newTab ? "_blank" : ""}
        className={`w-full ${
          disabled ? "cursor-not-allowed pointer-events-none" : ""
        }`}
        onClick={() => {
          if (disabled) return;
          setLoading(true);

          setInterval(() => {
            setLoading(false);
          }, 3000);
        }}
      >
        <motion.div
          className={`rounded-md p-[0.65rem] w-full ${className} ${
            disabled || loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          whileTap={disabled || loading ? undefined : { scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
        >
          {!loading ? (
            <div className="flex items-center justify-center space-x-2">
              <p className={`{buttonTextClassName} font-medium`}>{text}</p>
              {icon}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Loading className="w-6 h-6" color="bg-white" type="circle" />
            </div>
          )}
        </motion.div>
      </Link>
    );
  } else if (onClick) {
    return (
      <motion.button
        className={`rounded-md p-[0.65rem] w-full ${className} ${
          disabled || buttonState === State.LOADING
            ? "opacity-50 cursor-not-allowed pointer-events-none"
            : ""
        }`}
        type="button"
        onClick={(e) => {
          if (buttonState === State.LOADING) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          if (disabled) return;
          setLoading(true);
          setInterval(() => {
            setLoading(false);
          }, 3000);
          onClick();
        }}
        whileTap={{ scale: 0.95 }}
        disabled={disabled || buttonState === State.LOADING}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-center space-x-2">
          {buttonState === State.LOADING && (
            <Loading className="w-6 h-6" color="bg-white" type="circle" />
          )}
          {buttonState === State.SUCCESS && (
            <div className="space-x-2 flex items-center">
              <p className={`${buttonTextClassName} font-medium`}>{text}</p>
              {icon}
            </div>
          )}
        </div>
      </motion.button>
    );
  } else {
    return <p>Error</p>;
  }
}
