import Logo from "@components/Logo";
import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  FcPositiveDynamic,
  FcCalendar,
  FcBearish,
  FcBarChart,
  FcGoogle,
  FcConferenceCall,
} from "react-icons/fc";
import Button from "@components/Button";
import Card from "@components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TextDropDown from "@components/TextDropDown";
import { BsDatabaseFillSlash } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import LandingWrapper from "@wrapper/LandingWrapper";
import Link from "next/link";
import CarWashService from "@public/images/car_wash_service.svg";
import CateringService from "@public/images/catering_service.svg";
import DriverService from "@public/images/driver_service.svg";
import { AiOutlineMenu } from "react-icons/ai";
import ImageComponent from "@components/ImageComponent";
import { useRouter } from "next/router";
import TextInput from "@components/input/TextInput";
import TextArea from "@components/input/TextArea";
import { showCustomJSXPopup } from "@components/notifications/Popup";
import { isValidPhoneNumber } from "libphonenumber-js";
import { showSnackBar } from "@components/notifications/Snackbar";
import { getCookie } from "@helper_functions/cookie";
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

const iconStyle = "lg:w-28 lg:h-28 w-20 h-20";

const features = [
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
      <Index cookieExists={cookieExists} />
      <OurFeatures cookieExists={cookieExists} />
      <OurPromise cookieExists={cookieExists} />
      <WhatWeBelieve cookieExists={cookieExists} />
      {/* <Blogs cookieExists={cookieExists} /> */}
      <FAQ />
      {/* <div className="w-full flex flex-col items-center justify-center space-y-5">
        <LineHeader title="More from Reach" />
        <YoutubeEmbed />
      </div> */}
    </LandingWrapper>
  );
}

