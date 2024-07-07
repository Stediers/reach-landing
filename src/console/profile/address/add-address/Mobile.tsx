import { Button } from "@components/ui/button";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import { LocationAttributes } from "@data/types";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import { useRouter } from "next/navigation";
import { AddAddressRequest } from "@api_functions/address/add-address";

export default function Mobile({
  location,
  setLocation,
  name,
  setName,
  formValidation,
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
  addAddress: () => Promise<void>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-start space-y-5"
      header="Add Address"
    >
      <AddressNameInput
        addressName={name}
        onChange={(value) => setName(value)}
      />
      <AddressInput
        location={location}
        onChange={(value) => setLocation(value)}
      />
      <Button
        variant="success"
        onclick={async () => {
          await addAddress();
        }}
        disabled={formValidation.name && formValidation.location ? false : true}
      >
        Save
      </Button>
    </MobileWrapper>
  );
}
