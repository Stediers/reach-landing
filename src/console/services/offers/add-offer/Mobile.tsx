import Button from "@components/Button";
import TextInput from "@components/input/TextInput";
import { State } from "@data/enums";
import { Discount, validateDiscount } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction, useState } from "react";

export default function Mobile({
  discountForm,
  setDiscountForm,
  buttonState,
  setButtonState,
  addDiscount,
}: {
  discountForm: Discount;
  setDiscountForm: Dispatch<SetStateAction<Discount>>;
  buttonState: State;
  setButtonState: Dispatch<SetStateAction<State>>;
  addDiscount: () => Promise<void>;
}) {
  return (
    <MobileWrapper
      header="Add Offer"
      backLink="/console/services/offers"
      className="flex flex-col items-center justify-start space-y-5"
    >
      <TextInput
        title="Name"
        placeholder="Diwal Offer"
        value={discountForm.name}
        onChange={(value) => setDiscountForm({ ...discountForm, name: value })}
        errorText={
          discountForm.name.length < 3
            ? "Name must be atleast 3 characters"
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
          discountForm.value < 0 || discountForm.value > 100
            ? "Discount must be between 0 and 100"
            : ""
        }
      />
      <Button
        text="Save"
        className="bg-success text-white font-medium"
        onClick={async () => {
          addDiscount();
        }}
        buttonState={buttonState}
        disabled={
          !validateDiscount({
            discount: discountForm,
            attachedPriceIds: false,
            discountId: false,
          })
        }
      />
    </MobileWrapper>
  );
}
