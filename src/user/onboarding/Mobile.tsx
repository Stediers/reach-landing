import { CreateGigRequest, createGig } from "@api_functions/gig/create-gig";
import { convertFileToBase64 } from "@api_functions/internal/base-functions";
import Button from "@components/Button";
import Chip from "@components/Chip";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import Logo from "@components/Logo";
import Setting from "@components/Setting";
import {
  ImageEditingModal,
  ProfilePictureInput,
  verifyImage,
} from "@components/input/MediaInput";
import RadioInput from "@components/input/RadioInput";
import TextInput from "@components/input/TextInput";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import { showCustomJSXPopup } from "@components/notifications/Popup";
import { showSnackBar } from "@components/notifications/Snackbar";
import { IndianLanguages, Gender, State, S3BucketName } from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import {
  State as StateType,
  ICity,
  IState,
  Country,
  City,
} from "country-state-city";
import city from "country-state-city/lib/city";
import state from "country-state-city/lib/state";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import router from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineCamera,
  AiOutlineUser,
  AiFillHome,
  AiOutlineEdit,
  AiOutlineInfoCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsGenderMale, BsGenderFemale, BsGenderTrans } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import SocialLinks from "social-links";
import validator from "validator";
import { LuScanFace } from "react-icons/lu";
import { set } from "lodash";

export default function Mobile({
  form,
  setForm,
  submitButtonState,
  setSubmitButtonState,
  validateForm,
  mobileNumber,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
  submitButtonState: State;
  setSubmitButtonState: Dispatch<SetStateAction<State>>;
  validateForm: (form: CreateGigRequest) => boolean;
  mobileNumber: string;
}) {
  return (
    <MobileWrapper
      className="flex flex-col space-y-5 items-center w-full py-5"
      showNavBar={false}
    >
      <div className="flex flex-col items-center justify-center space-y-7 w-full">
        <Logo
          text="Reach"
          textStyle="text-2xl font-medium uppercase"
          wings="w-[10rem] lg:w-[12rem]"
        />
        <p className="text-lg font-medium text-center">
          Welcome to Reach! Let&apos;s get you started.
        </p>
      </div>
      <LineHeader title="About you" />
      <UploadProfilePicture form={form} setForm={setForm} />
      <Name form={form} setForm={setForm} />
      <GenderInput form={form} setForm={setForm} />
      <DesignationInput form={form} setForm={setForm} />
      <LineHeader title="Where do you reside?" />
      <SelectStateAndCity form={form} setForm={setForm} />
      {/* <LineHeader title="Upload your profile picture" /> */}
      {/* <LineHeader
        title="Other social media profiles"
        titleClassName="text-sm font-medium text-textsubtle"
      />
      <ContactOptionsInput
        form={form}
        setForm={setForm}
        mobileNumber={mobileNumber}
      />
      <LineHeader title="Fluent Languages" />
      <FluentLanguagesInput form={form} setForm={setForm} /> */}
      <div className="flex flex-col space-y-3 items-start w-full">
        <Button
          text="I am ready!"
          buttonState={submitButtonState}
          className="bg-success text-white font-medium"
          onClick={async () => {
            setSubmitButtonState(State.LOADING);
            if (!location) {
              showSnackBar({
                message: "Please enter your location",
                state: State.ERROR,
              });
              setSubmitButtonState(State.SUCCESS);
              return;
            }
            const response = await createGig(form, mobileNumber);
            if (response) {
              router.push("/console/services/add-service");
            }
            setSubmitButtonState(State.SUCCESS);
          }}
          disabled={!validateForm(form)}
        />
        <p className="text-sm font-medium text-textsubtle text-center">
          By clicking submit you agree to our{" "}
          <Link
            href="/terms-of-service"
            className="text-primary underline underline-offset-2"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-primary underline underline-offset-2"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </MobileWrapper>
  );
}

function DesignationInput({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
}) {
  return (
    <TextInput
      title="I am a"
      mandatory={true}
      value={form.designation}
      onChange={(value) => setForm({ ...form, designation: value })}
      errorText={
        form.designation.length === 0 ? "Please enter your designation" : ""
      }
      placeholder="Eg. Software Engineer, Musician, etc."
    />
  );
}

