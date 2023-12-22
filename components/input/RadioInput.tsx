import { showInfoPopup } from "@components/notifications/Popup";
import { motion } from "framer-motion";
import { AiOutlineInfoCircle } from "react-icons/ai";

type OptionProps = {
  icon: React.ReactNode;
  title?: string;
  className?: string;
  textColor?: string;
  onClick: () => void;
  draggable?: boolean;
};

export default function RadioInput({
  options,
  cols = "grid-cols-3",
  title,
  showInfo,
  infoText,
  infoIcon,
}: {
  options: OptionProps[];
  cols?: string;
  title?: string;
  showInfo?: boolean;
  infoText?: string | JSX.Element;
  infoIcon?: JSX.Element;
}) {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex flex-row items-center space-x-1">
        {title && <p className="text-base font-medium">{title}</p>}
        {showInfo && (
          <AiOutlineInfoCircle
            className="text-lg shrink-0 text-info"
            onClick={() => {
              showInfoPopup({
                icon: infoIcon,
                title: title!,
                message: infoText!,
              });
            }}
          />
        )}
      </div>
      <motion.div className={`grid ${cols} gap-3 w-full lg:w-fit`}>
        {options.map((option, index) => (
          <Option
            key={index}
            title={option.title}
            icon={option.icon}
            className={option.className}
            textColor={option.textColor}
            onClick={option.onClick}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Option({
  title,
  icon,
  className = "bg-white border border-gray",
  textColor = "text-black",
  onClick,
}: {
  title?: string;
  icon: React.ReactNode;
  className?: string;
  textColor?: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`cursor-pointer flex flex-col rounded-md items-center justify-center !space-y-2 p-3 lg:p-5 shrink-0 border border-gray ${className} lg:max-w-lg lg:min-w-[10rem]`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
      <p
        className={`text-base lg:text-md font-medium text-center ${textColor}`}
      >
        {title}
      </p>
    </motion.div>
  );
}
