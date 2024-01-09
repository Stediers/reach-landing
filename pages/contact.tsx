import Logo from "@components/Logo";
import { State } from "@data/enums";
import { ReactNode, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import TextDropDown from "@components/TextDropDown";
import LandingWrapper from "@wrapper/LandingWrapper";
import ImageComponent from "@components/ImageComponent";
import TextInput from "@components/input/TextInput";
import TextArea from "@components/input/TextArea";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  FcBarChart,
  FcBearish,
  FcCalendar,
  FcConferenceCall,
  FcGoogle,
  FcPositiveDynamic,
} from "react-icons/fc";
import NavBar from "@components/navbar/DesktopNavBar";
import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@helper_functions/local-storage";

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
  useEffect(() => {
    // scroll to top of page on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingWrapper
      title="Reach"
      showNavbar={false}
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-center scroll-smooth"
    >
      <Index />
      <FAQ />
    </LandingWrapper>
  );
}

function WordPopUp({
  words,
  delay,
}: {
  words: string;
  delay: number;
  className?: string;
}) {
  const wordsArray = words.split(" ");
  const typeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={typeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      animate="animate"
      className="flex items-center justify-center space-x-1 text-2xl font-medium"
    >
      {wordsArray.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: index * 0.2,
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Index() {
  const words = "US";
  return (
    <div
      className="flex flex-col items-center justify-center space-y-10 w-full min-h-screen-fix relative"
      id="Index"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-items-center gap-y-10 lg:gap-y-0">
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-3 pt-10 lg:pt-0">
          <Logo
            wings="lg:w-[18rem] w-[12rem]"
            textStyle="font-medium lg:text-4xl text-2xl"
          />
          <WordPopUp words={words} delay={0.2} />
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          const element = document.getElementById("features");
          if (element) {
            const y =
              element.getBoundingClientRect().top + window.pageYOffset - 40;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
      ></div>
    </div>
  );
}

const iconStyle = "lg:w-28 lg:h-28 w-20 h-20";

const platforms = [
  {
    // icon: <FcDonate className={iconStyle} />,
    icon: <FcBarChart className={`${iconStyle} mb-2`} color="#F87171" />,
    heading: "Track Record",
    description: "Have a proven track record of your work!",
  },
  {
    icon: <FcCalendar className={iconStyle} />,
    heading: "Whenever, Wherever",
    description: "Let your clients know when you are available!",
  },
  {
    icon: <FcBearish className={iconStyle} />,
    heading: "Minimize Cancellations",
    description: "Reduce cancellations by having a two-way communication!",
  },
  {
    icon: <FcConferenceCall className={iconStyle} />,
    heading: "Know before they ask",
    description: "Let your clients know what you offer, before they ask!",
  },
  {
    icon: <FcGoogle className={iconStyle} />,
    heading: "Visibility",
    description: "Make yourself visible in google search!",
  },
  {
    icon: <FcPositiveDynamic className={iconStyle} />,
    heading: "And many more",
    description: "We are constantly working to improve your experience!",
  },
];

function OurPlatform({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="OUR PLATFORMS"
      className="flex flex-col items-center justify-center space-y-16 lg:!pb-[10rem]"
      id="features"
      bgColor="bg-text text-white"
    >
      <div className="lg:grid grid-cols-3 justify-items-center lg:gap-y-32 gap-y-10 lg:gap-x-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        {platforms.map((platform, index) => (
          <div
            className="flex flex-col items-center justify-center space-y-4"
            key={index}
          >
            {platform.icon}
            <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
              <p className="lg:text-2xl text-lg font-medium text-center">
                {platform.heading}
              </p>
              <p className="lg:text-md text-base text-center">
                {platform.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </HeaderWrapper>
  );

  function ImageWithText({
    image,
    text,
    align = "left",
    title,
  }: {
    image: string;
    text: string;
    align?: "left" | "right";
    title: string;
  }) {
    return (
      <div className="justify-items-center grid grid-cols-2 gap-x-10 gap-y-10 w-full max-w-6xl">
        {align === "left" && (
          <ImageComponent
            src={image}
            alt={text}
            className="w-[20rem] h-[20rem]"
            key={text}
            border={false}
          />
        )}
        <div className="flex flex-col items-center justify-center space-y-2 max-w-md">
          <p className="text-lg lg:text-xl font-medium text-center">{title}</p>
          <p className="text-md text-center">{text}</p>
        </div>
        {align === "right" && (
          <ImageComponent
            src={image}
            alt={text}
            className="w-[20rem] h-[20rem]"
            key={text}
            border={false}
          />
        )}
      </div>
    );
  }
}

function FAQ() {
  const [faq, setFaq] = useState("");
  const [customerMobileNumber, setCustomerMobileNumber] = useState(
    getItemsFromLocalStorage<string>({ key: "customerMobileNumber" }) || ""
  );
  return (
    <HeaderWrapper
      title="FAQ's"
      className="flex flex-col items-center justify-center space-y-10"
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

function AskQuestionPopUp({
  faq,
  setFaq,
  customerMobileNumber,
  setCustomerMobileNumber,
}: {
  faq: string;
  setFaq: React.Dispatch<React.SetStateAction<string>>;
  customerMobileNumber: string;
  setCustomerMobileNumber: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [mobileNumber, setMobileNumber] = useState(customerMobileNumber);
  const [question, setQuestion] = useState("");
  console.log(customerMobileNumber);
  return (
    <div className="flex flex-col justify-start items-start w-full space-y-5">
      <TextInput
        type="tel"
        placeholder="Ex: 9876543210"
        title="Mobile Number"
        onChange={(value) => {
          setMobileNumber(value);
          setCustomerMobileNumber(value);
          setItemsToLocalStorage({
            key: "customerMobileNumber",
            item: value,
          });
        }}
        value={mobileNumber}
        errorText={
          isValidPhoneNumber("+91" + customerMobileNumber)
            ? ""
            : "Invalid mobile number"
        }
        maxLength={10}
      />
      <TextArea
        value={question}
        onChange={(value) => {
          setQuestion(value);
          setFaq(value);
        }}
        title="Question"
        placeholder="Ask us anything"
      />
    </div>
  );
}

function HeaderWrapper({
  children,
  title,
  bgColor = "bg-white text-text",
  className,
  id,
  showHeader = true,
}: {
  children: ReactNode;
  title: string;
  bgColor?: string;
  className?: string;
  id?: string;
  showHeader?: boolean;
}) {
  return (
    <motion.div
      id={id}
      className={`${className} py-16 w-full px-7 ${bgColor}`}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      //happen only once
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {showHeader && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl lg:text-4xl font-medium text-center first-letter:capitalize">
            {title}
          </h1>
          <div className="h-px w-[80%] bg-primary" />
        </div>
      )}
      {children}
    </motion.div>
  );
}

function YoutubeEmbed() {
  // logic to fetch latest Reach video from youtube

  return (
    <iframe
      src="https://www.youtube.com/embed/me_DDgXNgpY"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
