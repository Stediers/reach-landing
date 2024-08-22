"use client";
import { fetchAddressByAddressId } from "@api_functions/address/fetch-address-by-addressId";
import { State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import Mobile from "@src/console/profile/address/edit/Mobile";
import Desktop from "@src/console/profile/address/edit/Desktop";
import { updateAddress } from "@api_functions/address/update-address";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { addressId: string } }) {
  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [oldLocation, setOldLocation] = useState<Address | null>(null);
  const [pageState, setPageState] = useState<State>(State.LOADING);

  const addressId = params.addressId;

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAddressByAddressId({ addressId }).then((res) => {
      if (res) {
        setOldLocation(res);
        setPageState(State.SUCCESS);
        setAddressName(res.name);
      }
    });
  }, []);
  const router = useRouter();
  const [addressName, setAddressName] = useState<string>("");
  return (
    <ConsoleWrapper
      title="Update Address"
      state={pageState}
      mobileJSX={
        <Mobile
          addressId={addressId}
          addressName={addressName}
          location={location}
          oldLocation={oldLocation}
          setAddressName={setAddressName}
          setLocation={setLocation}
          validateForm={validateForm}
          editAddress={_editAddress}
        />
      }
      desktopJSX={
        <Desktop
          addressId={addressId}
          addressName={addressName}
          location={location}
          oldLocation={oldLocation}
          setAddressName={setAddressName}
          setLocation={setLocation}
          validateForm={validateForm}
          editAddress={_editAddress}
        />
      }
    />
  );

  async function _editAddress() {
    if (!location || !oldLocation) {
      return;
    }
    if (
      !validateForm({ location, name: addressName, oldLocation: oldLocation })
    ) {
      return;
    }
    await updateAddress({ addressId, addressName, location });
  }
}

function validateForm({
  location,
  name,
  oldLocation,
}: {
  location: LocationAttributes | null;
  name: string;
  oldLocation: Address;
}): boolean {
  if (name.length === 0) {
    return false;
  }
  if (!location) {
    return false;
  }
  if (
    oldLocation.addressLine1 === location.addressLine1 &&
    oldLocation.addressLine2 === location.addressLine2 &&
    oldLocation.city === location.city &&
    oldLocation.state === location.state &&
    oldLocation.country === location.country &&
    oldLocation.postalCode === location.postalCode
  ) {
    return false;
  }
  if (!verifyLocation(location)) {
    return false;
  }
  return true;
}
