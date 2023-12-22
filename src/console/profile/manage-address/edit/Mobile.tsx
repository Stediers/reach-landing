import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import { updateAddress } from "@api_functions/address/update-address";
import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import { LocationCardWithName } from "@components/LocationCard";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";

export default function Mobile({
  buttonState,
  setButtonState,
  oldLocation,
  location,
  setLocation,
  addressName,
  addressId,
  setAddressName,
  validateForm,
}: {
  buttonState: State;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
  oldLocation: Address | null;
  location: LocationAttributes | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationAttributes | null>>;
  addressName: string;
  setAddressName: React.Dispatch<React.SetStateAction<string>>;
  addressId: string;
  validateForm: ({
    location,
    name,
    oldLocation,
  }: {
    location: LocationAttributes | null;
    name: string;
    oldLocation: Address;
  }) => boolean;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center space-y-5"
      header="Manage Address"
      backLink="/console"
    >
      <LineHeader title="Old Location" />
      {oldLocation ? <LocationCardWithName address={oldLocation} /> : null}
      <LineHeader title="New Location" />
      <AddressNameInput
        addressName={addressName}
        setAddressName={setAddressName}
      />
      <AddressInput
        location={location}
        setLocation={setLocation}
        title="New Location"
      />
      <Button
        text="Save"
        buttonState={buttonState}
        disabled={
          location && oldLocation
            ? !validateForm({
                location,
                name: addressName,
                oldLocation: oldLocation,
              })
            : true
        }
        className="bg-success text-white font-medium"
        onClick={async () => {
          setButtonState(State.LOADING);
          if (location && location !== oldLocation) {
            const res = await updateAddress({
              addressId,
              location: location,
              addressName,
            });
            if (res) {
              router.push("/console/profile/manage-addresses");
            }
          } else {
            showSnackBar({
              message: "Please fill in all fields.",
              state: State.ERROR,
            });
          }
          setButtonState(State.SUCCESS);
        }}
      />
    </MobileWrapper>
  );
}
