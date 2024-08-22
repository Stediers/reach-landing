import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import { updateAddress } from "@api_functions/address/update-address";
import LineHeader from "@components/LineHeader";
import { LocationCardWithName } from "@components/LocationCard";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";
import { Button } from "@components/ui/button";

export default function Mobile({
  oldLocation,
  location,
  setLocation,
  addressName,
  addressId,
  setAddressName,
  validateForm,
  editAddress,
}: {
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
  editAddress: () => Promise<void>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center space-y-5"
      header="Edit Address"
      backLink="/console/profile/address"
    >
      <LineHeader title="Old Location" />
      {oldLocation ? <LocationCardWithName address={oldLocation} /> : null}
      <LineHeader title="New Location" />
      <AddressNameInput
        addressName={addressName}
        onChange={(value) => setAddressName(value)}
      />
      <AddressInput
        location={location}
        onChange={(value) => setLocation(value)}
        title="New Location"
      />
      <Button
        disabled={
          location && oldLocation
            ? !validateForm({
                location,
                name: addressName,
                oldLocation: oldLocation,
              })
            : true
        }
        variant="success"
        asyncOnClick={async () => {
          await editAddress();
        }}
      >
        Save
      </Button>
    </MobileWrapper>
  );
}
