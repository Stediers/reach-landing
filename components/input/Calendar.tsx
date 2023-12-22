import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  AiFillCaretDown,
  AiOutlineLeft,
  AiOutlineMenu,
  AiOutlineRight,
} from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import PopupWrapper from "@wrapper/PopupWrapper";
import { showCustomJSXPopup } from "@components/notifications/Popup";

export default function Calendar({
  date,
  setDate,
  selectedDates,
}: {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  selectedDates: Date[];
}) {
  const todaysDate = new Date();
  const [month, setMonth] = useState(
    date ? date.getMonth() : todaysDate.getMonth()
  );
  const [year, setYear] = useState(
    date ? date.getFullYear() : todaysDate.getFullYear()
  );
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(year, month + 1, 0).getDate()
  );
  const [firstDay, setFirstDay] = useState(new Date(year, month, 1).getDay());

  useEffect(() => {
    setDaysInMonth(new Date(year, month + 1, 0).getDate());
    setFirstDay(new Date(year, month, 1).getDay());
  }, [month, year]);

  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <div className="flex items-center space-x-3 justify-between w-full">
        <div className="flex items-center space-x-1">
          <p className="text-md font-medium text-text">
            {new Date(year, month, 1).toLocaleString("default", {
              month: "long",
            })}
            &nbsp;
            {year}
          </p>
        </div>
        <AiOutlineMenu
          className="text-info cursor-pointer text-lg"
          onClick={() => {
            showCustomJSXPopup({
              preventDefault: false,
              jsx: (
                <MonthDropdown
                  month={month}
                  setMonth={setMonth}
                  setYear={setYear}
                  year={year}
                  key={1}
                />
              ),
              showOkButton: false,
            });
          }}
        />
      </div>
      <div className="grid grid-cols-7 w-full items-center justify-items-center gap-5">
        <p className="text-center col-span-1 text-sm text-textsubtle">Sun</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Mon</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Tue</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Wed</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Thu</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Fri</p>
        <p className="text-center col-span-1 text-sm text-textsubtle">Sat</p>

        {Array.from(Array(firstDay).keys()).map((_, i) => (
          <div
            className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-transparent cursor-pointer text-textsubtle"
            onClick={() => {
              setMonth(month - 1);
              if (month === 0) {
                setYear(year - 1);
              }
              setDate(
                new Date(year, month - 1, daysInMonth - firstDay + i + 1)
              );
            }}
            key={i}
          >
            {daysInMonth - firstDay + i + 1}
          </div>
        ))}

        {Array.from(Array(daysInMonth).keys()).map((_, i) =>
          date &&
          date.getDate() === i + 1 &&
          date.getMonth() === month &&
          date.getFullYear() === year ? (
            <motion.div
              className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-primary text-white cursor-pointer"
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDate(null)}
            >
              <p
                className={`text-sm font-medium ${
                  todaysDate.getDate() === i + 1 &&
                  todaysDate.getMonth() === month &&
                  todaysDate.getFullYear() === year
                    ? "underline underline-offset-4"
                    : ""
                }`}
              >
                {i + 1}
              </p>
            </motion.div>
          ) : checkDate({
              selectedDates,
              date: new Date(year, month, i + 1),
            }) ? (
            <motion.div
              className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-success text-white cursor-pointer"
              key={i}
              onClick={() => setDate((prev) => new Date(year, month, i + 1))}
              whileTap={{ scale: 0.95 }}
            >
              <p
                className={`text-sm font-medium ${
                  todaysDate.getDate() === i + 1 &&
                  todaysDate.getMonth() === month &&
                  todaysDate.getFullYear() === year
                    ? "underline underline-offset-4"
                    : ""
                }`}
              >
                {i + 1}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-transparent cursor-pointer"
              key={i}
              onClick={() => setDate((prev) => new Date(year, month, i + 1))}
              whileTap={{ scale: 0.95 }}
            >
              <p
                className={`${
                  todaysDate.getDate() === i + 1 &&
                  todaysDate.getMonth() === month &&
                  todaysDate.getFullYear() === year
                    ? "underline underline-offset-4"
                    : ""
                }`}
                key={i}
              >
                {i + 1}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

function MonthDropdown({
  month,
  setMonth,
  year,
  setYear,
}: {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <motion.div className="flex flex-row items-center space-x-2 p-2 hover:bg-gray cursor-pointer rounded-md">
          <AiOutlineLeft
            className="text-info cursor-pointer text-lg"
            onClick={(e) => {
              setYear(year - 1);
              e.stopPropagation();
            }}
          />
        </motion.div>
        <p className="text-md font-medium text-text">{year}</p>
        <motion.div className="flex flex-row items-center space-x-2 p-2 hover:bg-gray cursor-pointer rounded-md">
          <AiOutlineRight
            className="text-info cursor-pointer text-lg"
            onClick={(e) => {
              setYear(year + 1);
              e.stopPropagation();
            }}
          />
        </motion.div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from(Array(12).keys())
          .map((_, i) => i)
          .map((option, index) => (
            <div
              key={index}
              className={`flex flex-row items-center justify-center space-x-2 p-2 hover:bg-gray cursor-pointer rounded-md ${
                index === month ? "bg-primary text-white" : "border border-gray"
              }`}
              onClick={(e) => {
                setMonth(index);
              }}
            >
              <p className="text-sm first-letter:capitalize font-medium">
                {new Date(0, index, 1).toLocaleString("default", {
                  month: "long",
                })}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

function checkDate({
  selectedDates,
  date,
}: {
  selectedDates: Date[];
  date: Date;
}) {
  if (
    selectedDates.filter(
      (selectedDate) =>
        selectedDate.getDate() === date.getDate() &&
        selectedDate.getMonth() === date.getMonth() &&
        selectedDate.getFullYear() === date.getFullYear()
    ).length > 0
  ) {
    return true;
  } else {
    return false;
  }
}
