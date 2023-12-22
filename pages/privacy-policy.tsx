import React from "react";
import Desktop from "@src/privacy-policy/Desktop";
import Mobile from "@src/privacy-policy/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { State } from "@data/enums";
export default function Main() {
  return (
    <ConsoleWrapper
      state={State.SUCCESS}
      title="Privacy Policy"
      desktopJSX={<Desktop />}
      mobileJSX={<Mobile />}
    />
  );
}
