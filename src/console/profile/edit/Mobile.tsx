import Button from "@components/Button";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { AiFillCloseCircle, AiOutlineUser } from "react-icons/ai";
import Setting from "@components/Setting";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { IndianLanguages, S3BucketName, State } from "@data/enums";
import { convertFileToBase64 } from "@api_functions/internal/base-functions";
import ImageComponent from "@components/ImageComponent";
import devLog from "@helper_functions/devLog";
import TextInput from "@components/input/TextInput";
import router from "next/router";
import { updateGigDetails } from "@api_functions/gig/update-gig-details";
import Chip from "@components/Chip";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import { showSnackBar } from "@components/notifications/Snackbar";
import { AnimatePresence, motion } from "framer-motion";
import { Base64, ContactOptions } from "@data/types";
import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { SocialIcon } from "react-social-icons";
import SocialLinks from "social-links";
import validator from "validator";
import { ProfilePictureInput } from "@components/input/MediaInput";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";

export default function Mobile({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  designation,
  setDesignation,
  fluentLanguages,
  setFluentLanguages,
  image,
  setImage,
  buttonState,
  setButtonState,
  contactOptions,
  setContactOptions,
  mobileNumber,
  updateGig,
}: {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;
  designation: string;
  setDesignation: Dispatch<SetStateAction<string>>;
  fluentLanguages: IndianLanguages[];
  setFluentLanguages: Dispatch<SetStateAction<IndianLanguages[]>>;
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  buttonState: State;
  setButtonState: Dispatch<SetStateAction<State>>;
  contactOptions: ContactOptions[];
  setContactOptions: Dispatch<SetStateAction<ContactOptions[]>>;
  mobileNumber: string;
  updateGig: () => void;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-center space-y-5 w-full"
      header="Edit Profile"
      backLink="/console/profile"
    >
      <ProfilePictureInput
        profilePicture={image}
        setProfilePicture={setImage}
      />
      <TextInput
        onChange={(value) => {
          setFirstName(value);
        }}
        title="First Name"
        value={firstName}
        placeholder={firstName}
        errorText={firstName.length === 0 ? "First name is required" : ""}
      />
      <TextInput
        onChange={(value) => {
          setLastName(value);
        }}
        title="Last Name"
        value={lastName}
        placeholder={lastName}
        errorText={lastName.length === 0 ? "Last name is required" : ""}
      />
      <TextInput
        title="Designation"
        placeholder="Eg. Software Engineer"
        value={designation}
        onChange={(value) => {
          setDesignation(value);
        }}
      />
      <FluentLanguagesInput
        fluentLanguages={fluentLanguages}
        setFluentLanguages={setFluentLanguages}
      />
      <ContactOptionsInput
        mobileNumber={mobileNumber}
        contactOptions={contactOptions}
        setContactOptions={setContactOptions}
      />
      <Button
        text="Save"
        onClick={async () => {
          updateGig();
          // setButtonState(State.LOADING);
          // if (image) {
          //   const imageUrl = await uploadFileS3({
          //     bucketName: S3BucketName.USER,
          //     file: image,
          //     //create it under the folder gig/userId/profilePicture
          //     fileName: `gig/${localStorage.getItem(
          //       "mobileNumber"
          //     )}/profilePicture`,
          //   });
          //   if (imageUrl) {
          //     const response = await updateGigDetails({
          //       firstName: firstName.length === 0 ? firstName : firstName,
          //       lastName: lastName.length === 0 ? lastName : lastName,
          //       profileImage: imageUrl,
          //       designation:
          //         designation.length === 0 ? designation : designation,
          //       fluentLanguages: fluentLanguages,
          //       contactOptions: contactOptions,
          //     });
          //     if (response) {
          //       router.push("/console/profile");
          //     }
          //   }
          // } else {
          //   showSnackBar({
          //     message: "Please upload a profile picture",
          //     state: State.ERROR,
          //   });
          // }
          // setButtonState(State.SUCCESS);
        }}
        className="bg-success text-white w-full"
        buttonState={buttonState}
      />
    </MobileWrapper>
  );
}

