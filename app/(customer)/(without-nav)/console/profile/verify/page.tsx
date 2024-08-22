"use client";
import {
  FetchVerificationStatusResponse,
  fetchVerificationStatus,
} from "@api_functions/user/fetch-verification-status";
import { State } from "@data/enums";
import Desktop from "@src/console/profile/verify/index/Desktop";
import Mobile from "@src/console/profile/verify/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] =
    useState<FetchVerificationStatusResponse | null>(null);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchVerificationStatus().then((res) => {
      setResponse(res);
      setPageState(State.SUCCESS);
    });

    return () => {};
  }, []);

  return (
    <ConsoleWrapper
      mobileJSX={response && <Mobile response={response} />}
      desktopJSX={response && <Desktop response={response} />}
      title="Verification"
      state={pageState}
    />
  );
}
