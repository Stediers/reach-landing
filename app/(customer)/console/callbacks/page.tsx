"use client";
import { fetchCallbacks } from "@api_functions/callback/fetch-callbacks";
import { CallbackStatus, State } from "@data/enums";
import { Callback } from "@data/types";
import Desktop from "@src/console/callback/index/Desktop";
import Mobile from "@src/console/callback/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [success, setSuccess] = useState<Callback[] | null>(null);
  null;
  const [rejected, setRejected] = useState<Callback[] | null>(null);
  const [pending, setPending] = useState<Callback[] | null>(null);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchCallbacks().then((res) => {
      setPageState(State.SUCCESS);
      if (res) {
        console.log(res);
        setSuccess(res.filter((r) => r.status === CallbackStatus.SUCCESS));
        setRejected(res.filter((r) => r.status === CallbackStatus.FAILED));
        setPending(res.filter((r) => r.status === CallbackStatus.PENDING));
      }
    });
  }, []);
  return (
    <ConsoleWrapper
      mobileJSX={
        success &&
        rejected &&
        pending && (
          <Mobile success={success} rejected={rejected} pending={pending} />
        )
      }
      desktopJSX={
        success &&
        rejected &&
        pending && (
          <Desktop success={success} rejected={rejected} pending={pending} />
        )
      }
      title="Booking"
      state={pageState}
    />
  );
}
