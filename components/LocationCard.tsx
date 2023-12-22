import { Address, LocationAttributes } from "@data/types";
import Card from "./Card";
import AddressLine from "./AddressLine";
import { AddressType } from "@data/enums";
import Button from "./Button";

export function LocationCardWithName({
  address,
  link,
}: {
  address: Address;
  link?: string;
}) {
  return (
    <Card className="flex flex-col !justify-between lg:px-5 lg:py-5">
      <div className="flex flex-col items-start justify-center space-y-6">
        <AddressLine
          title="Name"
          value={address.name.charAt(0).toUpperCase() + address.name.slice(1)}
        />
        <AddressLine title="Locality" value={address.addressLine2} />
        <div className="grid grid-cols-2 gap-x-2 gap-y-5 w-full">
          <AddressLine
            title={
              address.addressType === AddressType.HOME
                ? "House No."
                : address.addressType === AddressType.OFFICE
                ? "Office No. - Floor No."
                : "Flat No - Floor No."
            }
            value={address.addressLine1}
          />
          <AddressLine title="Landmark" value={address.landmark || "None"} />
          <AddressLine title="City" value={address.city} />
          <AddressLine title="State" value={address.state} />
          <AddressLine title="Country" value={address.country} />
          <AddressLine title="Postal Code" value={address.postalCode} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-center space-y-2">
        {link && (
          <Button
            className="bg-info text-white w-full"
            text="Change Location"
            link={link}
          />
        )}
      </div>
    </Card>
  );
}

export function LocationCard({
  location,
  getDirections = false,
}: {
  location: LocationAttributes;
  getDirections?: boolean;
}) {
  return (
    <Card className="flex flex-col items-start justify-center space-y-2">
      <AddressLine
        title={
          location.addressType === AddressType.HOME
            ? "House No."
            : location.addressType === AddressType.OFFICE
            ? "Office No. - Floor No."
            : "Flat No - Floor No."
        }
        value={location.addressLine1}
      />
      <AddressLine title="Locality" value={location.addressLine2} />
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 w-full">
        {location.landmark && (
          <AddressLine title="Landmark" value={location.landmark} />
        )}
        <AddressLine title="City" value={location.city} />
        <AddressLine title="State" value={location.state} />
        <AddressLine title="Country" value={location.country} />
        <AddressLine title="Postal Code" value={location.postalCode} />
      </div>
      {getDirections && (
        <Button
          className="bg-info text-white w-full"
          text="Get Directions"
          newTab
          link={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
        />
      )}
    </Card>
  );
}
