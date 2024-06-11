"use client";
import { addAddress } from "@api_functions/address/add-address";
import { State } from "@data/enums";
import { LocationAttributes } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import Mobile from "@src/console/profile/address/add-address/Mobile";
import Desktop from "@src/console/profile/address/add-address/Desktop";
import { useRouter } from "next/navigation";
import { showSnackBar } from "@components/notifications/Snackbar";

type FormValidation = {
  name: boolean;
  location: boolean;
};

export default function AddAddress() {
  const [pageState, setPageState] = useState<State>(State.SUCCESS);
  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [name, setName] = useState<string>("");
  const [saveButtonState, setSaveButtonState] = useState<State>(State.SUCCESS);
  const [formValidation, setFormValidation] = useState<FormValidation>({
    name: name.length > 0,
    location: false,
  });

  useEffect(() => {
    setFormValidation({
      name: name.length > 0,
      location: location !== null ? verifyLocation(location) : false,
    });
  }, [name, location]);
  const router = useRouter();
  return (
    <ConsoleWrapper
      title="Add Address"
      state={pageState}
      desktopJSX={
        <Desktop
          addAddress={_addAddress}
          formValidation={formValidation}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
        />
      }
      mobileJSX={
        <Mobile
          addAddress={_addAddress}
          formValidation={formValidation}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
        />
      }
    />
  );

  async function _addAddress() {
    if (!location) {
      showSnackBar({
        message: "Please select a location",
        state: State.ERROR,
      });
      return;
    }
    const response = await addAddress({
      location: location,
      locationName: name,
    });
    if (response) {
      router.push("/console/profile/address");
    }
  }
}
