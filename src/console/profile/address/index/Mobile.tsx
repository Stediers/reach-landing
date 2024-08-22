import { Button } from "@components/ui/button";
import { LocationCardWithName } from "@components/LocationCard";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Address } from "@data/types";
import Link from "next/link";

export default function Mobile({
  addresses,
  setAddresses,
}: {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[] | null>>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col space-y-5 items-center justify-start"
      header="Manage Address"
      backLink="/console/profile"
    >
      <ListWrapper>
        <div className="flex flex-col space-y-5 w-full">
          <Button variant="default" asChild>
            <Link href="/console/profile/address/add-address">Add Address</Link>
          </Button>
        </div>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <LocationCardWithName
              address={address}
              key={address.addressId}
              link={`/console/profile/address/edit/${address.addressId}`}
            />
          ))
        ) : (
          <p className=" text-center font-medium text-lg">
            Add a new address to get started.
          </p>
        )}
      </ListWrapper>
    </MobileWrapper>
  );
}
