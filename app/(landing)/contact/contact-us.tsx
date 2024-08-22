"use client";
import { State } from "@data/enums";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import TextDropDown from "@components/TextDropDown";
import TextInput from "@components/input/TextInput";
import TextArea from "@components/input/TextArea";
import { showSnackBar } from "@components/notifications/Snackbar";
import { Button } from "@components/ui/button";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import { isValidPhoneNumber } from "libphonenumber-js";

const faqs = [
  {
    question: "Really no commission charges?!",
    answer:
      "At Reach, we are committed to foster growth and empower our partners to pursue their dreams. To support this vision, we have made the deliberate choice to eliminate all commission fees.",
  },
  {
    question: "Is it easy to list my services on Reach?",
    answer:
      "Yes, it's straightforward. You can easily list your services by providing details like service descriptions, pricing, and availability. Our platform guides you through the process.",
  },
  {
    question: "How can I attract clients on Reach?",
    answer:
      "To attract clients, complete your profile with detailed information, showcase your expertise, and provide top-notch service. Positive reviews and high ratings can also help.",
  },
  {
    question: "Is my personal information safe on Reach?",
    answer:
      "Yes, we take your privacy seriously. Your personal information is kept secure, and we have measures in place to protect your data.",
  },
];

export default function Main() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth">
      <Index />
      <FAQ />
    </div>
  );
}

function Index() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  function validateForm() {
    if (name === "") {
      return false;
    } else if (question === "" || question.length < 10) {
      return false;
    } else if (phone === "") {
      return false;
    } else if (email === "") {
      return false;
    } else if (!isValidPhoneNumber("+91" + phone)) {
      return false;
    } else return true;
  }

  return (
    <HeaderWrapper
      title="Contact Us"
      className="items-center justify-center w-full flex flex-col lg:space-y-16 space-y-10 max-w-xl"
    >
      <div className="flex flex-col w-full space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-5 w-full">
          <TextInput
            type="text"
            placeholder="John Doe"
            title="Name"
            onChange={(value) => {
              setName(value);
            }}
            value={name}
            errorText={""}
            maxLength={15}
            mandatory={true}
          />
          <TextInput
            type="text"
            placeholder="9876543210"
            title="Phone"
            onChange={(value) => {
              setPhone(value);
            }}
            value={phone}
            errorText={""}
            maxLength={10}
          />
          <TextInput
            type="text"
            placeholder="john.doe@gmail.com"
            title="Email"
            onChange={(value) => {
              setEmail(value);
            }}
            value={email}
            errorText={""}
            maxLength={30}
          />
        </div>
        <TextArea
          value={question}
          onChange={(value) => {
            setQuestion(value);
          }}
          title="Message"
          placeholder="State your query here"
          errorText={question === "" ? "Message is required" : ""}
        />
        <Button
          variant="default"
          onClick={async () => {
            // if (validateForm()) return;
            const res = await fetch("/api/mail_api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                question,
                phone,
                email,
              }),
            });
            if (res.status !== 200) {
              showSnackBar({
                message: "Failed to submit form!",
                state: State.ERROR,
              });
            } else {
              showSnackBar({
                message: "Form submitted successfully!",
                state: State.SUCCESS,
              });
            }
          }}
          disabled={!validateForm()}
        >
          Submit
        </Button>
      </div>
    </HeaderWrapper>
  );
}

function validateForm({
  name,
  question,
}: {
  name: string;
  question: string;
}): boolean {
  if (name === "") {
    return false;
  } else if (question === "") {
    return false;
  } else return true;
}

function FAQ() {
  return (
    <HeaderWrapper
      title="FAQ's"
      className="items-center justify-center w-full flex flex-col lg:space-y-16 space-y-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 justify-items-center gap-y-10 gap-x-10 w-full sm:hidden">
        {faqs.map((faq, index) => (
          <TextDropDown
            key={index}
            title={faq.question}
            body={faq.answer}
            className="max-w-[800px]"
            bodyClassName="text-base leading-6"
          />
        ))}
      </div>
      <div className="lg:grid grid-cols-2 justify-items-center gap-y-10 gap-x-10 w-full hidden">
        {faqs.map((faq, index) => (
          <div
            className={`w-full rounded-lg flex flex-col space-y-1 max-w-[800px]`}
            key={index}
          >
            <div className="flex items-start justify-between text-base transition duration-75 w-full space-x-3">
              <span className="font-medium text-lg">{faq.question}</span>
            </div>
            <p className="text-md/8">{faq.answer}</p>
          </div>
        ))}
      </div>
    </HeaderWrapper>
  );
}
