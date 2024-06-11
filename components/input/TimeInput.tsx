import { Dispatch, SetStateAction, useState, useEffect } from "react";
import TextInput from "./TextInput";

export default function TimeInput({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) {
  const [time, setTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  useEffect(() => {
    setDate(new Date(date.setHours(time.hours, time.minutes)));
  }, [time]);

  return (
    <div className="flex items-center space-x-3 border border-gray p-2 rounded-lg">
      <p
        className="text-text text-base"
        onClick={() => {
          setTime({ ...time, hours: time.hours - 1 });
        }}
      >
        12
      </p>
      <p className="text-text text-base">:</p>
      <p className="text-text text-base">00</p>
    </div>
  );
}
