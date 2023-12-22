import { CreateGigRequest, createGig } from "@api_functions/gig/create-gig";
import Chip from "@components/Chip";
import ImageComponent from "@components/ImageComponent";
import Setting from "@components/Setting";
import UnderlinedHeader from "@components/UnderlinedHeader";
import RadioInput from "@components/input/RadioInput";
import TextInput from "@components/input/TextInput";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import { showSnackBar } from "@components/notifications/Snackbar";
import { Gender, IndianLanguages, State } from "@data/enums";
import devLog from "@helper_functions/devLog";
import {
  ICity,
  IState,
  Country,
  City,
  State as StateType,
} from "country-state-city";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineCamera,
  AiOutlineUser,
  AiFillHome,
  AiOutlineLink,
} from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { BsGenderMale, BsGenderFemale, BsGenderTrans } from "react-icons/bs";
import { MdApartment } from "react-icons/md";
import { SocialIcon } from "react-social-icons";
import SocialLinks from "social-links";
import validator from "validator";
import Checker from "@components/Checker";
import Button from "@components/Button";
import router from "next/router";
import { verifyImage } from "@components/input/MediaInput";
import { showImageEditingModal } from "@components/notifications/Popup";

export default function Desktop({
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
    <div className="grid grid-cols-5 gap-5 h-screen hide-scrollbar w-full">
      <div className="min-h-full flex flex-col items-center justify-end space-y-5 w-full bg-primary text-white px-5 pb-20 col-span-2">
        <div className="flex flex-col items-start justify-center space-y-10">
          <div className="flex flex-col items-start justify-center space-y-2">
            <p className="text-3xl font-medium">Welcome to the Reach!</p>
            <p className="text-lg font-medium">Complete the checklist</p>
          </div>
          <FormCheckers form={form} />
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
                  router.push("/console/services");
                }
                setSubmitButtonState(State.SUCCESS);
              }}
              disabled={!validateForm(form)}
            />
            <p className="text-sm font-medium text-center">
              By clicking submit you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="underline underline-offset-2"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className=" underline underline-offset-2"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-16 w-full px-5 py-10 overflow-y-scroll col-span-3 hide-scrollbar">
        <div className="flex flex-col space-y-7 items-start justify-start w-full">
          <UnderlinedHeader title="About You" />
          <UploadProfilePicture form={form} setForm={setForm} />
        </div>
        <div className="flex flex-col space-y-5 items-start justify-start w-full">
          <Name form={form} setForm={setForm} />
          <DesignationInput form={form} setForm={setForm} />
        </div>
        <div className="flex flex-col space-y-7 items-start justify-start w-full">
          <UnderlinedHeader title="A little more about you" />
          <GenderInput form={form} setForm={setForm} />
          <SelectStateAndCity form={form} setForm={setForm} />
          <FluentLanguagesInput form={form} setForm={setForm} />
        </div>
        <div className="flex flex-col space-y-7 items-start justify-start w-full">
          <UnderlinedHeader title="Contact Options" />
          <ContactOptionsInput
            form={form}
            setForm={setForm}
            mobileNumber={mobileNumber}
          />
        </div>
      </div>
    </div>
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

