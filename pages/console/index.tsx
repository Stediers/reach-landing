import {
  fetchConsole,
  FetchConsoleResponse,
} from "@api_functions/gig/fetch-console";
import "swiper/css";
import "swiper/css/pagination";
import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import Mobile from "../../src/console/index/Mobile";
import React from "react";
import devLog from "@helper_functions/devLog";
import Desktop from "@src/console/index/Desktop";

export default function Main() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] = useState<FetchConsoleResponse | null>(null);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchConsole().then((res) => {
      if (res) {
        devLog(res);
        setResponse(res);
        setPageState(State.SUCCESS);
      }
    });
  }, []);
  return (
    <ConsoleWrapper
      title="Home"
      state={pageState}
      mobileJSX={response && <Mobile response={response} />}
      desktopJSX={response && <Desktop response={response} />}
    />
  );
}
