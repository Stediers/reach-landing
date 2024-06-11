import Card from "@components/Card";
import { LocationCardWithName } from "@components/LocationCard";
import { Address } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import Link from "next/link";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Desktop({
  addresses,
  setAddresses,
}: {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[] | null>>;
}) {
  const [loading, setLoading] = useState(false);
  // addresses = [];
  return (
    <DesktopWrapper
      className="flex flex-col space-y-10 w-full"
      title="Manage Addresses"
    >
      <div className="grid grid-cols-3 gap-5 w-full">
        <Link href="/console/profile/address/add-address">
          <Card className="flex flex-col items-center justify-center space-y-5 group h-full min-h-[30vh]">
            <AiFillPlusCircle className="w-20 h-20 group-hover:text-primary" />
            <p className="text-lg font-medium group-hover:text-primary">
              Add Address
            </p>
          </Card>
        </Link>
        {addresses.map((address) => (
          <>
            <LocationCardWithName
              address={address}
              key={address.addressId}
              link={`/console/profile/address/edit/${address.addressId}`}
            />
          </>
        ))}
      </div>
    </DesktopWrapper>
  );
}
