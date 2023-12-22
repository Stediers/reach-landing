import { FetchAddressByUserIdAddresses } from "@api_functions/address/fetch-address-by-userId";
import Button from "@components/Button";
import Card from "@components/Card";
import { LocationCardWithName } from "@components/LocationCard";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function Desktop({
  addresses,
  setAddresses,
}: {
  addresses: FetchAddressByUserIdAddresses[];
  setAddresses: React.Dispatch<
    React.SetStateAction<FetchAddressByUserIdAddresses[]>
  >;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <DesktopWrapper
      className="flex flex-col space-y-10 w-full"
      header="Manage Addresses"
    >
      <div className="grid grid-cols-3 gap-5 w-full">
        {addresses.map((address) => (
          <LocationCardWithName
            address={address}
            key={address.addressId}
            link={`/console/profile/manage-addresses/edit/${address.addressId}`}
          />
        ))}
        <Card
          className="flex flex-col items-center justify-center space-y-5 group hover:cursor-pointer"
          key="add-address"
          onClick={() => {
            router.push("/console/profile/manage-addresses/add-address");
          }}
        >
          <IoMdAdd size={50} className="group-hover:text-primary" />
          <p className="hidden group-hover:block text-primary font-medium">
            Add Address
          </p>
        </Card>
      </div>
    </DesktopWrapper>
  );
}
