import { fetchAppointmentsCalendar } from "@api_functions/appointment/fetch-appointments-calendar";
import { AppointmentStatus, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import Mobile from "@src/console/appointments/index/Mobile";
import Desktop from "@src/console/appointments/index/Desktop";

export default function Main() {
  const [date, setDate] = useState<Date | null>(null);
  const [tag, setTag] = useState<AppointmentStatus | null>(null);

  const [pageState, setPageState] = useState(State.LOADING);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAppointmentsCalendar().then((res) => {
      if (res) {
        setSelectedDates(res.map((date) => new Date(date)));
      } else {
        setSelectedDates([]);
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  return (
    <ConsoleWrapper
      title="Appointments"
      state={pageState}
      desktopJSX={
        <Desktop
          date={date}
          setDate={setDate}
          selectedDates={selectedDates}
          tag={tag}
          setTag={setTag}
        />
      }
      mobileJSX={
        <Mobile
          date={date}
          setDate={setDate}
          selectedDates={selectedDates}
          tag={tag}
          setTag={setTag}
        />
      }
    />
  );
}
