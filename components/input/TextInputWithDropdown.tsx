import { closest, distance } from "fastest-levenshtein";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function TextInputWithDropdown({
  title,
  placeholder,
  type = "text",
  disabled = false,
  errorText,
  onSelect,
  options,
  titleClassName,
  mandatory = false,
  value,
  resetAfterSelect = true,
  onFocusSelect,
}: {
  title: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  errorText?: string;
  onSelect: (value: string) => void;
  options: string[];
  titleClassName?: string;
  mandatory?: boolean;
  value: string;
  resetAfterSelect?: boolean;
  onFocusSelect?: boolean;
}) {
  const [optionsToShow, setOptionsToShow] = useState<string[]>([]);
  const [text, setText] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    setText(value);
  }, [value]);
  return (
    <div className="flex flex-col items-start justify-start space-y-1 w-full">
      <div className="flex flex-row items-center justify-between w-full space-x-3">
        <div className="flex flex-row items-center justify-start space-x-1">
          <p className={`font-medium ${titleClassName}`}>{title}</p>
          {mandatory && <p className="text-error">*</p>}
        </div>
        <p
          className={`text-xs lg:text-sm text-error mt-1 ${
            errorText ? "" : "hidden"
          }`}
        >
          {errorText}
        </p>
      </div>
      <div className="relative w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={text}
          onFocus={(e) => {
            //select the text on focus
            if (onFocusSelect) e.target.select();
          }}
          onChange={(e) => {
            setText(e.target.value);
            setOptionsToShow([]);
            // find the three most matched options
            if (e.target.value.length > 3) {
              //find the first three matches and set them to optionsToShow
              var match = options.filter((option) =>
                option.toLowerCase().startsWith(e.target.value.toLowerCase())
              );
              if (match.length > 0) {
                setOptionsToShow(match.slice(0, 3));
              } else {
                const closestMatch = closest(e.target.value, options);
                if (!closestMatch) return setOptionsToShow([]);
                const distanceMatch = distance(e.target.value, closestMatch);
                if (distanceMatch > 3) return setOptionsToShow([]);
                const closestMatchIndex = options.indexOf(closestMatch);
                const closestMatchOptions = options.slice(
                  closestMatchIndex,
                  closestMatchIndex + 3
                );
                if (closestMatchOptions.length === 0)
                  return setOptionsToShow([]);
                setOptionsToShow(closestMatchOptions);
              }
              setShowDropdown(true);
            }
          }}
          className={`w-full text-base border-[1px] border-text rounded-md p-[0.65rem] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none ${errorText}
          ${disabled ? "bg-gray-200" : "bg-white"}
          `}
          disabled={disabled}
        />
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full bg-white shadow-md rounded-md mt-2"
            >
              {optionsToShow.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-start space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setText(resetAfterSelect ? "" : option);
                    setShowDropdown(false);
                  }}
                >
                  <p className="text-base first-letter:capitalize">{option}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
