import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  return (
    <ConsoleWrapper
      title="Instagram Console"
      state={pageState}
      mobileJSX={<p>asdad</p>}
      desktopJSX={<p>asdad</p>}
    />
  );
}