function Blogs({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="LEARN AND GROW"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="blogs"
      bgColor="bg-success text-white"
    >
      <div className="lg:grid grid-cols-3 justify-items-center lg:gap-y-32 gap-y-10 lg:gap-x-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
        <BlogCard
          title="How to get more clients?"
          image="/images/blog-1.svg"
          description="Learn how to get more clients on Reach."
          link="/blog/how-to-get-more-clients"
        />
      </div>
    </HeaderWrapper>
  );

  function BlogCard({
    title,
    image,
    description,
    link,
  }: {
    title: string;
    image: string;
    description: string;
    link: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <ImageComponent
          src={image}
          alt={title}
          className="rounded-2xl lg:w-[20rem] lg:h-[20rem] border border-gray w-[12rem] h-[12rem]"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{title}</p>
          <p className="lg:text-md text-base text-center">{description}</p>
        </div>
      </div>
    );
  }
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
      className="flex items-center justify-center space-x-1 text-lg font-medium"
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
  const words = "Be your own Boss".split(" ");
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
          <WordPopUp words={words.join(" ")} delay={0.2} />
          <div className="flex flex-col items-center justify-center space-y-5 w-full lg:pt-3 pt-1">
            {cookieExists ? (
              <Button
                text="Go to Console"
                buttonState={State.SUCCESS}
                link="/console"
                className="bg-primary text-white font-medium"
              />
            ) : (
              <Button
                text="Sign In"
                buttonState={State.SUCCESS}
                link="/user/sign-in"
                className="bg-primary text-white font-medium "
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-5 w-screen sm:w-[500px]">
          <Swiper
            // @ts-ignore
            modules={[Pagination, Autoplay]}
            centeredSlides={true}
            className="w-full flex items-center justify-center"
            slidesPerView={1}
            spaceBetween={100}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              <Image
                src={CarWashService}
                alt="Reach."
                className=""
                width={500}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={CateringService}
                alt="Reach."
                className=""
                width={500}
                height={500}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={DriverService}
                alt="Reach."
                className=""
                width={500}
                height={500}
              />
            </SwiperSlide>
          </Swiper>
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
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-lg font-medium">Scroll down to learn more</p>
          <MdKeyboardArrowDown className="text-4xl animate-bounce" />
        </div>
      </div>
    </div>
  );
}

function OurPromise({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="OUR PROMISE"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="benefits"
      bgColor="bg-text text-white"
    >
      <div className="lg:flex flex-col space-y-5 items-center justify-start hidden w-full">
        {promises.map((feature, index) => (
          <ImageWithText
            image={feature.image}
            text={feature.description}
            align={index % 2 === 0 ? "left" : "right"}
            title={feature.heading}
            key={index}
          />
        ))}
      </div>
      <div className="flex flex-col items-center justify-center space-y-16 lg:hidden">
        {promises.map((feature, index) => (
          <div
            key={index}
            className="grid grid-rows-2 items-center justify-items-center"
          >
            <ImageComponent
              className="w-[10rem] h-[10rem]"
              src={feature.image}
              alt={feature.heading}
              border={false}
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <span className="text-lg lg:text-xl font-medium text-center">
                {feature.heading}
              </span>
              <span className="text-md text-center">{feature.description}</span>
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

function OurFeatures({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="OUR FEATURES"
      className="flex flex-col items-center justify-center space-y-16 lg:!pb-[10rem]"
      id="features"
    >
      <div className="lg:grid grid-cols-3 justify-items-center lg:gap-y-32 gap-y-10 lg:gap-x-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        {features.map((feature, index) => (
          <div
            className="flex flex-col items-center justify-center space-y-4"
            key={index}
          >
            {feature.icon}
            <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
              <p className="lg:text-2xl text-lg font-medium text-center">
                {feature.heading}
              </p>
              <p className="lg:text-md text-base text-center">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </HeaderWrapper>
  );
}

function WhatWeBelieve({ cookieExists }: { cookieExists: boolean }) {
  return (
    <HeaderWrapper
      title="WE BELIEVE IN YOU"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="about-us"
    >
      <p className="lg:text-lg text-md text-center max-w-2xl">
        We are a team of passionate individuals who believe in the power of
        dreams. We are here to help you reach your dreams and achieve your
        goals.
      </p>
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <ImageWithQuote
          image="/images/what-we-believe-1.webp"
          quote="Hi"
          name="Deepakindresh N"
          designation="Head of Marketing"
        />
        <ImageWithQuote
          designation="Chief Executive Officer"
          name="Harshavardhan J"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <ImageWithQuote
          image="/images/what-we-believe-2.webp"
          quote="Hi"
          name="Gautthum J"
          designation="Chief Operating Officer"
        />
      </div>
    </HeaderWrapper>
  );

  function ImageWithQuote({
    image,
    quote,
    name,
    designation,
  }: {
    image: string;
    quote: string;
    name: string;
    designation: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <ImageComponent
          src={image}
          alt={name}
          className="rounded-2xl lg:w-[20rem] lg:h-[20rem] border border-gray w-[12rem] h-[12rem]"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{name}</p>
          <p className="lg:text-md text-base text-center">Co Founder</p>
          <p className="lg:text-md text-base text-center text-info">
            {designation}
          </p>
        </div>
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
      <div className="flex flex-col items-center justify-center space-y-5 w-full">
        <div className="w-full max-w-[800px] flex flex-col items-center justify-center space-y-3">
          <p className="lg:text-xl font-medium text-lg text-center">
            Have a question? Ask us!
          </p>
        </div>
        <div className="max-w-[200px] w-full">
          <Button
            text="Ask"
            onClick={() => {
              showCustomJSXPopup({
                jsx: (
                  <AskQuestionPopUp
                    faq={faq}
                    setFaq={setFaq}
                    customerMobileNumber={customerMobileNumber}
                    setCustomerMobileNumber={setCustomerMobileNumber}
                  />
                ),
                onOk: () => {
                  // send question to backend
                  console.log(faq, customerMobileNumber);
                  if (
                    isValidPhoneNumber("+91" + customerMobileNumber) &&
                    faq.length > 0
                  ) {
                    //send mail to support@reachgig.com
                    window.open(
                      `mailto:
                      support@reachgig.com` +
                        `?subject=${encodeURIComponent(
                          "Question from Reach website"
                        )}&body=${encodeURIComponent(
                          `Question: ${faq}\nMobile Number: ${customerMobileNumber}`
                        )}`
                    );
                  } else {
                    showSnackBar({
                      message: "Invalid mobile number or question",
                      state: State.ERROR,
                    });
                  }
                },
                onClose: () => {
                  setFaq("");
                  setCustomerMobileNumber("");
                },
                okText: "Ask",
                cancelText: "Maybe Later",
                preventDefault: true,
                okButtonClassName: "bg-info text-white",
                cancelButtonClassName: "border-gray border text-textsubtle",
              });
            }}
            className="bg-info text-white font-medium"
          />
        </div>
        <p className="lg:text-md text-base text-center max-w-2xl">
          Any and All questions are welcome. We are here to help you reach your
          dreams and achieve your goals.
        </p>
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
