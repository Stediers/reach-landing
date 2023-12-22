import Button from "@components/Button";
import {
  AiFillCloseCircle,
  AiOutlineLink,
  AiOutlineUser,
} from "react-icons/ai";
import Setting from "@components/Setting";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { IndianLanguages, State } from "@data/enums";
import { convertFileToBase64 } from "@api_functions/internal/base-functions";
import ImageComponent from "@components/ImageComponent";
import TextInput from "@components/input/TextInput";
import router from "next/router";
import { updateGigDetails } from "@api_functions/gig/update-gig-details";
import Chip from "@components/Chip";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import { showSnackBar } from "@components/notifications/Snackbar";
import { AnimatePresence, motion } from "framer-motion";
import { Base64, ContactOptions } from "@data/types";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import UnderlinedHeader from "@components/UnderlinedHeader";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { CreateGigRequest } from "@api_functions/gig/create-gig";
import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { SocialIcon } from "react-social-icons";
import SocialLinks from "social-links";
import validator from "validator";
import { verifyImage, ImageEditingModal } from "@components/input/MediaInput";
import DesktopHeaderWrapper from "@wrapper/responsive/DesktopHeaderWrapper";

export default function Desktop({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  designation,
  setDesignation,
  fluentLanguages,
  setFluentLanguages,
  contactOptions,
  setContactOptions,
  buttonState,
  setButtonState,
  mobileNumber,
  image,
  setImage,
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
    <DesktopWrapper
      className="flex flex-col space-y-10 items-start justify-start"
      header="Edit Profile"
    >
      <div className="grid grid-cols-2 gap-5 w-full">
        <ProfilePictureInput
          profilePicture={image}
          setProfilePicture={setImage}
        />
      </div>
      <div className="flex flex-row items-start justify-start w-full space-x-5">
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
      </div>
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
        contactOptions={contactOptions}
        setContactOptions={setContactOptions}
        mobileNumber={mobileNumber}
      />
      <div className="col-span-2 flex flex-col space-y-10 items-start w-full max-w-[200px]">
        <Button
          text="Save"
          onClick={async () => {
            updateGig();
          }}
          className="bg-success text-white w-full"
          buttonState={buttonState}
        />
      </div>
    </DesktopWrapper>
  );
}

function ProfilePictureInput({
  profilePicture,
  setProfilePicture,
}: {
  profilePicture: File | null;
  setProfilePicture: Dispatch<SetStateAction<File | null>>;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editButtonState, setEditButtonState] = useState(State.SUCCESS);
  const [uploadButtonState, setUploadButtonState] = useState(State.SUCCESS);

  useEffect(() => {
    if (uploadButtonState === State.LOADING) {
      setTimeout(() => {
        setUploadButtonState(State.SUCCESS);
      }, 1000);
    }
  }, [uploadButtonState]);

  useEffect(() => {
    if (editButtonState === State.LOADING) {
      setTimeout(() => {
        setEditButtonState(State.SUCCESS);
      }, 1000);
    }
  }, [editButtonState]);
  return (
    <div className="flex flex-row items-start justify-start w-full space-x-5">
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          //only jpg and png
          accept="image/jpeg, image/png"
          onClick={(e) => {
            e.currentTarget.value = "";
            setUploadButtonState(State.LOADING);
          }}
          onChange={(e) => {
            if (e.target.files == null || e.target.files[0] == null) {
              setProfilePicture(null);
              setShowModal(false);
              setEditButtonState(State.SUCCESS);
              setUploadButtonState(State.SUCCESS);
              return;
            }
            setUploadButtonState(State.LOADING);
            if (e.target.files != null && e.target.files[0] != null) {
              if (!verifyImage(e.target.files[0])) {
                setUploadButtonState(State.SUCCESS);
                e.target.value = "";
                return;
              }
              setProfilePicture(e.target.files[0]);
              setShowModal(true);
            } else {
              setProfilePicture(null);
              setShowModal(false);
              setEditButtonState(State.SUCCESS);
            }
            setUploadButtonState(State.SUCCESS);
          }}
          className="hidden"
          id="profile-pic"
          multiple={false}
        />
        {profilePicture && showModal ? (
          <ImageEditingModal
            image={profilePicture}
            setImage={setProfilePicture}
            setShowModal={setShowModal}
            borderRadius={10}
          />
        ) : null}
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <label
            htmlFor={!profilePicture ? "profile-pic" : ""}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            {profilePicture ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <ImageComponent
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Picture"
                  className={`w-[13rem] h-[13rem] rounded-md overflow-hidden border`}
                />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <AiOutlineUser
                  className={`w-[13rem] h-[13rem] p-2 bg-gray-300  border border-text rounded-md z-10 bg-white`}
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full justify-between min-h-full">
        <div className="flex flex-col space-y-1 w-full min-h-full">
          {profilePicture ? (
            <div className="flex flex-col space-y-3 w-full">
              <p className="text-base font-medium text-textsubtle">
                Size: {(profilePicture.size / 1000 / 1000).toFixed(2)} MB
              </p>
              <p className="text-base font-medium text-textsubtle">
                Type:{" "}
                {profilePicture.type.toUpperCase() ||
                  profilePicture.name.split(".")[1].toUpperCase() ||
                  "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-base font-medium text-textsubtle">
              Please upload a profile picture of yourself. This will help your
              customers identify you.
            </p>
          )}
        </div>
        {profilePicture ? (
          <Button
            text="Edit"
            className="bg-info text-white"
            onClick={() => {
              if (profilePicture) {
                setEditButtonState(State.LOADING);
                setShowModal(true);
              }
            }}
            disabled={profilePicture === null}
            buttonState={editButtonState}
          />
        ) : (
          <Button
            text="Upload"
            className="bg-info text-white"
            onClick={() => {
              setUploadButtonState(State.LOADING);
              document.getElementById("profile-pic")?.click();
            }}
            buttonState={uploadButtonState}
          />
        )}
      </div>
    </div>
  );
}

function ContactOptionsInput({
  contactOptions,
  setContactOptions,
  mobileNumber,
}: {
  contactOptions: ContactOptions[];
  setContactOptions: Dispatch<SetStateAction<ContactOptions[]>>;
  mobileNumber: string;
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
                      setContactOptions((prev) => [
                        ...prev,
                        {
                          name: socialLinks.detectProfile(link),
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
      <div className="grid grid-cols-2 gap-5 gap-y-0 w-full">
        <div className="w-full relative">
          <Setting
            title={
              mobileNumber.startsWith("+91")
                ? mobileNumber
                : "+91" + mobileNumber
            }
            subtitle="This is your default contact option"
            icon={<BiPhoneCall className="text-2xl" />}
            hover={false}
          />
        </div>
        {contactOptions.map((contactOptions) => (
          <motion.div
            className="w-full relative group"
            key={contactOptions.link}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            <Setting
              title={
                contactOptions.name.charAt(0).toUpperCase() +
                contactOptions.name.slice(1)
              }
              icon={
                <SocialIcon
                  url={contactOptions.link}
                  className="shrink-0 !w-10 !h-10"
                />
              }
              subtitle={contactOptions.link.slice(0, 30) + "..."}
            />
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center hover:bg-gray rounded-md">
              <div className="flex flex-row items-center justify-center space-x-2">
                <AiFillCloseCircle
                  className="text-2xl text-white opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => {
                    setContactOptions((prev) => [
                      ...prev.filter(
                        (item) => item.link !== contactOptions.link
                      ),
                    ]);
                  }}
                />
                <Link
                  href={contactOptions.link}
                  passHref={true}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLink className="text-2xl text-white opacity-0 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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
