import Card from "@components/Card";
import Chip from "@components/Chip";
import LineHeader from "@components/LineHeader";
import AnimatedTabs from "@components/Tabs";
import { Slot, TabData } from "@data/types";
import devLog from "@helper_functions/devLog";
import { State } from "country-state-city";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import RadioInput from "./RadioInput";
import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";

export default function TimeSlots({
  date,
  interval,
  selectedSlot,
  setSelectedSlot,
  busySlots,
}: {
  date: Date;
  interval: number;
  selectedSlot: Slot | null;
  setSelectedSlot: Dispatch<SetStateAction<Slot | null>>;
  busySlots: Slot[];
}) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [period, setPeriod] = useState<"Morning" | "Afternoon" | "Night">(
    selectedSlot ? findPeriodForSlot(selectedSlot) : "Morning"
  );
  useEffect(() => {
    const slots = getSlotsForDate(date, interval);
    //remove slots before current time
    const now = new Date();
    now.setMinutes(now.getMinutes());
    const nowTime = now.getTime();
    const filteredSlots = slots.filter((slot) => slot.id > nowTime);
    setSlots(filterSlotsForPeriod(filteredSlots, period));
    //find which period the selected slot is in
    // if (selectedSlot) {
    //   const selectedSlotDate = new Date(selectedSlot.id);
    //   if (selectedSlotDate.getHours() < 12) {
    //     setPeriod("Morning");
    //   } else if (
    //     selectedSlotDate.getHours() >= 12 &&
    //     selectedSlotDate.getHours() < 18
    //   ) {
    //     setPeriod("Afternoon");
    //   } else if (selectedSlotDate.getHours() >= 18) {
    //     setPeriod("Night");
    //   }
    // }
  }, [date, interval, period]);
  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <RadioInput
        options={[
          {
            icon: (
              <FaCloudSun
                className={`text-4xl ${
                  period === "Morning" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Morning");
              setSelectedSlot(null);
            },
            className: period === "Morning" ? "bg-info" : "bg-white",
            title: "Morning",
            textColor: period === "Morning" ? "text-white" : "text-text",
          },
          {
            icon: (
              <FaSun
                className={`text-4xl ${
                  period === "Afternoon" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Afternoon");
              setSelectedSlot(null);
            },
            className: period === "Afternoon" ? "bg-info" : "bg-white",
            title: "Afternoon",
            textColor: period === "Afternoon" ? "text-white" : "text-text",
          },
          {
            icon: (
              <FaMoon
                className={`text-4xl ${
                  period === "Night" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Night");
              setSelectedSlot(null);
            },
            className: period === "Night" ? "bg-info" : "bg-white",
            title: "Night",
            textColor: period === "Night" ? "text-white" : "text-text",
          },
        ]}
        cols="grid-cols-3"
      />
      <LineHeader title="Available Slots" />
      {slots.length > 0 ? (
        <div className="grid grid-cols-3 gap-5 w-full">
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              busySlots={busySlots}
            />
          ))}
        </div>
      ) : (
        <Card className="text-textsubtle text-base font-medium text-center">
          No slots available
        </Card>
      )}
    </div>
  );
}

function findPeriodForSlot(slot: Slot) {
  const time = new Date(slot.id);
  if (time.getHours() < 12) {
    return "Morning";
  } else if (time.getHours() >= 12 && time.getHours() < 18) {
    return "Afternoon";
  } else if (time.getHours() >= 18) {
    return "Night";
  } else {
    return "Morning";
  }
}

function getSlotsForDate(date: Date, interval: number): Slot[] {
  const slots: Slot[] = [];
  const start = new Date(date);
  //start time to 5am
  start.setHours(5, 0, 0, 0);
  //set end time to 11pm
  const end = new Date(date);
  end.setHours(23, 0, 0, 0);
  while (start < end) {
    slots.push({
      id: start.getTime(),
      time: start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      status: "available",
      date: new Date(start),
    });
    start.setMinutes(start.getMinutes() + interval);
  }
  return slots;
}

function filterSlotsForPeriod(
  slots: Slot[],
  period: "Morning" | "Afternoon" | "Night"
) {
  if (period === "Morning") {
    return slots.filter((slot) => {
      const time = new Date(slot.id);
      return time.getHours() < 12;
    });
  } else if (period === "Afternoon") {
    return slots.filter((slot) => {
      const time = new Date(slot.id);
      return time.getHours() >= 12 && time.getHours() < 18;
    });
  } else if (period === "Night") {
    return slots.filter((slot) => {
      const time = new Date(slot.id);
      return time.getHours() >= 18;
    });
  } else {
    return slots;
  }
}

function SlotCard({
  slot,
  selectedSlot,
  setSelectedSlot,
  busySlots,
}: {
  slot: Slot;
  selectedSlot: Slot | null;
  setSelectedSlot: Dispatch<SetStateAction<Slot | null>>;
  busySlots: Slot[];
}) {
  return (
    <Card
      className={`${
        busySlots.find((busySlot) => busySlot.date === slot.date)
          ? "bg-gray-200"
          : selectedSlot?.id === slot.id
          ? "bg-primary"
          : "bg-white"
      } items-center`}
      onClick={() => {
        devLog(slot.date);
        setSelectedSlot(slot);
      }}
    >
      <p
        className={`text-base font-medium ${
          selectedSlot?.id === slot.id ? "text-white" : "text-text"
        }
        `}
      >
        {slot.time}
      </p>
    </Card>
  );
}
