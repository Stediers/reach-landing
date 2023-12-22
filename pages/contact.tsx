import Logo from "@components/Logo";
import { State } from "@data/enums";
import { ReactNode, useEffect, useState } from "react";
import Button from "@components/Button";
import "swiper/css";
import "swiper/css/pagination";
import { AnimatePresence, motion } from "framer-motion";
import TextDropDown from "@components/TextDropDown";
import { getCookie } from "@api_functions/internal/cookie";
import LandingWrapper from "@wrapper/LandingWrapper";
import { AiOutlineMenu } from "react-icons/ai";
import ImageComponent from "@components/ImageComponent";
import TextInput from "@components/input/TextInput";
import TextArea from "@components/input/TextArea";
import Widget from "@components/Widget";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";
import {
  FcBarChart,
  FcBearish,
  FcCalendar,
  FcConferenceCall,
  FcGoogle,
  FcPositiveDynamic,
} from "react-icons/fc";

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

const promises = [
  {
    // icon: <FcDonate className={iconStyle} />,
    heading: "No Commission Charges",
    description: "Keep what you earn, zero deductions!",
    image: "/images/promise-1.svg",
  },
  {
    heading: "Complete Control",
    description: "Own your profile, be independent and bold!",
    image: "/images/promise-2.svg",
  },
  {
    heading: "Know your Reach",
    description: "Maximize growth with powerful analytics!",
    image: "/images/promise-3.svg",
  },
];

export default function Main() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [cookieExists, setCookieExists] = useState(false);
  useEffect(() => {
    const cookie = getCookie("gig-token");
    if (cookie) {
      setCookieExists(true);
    }
  }, []);
  // take user to console if they are logged in
  // useEffect(() => {
  //   const token = getCookie("gig-token");
  //   if (token) {
  //     Router.push("/console");
  //   }
  // });

  // onscroll down hide navbar, onscroll up show navbar
  useEffect(
    () => {
      let prevScrollPos = window.pageYOffset;
      window.onscroll = () => {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollPos > currentScrollPos) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
        prevScrollPos = currentScrollPos;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
      <NavBar cookieExists={cookieExists} />
      <Index cookieExists={cookieExists} />
      <OurPlatform cookieExists={cookieExists} />
      <FAQ />
      {/* Change FAQs to single line and collapsable. */}
    </LandingWrapper>
  );
}

function NavBar({ cookieExists }: { cookieExists: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(
    () => {
      const element = document.getElementById("navbar");
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsOpen(false);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <motion.div
      className="flex flex-row justify-between items-center w-full py-5 px-7 fixed top-0 left-0 z-50 bg-white border-b border-gray"
      id="navbar"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: -100 }}
      key={"navbar"}
    >
      <div className="flex items-center justify-center lg:space-x-5 space-x-3 shrink-0">
        <p className="lg:text-xl text-lg font-medium">REACH</p>
        <p className="lg:text-xl font-medium">|</p>
        <div className="flex items-center justify-center space-x-5">
          <p className="lg:text-lg text-md font-medium">Be your own boss</p>
        </div>
      </div>
      <div className="lg:flex items-center justify-end space-x-5 w-full hidden">
        <div className="flex items-center justify-center space-x-7">
          <NavLink text="Blogs" link="#blogs" />
          <NavLink text="FAQs" link="#faqs" />
          <NavLink text="Contact Us" link="#contact-us" />
          <NavLink text="About Us" link="#about-us" />
        </div>
        <div className="max-w-[200px] w-full">
          {cookieExists ? (
            <Button
              text="Go to Console"
              link="/console"
              className="bg-primary text-white font-medium"
            />
          ) : (
            <Button
              text="Sign In"
              link="/user/sign-in"
              className="bg-primary text-white font-medium"
            />
          )}
        </div>
      </div>
      <AiOutlineMenu
        className="lg:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      />
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center overflow-hidden px-5 bg-black bg-opacity-40"
            onClick={() => setIsOpen(false)}
            key={"navbar-popup"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex flex-col items-center justify-center space-y-5 lg:hidden px-10 py-5 rounded-lg bg-white w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -100 }}
            >
              {/* <AiOutlineCloseCircle
                className="text-2xl"
                onClick={() => setIsOpen(false)}
              /> */}
              <div className="flex flex-col items-center justify-center space-y-5 w-full">
                <div className="" onClick={() => setIsOpen(false)}>
                  <NavLink text="Blogs" link="#blogs" />
                </div>
                <div className="" onClick={() => setIsOpen(false)}>
                  <NavLink text="FAQs" link="#faqs" />
                </div>
                <div className="" onClick={() => setIsOpen(false)}>
                  <NavLink text="Contact Us" link="#contact-us" />
                </div>
                <div className="" onClick={() => setIsOpen(false)}>
                  <NavLink text="About Us" link="#about-us" />
                </div>
              </div>
              <div className="max-w-[200px] w-full">
                {cookieExists ? (
                  <Button
                    text="Go to Console"
                    link="/console"
                    className="bg-primary text-white font-medium"
                  />
                ) : (
                  <Button
                    text="Sign In"
                    link="/user/sign-in"
                    className="bg-primary text-white font-medium"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavLink({
  text,
  link,
  className,
}: {
  text: string;
  link: string;
  className?: string;
}) {
  const [highlight, setHighlight] = useState(false);
  //if section is in view, highlight the link
  useEffect(
    () => {
      const element = document.getElementById(link.split("#")[1]);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHighlight(true);
            } else {
              setHighlight(false);
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <p
      className={`text-md font-medium shrink-0 cursor-pointer ${className} ${
        highlight ? "text-primary underline underline-offset-8" : ""
      }`}
      onClick={() => {
        //smooth scroll to section
        const element = document.getElementById(link.split("#")[1]);
        //make sure navbar doesn't overlap with section
        if (element) {
          const y =
            element.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }}
    >
      {text}
    </p>
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

function Index({ cookieExists }: { cookieExists: boolean }) {
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
        <div className="flex flex-col space-y-2 text-text h-full w-screen sm:w-[500px]">
          <div className="text-3xl">How can we help?</div>
          <div>Send us a message!</div>
          {/* <input
            type="text"
            className="border-2 rounded-md p-1"
            placeholder="Enter your Email"
          /> */}
          <TextInput
            placeholder="Enter your Email"
            value={""}
            onChange={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
          ></TextInput>
          {/* <select className="border-2 rounded-md">
            <option>General Doubts</option>
            <option>Refund Related</option>
            <option>Reporting Gigworker</option>
          </select> */}
          <TextDropDown title={"Type"} body={"Abc, cde"}></TextDropDown>

          {/* <textarea
            className="borer-2 rounded-md p-1"
            placeholder="Enter your message here..."
          ></textarea> */}
          <TextArea
            title={"Complaint"}
            value={""}
            onChange={function (value: string): void {
              throw new Error("Function not implemented.");
            }}
          ></TextArea>
          <Button
            text="Submit"
            link="/contact"
            className="bg-primary text-white font-medium"
          />
          <div className="text-center py-4">OR</div>
          <Button
            text="Talk with our Chatbot"
            link="/contact"
            className="bg-primary text-white font-medium"
          />
          <Widget />
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
