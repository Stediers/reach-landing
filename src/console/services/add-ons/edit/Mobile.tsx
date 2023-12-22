import Button from "@components/Button";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import TextArea from "@components/input/TextArea";
import TextInput from "@components/input/TextInput";
import { Currency, State } from "@data/enums";
import { AddOn } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction } from "react";

export default function Mobile({
  name,
  price,
  description,
  setName,
  setPrice,
  setDescription,
  verifyForm,
  editAddOn,
  deleteAddOn,
  setButtonState,
  buttonState,
  addOn,
}: {
  name: string;
  price: number;
  description: string;
  setName: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setDescription: Dispatch<SetStateAction<string>>;
  verifyForm: () => boolean;
  editAddOn: () => Promise<void>;
  deleteAddOn: () => Promise<void>;
  setButtonState: Dispatch<SetStateAction<State>>;
  buttonState: State;
  addOn: AddOn;
}) {
  return (
    <MobileWrapper
      header="Edit Add-On"
      backLink="/console/services/add-ons"
      className="flex flex-col items-center justify-start h-full w-full space-y-5"
    >
      <div className="flex flex-col items-center justify-start space-y-5 w-full">
        <AddOnCard
          attachedServiceIds={addOn.attachedServiceIds}
          title={addOn.title}
          subtitle={addOn.description}
          price={addOn.price}
          id={addOn.id!!}
        />
        <Button
          text="Delete"
          className="bg-danger text-white font-medium"
          onClick={() => {
            deleteAddOn();
          }}
          buttonState={buttonState}
        />
      </div>
      <LineHeader title="Edit" />
      <div className="flex flex-col items-start justify-start space-y-5 w-full">
        <TextInput
          title="Name"
          placeholder="Nail Cliping"
          value={name}
          onChange={(value) => setName(value)}
          errorText={name.length < 3 ? "Name must be atleast 3 characters" : ""}
        />
        <TextArea
          title="Description"
          placeholder="Tell us about the add-on"
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
        <Button
          text="Save"
          className="bg-success text-white font-medium"
          onClick={async () => {
            if (!verifyForm()) return;
            await editAddOn();
          }}
          disabled={!verifyForm()}
          buttonState={buttonState}
        />
      </div>
    </MobileWrapper>
  );
}

function AddOnCard({
  title,
  subtitle,
  className,
  whileTap,
  price,
  id,
  attachedServiceIds,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  whileTap?: { scale: number };
  price: number;
  id: string;
  attachedServiceIds: string[];
}) {
  return (
    <Card
      className={`${className} ${whileTap ? "cursor-pointer" : ""} !space-y-5`}
      whileTap={whileTap}
    >
      {/* <ImageComponent
        className="w-full h-48"
        src="https://picsum.photos/200"
        alt=""
      /> */}
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <div className="flex flex-col items-start justify-start space-y-2 w-full">
          <div className="flex items-start justify-between w-full space-x-3 pr-2">
            <p
              className={`text-lg font-medium flex items-center !first-letter:capitalize`}
            >
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </p>
            <p className="text-md font-medium">
              {Number(price).toLocaleString("en-IN", {
                style: "currency",
                currency: Currency.INR,
              })}
            </p>
          </div>
          <p className="text-sm text-textsubtle">
            {`Attached to ${attachedServiceIds.length} services`}
          </p>
        </div>
        {subtitle && <p className={`text-left break-words`}>{subtitle}</p>}
      </div>
    </Card>
  );
}
