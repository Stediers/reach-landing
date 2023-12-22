import { fetchDiscounts } from "@api_functions/service/price/fetch-discounts";
import { State } from "@data/enums";
import { Discount } from "@data/types";
import Mobile from "@src/console/services/offers/index/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";

export default function Main() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  useEffect(() => {
    fetchDiscounts().then((res) => {
      if (res) {
        setDiscounts(res);
      } else {
        setPageState(State.ERROR);
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  return (
    <ConsoleWrapper
      title="My Offers"
      desktopJSX={<></>}
      mobileJSX={<Mobile discounts={discounts} />}
      state={pageState}
    />
  );
}
