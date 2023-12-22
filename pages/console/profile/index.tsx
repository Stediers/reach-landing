import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import {
  FetchConsoleGigProfileResponse,
  fetchConsoleGigProfile,
} from "@api_functions/gig/fetch-console-gig-profile";
import Mobile from "@src/console/profile/index/Mobile";
import Desktop from "@src/console/profile/index/Desktop";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [gig, setGig] = useState<FetchConsoleGigProfileResponse | null>(null);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchConsoleGigProfile().then((res) => {
      if (res) {
        setGig(res);
        setPageState(State.SUCCESS);
      } else {
        setPageState(State.ERROR);
      }
    });
  }, []);
  return (
    <ConsoleWrapper
      title="My Profile"
      state={pageState}
      desktopJSX={gig && <Desktop gig={gig} />}
      mobileJSX={gig && <Mobile gig={gig} />}
    />
  );
}
