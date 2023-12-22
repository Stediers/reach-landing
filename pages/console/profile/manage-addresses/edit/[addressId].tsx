import { fetchAddressByAddressId } from "@api_functions/address/fetch-address-by-addressId";
import { updateAddress } from "@api_functions/address/update-address";
import AddressLine from "@components/AddressLine";
import Button from "@components/Button";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import { LocationCard, LocationCardWithName } from "@components/LocationCard";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import TextInput from "@components/input/TextInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import { AddressType, State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import router from "next/router";
import { useEffect, useState } from "react";
import Mobile from "@src/console/profile/manage-address/edit/Mobile";
import Desktop from "@src/console/profile/manage-address/edit/Desktop";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const addressId = context.params?.addressId;
  if (!addressId || typeof addressId !== "string") {
    return {
      redirect: {
        destination: "/console/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {
      addressId,
    },
  };
}

export default function Main({ addressId }: { addressId: string }) {
  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [oldLocation, setOldLocation] = useState<Address | null>(null);
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);

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
  const [addressName, setAddressName] = useState<string>("");
  return (
    <ConsoleWrapper
      title="Update Address"
      state={pageState}
      mobileJSX={
        <Mobile
          addressId={addressId}
          buttonState={buttonState}
          addressName={addressName}
          location={location}
          oldLocation={oldLocation}
          setAddressName={setAddressName}
          setButtonState={setButtonState}
          setLocation={setLocation}
          validateForm={validateForm}
        />
      }
      desktopJSX={
        <Desktop
          addressId={addressId}
          buttonState={buttonState}
          addressName={addressName}
          location={location}
          oldLocation={oldLocation}
          setAddressName={setAddressName}
          setButtonState={setButtonState}
          setLocation={setLocation}
          validateForm={validateForm}
        />
      }
    />
  );
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
