import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import {
  ServicesScreen,
  fetchServicesScreen,
} from "@api_functions/service/fetch-services-screen";
import Mobile from "@src/console/services/index/Mobile";
import Desktop from "@src/console/services/index/Desktop";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [services, setServices] = useState<ServicesScreen[]>([]);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchServicesScreen().then((res) => {
      if (res) {
        setServices(res.servicesScreen);
        setPageState(State.SUCCESS);
      } else {
        setPageState(State.ERROR);
      }
    });
  }, []);
  return (
    <ConsoleWrapper
      title="My Services"
      state={pageState}
      mobileJSX={<Mobile services={services} />}
      desktopJSX={<Desktop services={services} />}
    />
  );
}
