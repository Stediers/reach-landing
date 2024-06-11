import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

export default function SelectInput({
  title,
  className = "",
  options,
  onChange,
  defaultValue,
  titleClassName = "",
}: {
  title?: string;
  className?: string;
  options: {
    icon?: React.ReactNode;
    text: string;
    value: string | number;
  }[];
  onChange: (value: string | number) => void;
  defaultValue?: string | undefined;
  titleClassName?: string;
}) {
  const [selectedElement, setSelectedElement] = useState<{
    icon?: React.ReactNode;
    text: string;
  } | null>(options.find((option) => option.value === defaultValue) ?? null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  return (
    <div className={`flex flex-col w-full relative ${className} space-y-2`}>
      <p className={`text-md font-medium ${titleClassName}`}>{title}</p>
      <button
        className={`border-black border bg-white
        ${showOptions ? "rounded-t-md" : "rounded-md"}
         p-[0.62rem] w-full flex justify-between items-center`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedElement ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <p className="text-base/6 first-letter:capitalize">
                {selectedElement.text}
              </p>
              {selectedElement.icon}
            </div>
          </div>
        ) : (
          <p className="text-base">Select</p>
        )}
        <AiOutlineDown className="text-md" />
      </button>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="relative bg-white z-50"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
          >
            <div className="w-full rounded-b-md absolute border-[1px] border-t-0 border-black shadow-lg z-50">
              {options.map((option) => (
                <Option
                  key={option.text}
                  onClick={() => {
                    setSelectedElement(option);
                    setShowOptions(false);
                    onChange(option.value);
                  }}
                  icon={option.icon}
                  text={option.text}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Option({
  icon,
  text,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      className="w-full z-50 bg-white flex flex-col space-y-3 px-2 py-2 hover:bg-gray-100"
      onClick={onClick}
    >
      {icon ? (
        <div className="flex items-center space-x-2 w-full">
          <p className="text-base">{text}</p>
          {icon}
        </div>
      ) : (
        <p className="text-base first-letter:capitalize">{text}</p>
      )}
    </button>
  );
}
