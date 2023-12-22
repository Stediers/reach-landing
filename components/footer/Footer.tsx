import Logo from "@components/Logo";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { ReactNode } from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full bg-[#222222] text-white">
      <div className="flex flex-col items-center justify-center w-full space-y-10 py-10">
        <Logo wings="w-[10rem] sm:w-[12rem]" textStyle="text-xl font-medium" />
        <div className="flex flex-col w-full space-y-5 justify-center items-center">
          <div className="flex flex-col sm:w-[30%] w-[80%] justify-evenly items-center underline underline-offset-4 space-y-5">
            <Link href="/#">
              <p className="text-[16px] font-medium">About Us</p>
            </Link>
            <Link href="/#">
              <p className="text-[16px] font-medium">FAQs</p>
            </Link>
            <Link href="/#">
              <p className="text-[16px] font-medium">Support</p>
            </Link>
          </div>
          <div className="flex flex-col sm:w-[30%] w-[80%] justify-evenly items-center underline underline-offset-4 space-y-5">
            <Link href="/#">
              <p className="text-[16px] font-medium">Privacy Policy</p>
            </Link>
            <Link href="/#">
              <p className="text-[16px] font-medium">Terms of Use</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-1 items-center w-full text-center">
          <p className="text-[14px] font-medium">Made with ❤️ from India</p>
          <p className="text-[14px] font-medium">
            Reach Technologies Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
}

function HeaderWrapper({
  children,
  title,
  inverted,
  className,
  id,
}: {
  children: ReactNode;
  title: string;
  inverted?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <motion.div
      id={id}
      className={`${className} py-16 w-full px-7 ${
        inverted ? "bg-[#222222] text-white" : ""
      }`}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      //happen only once
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {title && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <h1 className="text-2xl font-medium text-center first-letter:capitalize">
            {title}
          </h1>
          <div className="h-px w-[80%] bg-primary" />
        </div>
      )}
      {children}
    </motion.div>
  );
}
