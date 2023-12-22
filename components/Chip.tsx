import { AiFillCloseCircle } from "react-icons/ai";

export default function Chip({
  title,
  className,
  onClick,
  titleClassName = "text-sm font-medium",
  icon = <AiFillCloseCircle className="text-white" />,
  iconPlacement,
}: {
  title: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  titleClassName?: string;
  iconPlacement?: "left" | "right";
}) {
  return (
    <div
      className={`${className} rounded-md py-1 px-2 w-fit flex flex-row items-center justify-center space-x-2`}
      onClick={onClick}
    >
      {iconPlacement === "left" && onClick && <div>{icon}</div>}
      <p className={titleClassName}>{title}</p>
      {iconPlacement === "right" && onClick && <div>{icon}</div>}
    </div>
  );
}
