import React, { useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { FcPlanner } from "react-icons/fc";

export default function DateInput({
  date,
  setDate,
  textClassName = "text-base",
  iconClassName = "text-xl",
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  textClassName?: string;
  iconClassName?: string;
}) {
  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <label
      htmlFor="date"
      className="flex flex-row shrink-0 space-x-3 items-center justify-between w-full border rounded-md p-[0.65rem]"
    >
      {/* <p className={textClassName}>{date.toISOString().split("T")[0]}</p> */}
      <FcPlanner className={iconClassName} />
      <input
        type="date"
        id="date"
        className={`${
          isFocused ? "border-primary" : "border-transparent"
        } w-full outline-none`}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        value={date.toISOString().split("T")[0]}
        onClick={(e) => {
          console.log(e.currentTarget);
          e.currentTarget.focus();
        }}
      />
    </label>
  );
}
