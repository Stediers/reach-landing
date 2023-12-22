import Button from "@components/Button";
import Logo from "@components/Logo";
import { showYesNoPopup } from "@components/notifications/Popup";
import { menus } from "@data/menu";
import { warn } from "console";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { PropsWithChildren, useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MobileWrapper({
  className,
  children,
  header,
  backLink,
  showNavBar = true,
  warnBeforeLeaving = false,
}: PropsWithChildren<{
  className: string;
  header?: string;
  backLink?: string;
  showNavBar?: boolean;
  warnBeforeLeaving?: boolean;
}>) {
  return (
    <div
      className={`max-w-lg lg:hidden w-full flex flex-col space-y-3 items-center justify-start ${
        showNavBar ? "pb-20" : "pb-5"
      }`}
      id="mobile-wrapper"
    >
      {header && (
        <HeaderComponent
          title={header}
          backLink={backLink}
          warnBeforeLeaving={warnBeforeLeaving}
        />
      )}
      <div className={`w-full ${className} px-5 `}>{children}</div>
      {showNavBar && <BottomBar />}
    </div>
  );
}

function HeaderComponent({
  title,
  backLink,
  className,
  warnBeforeLeaving,
}: {
  title: string;
  backLink?: string;
  className?: string;
  warnBeforeLeaving?: boolean;
}) {
  const router = useRouter();
  const [link, setLink] = useState<string>(backLink || "");
  useEffect(() => {
    if (router.query && router.query.backLink) {
      setLink(router.query.backLink.toString());
    } else {
      setLink(backLink || "");
    }
  }, [router.query, backLink]);
  return (
    <div
      className={`self-center flex flex-col items-center justify-center space-y-2 w-full max-w-lg uppercase py-5 ${className}`}
    >
      {link.length > 0 && (
        <motion.div className="w-full px-5" whileTap={{ x: -5 }}>
          <div
            onClick={() => {
              if (warnBeforeLeaving) {
                showYesNoPopup({
                  title: "Are you sure?",
                  message: "You will lose all unsaved changes",
                }).then((res) => {
                  if (res) {
                    router.push(link);
                  } else {
                    return;
                  }
                });
              } else {
                router.push(link);
              }
            }}
          >
            <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
          </div>
        </motion.div>
      )}
      <div className="w-fit flex flex-col items-center space-y-2">
        <h1 className="text-xl font-medium text-center first-letter:capitalize">
          {title}
        </h1>
        <div className="h-px w-[80%] bg-primary" />
      </div>
    </div>
  );
}

function BottomBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="sidebar"
          className="flex flex-col justify-end bg-black bg-opacity-50 w-full space-y-5 fixed h-screen bottom-0 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="flex flex-col w-full gap-y-5  bg-black py-5 rounded-t-3xl px-5 border-[1px] border-white z-50 max-h-[80vh]"
            initial={{ y: +1000 }}
            animate={{ y: 0 }}
            exit={{ y: +1000 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center justify-center pb-5">
              <Logo textStyle="text-white text-xl" wings="w-[8rem]" />
              <p className="text-white text-sm text-center">
                © 2023, All Rights Reserved
              </p>
            </div>
            <div className="flex flex-col overflow-y-scroll hide-scrollbar gap-y-5 items-center justify-start">
              {menus.map((menu, index) => (
                <div
                  className={`flex items-center justify-start w-full ${
                    router.pathname === menu.path ? "text-info" : " text-white"
                  }`}
                  onClick={() => {
                    if (router.pathname === menu.path) {
                      setIsOpen(false);
                      return;
                    }
                    setIsOpen(false);
                  }}
                  key={index}
                >
                  {menu.icon}
                  <Button
                    text={menu.title}
                    link={menu.path}
                    key={index}
                    className="px-5 py-2 text-left rounded-lg !w-fit"
                  />
                </div>
              ))}
            </div>
            <Button
              text="Close"
              className="w-full bg-white shrink-0 py-3 rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            />
          </motion.div>
        </div>
      )}
      {!isOpen && (
        <GiHamburgerMenu
          className=" bg-black bottom-5 right-5 fixed rounded-full text-white p-3 w-12 h-12 z-50 lg:hidden"
          onClick={() => setIsOpen(true)}
        />
      )}
    </AnimatePresence>
  );
}
