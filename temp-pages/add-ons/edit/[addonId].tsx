import { deleteAddOn } from "@api_functions/service/add-on/delete-add-on";
import { editAddOn } from "@api_functions/service/add-on/edit-add-on";
import fetchAddOns, {
  validateAddOn,
} from "@api_functions/service/add-on/fetch-add-ons";
import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";
import { AddOn } from "@data/types";
import Mobile from "@src/console/services/add-ons/edit/Mobile";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Main() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [addOn, setAddOn] = useState<AddOn | null>(null);
  const [pageState, setPageState] = useState(State.LOADING);
  const [attachedServiceIds, setAttachedServiceIds] = useState<string[]>([]);
  const [buttonState, setButtonState] = useState(State.SUCCESS);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAddOns().then((res) => {
      if (res) {
        const addOnId = router.query.addonId as string;
        const addOn = res.find((addOn) => addOn.id === addOnId);
        if (addOn) {
          setAddOn(addOn);
        } else {
          router.push("/console/services/add-ons");
        }
      } else {
        router.push("/console/services/add-ons");
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  return (
    <ConsoleWrapper
      desktopJSX={<></>}
      mobileJSX={
        addOn && (
          <Mobile
            name={name}
            price={price}
            description={description}
            setPrice={setPrice}
            setName={setName}
            setDescription={setDescription}
            verifyForm={() =>
              verifyAddOnForm({ name, description, price, addOn })
            }
            editAddOn={() =>
              _editAddOn({
                name,
                description,
                price,
                addOn,
                attachedServiceIds,
                setButtonState,
                imageUrls: imageUrls,
              })
            }
            buttonState={buttonState}
            setButtonState={setButtonState}
            deleteAddOn={() =>
              _deleteAddOn({
                addOn,
                setButtonState,
              })
            }
            addOn={addOn}
          />
        )
      }
      title="Edit Add-On"
      state={pageState}
    />
  );
}

async function _editAddOn({
  name,
  description,
  price,
  attachedServiceIds,
  addOn,
  setButtonState,
  imageUrls,
}: {
  name: string;
  description: string;
  price: number;
  addOn: AddOn | null;
  attachedServiceIds: string[];
  setButtonState: Dispatch<SetStateAction<State>>;
  imageUrls: string[];
}) {
  setButtonState(State.LOADING);
  if (!addOn) {
    showSnackBar({ message: "no add-on", state: State.ERROR });
    setButtonState(State.SUCCESS);
    return;
  } else {
    const message = validateAddOn({
      title: name,
      description: description,
      price: price,
      attachedServiceIds: attachedServiceIds,
      imageUrls: imageUrls,
    });
    if (message) {
      showSnackBar({ message: message, state: State.ERROR });
    }
    setButtonState(State.SUCCESS);
    const res = await editAddOn({
      attachedServiceIds: attachedServiceIds,
      description: description,
      imageUrls: imageUrls,
      price: price,
      title: name,
      id: addOn.id!!,
    });
    setButtonState(State.SUCCESS);
    if (res) {
      router.push("/console/services/add-ons");
    }
  }
}

async function _deleteAddOn({
  addOn,
  setButtonState,
}: {
  addOn: AddOn | null;
  setButtonState: Dispatch<SetStateAction<State>>;
}) {
  setButtonState(State.LOADING);
  if (!addOn) {
    showSnackBar({ message: "no add-on", state: State.ERROR });
    setButtonState(State.SUCCESS);
    return;
  }
  const res = await deleteAddOn(addOn.id!!);
  setButtonState(State.SUCCESS);
  if (res) {
    router.push("/console/services/add-ons");
  }
}

function verifyAddOnForm({
  name,
  description,
  price,
  addOn,
}: {
  name: string;
  description: string;
  price: number;
  addOn: AddOn | null;
}) {
  if (name.length === 0) {
    return false;
  }
  if (description.length === 0) {
    return false;
  }
  if (price <= 0) {
    return false;
  }
  if (addOn) {
    if (
      addOn.price === price &&
      addOn.description === description &&
      addOn.title === name
    ) {
      return false;
    }
  }
  return true;
}
