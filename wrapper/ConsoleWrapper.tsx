"use client";
import { State } from "@/data/enums";
import React, { useEffect, useState } from "react";
import Loading from "@components/Loading";
import { AiOutlineWarning } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import ImageComponent from "@components/ImageComponent";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";

export default function ConsoleWrapper({
  title,
  state = State.LOADING,
  showPopup = true,
  mobileJSX,
  desktopJSX,
  simpleJSX,
}: {
  title: string;
  state?: State;
  showPopup?: boolean;
  mobileJSX: React.ReactNode | null;
  desktopJSX: React.ReactNode | null;
  simpleJSX?: React.ReactNode | null;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 1024);
    });
  }, []);
  return (
    <>
      <div
        className={`w-full flex flex-1 flex-col space-y-3 items-center relative scroll-smooth`}
      >
        {state === State.LOADING ? (
          <motion.div
            className="flex-1 flex flex-col justify-center items-center w-full"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ scale: 0.5, opacity: 0 }}
            key={"loading"}
          >
            <Loading className="w-8 h-8" color="bg-primary" />
            <p className=" text-center font-medium text-xl pt-5">Loading...</p>
          </motion.div>
        ) : null}
        {state === State.ERROR ? (
          <motion.div
            className="flex-1 flex  w-full justify-center items-center h-full space-y-5"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: -100 }}
            key={"error"}
          >
            <div className="flex flex-col items-center justify-center space-y-5 px-5">
              <AiOutlineWarning className="w-10 h-10 text-primary lg:w-20 lg:h-20" />
              <div className="flex flex-col items-center justify-center space-y-2 w-full  max-w-lg">
                <p className="text-center font-medium text-lg">
                  Something went wrong
                </p>
                <p className="text-center text-base">
                  Please try reloading the page. If the problem persists, please
                  contact us
                </p>
              </div>
              <div className="flex flex-row items-center justify-between w-full space-x-5  max-w-lg">
                <Button variant="info" onClick={() => window.location.reload()}>
                  Reload
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
        {state === State.SUCCESS && (
          <motion.div
            className="flex flex-1 flex-col justify-start items-start space-y-2 w-full min-h-full"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, y: -100 }}
            key={"success"}
          >
            {simpleJSX ? (
              simpleJSX
            ) : isMobile ? (
              <div
                className="flex lg:hidden items-center justify-center w-full"
                hidden
              >
                {mobileJSX}
              </div>
            ) : (
              <div
                className="hidden lg:flex w-full flex-1 flex-col !items-start !justify-start"
                hidden
              >
                {desktopJSX}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

function InDevelopment() {
  return (
    <div className="flex flex-col space-y-5 items-center justify-center w-full max-w-sm">
      <div className="flex flex-col items-center justify-center w-full space-y-2">
        <Logo />
      </div>
      <ImageComponent
        src="/images/404/desktop-building.svg"
        alt="Under Construction"
        className="w-[20rem] h-[20rem]"
        border={false}
        popup={false}
      />
      <p className="text-center font-medium text-lg">
        We are working on making the desktop version better for you 🚧. Please
        use the mobile version until then!
      </p>
    </div>
  );
}
