import { LocationCardWithName } from "@components/LocationCard";
import UnderlinedHeader from "@components/UnderlinedHeader";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { updateAddress } from "@api_functions/address/update-address";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";
import { Button } from "@components/ui/button";

export default function Desktop({
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
    <DesktopWrapper
      className="grid grid-cols-2 justify-items-center items-start gap-10 w-full px-5"
      title="Edit Address"
    >
      <div className="flex flex-col items-start justify-center space-y-10 w-full">
        <UnderlinedHeader title="Old Location" />
        {oldLocation ? <LocationCardWithName address={oldLocation} /> : null}
      </div>
      <div className="flex flex-col items-start justify-start space-y-10 w-full">
        <UnderlinedHeader title="New Location" />
        <div className="flex flex-col items-center justify-center space-y-7 w-full">
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
            onclick={async () => {
              await editAddress();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </DesktopWrapper>
  );
}