function FluentLanguagesInput({
  fluentLanguages,
  setFluentLanguages,
}: {
  fluentLanguages: IndianLanguages[];
  setFluentLanguages: Dispatch<SetStateAction<IndianLanguages[]>>;
}) {
  const [language, setLanguage] = useState<string>("");
  return (
    <div className="flex flex-col space-y-3 items-start w-full">
      <TextInputWithDropdown
        value={language}
        title="Fluent Languages"
        placeholder="Eg. English, Hindi, etc."
        options={Object.values(IndianLanguages).map((language) => language)}
        onSelect={(value) => {
          devLog(value);
          if (fluentLanguages.filter((item) => item === value).length > 0) {
            showSnackBar({
              message: "This language is already added",
              state: State.ERROR,
            });
          } else {
            setFluentLanguages((prev) => [...prev, value as IndianLanguages]);
          }
        }}
      />
      <AnimatePresence mode="wait">
        <div className="flex flex-row gap-2 flex-wrap">
          {fluentLanguages.sort().map((language) => (
            <motion.div
              key={language}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Chip
                title={language.charAt(0).toUpperCase() + language.slice(1)}
                className="border border-text"
                titleClassName="text-base font-medium"
                icon={<AiFillCloseCircle className="text-lg" />}
                onClick={() => {
                  if (fluentLanguages.length === 1) {
                    showSnackBar({
                      message: "You must have atleast one language",
                      state: State.ERROR,
                    });
                    return;
                  }
                  if (
                    fluentLanguages.filter((item) => item === language).length >
                    0
                  ) {
                    showSnackBar({
                      message: "This language is already added",
                      state: State.ERROR,
                    });
                  }
                  // dont remove english
                  if (language === IndianLanguages.ENGLISH) {
                    showSnackBar({
                      message: "You cannot remove English",
                      state: State.ERROR,
                    });
                    return;
                  }
                  setFluentLanguages((prev) =>
                    prev.filter((item) => item !== language)
                  );
                }}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

function ContactOptionsInput({
  mobileNumber,
  contactOptions,
  setContactOptions,
}: {
  mobileNumber: string;
  contactOptions: ContactOptions[];
  setContactOptions: Dispatch<SetStateAction<ContactOptions[]>>;
}) {
  const [link, setLink] = useState<string>("");
  const socialLinks = new SocialLinks();
  return (
    <div className="flex flex-col space-y-5 items-start w-full">
      <TextInput
        onChange={(value) => setLink(value)}
        value={link}
        placeholder="Profile URL"
        title="Contact Options"
        errorText={
          link.length === 0
            ? ""
            : validator.isURL(link)
            ? ""
            : "Please enter a valid URL"
        }
        onClick={
          link.length > 0
            ? () => {
                if (link.length === 0) {
                  showSnackBar({
                    message: "Please enter a valid URL",
                    state: State.ERROR,
                  });
                } else {
                  if (validator.isURL(link)) {
                    if (
                      contactOptions.filter((item) => item.link === link)
                        .length > 0
                    ) {
                      showSnackBar({
                        message: "This contact option is already added",
                        state: State.ERROR,
                      });
                    } else {
                      // setContactOptions((prev) => [
                      //   ...prev,
                      //   {
                      //     name: socialLinks.detectProfile(link),
                      //     link: link,
                      //     priority: 0,
                      //   },
                      // ]);
                      setContactOptions((prev) => [
                        ...prev,
                        {
                          name: "Instagram",
                          link: link,
                          priority: 0,
                        },
                      ]);
                      setLink("");
                    }
                  } else {
                    showSnackBar({
                      message: "Please enter a valid URL",
                      state: State.ERROR,
                    });
                  }
                }
              }
            : undefined
        }
      />
      <Setting
        title={
          mobileNumber.startsWith("+91") ? mobileNumber : "+91" + mobileNumber
        }
        subtitle="This is your default contact option"
        icon={<BiPhoneCall className="text-2xl" />}
      />
      {contactOptions.length > 0 && (
        <div className="flex flex-col space-y-3 w-full">
          {contactOptions.map((contactOptions) => (
            <Link
              href={contactOptions.link}
              key={contactOptions.link}
              className="w-full"
              rel="noreferrer"
              target="_blank"
            >
              <Setting
                title={
                  contactOptions.name.charAt(0).toUpperCase() +
                  contactOptions.name.slice(1)
                }
                icon={
                  <SocialIcon url={contactOptions.link} className="shrink-0" />
                }
                subtitle={contactOptions.link.slice(0, 30) + "..."}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
