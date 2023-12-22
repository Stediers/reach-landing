import React from "react";
import { GiHamburgerMenu, GiPoliceBadge } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import { useRouter } from "next/router";
import Logo from "../Logo";
import { menus } from "@data/menu";

export default function BottomBar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="sidebar"
          className="flex flex-col justify-end bg-black bg-opacity-50 w-full space-y-5 fixed h-screen bottom-0 z-50 lg:hidden"
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
              <Logo textStyle="text-white text-xl" wings="w-[8rem]" href="/" />
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
