"use client";
import { AiOutlineArrowRight } from "react-icons/ai";
import Card from "./Card";

export default function Setting({
  title,
  subtitle,
  onClick,
  className,
  icon,
  count,
  titleClassName = "text-lg font-medium",
  subtitleClassName = "font-normal text-sm",
  titleColor = "text-text",
  subtitleColor = "text-textsubtle",
  whileTap,
  hover = true,
  disabled = false,
  titleCrop,
  subtitleJSX,
}: {
  title: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  count?: number;
  titleClassName?: string;
  subtitleClassName?: string;
  whileTap?: { scale: number };
  titleColor?: string;
  subtitleColor?: string;
  hover?: boolean;
  disabled?: boolean;
  titleCrop?: number;
  subtitleJSX?: React.ReactNode;
}) {
  const titleLength = titleCrop || 30;
  return disabled ? (
    <Card className="cursor-not-allowed !bg-gray-100">
      <div className="flex flex-row items-center justify-between space-x-3 w-full">
        <div className="flex flex-col items-start justify-start space-y-1">
          <p
            className={`${titleClassName} dark:text-white flex items-center first-letter:capitalize`}
          >
            {title.length > titleLength
              ? title.slice(0, titleCrop) + "..."
              : title}
            <span className="text-base text-gray-500 ml-2">{count}</span>
          </p>
          {subtitle && (
            <p
              className={`${subtitleClassName} dark:text-white text-left break-words`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="shrink-0">
          {icon || <AiOutlineArrowRight className="text-xl shrink-0" />}
        </div>
      </div>
    </Card>
  ) : (
    <Card
      onClick={onClick}
      className={`${className} ${whileTap || hover ? "cursor-pointer" : ""}`}
    >
      <div className="flex flex-row items-center justify-between space-x-3 w-full">
        <div className="flex flex-col items-start justify-start space-y-1">
          <p
            className={`${titleClassName} dark:text-white flex items-center first-letter:capitalize`}
          >
            {title.length > titleLength
              ? title.slice(0, titleCrop) + "..."
              : title}
            <span className="text-base text-gray-500 ml-2">{count}</span>
          </p>
          {subtitle && (
            <p
              className={`${subtitleClassName} dark:text-white text-left break-words`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="shrink-0">
          {icon || <AiOutlineArrowRight className="text-xl shrink-0" />}
        </div>
      </div>
    </Card>
  );
}
