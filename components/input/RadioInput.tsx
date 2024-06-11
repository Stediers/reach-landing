import { motion } from "framer-motion";

type OptionProps = {
  icon?: React.ReactNode;
  title?: string;
  body?: string;
  className?: string;
  textColor?: string;
  onClick: () => void;
  draggable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  padding?: string;
  textSize?: string;
};

export default function RadioInput({
  options,
  cols = "grid-cols-3",
  title,
}: {
  options: OptionProps[];
  cols?: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      {title ? <p className="text-base font-medium">{title}</p> : null}
      <motion.div className={`grid ${cols} gap-3 w-full`}>
        {options.map((option, index) => (
          <Option
            key={index}
            title={option.title}
            body={option.body}
            icon={option.icon}
            className={option.className}
            textColor={option.textColor}
            onClick={option.onClick}
            selected={option.selected}
            disabled={option.disabled}
            padding={option.padding}
            textSize={option.textSize}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Option({
  title,
  body,
  icon,
  className = "bg-white border border-gray",
  textColor = "text-black",
  onClick,
  selected = false,
  disabled = false,
  padding = "p-3 lg:p-5",
  textSize = "text-base lg:text-lg",
}: OptionProps) {
  return (
    <motion.div
      className={`cursor-pointer flex flex-col rounded-md items-center justify-center !space-y-2 ${padding} shrink-0 border border-gray ${className}
      ${disabled ? "opacity-50" : selected ? "border-primary" : ""}
      `}
      onClick={!disabled ? onClick : undefined}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <p className={`${textSize} font-medium text-center ${textColor}`}>
        {title}
      </p>
    </motion.div>
  );
}
