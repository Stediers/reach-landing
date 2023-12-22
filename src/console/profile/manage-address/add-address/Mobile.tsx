import Button from "@components/Button";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import { LocationAttributes } from "@data/types";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";
import { AddAddressRequest } from "@api_functions/address/add-address";

export default function Mobile({
  location,
  setLocation,
  name,
  setName,
  formValidation,
  saveButtonState,
  setSaveButtonState,
  addAddress,
}: {
  location: LocationAttributes | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationAttributes | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  formValidation: {
    name: boolean;
    location: boolean;
  };
  saveButtonState: State;
  setSaveButtonState: React.Dispatch<React.SetStateAction<State>>;
  addAddress: (request: AddAddressRequest) => Promise<boolean>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-start space-y-5"
      header="Manage Address"
      backLink="/console/profile/manage-addresses"
    >
      <AddressNameInput addressName={name} setAddressName={setName} />
      <AddressInput location={location} setLocation={setLocation} />
      <Button
        text="Save"
        className={`bg-success text-white px-3 py-3 rounded-lg font-medium w-full text-center`}
        onClick={async () => {
          setSaveButtonState(State.LOADING);
          if (!location) {
            showSnackBar({
              message: "Please select a location",
              state: State.ERROR,
            });
            setSaveButtonState(State.SUCCESS);
            return;
          }
          const response = await addAddress({
            location: location,
            locationName: name,
          });
          if (response) {
            router.push("/console/profile/manage-addresses");
          } else {
            setSaveButtonState(State.SUCCESS);
          }
        }}
        buttonState={saveButtonState}
        disabled={formValidation.name && formValidation.location ? false : true}
      />
    </MobileWrapper>
  );
}
