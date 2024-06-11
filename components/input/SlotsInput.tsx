import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import { Slot, TabData } from "@data/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import RadioInput from "./RadioInput";
import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";

export default function SlotsInput({
  date,
  interval,
  selectedSlots,
  setSelectedSlots,
  busySlots,
  maxSlots,
}: {
  date: Date;
  interval: number;
  selectedSlots: Slot[];
  setSelectedSlots: Dispatch<SetStateAction<Slot[]>>;
  busySlots: Slot[];
  maxSlots?: number;
}) {
  const defaultSlots: Slot[] = getSlotsForDate(date, interval);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [period, setPeriod] = useState<"Morning" | "Afternoon" | "Night">(
    selectedSlots[0] ? findPeriodForSlot(selectedSlots[0]) : "Morning"
  );
  useEffect(() => {
    const slots = getSlotsForDate(date, interval);
    const now = new Date();
    now.setMinutes(now.getMinutes());
    const nowTime = now.getTime();
    const filteredSlots = slots.filter((slot) => slot.id > nowTime);
    setSlots(filterSlotsForPeriod(filteredSlots, period));
  }, [date, interval, period]);
  return (
    <div className="w-full flex flex-col items-center space-y-5">
      <RadioInput
        options={[
          {
            icon: (
              <FaCloudSun
                className={`text-3xl ${
                  period === "Morning" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Morning");
              // setSelectedSlot(null);
            },
            className: period === "Morning" ? "bg-info" : "bg-white",
            title: "Morning",
            textColor: period === "Morning" ? "text-white" : "text-text",
          },
          {
            icon: (
              <FaSun
                className={`text-3xl ${
                  period === "Afternoon" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Afternoon");
              // setSelectedSlot(null);
            },
            className: period === "Afternoon" ? "bg-info" : "bg-white",
            title: "Afternoon",
            textColor: period === "Afternoon" ? "text-white" : "text-text",
          },
          {
            icon: (
              <FaMoon
                className={`text-2xl ${
                  period === "Night" ? "text-white" : "text-text"
                }`}
              />
            ),
            onClick: () => {
              setPeriod("Night");
              // setSelectedSlot(null);
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
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              busySlots={busySlots}
              maxSlots={maxSlots}
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
  start.setHours(6, 0, 0, 0);
  //set end time to 11pm
  const end = new Date(date);
  end.setHours(24, 0, 0, 0);
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
  selectedSlots,
  setSelectedSlots,
  busySlots,
  maxSlots,
}: {
  slot: Slot;
  selectedSlots: Slot[];
  setSelectedSlots: Dispatch<SetStateAction<Slot[]>>;
  busySlots: Slot[];
  maxSlots?: number;
}) {
  const busy = busySlots.find((busySlot) => busySlot.id === slot.id);
  return (
    <Card
      className={`${
        busy
          ? "bg-gray-200"
          : selectedSlots.find((selectedSlot) => selectedSlot.id === slot.id)
          ? "bg-primary"
          : "bg-white"
      } items-center hover:cursor-pointer hover:scale-105 transition-all duration-200`}
      onClick={() => {
        if (busy) return;
        setSelectedSlots((prev) => {
          if (prev.find((prevSlot) => prevSlot.id === slot.id)) {
            return prev.filter((prevSlot) => prevSlot.id !== slot.id);
          } else {
            if (maxSlots && prev.length >= maxSlots) {
              return prev;
            }
            return [...prev, slot];
          }
        });
      }}
    >
      <p
        className={`text-base font-medium ${
          selectedSlots.find((selectedSlot) => selectedSlot.id === slot.id)
            ? "text-white"
            : "text-text"
        }
        `}
      >
        {slot.time}
      </p>
    </Card>
  );
}
