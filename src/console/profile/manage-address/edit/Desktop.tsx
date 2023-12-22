import { LocationCardWithName } from "@components/LocationCard";
import UnderlinedHeader from "@components/UnderlinedHeader";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { State } from "@data/enums";
import { Address, LocationAttributes } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
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
    <DesktopWrapper className="grid grid-cols-2 justify-items-center items-start gap-10 w-full px-5">
      <div className="flex flex-col items-start justify-center space-y-10 w-full">
        <UnderlinedHeader title="Old Location" />
        {oldLocation ? <LocationCardWithName address={oldLocation} /> : null}
      </div>
      <div className="flex flex-col items-start justify-center space-y-10 w-full">
        <UnderlinedHeader title="New Location" />
        <div className="flex flex-col items-start justify-center space-y-5 w-full">
          <AddressNameInput
            addressName={addressName}
            setAddressName={setAddressName}
          />
          <AddressInput
            location={location}
            setLocation={setLocation}
            title="New Location"
          />
        </div>
      </div>
    </DesktopWrapper>
  );
}
