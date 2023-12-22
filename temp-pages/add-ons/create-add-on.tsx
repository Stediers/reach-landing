import { createAddOn } from "@api_functions/service/add-on/create-add-on";
import {
  ServicesScreen,
  fetchServicesScreen,
} from "@api_functions/service/fetch-services-screen";
import { State } from "@data/enums";
import Mobile from "@src/console/services/add-ons/create-add-on/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Main() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [services, setServices] = useState<ServicesScreen[]>([]);
  const [selectedServices, setSelectedServices] = useState<ServicesScreen[]>(
    []
  );
  const [buttonState, setButtonState] = useState(State.SUCCESS);
  const [pageState, setPageState] = useState(State.SUCCESS);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchServicesScreen().then((res) => {
      if (res) {
        setServices(res.servicesScreen);
      } else {
        setServices([]);
      }
      setPageState(State.SUCCESS);
      setSelectedServices([]);
    });
  }, []);

  return (
    <ConsoleWrapper
      desktopJSX={<></>}
      mobileJSX={
        <Mobile
          name={name}
          price={price}
          description={description}
          setPrice={setPrice}
          setName={setName}
          setDescription={setDescription}
          images={images}
          setImages={setImages}
          services={services}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          buttonState={buttonState}
          setButtonState={setButtonState}
          createAddOn={() =>
            _createAddOn({
              name: name,
              price: price,
              description: description,
              images: images,
              serviceIds: selectedServices.map((service) => service.serviceId),
              setButtonState: setButtonState,
            })
          }
          verifyAddOn={() =>
            verifyAddOn({
              name: name,
              price: price,
              description: description,
              images: images.map((image) => image.name),
              serviceIds: selectedServices.map((service) => service.serviceId),
            })
          }
        />
      }
      title="Add New Add-On"
      state={pageState}
    />
  );
}

async function _createAddOn({
  name,
  price,
  description,
  images,
  serviceIds,
  setButtonState,
}: {
  name: string;
  price: number;
  description: string;
  images: File[];
  serviceIds: string[];
  setButtonState: Dispatch<SetStateAction<State>>;
}) {
  setButtonState(State.LOADING);
  await createAddOn({
    description: description,
    imageUrls: [],
    title: name,
    price: price,
    serviceIds: serviceIds,
  });
  setButtonState(State.SUCCESS);
  router.push("/console/services/add-ons");
}

function verifyAddOn({
  name,
  price,
  description,
  images,
  serviceIds,
}: {
  name: string;
  price: number;
  description: string;
  images: string[];
  serviceIds: string[];
}): boolean {
  if (name.length === 0) {
    return false;
  }
  if (price <= 0) {
    return false;
  }
  if (description.length === 0) {
    return false;
  }
  //   if (images.length === 0) {
  //     return false;
  //   }
  if (serviceIds.length === 0) {
    return false;
  }
  return true;
}
