import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import Button from "@components/Button";
import Card from "@components/Card";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import { ImagesInput } from "@components/input/MediaInput";
import SelectInput from "@components/input/SelectInput";
import TextArea from "@components/input/TextArea";
import TextInput from "@components/input/TextInput";
import { Currency, State } from "@data/enums";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Mobile({
  name,
  description,
  price,
  setName,
  setPrice,
  setDescription,
  images,
  setImages,
  createAddOn,
  services,
  selectedServices,
  setSelectedServices,
  buttonState,
  setButtonState,
  verifyAddOn,
}: {
  name: string;
  description: string;
  price: number;
  setName: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setDescription: Dispatch<SetStateAction<string>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  createAddOn: () => Promise<void>;
  services: ServicesScreen[];
  selectedServices: ServicesScreen[];
  setSelectedServices: Dispatch<SetStateAction<ServicesScreen[]>>;
  buttonState: State;
  setButtonState: Dispatch<SetStateAction<State>>;
  verifyAddOn: () => boolean;
}) {
  return (
    <MobileWrapper
      className="flex flex-col space-y-4 w-full"
      header="Create Add-On"
      backLink="/console/services"
    >
      <div className="flex flex-col items-start justify-start space-y-5 w-full">
        <LineHeader title="Add-On Details" />
        <TextInput
          title="Name"
          placeholder="Nail Cliping"
          value={name}
          onChange={(value) => setName(value)}
        />
        <TextArea
          title="Description"
          placeholder="Short description about the add-on"
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <TextInput
          title="Price"
          placeholder="100"
          value={price.toString()}
          onChange={(value) => {
            if (!isNaN(Number(value))) {
              setPrice(Number(value));
            } else {
              setPrice(0);
            }
          }}
        />
        <LineHeader title="Select Services" />
        <div className="flex flex-col items-start justify-start space-y-2 w-full">
          {selectedServices.map((service) => (
            <Setting
              title={service.baseData.title}
              subtitle="Click to remove"
              icon={<IoClose className="text-error text-2xl" />}
              key={service.serviceId}
              onClick={() => {
                setSelectedServices(
                  selectedServices.filter(
                    (selectedService) =>
                      selectedService.serviceId !== service.serviceId
                  )
                );
              }}
            />
          ))}
          {services.filter(
            (service) =>
              !selectedServices
                .map((service) => service.serviceId)
                .includes(service.serviceId)
          ).length > 0 ? (
            <SelectInput
              onChange={(value) => {
                setSelectedServices(
                  services.filter((service) => service.serviceId === value)
                );
              }}
              options={services
                .filter(
                  (service) =>
                    !selectedServices
                      .map((service) => service.serviceId)
                      .includes(service.serviceId)
                )
                .map((service) => ({
                  text: service.baseData.title,
                  value: service.serviceId,
                }))}
            />
          ) : (
            <p className="text-base text-textsubtle px-2 py-2 text-center w-full">
              All services are selected
            </p>
          )}
        </div>
        <Button
          text="Save"
          className="bg-success text-white font-medium"
          onClick={async () => {
            await createAddOn();
          }}
          buttonState={buttonState}
          disabled={!verifyAddOn()}
        />
      </div>
    </MobileWrapper>
  );
}
