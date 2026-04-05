import { LocationCardWithName } from "@components/LocationCard";
import UnderlinedHeader, {
  SubUnderlinedHeader,
} from "@components/UnderlinedHeader";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { CustomerRoutes, State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { updateAddress } from "@api_functions/address/update-address";
import { showSnackBar } from "@components/notifications/Snackbar";
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
      className="grid grid-cols-2 justify-items-center items-start gap-10 w-full"
      title="Edit Address"
      description="
        Update the address details below and click save to update the address.
      "
      backLink={CustomerRoutes.EDIT_ADDRESS}
    >
      <div className="flex flex-col items-start justify-center space-y-10 w-full">
        <SubUnderlinedHeader title="Old Location" />
        {oldLocation ? <LocationCardWithName address={oldLocation} /> : null}
      </div>
      <div className="flex flex-col items-start justify-start space-y-10 w-full">
        <SubUnderlinedHeader title="New Location" />
        <div className="flex flex-col items-center justify-center space-y-7 w-full">
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
        </div>
      </div>
    </DesktopWrapper>
  );
}
