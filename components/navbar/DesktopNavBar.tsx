import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AiOutlineMenu } from "react-icons/ai";

type NavLinkType = {
  text: string;
  link: string;
};

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const menu: NavLinkType[] = [
    { text: "Pricing", link: "/pricing" },
    { text: "About Us", link: "/about" },
    { text: "Contact Us", link: "/contact" },
    { text: "Terms of Service", link: "/terms" },
  ];

  return (
    <motion.div
      className="flex flex-row justify-between items-center w-full py-5 px-7 sticky top-0 left-0 z-50 bg-white border-b border-gray"
      id="navbar"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, y: -100 }}
      key={"navbar"}
    >
      <div className="flex items-center justify-center lg:space-x-5 space-x-3 shrink-0">
        <Link className="lg:text-xl text-lg font-medium" href={"/"}>
          REACH
        </Link>
        <p className="lg:text-xl font-medium hidden lg:block">|</p>
        <div className="items-center justify-center space-x-5 hidden lg:flex">
          <p className="lg:text-lg text-md font-medium">
            Empowering the gig economy
          </p>
        </div>
      </div>
      <div className="lg:flex items-center justify-end space-x-5 w-full hidden">
        <div className="flex items-center justify-center space-x-7">
          {menu.map((link, i) => (
            <NavLink
              key={i}
              text={link.text}
              link={link.link}
              className="text-md font-medium"
            />
          ))}
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
                {menu.map((link, i) => (
                  <NavLinkMobile
                    key={i}
                    text={link.text}
                    link={link.link}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </div>
              {/* <div className="max-w-[200px] w-full">
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
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NavLinkMobile({
  setIsOpen,
  text,
  link,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  link: string;
}) {
  return (
    <div className="" onClick={() => setIsOpen(false)}>
      <NavLink text={text} link={link} />
    </div>
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
    <Link
      href={link}
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
    </Link>
  );
}
