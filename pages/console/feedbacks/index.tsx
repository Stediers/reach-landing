import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";

export default function Main() {
  return (
    <ConsoleWrapper
      desktopJSX={<></>}
      mobileJSX={<></>}
      title="Feedbacks"
      key={Math.random()}
      state={State.SUCCESS}
    />
  );
}
