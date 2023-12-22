import fetchAddOns from "@api_functions/service/add-on/fetch-add-ons";
import { State } from "@data/enums";
import { AddOn } from "@data/types";
import Mobile from "@src/console/services/add-ons/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Main() {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [pageState, setPageState] = useState(State.LOADING);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAddOns().then((res) => {
      if (res) {
        setAddOns(res);
      } else {
        setAddOns([]);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      desktopJSX={<></>}
      mobileJSX={<Mobile addOns={addOns} />}
      title="Add-Ons"
      state={pageState}
    />
  );
}
