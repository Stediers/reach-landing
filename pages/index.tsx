import Logo from "@components/Logo";
import { State } from "@data/enums";
import { ReactNode, useEffect, useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import {
  FcPositiveDynamic,
  FcCalendar,
  FcBearish,
  FcBarChart,
  FcGoogle,
  FcConferenceCall,
  FcBullish,
} from "react-icons/fc";
import { CiTrophy } from "react-icons/ci";
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
import {
  MdKeyboardArrowDown,
  MdOutlinePriceCheck,
  MdPersonSearch,
} from "react-icons/md";
import LandingWrapper from "@wrapper/LandingWrapper";
import Link from "next/link";
import CarWashService from "@public/images/car_wash_service.svg";
import CateringService from "@public/images/catering_service.svg";
import DriverService from "@public/images/driver_service.svg";
import { AiFillStar, AiOutlineMenu } from "react-icons/ai";
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
import LandingPageImage1 from "@public/images/prices-mockup.webp";
import { GiJourney } from "react-icons/gi";
import { FaHandshake } from "react-icons/fa";

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

  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <LandingWrapper
      title="Reach"
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-center scroll-smooth"
      showNavbar={showNavbar}
    >
      <Index />
      <What />
      <How />
      <CustomerStories />
      {/* <WhatWeBelieve cookieExists={cookieExists} /> */}
      <FAQ />
      {/* <div className="w-full flex flex-col items-center justify-center space-y-5">
        <LineHeader title="More from Reach" />
        <YoutubeEmbed />
      </div> */}
    </LandingWrapper>
  );
}

function CustomerStories() {
  return (
    <HeaderWrapper
      title="Customer Stories"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="customer-stories"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <CustomerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <CustomerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <CustomerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
        <CustomerCard
          name="Pooja"
          designation="Makeup Artist"
          quote="Hi"
          image="/images/what-we-believe-3.webp"
        />
        <CustomerCard
          name="Parthiban"
          designation="Photographer"
          quote="Hi"
          image="/images/what-we-believe-1.webp"
        />
        <CustomerCard
          name="Saravanan"
          designation="Caterer"
          quote="Hi"
          image="/images/what-we-believe-2.webp"
        />
      </div>
    </HeaderWrapper>
  );

  function CustomerCard({
    name,
    designation,
    quote,
    image,
  }: {
    name: string;
    designation: string;
    quote: string;
    image: string;
  }) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-7">
        <ImageComponent
          src={image}
          alt={name}
          className="rounded-2xl lg:w-[18rem] lg:h-[18rem] border border-gray w-[12rem] h-[12rem]"
          whileHover={{ scale: 1.05 }}
        />
        <div className="flex flex-col items-center justify-center lg:space-y-2 space-y-1">
          <p className="lg:text-2xl text-lg font-medium text-center">{name}</p>
          <p className="lg:text-md text-base text-center text-info">
            {designation}
          </p>
        </div>
      </div>
    );
  }
}

function How() {
  return (
    <HeaderWrapper
      title="How does it work?"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="how-it-works"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<FcConferenceCall className={iconStyle} />}
          heading="Find the right partner"
          description="Find the right partner for your needs. Makeup, Photography, Catering, and many more."
        />
        <FeatureCard
          icon={<HiChatBubbleLeftRight className={iconStyle} />}
          heading="Communicate"
          description="Communicate what you offer and showcase your expertise."
        />
        <FeatureCard
          icon={<FcBullish className={iconStyle} />}
          heading="Get the job done"
          description="Get the job done and get paid. It's that simple!"
        />
      </div>
    </HeaderWrapper>
  );
}

function What() {
  return (
    <HeaderWrapper
      title="What is Reach?"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="who-we-are-and-what-we-do"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-center justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<CiTrophy className={`${iconStyle} text-yellow-500`} />}
          heading="Talent is everywhere"
          description="Upcoming lack of opportunities for the youth is a major concern. Lets change that!"
        />
        <FeatureCard
          icon={<FaHandshake className={`${iconStyle} text-green-500`} />}
          heading="Communication"
          description="Lets bridge the gap between the service providers and the customers."
        />
        <FeatureCard
          icon={
            <MdOutlinePriceCheck className={`${iconStyle} text-blue-500`} />
          }
          heading="Cost Effective"
          description="Low cost of entry for the service providers and low cost of services for the customers."
        />
      </div>
    </HeaderWrapper>
  );
}

