import { editService } from "@api_functions/service/edit-service";
import { deleteDiscount } from "@api_functions/service/price/delete-discount";
import { editDiscount } from "@api_functions/service/price/edit-discount";
import { fetchDiscounts } from "@api_functions/service/price/fetch-discounts";
import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";
import { Discount, validateDiscount } from "@data/types";
import Mobile from "@src/console/services/offers/manage/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import router from "next/router";
import { useState, useEffect } from "react";

export default function Main() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [discountForm, setDiscountForm] = useState<Discount>({
    name: "",
    value: 0,
    discountId: "",
    attachedPriceIds: [],
  });
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [buttonState, setButtonState] = useState(State.SUCCESS);
  useEffect(() => {
    fetchDiscounts().then((res) => {
      if (res) {
        //find the discount with the id matching the id in the url
        if (router.query.discountId === undefined) {
          router.push("/console/services/offers");
          return setPageState(State.ERROR);
        }
        const d =
          res.find((d) => d.discountId === router.query.discountId) ?? null;

        if (d === null) {
          router.push("/console/services/offers");
          return setPageState(State.ERROR);
        } else {
          setDiscount(d);
          setDiscountForm(d);
        }
      } else {
        setPageState(State.ERROR);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      title="My Offers"
      desktopJSX={<></>}
      mobileJSX={
        <Mobile
          discount={discount}
          discountForm={discountForm}
          setDiscountForm={setDiscountForm}
          buttonState={buttonState}
          setButtonState={setButtonState}
          editDiscount={() =>
            _editDiscount({ discount: discountForm, setButtonState })
          }
          deleteDiscount={() =>
            _deleteDiscount({
              discountId: discountForm.discountId,
              setButtonState,
            })
          }
        />
      }
      state={pageState}
    />
  );
}

async function _deleteDiscount({
  discountId,
  setButtonState,
}: {
  discountId: string | undefined;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
}) {
  if (discountId === undefined) {
    return showSnackBar({ message: "Invalid discount", state: State.ERROR });
  } else {
    setButtonState(State.LOADING);
    await deleteDiscount(discountId);
    setButtonState(State.SUCCESS);
    router.push("/console/services/offers");
  }
}

async function _editDiscount({
  discount,
  setButtonState,
}: {
  discount: Discount;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
}) {
  if (
    !validateDiscount({
      discount: discount,
      discountId: false,
      attachedPriceIds: false,
    })
  ) {
    showSnackBar({ message: "Invalid discount", state: State.ERROR });
    return;
  } else {
    setButtonState(State.LOADING);
    await editDiscount(discount);
    setButtonState(State.SUCCESS);
    router.push("/console/services/offers");
  }
}
