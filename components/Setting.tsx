import { AiOutlineArrowRight } from "react-icons/ai";
import Card from "./Card";

export default function Setting({
  title,
  subtitle,
  onClick,
  className,
  icon,
  count,
  titleClassName = "text-md font-medium",
  subtitleClassName = "font-normal text-sm",
  titleColor = "text-black",
  subtitleColor = "text-gray-500",
  whileTap,
  hover = true,
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
}) {
  return (
    <Card
      onClick={onClick}
      className={`${className} ${whileTap || hover ? "cursor-pointer" : ""}`}
      whileTap={whileTap}
      whileHover={hover ? { scale: 1.02 } : undefined}
    >
      <div className="flex flex-row items-center justify-between space-x-3 w-full">
        <div className="flex flex-col items-start justify-start space-y-1">
          <p
            className={`${titleClassName} ${titleColor} flex items-center first-letter:capitalize`}
          >
            {title}
            <span className="text-base text-gray-500 ml-2">{count}</span>
          </p>
          {subtitle && (
            <p
              className={`${subtitleClassName} ${subtitleColor} text-left break-words`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {icon || <AiOutlineArrowRight className="text-xl shrink-0" />}
      </div>
    </Card>
  );
}