function FormCheckers({ form }: { form: CreateGigRequest }) {
  return (
    <div className="grid grid-cols-2 gap-y-5 gap-x-2 w-full">
      <Checker
        text="First Name"
        checked={form.firstName.length > 0}
        id="firstName"
      />
      <Checker
        text="Last Name"
        checked={form.lastName.length > 0}
        id="lastName"
      />
      <Checker
        text="Designation"
        checked={form.designation.length > 0}
        id="designation"
      />
      <Checker
        text="Profile Picture"
        checked={form.profilePicture !== null}
        id="profilePicture"
      />
      <Checker text="gender" checked={true} id="gender" />
      <Checker text="Contact Options" checked={true} id="contactOptions" />
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
  const [selectedContactOption, setSelectedContactOption] = useState<{
    name: string;
    link: string;
    priority: number;
  } | null>(null);
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
      <div className="grid grid-cols-2 gap-5 gap-y-0 w-full">
        <div className="w-full relative">
          <Setting
            title={"+91 " + mobileNumber}
            subtitle="This is your default contact option"
            icon={<BiPhoneCall className="text-2xl" />}
          />
        </div>
        {form.contactOptions.map((contactOptions) => (
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
                <SocialIcon url={contactOptions.link} className="shrink-0" />
              }
              subtitle={contactOptions.link.slice(0, 30) + "..."}
            />
            <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center hover:bg-gray rounded-md">
              <div className="flex flex-row items-center justify-center space-x-2">
                <AiFillCloseCircle
                  className="text-2xl text-white opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      contactOptions: prev.contactOptions.filter(
                        (item) => item.link !== contactOptions.link
                      ),
                    }));
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
        <p className={`font-medium text-base`}>Gender</p>
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
                ${
                  form.gender === Gender.FEMALE ? "text-white" : "text-pink-500"
                }
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
    <div className="flex flex-row space-x-5 items-center justify-center w-full">
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
  return (
    <div className="flex flex-row items-start justify-start w-full space-x-5">
      <div className="flex flex-col items-center justify-center">
        <input
          type="file"
          accept="image/*"
          onClick={(e) => {
            e.currentTarget.value = "";
            setUploadButtonState(State.LOADING);
          }}
          onChange={(e) => {
            devLog("change");
            e.preventDefault();
            if (e.target.files == null || e.target.files[0] == null) {
              setProfilePicture(null);
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
              showImageEditingModal({
                image: e.target.files[0],
                borderRadius: 0,
                onOk: (image) => {
                  setProfilePicture(image);
                  e.target.value = "";
                  setUploadButtonState(State.SUCCESS);
                },
                onCancel: () => {
                  setProfilePicture(null);
                  e.target.value = "";
                  setUploadButtonState(State.SUCCESS);
                },
              });
            } else {
              setProfilePicture(null);
              setEditButtonState(State.SUCCESS);
            }
            setUploadButtonState(State.SUCCESS);
          }}
          className="hidden"
          id="desktop-profile-pic"
          multiple={false}
        />
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <label
            htmlFor={!profilePicture ? "desktop-profile-pic" : ""}
            className="flex flex-col items-center justify-center space-y-2 w-full"
          >
            {profilePicture ? (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <ImageComponent
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Picture"
                  className={`w-[15rem] h-[15rem] rounded-md overflow-hidden border`}
                />
              </div>
            ) : (
              <div className="flex flex-row items-center justify-center space-x-2 relative">
                <AiOutlineUser
                  className={`w-[15rem] h-[15rem] p-2 bg-gray-300  border border-text rounded-md z-10 bg-white`}
                />
              </div>
            )}
          </label>
        </div>
      </div>
      <div className="flex flex-col space-y-3 min-h-full">
        <div className="flex flex-col space-y-1 w-full">
          {profilePicture ? (
            <div className="flex flex-col space-y-3 w-full">
              <p className="text-base font-medium text-textsubtle">
                Size: {(profilePicture.size / 1000 / 1000).toFixed(2)} MB
              </p>
              <p className="text-base font-medium text-textsubtle">
                Type:{" "}
                {profilePicture.type ||
                  profilePicture.name.split(".")[1].toUpperCase()}
              </p>
              {/* <div className="flex flex-row items-center justify-start space-x-1">
                  <p className="text-base font-medium text-textsubtle">
                    Face: {profilePicture.type === "image/jpeg" ? "Yes" : "No"}
                  </p>
                  <AiOutlineQuestionCircle
                    className="text-lg text-info"
                    onClick={() => {
                      showCustomJSXPopup({
                        jsx: (
                          <div className="flex flex-col space-y-3 w-full items-center justify-start">
                            <LuScanFace className="w-20 h-20 text-info" />
                            <p className="text-md font-medium text-center w-full">
                              We use face detection to make sure that you upload
                              a picture of yourself.
                            </p>
                          </div>
                        ),
                        onOk: () => {},
                      });
                    }}
                  />
                </div> */}
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
                showImageEditingModal({
                  image: profilePicture,
                  borderRadius: 0,
                  onOk: (image) => {
                    setProfilePicture(image);
                    setEditButtonState(State.SUCCESS);
                  },
                  onCancel: () => {
                    setProfilePicture(null);
                    setEditButtonState(State.SUCCESS);
                  },
                });
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
              document.getElementById("desktop-profile-pic")?.click();
            }}
            buttonState={uploadButtonState}
          />
        )}
      </div>
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
    <div className="flex space-x-5 items-start justify-start w-full">
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
