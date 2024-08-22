"use client";
import { fetchAppointmentsScreen } from "@api_functions/appointments/fetch-appointments-screen";
import { State } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";
import Desktop from "@src/console/appointments/index/Desktop";
import Mobile from "@src/console/appointments/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] = useState<FetchAppointmentResponse[] | null>(
    null
  );
  useEffect(() => {
    setPageState(State.LOADING);
    fetchAppointmentsScreen().then((res) => {
      if (res) {
        setResponse(
          res.sort(
            (a, b) =>
              new Date(b.scheduled.slot.date).getTime() -
              new Date(a.scheduled.slot.date).getTime()
          )
        );
        console.log(res);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      desktopJSX={
        response && <Desktop response={response} setResponse={setResponse} />
      }
      mobileJSX={
        response && <Mobile response={response} setResponse={setResponse} />
      }
      title="My Appointments"
      state={pageState}
    />
  );
}
