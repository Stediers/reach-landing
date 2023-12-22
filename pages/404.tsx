import Setting from "@components/Setting";
import { menus } from "@data/menu";
import ListWrapper from "@wrapper/ListWrapper";
import { closestMatch } from "closest-match";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import lostIllustration from "@public/images/404-image.webp";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { State } from "@data/enums";
import Logo from "@components/Logo";
import LineHeader from "@components/LineHeader";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Main() {
  const [path, setPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      setPath(currentPath);
    }
  }, []);

  const match = getClosestMatch(path);
  return (
    <ConsoleWrapper
      title="404"
      state={State.SUCCESS}
      mobileJSX={<Mobile match={match} />}
      desktopJSX={<Desktop match={match} />}
    />
  );
}

function getClosestMatch(path: string) {
  const possiblePaths = [
    "/console/services",
    "/console/profile",
    "/console/price",
    "/console/appointments",
  ];

  const match = closestMatch(path, possiblePaths);

  return match;
}

function Mobile({ match }: { match: string | string[] | null }) {
  return (
    <MobileWrapper
      className="h-screen flex items-center flex-col justify-center space-y-5 px-5 pt-5"
      header="404"
    >
      <Logo
        wings="w-[10rem]"
        textStyle="text-2xl lg:text-3xl font-medium lg:mt-2"
      />
      <Image src={lostIllustration} className="w-64" alt="" />
      <p className="w-full text-lg text-center font-medium">
        Did you mean to go here?
      </p>
      {match && menus.find((menu) => menu.path == match) && (
        <Link
          href={menus.find((menu) => menu.path == match)!!.path}
          className="w-full"
        >
          <Setting
            title={menus.find((menu) => menu.path == match)!!.title}
            icon={menus.find((menu) => menu.path == match)!!.icon}
            subtitle={menus.find((menu) => menu.path == match)!!.subtitle}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
      )}
      <LineHeader title="Other" />
      <ListWrapper>
        {menus.map(
          (menu, index) =>
            match != menu.path && (
              <Link href={menu.path} key={index} className="w-full">
                <Setting
                  title={menu.title}
                  icon={menu.icon}
                  whileTap={{ scale: 0.95 }}
                />
              </Link>
            )
        )}
      </ListWrapper>
    </MobileWrapper>
  );
}

function Desktop({ match }: { match: string | string[] | null }) {
  return (
    <DesktopWrapper className="grid grid-cols-2 justify-items-center items-center">
      <Image src={lostIllustration} className="w-[40rem]" alt="" />
      <div className="flex flex-col items-start justify-center space-y-5 w-full">
        <p className="text-4xl font-medium">We couldn&apos;t find that page</p>
        <p className="text-lg font-medium">Did you mean to go to here?</p>
        {match && menus.find((menu) => menu.path == match) && (
          <Link
            href={menus.find((menu) => menu.path == match)!!.path}
            className="w-full"
          >
            <Setting
              title={menus.find((menu) => menu.path == match)!!.title}
              icon={menus.find((menu) => menu.path == match)!!.icon}
              subtitle={menus.find((menu) => menu.path == match)!!.subtitle}
              whileTap={{ scale: 0.95 }}
            />
          </Link>
        )}
        <LineHeader title="Other" />
        <ListWrapper>
          {menus.map(
            (menu, index) =>
              match != menu.path && (
                <Link href={menu.path} key={index} className="w-full">
                  <Setting
                    title={menu.title}
                    icon={menu.icon}
                    whileTap={{ scale: 0.95 }}
                  />
                </Link>
              )
          )}
        </ListWrapper>
      </div>
    </DesktopWrapper>
  );
}
