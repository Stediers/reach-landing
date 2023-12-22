import { IndianLanguages, S3BucketName, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { ContactOptions } from "@data/types";
import Mobile from "@src/console/profile/edit/Mobile";
import Desktop from "@src/console/profile/edit/Desktop";
import { getItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import {
  FetchConsoleGigProfileResponse,
  fetchConsoleGigProfile,
} from "@api_functions/gig/fetch-console-gig-profile";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { createBlobfromUrl } from "@api_functions/utility/create-blob-from-url";
import { updateGigDetails } from "@api_functions/gig/update-gig-details";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { showSnackBar } from "@components/notifications/Snackbar";
import { NextRouter, useRouter } from "next/router";
import devLog from "@helper_functions/devLog";

export default function Main() {
  const [firstNameState, setFirstNameState] = useState<string>("");
  const [lastNameState, setLastNameState] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);
  const [designationState, setDesignationState] = useState<string>("");
  const [fluentLanguagesState, setFluentLanguagesState] = useState<
    IndianLanguages[]
  >([]);
  const [contactOptions, setContactOptions] = useState<ContactOptions[]>([]);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [pageState, setPageState] = useState<State>(State.LOADING);

  useEffect(() => {
    const res = getItemsFromLocalStorage<FetchConsoleGigProfileResponse>({
      key: "gigProfile",
    });
    if (res) {
      devLog("local storage");
      setFirstNameState(res.firstName);
      setLastNameState(res.lastName);
      setDesignationState(res.designation);
      setFluentLanguagesState(res.fluentLanguages);
      setContactOptions(res.contactOptions);
      setMobileNumber(res.mobileNumber);
      setPageState(State.SUCCESS);
    } else {
      setPageState(State.LOADING);
      fetchConsoleGigProfile().then(async (res) => {
        if (res) {
          setFirstNameState(res.firstName);
          setLastNameState(res.lastName);
          setDesignationState(res.designation);
          setFluentLanguagesState(res.fluentLanguages);
          setContactOptions(res.contactOptions);
          setMobileNumber(res.mobileNumber);
          if (res.imageUrl) {
            const image = await createBlobfromUrl({
              name: "profilePicture",
              url: res.imageUrl,
            });
            setImage(image);
          } else {
            setImage(null);
          }
          setPageState(State.SUCCESS);
        }
      });
    }
  }, []);
  const router = useRouter();
  return (
    <ConsoleWrapper
      title="Edit Profile"
      state={pageState}
      mobileJSX={
        <Mobile
          buttonState={buttonState}
          designation={designationState}
          firstName={firstNameState}
          fluentLanguages={fluentLanguagesState}
          image={image}
          setImage={setImage}
          lastName={lastNameState}
          setButtonState={setButtonState}
          setDesignation={setDesignationState}
          setFirstName={setFirstNameState}
          setFluentLanguages={setFluentLanguagesState}
          setLastName={setLastNameState}
          contactOptions={contactOptions}
          setContactOptions={setContactOptions}
          mobileNumber={mobileNumber}
          updateGig={() =>
            UpdateGig({
              firstName: firstNameState,
              lastName: lastNameState,
              image: image,
              designation: designationState,
              fluentLanguages: fluentLanguagesState,
              setButtonState: setButtonState,
              contactOptions: contactOptions,
              router: router,
            })
          }
        />
      }
      desktopJSX={
        <Desktop
          buttonState={buttonState}
          designation={designationState}
          firstName={firstNameState}
          fluentLanguages={fluentLanguagesState}
          image={image}
          setImage={setImage}
          lastName={lastNameState}
          setButtonState={setButtonState}
          setDesignation={setDesignationState}
          setFirstName={setFirstNameState}
          setFluentLanguages={setFluentLanguagesState}
          setLastName={setLastNameState}
          contactOptions={contactOptions}
          setContactOptions={setContactOptions}
          mobileNumber={mobileNumber}
          updateGig={() =>
            UpdateGig({
              firstName: firstNameState,
              lastName: lastNameState,
              image: image,
              designation: designationState,
              fluentLanguages: fluentLanguagesState,
              setButtonState: setButtonState,
              contactOptions: contactOptions,
              router: router,
            })
          }
        />
      }
    />
  );
}

async function UpdateGig({
  firstName,
  lastName,
  image,
  designation,
  fluentLanguages,
  setButtonState,
  contactOptions,
  router,
}: {
  firstName: string;
  lastName: string;
  image: File | null;
  designation: string;
  fluentLanguages: IndianLanguages[];
  setButtonState: Dispatch<SetStateAction<State>>;
  contactOptions: ContactOptions[];
  router: NextRouter;
}) {
  setButtonState(State.LOADING);
  if (image) {
    const imageUrl = await uploadFileS3({
      bucketName: S3BucketName.USER,
      file: image,
      //create it under the folder gig/userId/profilePicture
      fileName: `gig/${localStorage.getItem("mobileNumber")}/profilePicture`,
    });
    if (imageUrl) {
      const response = await updateGigDetails({
        firstName: firstName.length === 0 ? firstName : firstName,
        lastName: lastName.length === 0 ? lastName : lastName,
        profileImage: imageUrl,
        designation: designation.length === 0 ? designation : designation,
        fluentLanguages: fluentLanguages,
        contactOptions: contactOptions,
      });
      if (response) {
        router.push("/console/profile");
      }
    }
  } else {
    showSnackBar({
      message: "Please upload a profile picture",
      state: State.ERROR,
    });
  }
  setButtonState(State.SUCCESS);
}
