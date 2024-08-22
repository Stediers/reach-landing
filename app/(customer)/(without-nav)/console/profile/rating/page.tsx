"use client";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { State } from "@data/enums";
import Desktop from "@src/console/profile/rating/index/Desktop";
import Mobile from "@src/console/profile/rating/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Page() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchMyProfile().then((res) => {
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
