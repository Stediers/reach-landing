import { addDiscount } from "@api_functions/service/price/add-discount";
import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";
import { Discount, validateDiscount } from "@data/types";
import Mobile from "@src/console/services/offers/add-offer/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Main() {
  const [discountForm, setDiscountForm] = useState<Discount>({
    name: "",
    value: 0,
  });
  const [buttonState, setButtonState] = useState(State.SUCCESS);

  return (
    <ConsoleWrapper
      title="My Offers"
      desktopJSX={<></>}
      mobileJSX={
        <Mobile
          discountForm={discountForm}
          setDiscountForm={setDiscountForm}
          buttonState={buttonState}
          setButtonState={setButtonState}
          addDiscount={() =>
            _addDiscount({ discount: discountForm, setButtonState })
          }
        />
      }
      state={State.SUCCESS}
    />
  );
}

async function _addDiscount({
  discount,
  setButtonState,
}: {
  discount: Discount;
  setButtonState: Dispatch<SetStateAction<State>>;
}) {
  if (
    !validateDiscount({
      discount: discount,
      attachedPriceIds: false,
      discountId: false,
    })
  ) {
    showSnackBar({
      message: "Invalid discount",
      state: State.ERROR,
    });
    return;
  }
  setButtonState(State.LOADING);
  const res = await addDiscount({
    title: discount.name,
    discount: discount.value,
  });
  setButtonState(State.SUCCESS);
  if (res) {
    router.push("/console/services/offers");
  }
}
