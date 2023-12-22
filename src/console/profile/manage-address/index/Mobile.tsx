import { deleteAddress } from "@api_functions/address/delete-address";
import {
  FetchAddressByUserIdAddresses,
  fetchAddressByUserId,
} from "@api_functions/address/fetch-address-by-userId";
import AddressLine from "@components/AddressLine";
import Button from "@components/Button";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import { LocationCardWithName } from "@components/LocationCard";
import { showYesNoPopup } from "@components/notifications/Popup";
import { AddressType } from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMdOpen } from "react-icons/io";

export default function Mobile({
  addresses,
  setAddresses,
}: {
  addresses: FetchAddressByUserIdAddresses[];
  setAddresses: React.Dispatch<
    React.SetStateAction<FetchAddressByUserIdAddresses[]>
  >;
}) {
  return (
    <MobileWrapper
      className="flex flex-col space-y-5 items-center justify-start"
      header="Manage Address"
      backLink="/console/profile"
    >
      <ListWrapper>
        <div className="flex flex-col space-y-5 w-full">
          <Button
            text="Add a new address"
            link={`/console/profile/manage-addresses/add-address`}
            className="bg-primary shadow-sm text-white p-3 rounded-md text-center font-medium w-full"
          />
        </div>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <LocationCardWithName
              address={address}
              key={address.addressId}
              link={`/console/profile/manage-addresseses/edit/${address.addressId}`}
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
