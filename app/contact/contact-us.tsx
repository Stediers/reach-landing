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

  return (
    <HeaderWrapper
      title="Contact Us"
      className="items-center justify-center w-full flex flex-col lg:space-y-16 space-y-10 max-w-lg"
    >
      <div className="flex flex-col w-full space-y-5">
        <TextInput
          type="text"
          placeholder="John Doe"
          title="Name"
          onChange={(value) => {
            setName(value);
          }}
          value={name}
          errorText={name === "" ? "Name is required" : ""}
          maxLength={15}
          mandatory={true}
        />
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
          onclick={async () => {
            if (!validateForm({ name, question })) return;
            window.open(
              `mailto:reachgig.connect@gmail.com?subject=Query from ${name}&body=${question}`
            );
          }}
          disabled={validateForm({ name, question }) ? false : true}
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
      bgColor="bg-white text-text"
      id="faqs"
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
