import { Address, LocationAttributes } from "@data/types";
import Card from "./Card";
import AddressLine from "./AddressLine";
import { AddressType } from "@data/enums";
import Link from "next/link";
import { Button } from "./ui/button";

export function LocationCardWithName({
  address,
  link,
  getDirections = false,
}: {
  address: Address;
  link?: string;
  getDirections?: boolean;
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
          <Button variant="info">
            <Link href={link}>Change Location</Link>
          </Button>
        )}
        {getDirections && (
          <Button variant="info">
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${address.lat},${address.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
}

export function LocationCard({
  location,
  getDirections = false,
  showBorder = true,
}: {
  location: LocationAttributes;
  getDirections?: boolean;
  showBorder?: boolean;
}) {
  return (
    <Card
      className={`flex flex-col items-start justify-center space-y-2  ${
        showBorder ? "" : "!border-0 !p-0"
      }`}
    >
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
        <Button variant="info">
          <Link
            href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </Link>
        </Button>
      )}
    </Card>
  );
}
