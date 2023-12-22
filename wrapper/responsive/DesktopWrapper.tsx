import Button from "@components/Button";
import Card from "@components/Card";
import Logo from "@components/Logo";
import { Menu, SubMenu, menus } from "@data/menu";
import devLog from "@helper_functions/devLog";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { PropsWithChildren, useState, useEffect } from "react";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import Loading from "@components/Loading";
import router from "next/router";
import TextInput from "@components/input/TextInput";
import { eraseCookie } from "@api_functions/internal/cookie";

export default function DesktopWrapper({
  className,
  children,
  padding = true,
  sidebar = true,
  header,
}: PropsWithChildren<{
  className: string;
  padding?: boolean;
  maxWidth?: boolean;
  sidebar?: boolean;
  header?: React.ReactNode;
}>) {
  const [expanded, setExpanded] = useState<Menu["submenus"] | undefined>(
    undefined
  );
  return (
    <div
      className={`hidden lg:flex w-full flex-row justify-start items-start flex-1`}
      id="desktop-wrapper"
    >
      {sidebar ? (
        <div className="h-screen w-72 shrink-0 sticky top-0">
          <SideBar expanded={expanded} setExpanded={setExpanded} />
        </div>
      ) : null}
      {expanded ? (
        <ExpandedSideBar subMenus={expanded} setExpanded={setExpanded} />
      ) : null}
      <div
        className={`w-full relative min-h-full flex flex-col space-y-0`}
        id="desktop-wrapper-content"
      >
        {header ? (
          <div className="flex flex-row items-center justify-start w-full bg-white border-b-[1px] border-gray sticky top-0 py-5 px-5 z-50">
            <p className="text-lg font-medium">{header}</p>
          </div>
        ) : null}
        <div
          className={`w-full relative min-h-full ${className} ${
            padding ? "py-6 px-5" : ""
          } `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function SideBar({
  expanded,
  setExpanded,
}: {
  expanded?: Menu["submenus"];
  setExpanded: React.Dispatch<React.SetStateAction<Menu["submenus"]>>;
}) {
  return (
    <motion.div
      className={`bg-white min-h-full space-y-10 w-full flex flex-col justify-between items-center pt-10 pb-5 px-5 ${
        !expanded ? "border-r-[1px] border-gray" : ""
      }`}
    >
      <div className="flex flex-col space-y-10 w-full">
        <div className="self-center flex flex-col space-y-1 items-center">
          <Logo textStyle="text-xl font-medium" wings="w-[10rem]" href="/" />
        </div>
        <div className="flex flex-col space-y-3 w-full items-center">
          <p className="text-base text-textsubtle">Menu</p>
          <div className="flex flex-col space-y-5 w-full">
            {menus.map((menu, index) => (
              <SidebarOption
                menu={menu}
                key={index}
                setExpanded={setExpanded}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        text="Logout"
        className="bg-primary text-white font-medium"
        onClick={() => {
          eraseCookie("gig-token");
          router.push("/user/sign-in");
        }}
        icon={<LuLogOut className="w-5 h-5" />}
      />
    </motion.div>
  );
}

function SidebarOption({
  menu,
  setExpanded,
}: {
  menu: Menu;
  setExpanded: React.Dispatch<React.SetStateAction<Menu["submenus"]>>;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <motion.div
      className="w-full"
      onHoverStart={() => {
        if (menu.submenus) {
          devLog("expanded", menu.submenus);
          setExpanded(menu.submenus);
        } else {
          setExpanded(undefined);
        }
      }}
    >
      {menu.submenus ? (
        <Card className="!p-2 items-center flex !flex-row space-x-3 !space-y-0 hover:cursor-pointer hover:scale-105 transition-all duration-200">
          {menu.icon}
          <p className="text-base font-medium">{menu.title}</p>
        </Card>
      ) : (
        <Link
          href={menu.path}
          passHref
          onClick={() => {
            if (menu.path === router.pathname) {
              setLoading(false);
            } else setLoading(true);
          }}
          target={menu.newTab ? "_blank" : undefined}
          rel="noopener noreferrer"
        >
          <Card className="!p-2 items-center flex !flex-row space-x-3 !space-y-0 hover:cursor-pointer hover:scale-105 transition-all duration-200">
            {loading ? <Loading className="w-7 h-7" /> : menu.icon}
            <p className="text-base font-medium">{menu.title}</p>
          </Card>
        </Link>
      )}
    </motion.div>
  );
}

function ExpandedSideBar({
  subMenus,
  setExpanded,
}: {
  subMenus: SubMenu[];
  setExpanded: React.Dispatch<React.SetStateAction<Menu["submenus"]>>;
}) {
  console.log(subMenus);
  return (
    <motion.div
      className="fixed top-[4rem] left-72 z-50 w-96 h-screen bg-white px-10 py-10 space-y-5 flex flex-col justify-start items-start border-r-[1px] border-gray"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      onHoverEnd={() => {
        setExpanded(undefined);
      }}
    >
      <AnimatePresence mode="wait">
        {subMenus.map((subMenu, index) => (
          <ExpandedOption subMenu={subMenu} key={subMenu.path} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function ExpandedOption({ subMenu }: { subMenu: SubMenu }) {
  return (
    <Link
      className="w-full"
      href={subMenu.path}
      target={subMenu.newTab ? "_blank" : undefined}
      rel="noopener noreferrer"
    >
      <motion.div
        className="w-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      >
        <Card className="!px-5 items-center justify-between flex !flex-row space-x-3 !space-y-0 hover:cursor-pointer hover:scale-105 transition-all duration-200">
          <div className="flex flex-col space-y-1">
            <p className="text-md font-medium">{subMenu.title}</p>
            <p className="text-sm text-textsubtle">{subMenu.description}</p>
          </div>
          <IoMdArrowRoundForward className="w-5 h-5" />
        </Card>
      </motion.div>
    </Link>
  );
}
