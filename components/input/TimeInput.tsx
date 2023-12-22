import { Dispatch, SetStateAction, useState, useEffect } from "react";

export default function TimeInput({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date | null>>;
}) {
  const [time, setTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });

  useEffect(() => {
    setDate(new Date(date.setHours(time.hours, time.minutes)));
  }, [time]);

  return (
    <div className="w-full flex justify-between">
      <div className="flex flex-col">
        <label htmlFor="hours" className="text-textsubtle">
          Hours
        </label>
        <input
          type="number"
          name="hours"
          id="hours"
          className="border border-textsubtle rounded-md p-2"
          value={time.hours}
          onChange={(e) =>
            setTime({ ...time, hours: parseInt(e.target.value) })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="minutes" className="text-textsubtle">
          Minutes
        </label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          className="border border-textsubtle rounded-md p-2"
          value={time.minutes}
          onChange={(e) =>
            setTime({ ...time, minutes: parseInt(e.target.value) })
          }
        />
      </div>
    </div>
  );
}
