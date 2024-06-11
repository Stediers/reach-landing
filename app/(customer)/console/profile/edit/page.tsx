"use client";
import { S3BucketName, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@api_functions/profile/update-profile";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import Mobile from "@src/console/profile/edit/Mobile";
import Desktop from "@src/console/profile/edit/Desktop";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { showSnackBar } from "@components/notifications/Snackbar";
import { createBlobfromUrl } from "@api_functions/utility/create-blob-from-url";

export default function Main() {
  const [pageState, setPageState] = useState(State.LOADING);
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const [name, setName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();
  useEffect(() => {
    fetchMyProfile().then((response) => {
      if (response) {
        setResponse(response);
        if (response.user.imageUrl) {
          createBlobfromUrl({
            name: "profile-picture",
            url: response.user.imageUrl,
          }).then((blob) => {
            setImageFile(blob);
          });
        }
      }
      setPageState(State.SUCCESS);
    });
  }, []);
  const [saveButtonState, setSaveButtonState] = useState<State>(State.SUCCESS);
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
            imageFile={imageFile}
            setImageFile={setImageFile}
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
            imageFile={imageFile}
            setImageFile={setImageFile}
            saveButtonState={saveButtonState}
            editProfile={_editProfile}
            verifyForm={verifyForm}
          />
        )
      }
    />
  );

  function verifyForm(): boolean {
    //set disabled to true if any of the fields are empty
    if (name.length < 5 || imageFile === null) {
      return true;
    }
    return false;
  }

  async function _editProfile() {
    setSaveButtonState(State.LOADING);
    if (imageFile) {
      const imageUrl = await uploadFileS3({
        bucketName: S3BucketName.USER,
        file: imageFile,
        //create it under the folder gig/userId/profilePicture
        fileName: `customer/${localStorage.getItem(
          "mobileNumber"
        )}/profilePicture`,
      });
      if (imageUrl) {
        const response = await updateProfile({
          name: name,
          profilePicture: imageUrl,
        });
        if (response) {
          router.push("/");
        }
      }
    } else {
      showSnackBar({
        message: "Please upload a profile picture",
        state: State.ERROR,
      });
    }
  }
}
