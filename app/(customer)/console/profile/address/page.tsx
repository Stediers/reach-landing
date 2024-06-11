"use client";
import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useState, useEffect } from "react";
import { fetchAddressByUserId } from "@api_functions/address/fetch-address-by-userId";
import Mobile from "@src/console/profile/address/index/Mobile";
import Desktop from "@src/console/profile/address/index/Desktop";
import { Address } from "@data/types";

export default function Main() {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [addresses, setAddresses] = useState<Address[] | null>([]);
  useEffect(() => {
    fetchAddressByUserId().then((res) => {
      if (res) {
        setAddresses(res);
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
      desktopJSX={
        addresses && (
          <Desktop addresses={addresses} setAddresses={setAddresses} />
        )
      }
      mobileJSX={
        addresses && (
          <Mobile addresses={addresses} setAddresses={setAddresses} />
        )
      }
    />
  );
}
