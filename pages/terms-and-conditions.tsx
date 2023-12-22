import React from "react";
import Desktop from "@src/terms-of-use/Desktop";
import Mobile from "@src/terms-of-use/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { State } from "@data/enums";

export default function Main() {
  return (
    <ConsoleWrapper
      state={State.SUCCESS}
      desktopJSX={<Desktop />}
      mobileJSX={<Mobile />}
      title="Terms of use"
    />
  );
}
