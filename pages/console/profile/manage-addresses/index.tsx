import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useState, useEffect } from "react";
import {
  FetchAddressByUserIdAddresses,
  fetchAddressByUserId,
} from "@api_functions/address/fetch-address-by-userId";
import Mobile from "@src/console/profile/manage-address/index/Mobile";
import Desktop from "@src/console/profile/manage-address/index/Desktop";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [addresses, setAddresses] = useState<FetchAddressByUserIdAddresses[]>(
    []
  );
  useEffect(() => {
    fetchAddressByUserId().then((res) => {
      if (res) {
        setAddresses(res.addresses);
        setPageState(State.SUCCESS);
      } else {
        setPageState(State.ERROR);
      }
    });
  }, []);
  return (
    <ConsoleWrapper
      title="Your Addresses"
      state={pageState}
      desktopJSX={<Desktop addresses={addresses} setAddresses={setAddresses} />}
      mobileJSX={<Mobile addresses={addresses} setAddresses={setAddresses} />}
    />
  );
}
