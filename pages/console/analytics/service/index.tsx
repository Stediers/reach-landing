import {
  FetchTrackingServiceResponse,
  fetchTrackingService,
} from "@api_functions/analytics/fetch-tracking-service";
import { State } from "@data/enums";
import Mobile from "@src/console/analytics/service/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] = useState<FetchTrackingServiceResponse | null>(
    null
  );
  useEffect(() => {
    fetchTrackingService().then((res) => {
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
