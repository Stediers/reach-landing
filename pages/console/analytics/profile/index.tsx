import {
  FetchProfileTrackingResponse,
  fetchProfileTracking,
} from "@api_functions/analytics/fetch-tracking-profile";
import { State } from "@data/enums";
import Mobile from "@src/console/analytics/profile/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] = useState<FetchProfileTrackingResponse | null>(
    null
  );
  useEffect(() => {
    fetchProfileTracking().then((res) => {
      if (res) {
        setResponse(res);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      title="Analytics"
      mobileJSX={response && <Mobile response={response} />}
      desktopJSX={<></>}
      state={pageState}
    />
  );
}
