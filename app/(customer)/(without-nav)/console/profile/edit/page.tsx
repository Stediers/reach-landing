"use client";
import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@api_functions/profile/update-profile";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import Mobile from "@src/console/profile/edit/Mobile";
import { showSnackBar } from "@components/notifications/Snackbar";
import Desktop from "@src/console/profile/edit/Desktop";

export default function Main() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const [saveButtonState, setSaveButtonState] = useState<State>(State.SUCCESS);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchMyProfile().then((response) => {
      setResponse(response);
      if (response) {
        setName(response.user.name);
        setImageUrl(response.user.imageUrl);
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  return (
    <ConsoleWrapper
      title="Edit Profile"
      state={pageState}
      mobileJSX={
        response && (
          <Mobile
            response={response}
            name={name}
            setName={setName}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            editProfile={_editProfile}
            verifyForm={verifyForm}
          />
        )
      }
      desktopJSX={
        response && (
          <Desktop
            response={response}
            name={name}
            setName={setName}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            editProfile={_editProfile}
            verifyForm={verifyForm}
          />
        )
      }
    />
  );

  function verifyForm(): boolean {
    //set disabled to true if any of the fields are empty
    if (name.length < 5) {
      return true;
    }
    return false;
  }

  async function _editProfile() {
    setSaveButtonState(State.LOADING);
    if (!imageUrl) {
      showSnackBar({
        message: "Please upload a profile picture",
        state: State.ERROR,
      });
      setSaveButtonState(State.ERROR);
      return;
    }
    const response = await updateProfile({
      name: name,
      profilePicture: imageUrl,
    });
    if (response) {
      router.push("/console/profile");
    } else {
      showSnackBar({
        message: "Please upload a profile picture",
        state: State.ERROR,
      });
    }
  }
}
