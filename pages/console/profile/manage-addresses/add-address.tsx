import { addAddress } from "@api_functions/address/add-address";
import { State } from "@data/enums";
import { LocationAttributes } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import Mobile from "@src/console/profile/manage-address/add-address/Mobile";
import Desktop from "@src/console/profile/manage-address/add-address/Desktop";

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
  return (
    <ConsoleWrapper
      title="Add Address"
      state={pageState}
      desktopJSX={
        <Desktop
          addAddress={addAddress}
          formValidation={formValidation}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
          saveButtonState={saveButtonState}
          setSaveButtonState={setSaveButtonState}
        />
      }
      mobileJSX={
        <Mobile
          addAddress={addAddress}
          formValidation={formValidation}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
          saveButtonState={saveButtonState}
          setSaveButtonState={setSaveButtonState}
        />
      }
    />
  );
}
