import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineLeft,
  AiOutlineMenu,
  AiOutlineRight,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";

export default function Calendar({
  date,
  setDate,
  selectedDates,
  disabledDates,
  lockChange = false,
}: {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedDates: Date[];
  disabledDates: Date[];
  lockChange?: boolean;
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

  useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  return (
    <div className="flex flex-col items-center space-y-5 w-full">
      <div className="flex items-center space-x-3 justify-between w-full">
        <div className="flex items-center justify-between space-x-1 w-full">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newMonth = month - 1;
              if (newMonth < 0) {
                setMonth(11);
                setYear(year - 1);
              } else {
                setMonth(newMonth);
              }
            }}
          >
            <AiOutlineLeft className="text-lg" />
          </Button>
          <p className="text-md font-medium text-text">
            {new Date(year, month, 1).toLocaleString("default", {
              month: "long",
            })}
            &nbsp;
            {year}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newMonth = month + 1;
              if (newMonth > 11) {
                setMonth(0);
                setYear(year + 1);
              } else {
                setMonth(newMonth);
              }
            }}
          >
            <AiOutlineRight className="text-lg" />
          </Button>
        </div>
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
          <LastMonthDate
            daysInMonth={daysInMonth}
            firstDay={firstDay}
            key={i}
            i={i}
          />
        ))}

        {Array.from(Array(daysInMonth).keys()).map((_, i) => (
          <DisplayDate
            i={i}
            todaysDate={todaysDate}
            month={month}
            year={year}
            setDate={setDate}
            date={date}
            selectedDates={selectedDates}
            key={i}
            disabledDates={disabledDates}
            lockChange={lockChange}
          />
        ))}
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
    // <div className="flex flex-col items-center space-y-5 w-full">
    //   <div className="flex flex-row justify-between items-center w-full">
    //     <motion.div className="flex flex-row items-center space-x-2 p-2 hover:bg-gray cursor-pointer rounded-md">
    //       <AiOutlineLeft
    //         className="text-info cursor-pointer text-lg"
    //         onClick={(e) => {
    //           setYear(year - 1);
    //           e.stopPropagation();
    //         }}
    //       />
    //     </motion.div>
    //     <p className="text-md font-medium text-text">{year}</p>
    //     <motion.div className="flex flex-row items-center space-x-2 p-2 hover:bg-gray cursor-pointer rounded-md">
    //       <AiOutlineRight
    //         className="text-info cursor-pointer text-lg"
    //         onClick={(e) => {
    //           setYear(year + 1);
    //           e.stopPropagation();
    //         }}
    //       />
    //     </motion.div>
    //   </div>
    //   <div className="grid grid-cols-3 gap-2">
    //     {Array.from(Array(12).keys())
    //       .map((_, i) => i)
    //       .map((option, index) => (
    //         <div
    //           key={index}
    //           className={`flex flex-row items-center justify-center space-x-2 p-2 hover:scale-105 cursor-pointer rounded-md ${
    //             index === month ? "bg-primary text-white" : "border border-gray"
    //           }`}
    //           onClick={(e) => {
    //             setMonth(index);
    //             setMonthDropdown(false);
    //           }}
    //         >
    //           <p className="text-sm first-letter:capitalize font-medium">
    //             {new Date(0, index, 1).toLocaleString("default", {
    //               month: "long",
    //             })}
    //           </p>
    //         </div>
    //       ))}
    //   </div>
    // </div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AiOutlineMenu className="text-lg text-info cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="left">
        <DropdownMenuLabel>Select Month</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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

function LastMonthDate({
  daysInMonth,
  firstDay,
  i,
}: {
  daysInMonth: number;
  firstDay: number;
  i: number;
}) {
  return (
    <div className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-transparent cursor-pointer text-textsubtle">
      {daysInMonth - firstDay + i + 1}
    </div>
  );
}

function DisplayDate({
  i,
  todaysDate,
  month,
  year,
  setDate,
  date,
  selectedDates,
  disabledDates,
  lockChange,
}: {
  i: number;
  todaysDate: Date;
  month: number;
  year: number;
  setDate: Dispatch<SetStateAction<Date | null>>;
  date: Date | null;
  selectedDates: Date[];
  disabledDates: Date[];
  lockChange: boolean;
}) {
  return date &&
    date.getDate() === i + 1 &&
    date.getMonth() === month &&
    date.getFullYear() === year ? (
    <motion.div
      className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-primary text-white cursor-pointer"
      key={i}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (lockChange) {
          showSnackBar({
            message: "Calendar Locked",
            state: State.ERROR,
          });
          return;
        }
        setDate(null);
      }}
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
      onClick={() => {
        if (lockChange) {
          showSnackBar({
            message: "Calendar Locked",
            state: State.ERROR,
          });
          return;
        }
        setDate((prev) => new Date(year, month, i + 1));
      }}
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
  ) : checkDate({
      selectedDates: disabledDates,
      date: new Date(year, month, i + 1),
    }) ? (
    <motion.div
      className="w-7 h-7 p-2 rounded-md flex items-center justify-center cursor-pointer"
      key={i}
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
      <AiOutlineClose className="text-error text-xl absolute" />
    </motion.div>
  ) : (
    <motion.div
      className="w-7 h-7 p-2 rounded-md flex items-center justify-center bg-transparent cursor-pointer"
      key={i}
      onClick={() => {
        if (lockChange) {
          showSnackBar({
            message: "Calendar Locked",
            state: State.ERROR,
          });
          return;
        }
        setDate((prev) => new Date(year, month, i + 1));
      }}
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
  );
}
