"use client";
import { fetchAppointmentsScreen } from "@api_functions/appointments/fetch-appointments-screen";
import { State } from "@data/enums";
import {
  FetchAppointmentRequestResponse,
  FetchAppointmentResponse,
} from "@data/types";
import Desktop from "@src/console/appointments/index/Desktop";
import Mobile from "@src/console/appointments/requests/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] = useState<
    FetchAppointmentRequestResponse[] | null
  >(null);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchAppointmentsScreen().then((res) => {
      if (res) {
        setResponse(
          res.requests.sort(
            (a, b) =>
              new Date(b.slot.date).getTime() - new Date(a.slot.date).getTime()
          )
        );
        console.log(res);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      desktopJSX={<></>}
      mobileJSX={
        response && <Mobile response={response} setResponse={setResponse} />
      }
      title="My Appointments"
      state={pageState}
    />
  );
}
