import LandingWrapper from "@wrapper/LandingWrapper";
import { State } from "@data/enums";
import { ReactNode, useEffect } from "react";
import Card from "@components/Card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Main() {
  useEffect(() => {
    // scroll to top of page on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingWrapper
      title="Reach"
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-start scroll-smooth lg:p-10 p-5"
      showNavbar={true}
    >
      <HeaderWrapper
        title="Terms of Service"
        id="terms-of-service"
        className="items-center justify-center w-full flex flex-col lg:space-y-12 space-y-8 max-w-6xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-3xl">
          <TOS
            title="Partners"
            content="If you are a partner, please read our terms of service before using our platform."
            link={`${process.env.NEXT_PUBLIC_PARTNER_LINK}/terms-and-conditions`}
          />
          <TOS
            title="Customers"
            content="If you are a customer, please read our terms of service before using our platform."
            link={`${process.env.NEXT_PUBLIC_CUSTOMER_LINK}/terms-of-service`}
          />
        </div>
      </HeaderWrapper>
    </LandingWrapper>
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
      className={`${className} w-full ${bgColor}`}
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

function TOS({
  title = "Terms of Service",
  content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.",
  link = "#",
}: {
  title?: string;
  content?: string;
  link?: string;
}) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 flex flex-col space-y-5 justify-start items-start">
        <h5 className="text-text font-medium text-2xl tracking-tight">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
        <Link
          href={link}
          className="text-white bg-info hover:bg-info/80 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          rel="noopener noreferrer"
          target="_blank"
        >
          Read more
          <svg
            className="-mr-1 ml-2 h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
