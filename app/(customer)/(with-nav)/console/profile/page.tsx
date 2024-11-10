"use client";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { State } from "@data/enums";
import Desktop from "@src/console/profile/index/Desktop";
import Mobile from "@src/console/profile/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const [pageState, setPageState] = useState(State.LOADING);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchMyProfile().then((response) => {
      setResponse(response);
      setPageState(State.SUCCESS);
    });
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
