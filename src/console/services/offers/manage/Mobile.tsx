import Button from "@components/Button";
import Card from "@components/Card";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import TextInput from "@components/input/TextInput";
import { showYesNoPopup } from "@components/notifications/Popup";
import { Currency, State } from "@data/enums";
import { Discount, validateDiscount } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Mobile({
  discount,
  discountForm,
  setDiscountForm,
  buttonState,
  setButtonState,
  editDiscount,
  deleteDiscount,
}: {
  discount: Discount | null;
  discountForm: Discount;
  setDiscountForm: Dispatch<SetStateAction<Discount>>;
  buttonState: State;
  setButtonState: Dispatch<SetStateAction<State>>;
  editDiscount: () => Promise<void>;
  deleteDiscount: () => Promise<void>;
}) {
  return (
    <MobileWrapper
      header="Manage Offer"
      backLink="/console/services/offers"
      className="flex flex-col items-center justify-start space-y-5"
    >
      <div className="flex flex-col items-start justify-start space-y-4 w-full">
        {discount && (
          <DiscountCard
            title={discount.name}
            attachedPriceIds={discount.attachedPriceIds ?? []}
            discount={discount.value}
            id={discount.discountId!!}
          />
        )}
        <Button
          text="Delete"
          className="bg-danger text-white font-medium"
          onClick={async () => {
            const confirmation = await showYesNoPopup({
              message: "Are you sure you want to delete this discount?",
              title: "Delete Discount",
            });
            if (confirmation) deleteDiscount();
          }}
          buttonState={buttonState}
        />
      </div>
      <LineHeader title="Edit" />
      <TextInput
        title="Name"
        placeholder="Nail Cliping"
        value={discountForm.name}
        onChange={(value) => setDiscountForm({ ...discountForm, name: value })}
        errorText={
          discountForm.name.length < 3
            ? "Name must be atleast 3 characters"
            : discountForm.name.length > 50
            ? "Name must be less than 50 characters"
            : ""
        }
      />
      <TextInput
        title="Discount"
        placeholder="10"
        value={discountForm.value}
        onChange={(value) =>
          setDiscountForm({ ...discountForm, value: Number(value) })
        }
        errorText={
          discountForm.value < 1 || discountForm.value > 99
            ? "Discount must be between 1 and 99"
            : ""
        }
      />
      {discountForm.name === discount?.name &&
      discountForm.value === discount?.value ? (
        <Card className="p-3">
          <p className="text-textsubtle text-base font-medium text-center">
            New name and discount must be different from the old one.
          </p>
        </Card>
      ) : null}
      <Button
        text="Save"
        className="bg-success text-white font-medium"
        onClick={() => {
          editDiscount();
        }}
        buttonState={buttonState}
        disabled={
          !validateDiscount({
            discount: discountForm,
            attachedPriceIds: false,
            discountId: false,
          }) ||
          (discountForm.name === discount?.name &&
            discountForm.value === discount?.value)
        }
      />
    </MobileWrapper>
  );
}

function DiscountCard({
  title,
  className,
  whileTap,
  discount,
  id,
  attachedPriceIds,
}: {
  title: string;
  className?: string;
  whileTap?: { scale: number };
  discount: number;
  id: string;
  attachedPriceIds: string[];
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      className={`${className} ${whileTap ? "cursor-pointer" : ""} !space-y-2`}
      whileTap={whileTap}
      onClick={() => {
        setLoading(true);
      }}
    >
      <div className="flex items-start justify-between w-full space-x-3 pr-2">
        <p
          className={`text-lg font-medium flex items-center !first-letter:capitalize`}
        >
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </p>
        <p className="text-md font-medium">{discount}% off</p>
      </div>
      <p className="text-sm text-textsubtle">
        {`Attached to ${attachedPriceIds.length} prices`}
      </p>
    </Card>
  );
}
