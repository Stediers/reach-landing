import { Gender, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextInput from "@components/input/TextInput";
import { AiFillCloseCircle } from "react-icons/ai";
import { CreateGigRequest, createGig } from "@api_functions/gig/create-gig";
import { showSnackBar } from "@components/notifications/Snackbar";
import { AnimatePresence, motion } from "framer-motion";
import { showOkPopup } from "@components/notifications/Popup";
import { IndianLanguages } from "@data/enums";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import Chip from "@components/Chip";
import Mobile from "@src/user/onboarding/Mobile";
import Desktop from "@src/user/onboarding/Desktop";
import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";

export default function Main() {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mobilenumber = localStorage.getItem("mobileNumber");
      if (mobilenumber === null) {
        showOkPopup({
          title: "Login Required",
          message: "Please login to continue",
        }).then(() => {
          router.push("/user/sign-in");
        });
      } else {
        setMobileNumber(mobilenumber);
      }
    }
  }, []);

  const router = useRouter();

  const [submitButtonState, setSubmitButtonState] = useState<State>(
    State.SUCCESS
  );
  const [form, setForm] = useState<CreateGigRequest>({
    contactOptions: [],
    designation: "",
    firstName: "",
    gender: Gender.MALE,
    languages: [],
    lastName: "",
    location: {
      city: "",
      state: "",
    },
    profilePicture: null,
  });

  useEffect(() => {
    const form = getItemsFromLocalStorage<CreateGigRequest>({
      key: "onboarding",
    });
    if (form) {
      form.profilePicture = null;
      setForm(form);
    }
  }, []);

  useEffect(() => {
    setItemsToLocalStorage({
      key: "onboarding",
      item: form,
    });
  }, [form]);

  return (
    <ConsoleWrapper
      title="Onboarding"
      state={State.SUCCESS}
      showPopup={false}
      mobileJSX={
        <Mobile
          form={form}
          setForm={setForm}
          mobileNumber={mobileNumber}
          setSubmitButtonState={setSubmitButtonState}
          submitButtonState={submitButtonState}
          validateForm={validateForm}
        />
      }
      desktopJSX={
        <Desktop
          form={form}
          setForm={setForm}
          mobileNumber={mobileNumber}
          setSubmitButtonState={setSubmitButtonState}
          submitButtonState={submitButtonState}
          validateForm={validateForm}
        />
      }
    />
  );
}

function validateForm(form: CreateGigRequest): boolean {
  if (form.firstName.length === 0) {
    return false;
  }
  if (form.lastName.length === 0) {
    return false;
  }
  if (form.designation.length === 0) {
    return false;
  }
  if (form.profilePicture === null) {
    return false;
  }
  if (form.location.city.length === 0) {
    return false;
  } else if (form.location.state.length === 0) {
    return false;
  }
  return true;
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
