import { AddAddressRequest } from "@api_functions/address/add-address";

import { LocationCardWithName } from "@components/LocationCard";
import AddressInput, { AddressNameInput } from "@components/input/AddressInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import { Button } from "@components/ui/button";
import { State } from "@data/enums";
import { LocationAttributes } from "@data/types";
import { Loader } from "@googlemaps/js-api-loader";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import router from "next/router";
import { useEffect } from "react";

export default function Desktop({
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
  // Show Map
  useEffect(() => {
    const documentMap = document.getElementById("map");
    if (!documentMap) return;
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });
    loader.load().then(() => {
      const map = new google.maps.Map(documentMap as HTMLElement, {
        center: location
          ? {
              lat: location.lat,
              lng: location.lng,
            }
          : { lat: 0, lng: 0 },
        zoom: 15,
      });
      new google.maps.Marker({
        position: location ? { lat: location.lat, lng: location.lng } : null,
        map: map,
      });
    });
  }, [location?.addressLine2]);

  return (
    <DesktopWrapper
      className="flex flex-col items-start justify-start space-y-10 w-full"
      title="Add Address"
    >
      <div className="flex flex-col items-start justify-start space-y-5 w-full">
        <AddressNameInput
          addressName={name}
          onChange={(value) => setName(value)}
        />
        <AddressInput
          location={location}
          onChange={(value) => setLocation(value)}
        />
      </div>
      <div className="w-full h-[30rem] bg-background rounded-lg overflow-hidden">
        <div id="map" className="w-full h-full rounded-lg"></div>
      </div>
      <div className="flex flex-col items-center justify-start space-y-5 w-full">
        <p className="text-lg font-medium">Before you save</p>
        <p className="text-base font-normal text-textsubtle">
          Please make sure that the address is correct
        </p>
        <Button
          variant="success"
          asyncOnClick={async () => {
            await addAddress();
          }}
          disabled={
            formValidation.name && formValidation.location ? false : true
          }
          className="max-w-md"
        >
          Save
        </Button>
      </div>
    </DesktopWrapper>
  );
}