function FeatureCard({
  icon,
  heading,
  description,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {icon}
      <p className="lg:text-2xl text-lg font-medium text-center">{heading}</p>
      <p className="lg:text-md text-base text-center max-w-[20rem]">
        {description}
      </p>
    </div>
  );
}

function Blogs() {
  return (
    <HeaderWrapper
      title="LEARN AND GROW"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="blogs"
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
      <div className="flex flex-col items-center justify-center space-y-4 cursor-pointer">
        <ImageComponent
          src={image}
          alt={title}
          className="rounded-2xl lg:w-[20rem] lg:h-[20rem] border border-gray w-[12rem] h-[12rem] hover:scale-105 transition duration-200 cursor-pointer"
          whileHover={{ scale: 1.0 }}
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

function Index() {
  const words = "Empowering the Gig Economy".split(" ");
  const partnerLink = process.env.NEXT_PUBLIC_PARTNER_LINK || "/user/sign-up";
  const customerLink = process.env.NEXT_PUBLIC_CUSTOMER_LINK || "/user/sign-up";
  return (
    <div
      className="flex flex-col items-center justify-start space-y-20 w-full px-10"
      id="Index"
    >
      {/* <ImageComponent
        className="!absolute top-0 left-0 w-full h-[40rem] object-cover z-[-1] opacity-70"
        src={LandingPageImage1}
        alt="background"
      /> */}
      <div className="flex flex-col items-center justify-center lg:space-y-3 space-y-3 pt-5">
        <Logo
          wings="lg:w-[18rem] w-[12rem]"
          textStyle="font-medium lg:text-4xl text-2xl"
        />
        <WordPopUp words={words.join(" ")} delay={0.2} />
      </div>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 justify-items-center gap-y-10 gap-x-10 w-full lg:justify-items-center items-start flex-1"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        //happen only once
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <DescriptionCard
          icon={<MdPersonSearch className="w-24 h-24 text-text" />}
          title="Find the right partner"
          description="Find the right partner for your needs. Makeup, Photography, Catering, and many more."
          linkText="Find Services"
          link={customerLink}
        />
        <DescriptionCard
          icon={<AiFillStar className="w-24 h-24 text-rating-2.5" />}
          title="Become the best in the business"
          description="Communicate what you offer and showcase your expertise. No commission charges!"
          linkText="Become a Partner"
          link={partnerLink}
        />
        <DescriptionCard
          icon={<GiJourney className="w-24 h-24 text-info" />}
          title="Join Us in our journey"
          description="Are you passionate about the gig economy? We are here to help you reach your dreams and achieve your goals."
          linkText="Find Jobs"
          link="/user/sign-up"
        />
      </motion.div>
    </div>
  );
}

function DescriptionCard({
  title,
  description,
  linkText = "Find Services",
  link,
  icon,
}: {
  title: string;
  description: string;
  linkText?: string;
  link: string;
  icon: ReactNode;
}) {
  return (
    <Card className="w-full max-w-[800px] flex flex-col items-center justify-between space-y-5 min-h-[28rem] bg-white shadow-md !pt-10 !pb-20">
      <div className="flex flex-col items-center justify-center space-y-4">
        {icon}
        <p className="lg:text-xl font-medium text-lg text-center">{title}</p>
        <p className="lg:text-md text-base text-center">{description}</p>
      </div>
      <div className="max-w-[200px] w-full">
        <Button
          text={linkText}
          link={link}
          className="bg-primary text-white font-medium"
        />
      </div>
    </Card>
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
          {/* <Button
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
          /> */}
          <Button
            text="Ask"
            link="/contact"
            className="bg-info text-white font-medium"
          />
        </div>
        <p className="lg:text-md text-base text-center max-w-2xl">
          Any and All questions are welcome. Dont be shy now!
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
