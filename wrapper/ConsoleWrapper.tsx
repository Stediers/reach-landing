import { State } from "@/data/enums";
import Head from "next/head";
import React, {
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Loading from "@components/Loading";
import Button from "@components/Button";
import Script from "next/script";
import AddToHomeScreen from "@components/notifications/prompt";
import Footer from "@components/footer/Footer";
import { AiOutlineWarning } from "react-icons/ai";
import { getWindowSize } from "@helper_functions/getWindowSize";
import devLog from "@helper_functions/devLog";
import { AnimatePresence, motion } from "framer-motion";

export default function ConsoleWrapper({
  title,
  state = State.LOADING,
  showPopup = true,
  mobileJSX,
  desktopJSX,
}: {
  title: string;
  state?: State;
  showPopup?: boolean;
  mobileJSX: React.ReactNode | null;
  desktopJSX: React.ReactNode | null;
}) {
  const [showPopupState, setShowPopupState] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    //handle window is undefined error
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowSize(getWindowSize());
      devLog(getWindowSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // show popup after a delay of 5 seconds
  useEffect(() => {
    if (!showPopup) return;
    setTimeout(() => {
      setShowPopupState(true);
    }, 5000);
  }, []);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="GigIndia" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="GigIndia" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-startup-image" href="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicon.ico" />
        <Script>
          {`function setDocHeight() {
            document.documentElement.style.setProperty(
              "--vh",
              window.innerHeight * 0.01 + "px"
            );
          }
          setDocHeight();
          window.addEventListener("resize", setDocHeight);`}
        </Script>
      </Head>
      <main
        className={`w-full flex-1 flex flex-col space-y-3 items-center relative scroll-smooth`}
      >
        <AnimatePresence mode="wait">
          {state === State.LOADING ? (
            <motion.div
              className="flex-1 flex flex-col justify-center items-center space-y-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ scale: 0.5, opacity: 0 }}
              key={"loading"}
            >
              <Loading className="w-10 h-10" />
              <p className=" text-center font-medium text-lg">Loading...</p>
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
                    Please try reloading the page. If the problem persists,
                    please contact us
                  </p>
                </div>
                <div className="flex flex-row items-center justify-between w-full space-x-5  max-w-lg">
                  <Button
                    text="Reload"
                    onClick={() => window.location.reload()}
                    className="bg-primary text-white"
                  />
                  <Button
                    text="Contact Us"
                    link="/contact-us"
                    className="bg-info text-white"
                  />
                </div>
              </div>
            </motion.div>
          ) : null}
          {state === State.SUCCESS && (
            <motion.div
              className="flex-1 flex flex-col justify-center items-start space-y-2 w-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -100 }}
              key={"success"}
            >
              <div className={`flex-1 flex justify-center w-full`}>
                {showPopupState ? <AddToHomeScreen /> : null}
                {windowSize.innerWidth < 1024 ? mobileJSX : desktopJSX}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