function FluentLanguagesInput({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
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
          if (form.languages.filter((item) => item === value).length > 0) {
            showSnackBar({
              message: "This language is already added",
              state: State.ERROR,
            });
          } else {
            // setFluentLanguages((prev) => [...prev, value as IndianLanguages]);
            setForm((prev) => ({
              ...prev,
              languages: [...prev.languages, value as IndianLanguages],
            }));
          }
        }}
      />
      <AnimatePresence mode="wait">
        <div className="flex flex-row gap-2 flex-wrap">
          <Chip
            title="English"
            className="border border-text"
            titleClassName="text-base font-medium"
            icon={<AiFillCloseCircle className="text-base" />}
          />
          {form.languages.sort().map((language) => (
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
                onClick={() =>
                  // setFluentLanguages((prev) =>
                  //   prev.filter((item) => item !== language)
                  // )
                  setForm((prev) => ({
                    ...prev,
                    languages: prev.languages.filter(
                      (item) => item !== language
                    ),
                  }))
                }
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
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
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
                      form.contactOptions.filter((item) => item.link === link)
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
                      setForm((prev) => ({
                        ...prev,
                        contactOptions: [
                          ...prev.contactOptions,
                          {
                            name: socialLinks.detectProfile(link),
                            link: link,
                            priority: 0,
                          },
                        ],
                      }));
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
        title={"+91 " + mobileNumber}
        subtitle="This is your default contact option"
        icon={<BiPhoneCall className="text-2xl" />}
      />
      {form.contactOptions.length > 0 && (
        <div className="flex flex-col space-y-3 w-full">
          {form.contactOptions.map((contactOptions) => (
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

function GenderInput({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
}) {
  return (
    <div className="flex flex-col space-y-3 items-start w-full">
      <div className="flex flex-row items-center justify-start space-x-1">
        <p className="text-base font-medium">Gender</p>
        <p className="text-error">*</p>
      </div>
      <RadioInput
        options={[
          {
            icon: (
              <BsGenderMale
                className={`text-xl
              ${form.gender === Gender.MALE ? "text-white" : "text-info"}
              `}
              />
            ),
            onClick: () =>
              setForm((prev) => ({
                ...prev,
                gender: Gender.MALE,
              })),
            title: "Male",
            className: form.gender === Gender.MALE ? "bg-info" : "bg-white",
            textColor: form.gender === Gender.MALE ? "text-white" : "",
          },
          {
            icon: (
              <BsGenderFemale
                className={`text-xl
              ${form.gender === Gender.FEMALE ? "text-white" : "text-pink-500"}
              `}
              />
            ),
            onClick: () =>
              setForm((prev) => ({
                ...prev,
                gender: Gender.FEMALE,
              })),
            title: "Female",
            className:
              form.gender === Gender.FEMALE ? "bg-pink-500" : "bg-white",
            textColor: form.gender === Gender.FEMALE ? "text-white" : "",
          },
          {
            icon: (
              <BsGenderTrans
                className={`text-xl
              ${form.gender === Gender.OTHER ? "text-white" : "text-success"}
              `}
              />
            ),
            onClick: () =>
              setForm((prev) => ({
                ...prev,
                gender: Gender.OTHER,
              })),
            title: "Other",
            className: form.gender === Gender.OTHER ? "bg-success" : "bg-white",
            textColor: form.gender === Gender.OTHER ? "text-white" : "",
          },
        ]}
      />
    </div>
  );
}

function Name({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
}) {
  return (
    <div className="flex flex-col space-y-7 w-full">
      <TextInput
        title="First Name"
        placeholder="Eg. John"
        mandatory={true}
        value={form.firstName}
        onChange={(value) => setForm({ ...form, firstName: value })}
        errorText={
          form.firstName.length === 0 ? "Please enter your first name" : ""
        }
      />

      <TextInput
        title="Last Name"
        mandatory={true}
        placeholder="Eg. Doe"
        value={form.lastName}
        onChange={(value) => setForm({ ...form, lastName: value })}
        errorText={
          form.lastName.length === 0 ? "Please enter your last name" : ""
        }
      />
    </div>
  );
}

function UploadProfilePicture({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
}) {
  const [profilePicture, setProfilePicture] = useState<File | null>(
    form.profilePicture
  );
  const [showModal, setShowModal] = useState(false);
  const [editButtonState, setEditButtonState] = useState(State.SUCCESS);
  const [uploadButtonState, setUploadButtonState] = useState(State.SUCCESS);
  useEffect(() => {
    if (profilePicture) {
      setForm((prev) => ({
        ...prev,
        profilePicture: profilePicture,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        profilePicture: null,
      }));
    }
  }, [profilePicture]);

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
  const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    if (image) {
      setProfilePicture(image);
    }
  }, [image]);
  return (
    <div className="flex flex-col space-y-1 w-full">
      <div className="flex flex-row items-center justify-start space-x-1">
        <p className="text-md font-medium">Profile Picture</p>
        <p className="text-error">*</p>
      </div>
      <ProfilePictureInput
        profilePicture={profilePicture}
        setProfilePicture={setProfilePicture}
      />
    </div>
  );
}

function SelectStateAndCity({
  form,
  setForm,
}: {
  form: CreateGigRequest;
  setForm: Dispatch<SetStateAction<CreateGigRequest>>;
}) {
  const [icity, setICity] = useState<ICity | null>(null);
  const [istate, setIState] = useState<IState | null>(null);
  const indianStates = StateType.getStatesOfCountry(
    Country.getCountryByCode("IN")?.isoCode
  );
  const indianCities = indianStates.find(
    (istate) => istate.name === form.location.state
  )?.isoCode
    ? City.getCitiesOfState(
        "IN",
        indianStates.find((istate) => istate.name === form.location.state)
          ?.isoCode!!
      )
    : [];

  return (
    <div className="flex flex-col space-y-5 w-full">
      {form.location.state.length === 0 ? (
        <TextInputWithDropdown
          value={form.location.state}
          mandatory={true}
          title="State"
          options={indianStates.map((state) => state.name)}
          placeholder="Eg. Maharashtra"
          onSelect={(value) => {
            setForm((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                state: value,
              },
            }));
            setIState(
              indianStates.find((istate) => istate.name === value) ?? null
            );
          }}
        />
      ) : (
        <Setting
          title={form.location.state}
          icon={<MdApartment className="text-xl" />}
          subtitle="Click to change"
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              location: {
                city: "",
                state: "",
              },
            }));
          }}
        />
      )}
      {form.location.city.length === 0 ? (
        <TextInputWithDropdown
          value={form.location.city}
          mandatory={true}
          title="City"
          options={indianCities.map((city) => city.name)}
          placeholder="Eg. Mumbai"
          onSelect={(value) => {
            setForm((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                city: value,
              },
            }));
            setICity(
              indianCities.find((icity) => icity.name === value) ?? null
            );
          }}
        />
      ) : (
        <Setting
          title={form.location.city}
          icon={<AiFillHome className="text-xl" />}
          subtitle="Click to change"
          onClick={() => {
            setForm((prev) => ({
              ...prev,
              location: {
                ...prev.location,
                city: "",
              },
            }));
          }}
        />
      )}
    </div>
  );
}
