import { addAddress } from "@api_functions/address/add-address";
import { attachAddressAppointment } from "@api_functions/appointments/attach-address-appointment";
import { CustomSheet } from "@components/CustomSheet";
import { LocationCardWithName } from "@components/LocationCard";
import Setting from "@components/Setting";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import RadioInput from "@components/input/RadioInput";
import SelectInput from "@components/input/SelectInput";
import { Button } from "@components/ui/button";
import { SheetClose } from "@components/ui/sheet";
import { Address, LocationAttributes } from "@data/types";
import verifyLocation from "@helper_functions/verifyLocation";
import { Home, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export default function UpdateAddressDrawer({
  address,
  setAddress,
  appointmentId,
  userAddresses,
  onSubmit,
}: {
  address: Address | null;
  setAddress: Dispatch<SetStateAction<Address | null>>;
  appointmentId: string;
  userAddresses: Address[];
  onSubmit: (addressId: string) => Promise<void>;
}) {
  const [type, setType] = useState<"new" | "existing">("new");
  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [addressName, setAddressName] = useState<string>("");
  function _verifyLocation({
    location,
    addressName,
  }: {
    location: LocationAttributes | null;
    addressName: string;
  }): boolean {
    if (!location) return false;
    if (!verifyLocation(location)) return false;
    if (addressName.length === 0) return false;
    return true;
  }
  return (
    <CustomSheet
      triggerJSX={<Setting title="Update Address" subtitle="Tap to update" />}
      title="Update Address"
      description="Update the address to help the partner reach you"
      footerJSX={
        <div className="grid grid-cols-2 gap-5 w-full">
          <Button
            variant="success"
            disabled={
              type === "existing"
                ? !address
                : location
                ? !_verifyLocation({ location, addressName })
                : true
            }
            onclick={async () => {
              if (type === "existing") {
                if (!address) {
                  return;
                } else {
                  onSubmit(address.addressId);
                }
              } else {
                if (
                  !location ||
                  !verifyLocation(location) ||
                  addressName.length === 0
                ) {
                  return;
                } else {
                  const res = await addAddress({
                    location: location,
                    locationName: addressName,
                  });
                  console.log("address added", res);
                  if (res) {
                    onSubmit(res);
                  }
                }
              }
            }}
          >
            Update
          </Button>
          <SheetClose id="close-drawer" className="w-full">
            <Button variant="outline">Close</Button>
          </SheetClose>
        </div>
      }
    >
      <div className="flex flex-col space-y-5">
        <RadioInput
          title="Do you want to use an existing address or add a new one?"
          options={[
            {
              title: "Use existing address",
              onClick: () => setType("existing"),
              selected: type === "existing",
              icon: <Home className="w-7 h-7" />,
            },
            {
              title: "Add a new address",
              onClick: () => setType("new"),
              selected: type === "new",
              icon: <PlusIcon className="w-7 h-7" />,
            },
          ]}
          cols="grid-cols-2"
        />
        {type === "new" ? (
          <div className="flex flex-col space-y-5">
            <AddressNameInput
              addressName={addressName}
              onChange={(value) => setAddressName(value)}
            />
            <AddressInput
              location={location}
              onChange={(value) => setLocation(value)}
              title="Where should the partner reach you?"
            />
          </div>
        ) : (
          <div className="flex flex-col space-y-5">
            <SelectInput
              options={userAddresses.map((address) => ({
                text: address.name,
                value: address.addressId,
              }))}
              defaultValue={address?.addressId}
              onChange={(value) => {
                const selectedAddress = userAddresses.find(
                  (address) => address.addressId === value
                );
                if (selectedAddress) {
                  setAddress(selectedAddress);
                }
              }}
            />
            {address ? (
              <LocationCardWithName address={address} />
            ) : (
              <p className="text-center text-gray-500">Select an address</p>
            )}
          </div>
        )}
      </div>
    </CustomSheet>
  );
}
