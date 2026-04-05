"use client";
import { useEffect, useState, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";
import { Button } from "@components/ui/button";

// Constants
const DAYS_OF_WEEK: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

// Helper functions to improve readability and maintainability
const getDaysInMonth = (year: number, month: number): number =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number): number =>
  new Date(year, month, 1).getDay();

const getFormattedMonthYear = (year: number, month: number): string => {
  return new Date(year, month, 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};

const isDateSelected = (date: Date, selectedDates: Date[]): boolean => {
  return selectedDates
    ? selectedDates.some(
        (selectedDate) =>
          selectedDate.getDate() === date.getDate() &&
          selectedDate.getMonth() === date.getMonth() &&
          selectedDate.getFullYear() === date.getFullYear()
      )
    : false;
};

const isCurrentDate = (date: Date, today: Date): boolean => {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Helper function to determine if a date is in the past
const isDateInPast = (date: Date, today: Date): boolean => {
  const dateWithoutTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return dateWithoutTime < todayWithoutTime;
};

interface DateCellProps {
  dateObj: Date;
  isSelected: boolean;
  isDisabled: boolean;
  isPastDate?: boolean;
  isInSelectedList: boolean;
  isToday: boolean;
  onDateClick: (date: Date) => void;
  lockChange: boolean;
}

const DateCell: React.FC<DateCellProps> = ({
  dateObj,
  isSelected,
  isDisabled,
  isPastDate = false,
  isInSelectedList,
  isToday,
  onDateClick,
  lockChange,
}) => {
  const handleClick = (): void => {
    if (lockChange) {
      showSnackBar({
        message: "Calendar Locked",
        state: State.ERROR,
      });
      return;
    }

    if (isDisabled) {
      if (isPastDate) {
        showSnackBar({
          message: "Cannot select dates in the past",
          state: State.ERROR,
        });
      } else {
        showSnackBar({
          message: "This date is not available",
          state: State.ERROR,
        });
      }
      return;
    }

    onDateClick(dateObj);
  };

  let textClass = isToday
    ? "text-sm font-medium underline underline-offset-4"
    : "text-sm";

  // Build the cell class with alignment consideration
  let cellClass =
    "w-8 h-8 p-2 rounded-md flex items-center justify-center relative";

  // Start with selection states which should take precedence
  if (isSelected) {
    cellClass += " bg-primary text-white";
  } else if (isInSelectedList) {
    cellClass += " bg-success text-white";
  } else if (isDisabled) {
    cellClass += " cursor-not-allowed bg-gray-100 text-gray-400";
  } else {
    cellClass += " cursor-pointer hover:bg-gray-50 transition-colors";
  }

  return (
    <motion.div
      className={cellClass}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      onClick={handleClick}
    >
      <p className={textClass}>{dateObj.getDate()}</p>
      {isDisabled && !isSelected && !isInSelectedList && (
        <>
          <div className="absolute inset-0 bg-gray-200 opacity-20 rounded-md"></div>
          {isPastDate ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-t border-gray-400 rounded-full"></div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-gray-400 rotate-45 transform origin-center"></div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

interface PreviousMonthCellProps {
  day: number;
}

const PreviousMonthCell: React.FC<PreviousMonthCellProps> = ({ day }) => (
  <div
    className={`w-7 h-7 p-2 rounded-md flex items-center justify-center bg-transparent text-gray-300`}
  >
    {day}
  </div>
);

interface CalendarProps {
  date: Date | null;
  setDate?: React.Dispatch<React.SetStateAction<Date | null>>; // Now optional
  selectedDates?: Date[];
  disabledDates?: Date[];
  lockChange?: boolean;
  disablePastDates?: boolean;
  leftAligned?: boolean; // New prop for left alignment
}

const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  selectedDates,
  disabledDates,
  lockChange = false,
  disablePastDates = false,
  leftAligned = false, // Default to center aligned
}) => {
  // Ensure arrays exist
  const safeSelectedDates = selectedDates || [];
  const safeDisabledDates = disabledDates || [];

  // Create a clean today reference without time
  const today = new Date();
  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Initialize state with provided date or current date
  const [month, setMonth] = useState<number>(
    date ? date.getMonth() : today.getMonth()
  );
  const [year, setYear] = useState<number>(
    date ? date.getFullYear() : today.getFullYear()
  );

  // Use useMemo to calculate these values only when dependencies change
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const firstDay = useMemo(
    () => getFirstDayOfMonth(year, month),
    [year, month]
  );
  const monthYearDisplay = useMemo(
    () => getFormattedMonthYear(year, month),
    [year, month]
  );

  // Update month/year when date prop changes
  useEffect(() => {
    if (date) {
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [date]);

  const navigateMonth = (direction: "prev" | "next"): void => {
    if (direction === "prev") {
      if (month === 0) {
        setMonth(11);
        setYear(year - 1);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setMonth(0);
        setYear(year + 1);
      } else {
        setMonth(month + 1);
      }
    }
  };

  const handleDateClick = (newDate: Date): void => {
    // Only execute if setDate is provided
    if (!setDate) return;

    if (
      date &&
      date.getDate() === newDate.getDate() &&
      date.getMonth() === newDate.getMonth() &&
      date.getFullYear() === newDate.getFullYear()
    ) {
      setDate(null); // Toggle selection off if clicking the same date
    } else {
      setDate(newDate);
    }
  };

  // Keep the container class simple - we'll align content inside
  const containerClass = "flex flex-col space-y-5 w-full";

  return (
    <div className={containerClass}>
      {/* Calendar Header - different layout based on alignment */}
      {leftAligned ? (
        /* Left-aligned header with buttons on right */
        <div className="flex justify-between w-full items-center">
          <p className="text-lg font-medium text-text">{monthYearDisplay}</p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <AiOutlineLeft className="text-lg" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <AiOutlineRight className="text-lg" />
            </Button>
          </div>
        </div>
      ) : (
        /* Center-aligned header with buttons on both sides */
        <div className="flex justify-between w-full items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("prev")}
          >
            <AiOutlineLeft className="text-lg" />
          </Button>
          <p className="text-lg font-medium text-text">{monthYearDisplay}</p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth("next")}
          >
            <AiOutlineRight className="text-lg" />
          </Button>
        </div>
      )}

      {/* Calendar Grid */}
      <div
        className={`grid grid-cols-7 w-full ${
          leftAligned ? "justify-items-start" : "justify-items-center"
        } items-center gap-5`}
      >
        {/* Weekday Headers */}
        {DAYS_OF_WEEK.map((day) => (
          <p
            key={day}
            className={`text-sm text-textsubtle ${
              leftAligned ? "text-left pl-2" : "text-center"
            } col-span-1`}
          >
            {day}
          </p>
        ))}

        {/* Calendar cells with fixed 6-row layout */}
        {(() => {
          // Calculate all the dates we need to display (prev month, current month, next month)
          const calendarDays: Array<{
            date: Date | null;
            type: "prev" | "current" | "next";
          }> = [];

          // Previous month days
          const prevMonthDays = firstDay;
          const prevMonth = month === 0 ? 11 : month - 1;
          const prevMonthYear = month === 0 ? year - 1 : year;
          const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);

          for (let i = 0; i < prevMonthDays; i++) {
            const day = daysInPrevMonth - prevMonthDays + i + 1;
            calendarDays.push({
              date: new Date(prevMonthYear, prevMonth, day),
              type: "prev",
            });
          }

          // Current month days
          for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push({
              date: new Date(year, month, i),
              type: "current",
            });
          }

          // Next month days (to fill a fixed 6-row grid - 42 cells total)
          const totalCells = 6 * 7; // 6 rows, 7 days per week
          const nextMonthDays = totalCells - calendarDays.length;
          const nextMonth = month === 11 ? 0 : month + 1;
          const nextMonthYear = month === 11 ? year + 1 : year;

          for (let i = 1; i <= nextMonthDays; i++) {
            calendarDays.push({
              date: new Date(nextMonthYear, nextMonth, i),
              type: "next",
            });
          }

          // Render all calendar cells
          return calendarDays.map((day, index) => {
            if (!day.date)
              return <div key={`empty-${index}`} className="w-7 h-7" />;

            if (day.type === "prev" || day.type === "next") {
              return (
                <PreviousMonthCell
                  key={`${day.type}-${index}`}
                  day={day.date.getDate()}
                />
              );
            }

            // Current month days
            const currentDate = day.date;
            const isSelectedDate: boolean = date
              ? date.getDate() === currentDate.getDate() &&
                date.getMonth() === currentDate.getMonth() &&
                date.getFullYear() === currentDate.getFullYear()
              : false;

            // To provide better clarity on past dates that are disabled
            const isPastDate =
              disablePastDates && isDateInPast(currentDate, today);
            const isDisabled: boolean =
              isDateSelected(currentDate, safeDisabledDates) || isPastDate;
            const isDateInSelectedList: boolean = isDateSelected(
              currentDate,
              safeSelectedDates
            );
            const isDateToday = isCurrentDate(currentDate, today);

            return (
              <DateCell
                key={`current-${index}`}
                dateObj={currentDate}
                isSelected={isSelectedDate}
                isDisabled={isDisabled}
                isPastDate={isPastDate}
                isInSelectedList={isDateInSelectedList}
                isToday={isDateToday}
                onDateClick={handleDateClick}
                lockChange={lockChange}
              />
            );
          });
        })()}
      </div>
    </div>
  );
};

export default Calendar;
