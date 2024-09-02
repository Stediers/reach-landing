"use client";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { Button } from "@components/ui/button";
import { CustomSheet } from "@components/CustomSheet";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import MobileLogin from "@components/sign-in/MobileNumber";
import { DialogClose } from "@components/ui/dialog";
import { SheetClose } from "@components/ui/sheet";
import { CustomerRoutes, State } from "@data/enums";
import { consoleMenus, userMenus } from "@data/menu";
import checkHere from "@helper_functions/check-path-nav";
import { eraseCookie } from "@helper_functions/cookie";
import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@components/ui/badge";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import MobileLoginPopup from "@components/sign-in/MobileLoginPopup";
import LoginPerks from "@components/LoginPerks";
import { Skeleton } from "@components/ui/skeleton";

export function NavBar({ showMobileNav }: { showMobileNav: boolean }) {
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const [pageState, setPageState] = useState<State>(State.LOADING);
  useEffect(() => {
    setPageState(State.LOADING);
    fetchMyProfile(false).then((response) => {
      if (response) {
        setResponse(response);
        setPageState(State.SUCCESS);
      } else {
        setPageState(State.ERROR);
      }
    });
  }, []);
  const currentPath = usePathname();
  const [onHome, setOnHome] = useState(false);
  const excludedPaths = ["/explore"];
  const scrollHandler = ({
    home,
    observer,
  }: {
    home: HTMLElement;
    observer: IntersectionObserver;
  }) => {
    if (home) {
      observer.observe(home);
      if (home.getBoundingClientRect().top < 0) {
        setOnHome(false);
      } else {
        setOnHome(true);
      }
    }
  };

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) {
      setOnHome(false);
      return;
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setOnHome(true);
            } else {
              setOnHome(false);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(home);
      window.addEventListener("scroll", () => {
        scrollHandler({ home, observer });
      });
    }
  }, [scrollHandler, setOnHome, currentPath, excludedPaths, onHome]);
  return showMobileNav ? (
    <div
      className={`sticky top-0 !z-50 ${
        onHome ? "!bg-[#F8F7F1]" : "bg-white  border-b shadow-sm"
      } flex flex-col w-full items-center justify-center dark:border-gray-700 transition-all duration-300`}
    >
      <div
        className={`flex flex-row items-center
        ${!excludedPaths.includes(currentPath) ? "max-w-7xl" : "w-full"} 
        justify-center w-full lg:px-10 px-5 py-3 transition-all duration-300`}
      >
        <div className="flex grid-cols-2 w-full justify-between">
          <Link className="flex flex-col w-fit shrink-0" href={"/"}>
            <p className="text-xl font-medium">ReachGig</p>
            <p className="text-sm text-gray-500 tracking-wide">
              Be your own Boss.
            </p>
          </Link>

          <DesktopProfile
            path={currentPath}
            pageState={pageState}
            response={response}
          />
          <MobileProfile
            pageState={pageState}
            path={currentPath}
            response={response}
          />
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`hidden sticky top-0 !z-50 ${
        onHome ? "!bg-[#F8F7F1]" : "bg-white  border-b shadow-sm"
      } lg:flex flex-col w-full items-center justify-center dark:border-gray-700 transition-all duration-300`}
      hidden
    >
      <div
        className={`flex flex-row items-center
    ${!excludedPaths.includes(currentPath) ? "max-w-7xl" : "w-full"} 
    justify-center w-full lg:px-10 px-5 py-3 transition-all duration-300`}
      >
        <div className="flex grid-cols-2 w-full justify-between">
          <Link className="flex flex-col w-fit shrink-0" href={"/"}>
            <p className="text-xl font-medium">ReachGig</p>
            <p className="text-sm text-gray-500 tracking-wide">
              Be your own Boss.
            </p>
          </Link>

          <DesktopProfile
            path={currentPath}
            pageState={pageState}
            response={response}
          />
          <MobileProfile
            pageState={pageState}
            path={currentPath}
            response={response}
          />
        </div>
      </div>
    </div>
  );
}

function DesktopProfile({
  path,
  response,
  pageState,
}: {
  path: string;
  response: FetchMyProfileResponse | null;
  pageState: State;
}) {
  const partnerURL = process.env.NEXT_PUBLIC_PARTNER_LINK;
  return (
    <div className="lg:flex hidden justify-end w-full" hidden>
      <div className="flex flex-row items-center justify-end w-full space-x-10">
        {partnerURL && (
          <Link
            href={`${partnerURL}/user/sign-in`}
            className="w-fit text-success font-medium hover:underline underline-offset-4"
          >
            Become a Partner
          </Link>
        )}
        {consoleMenus.map((menu) => (
          <Link
            className={`h-10 w-fit gap-x-3 flex items-center ${
              checkHere({ menuPath: menu.path, path })
                ? "text-primary"
                : "text-textsubtle"
            }`}
            href={menu.path}
            key={menu.path}
          >
            <p className="text-base font-medium">{menu.title}</p>
          </Link>
        ))}
        {response ? (
          <div className="w-fit">
            <CustomSheet
              title="Where to?"
              description="Navigate to your profile"
              triggerJSX={
                <div className="flex flex-row items-center justify-start w-full space-x-5">
                  <Avatar className="rounded-md !h-10 !w-10 border hover:cursor-pointer">
                    <AvatarImage
                      src={
                        response.user.imageUrl ||
                        "https://github.com/shadcn.png"
                      }
                      alt="Shad Mirza"
                      className="object-cover rounded-md"
                    />
                    <AvatarFallback>{response.user.name}</AvatarFallback>
                  </Avatar>
                </div>
              }
              footerJSX={
                <p className="text-sm text-gray-400 w-full text-center">
                  © 2023 ReachGig. All rights reserved.
                </p>
              }
            >
              <UserMenuDesktop response={response} />
            </CustomSheet>
          </div>
        ) : pageState === State.LOADING ? (
          <Button variant="outline" className="w-fit">
            Loading...
          </Button>
        ) : (
          <div className="w-fit">
            <MobileLoginPopup
              triggerJSX={
                <Button variant="outline" className="w-fit">
                  Login
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MobileProfile({
  path,
  response,
  pageState,
}: {
  path: string;
  response: FetchMyProfileResponse | null;
  pageState: State;
}) {
  const partnerURL = process.env.NEXT_PUBLIC_PARTNER_LINK;
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  return (
    <div className="lg:hidden flex flex-row items-center justify-end space-x-5 w-fit">
      {partnerURL && path === "/" && (
        <Link
          href={`${partnerURL}/user/sign-in`}
          className="w-full text-success font-medium"
        >
          Join Us
        </Link>
      )}
      <div className="w-fit">
        <CustomSheet
          title="Where to?"
          description="Navigate to your profile"
          triggerJSX={
            <Button variant="outline" size="icon">
              <AiOutlineMenu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          }
          footerJSX={
            <div className="flex flex-col items-start justify-start w-full space-y-5">
              <SheetClose asChild>
                <Button
                  variant="close"
                  onClick={() => {
                    console.log("Close");
                  }}
                >
                  Close
                </Button>
              </SheetClose>
              <p className="text-sm text-gray-400 w-full text-center">
                © 2023 ReachGig. All rights reserved.
              </p>
            </div>
          }
        >
          <div className="flex flex-col items-start justify-start w-full space-y-10">
            {consoleMenus.map((menu) => (
              <SheetClose asChild key={menu.path}>
                <Link
                  href={menu.path}
                  className="flex items-center w-full hover:text-primary space-x-2 justify-between bg-white rounded-md"
                  key={menu.path}
                >
                  <div className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full">
                    <div className="w-[10%]">{menu.icon}</div>
                    <p className="text-base font-medium w-full">{menu.title}</p>
                  </div>
                  {checkHere({ path: path || "", menuPath: menu.path }) && (
                    <Badge
                      title="New"
                      className="rounded-md text-xs bg-indigo-500"
                    >
                      Here
                    </Badge>
                  )}
                </Link>
              </SheetClose>
            ))}
            <LoadingWrapper
              pageState={pageState}
              showLogo={false}
              loadingTextClassName="text-md font-medium"
              loadingSVGClassName="w-6 h-6"
              errorJSX={
                <CustomSheet
                  title="Login"
                  description="Login to avail all features"
                  triggerJSX={
                    <div className="grid grid-cols-1 gap-10 w-full">
                      {userMenus.map((menu) => (
                        <SheetClose asChild key={menu.path}>
                          <div
                            className="flex items-center w-full hover:text-primary space-x-2 justify-between bg-white rounded-md"
                            key={menu.path}
                            onClick={() => setSelectedRoute(menu.path)}
                          >
                            <div className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full">
                              <div className="w-[10%]">{menu.icon}</div>
                              <p className="text-base font-medium w-full">
                                {menu.title}
                              </p>
                            </div>
                            {checkHere({
                              path: path || "",
                              menuPath: menu.path,
                            }) && (
                              <Badge
                                title="New"
                                className="rounded-md text-xs bg-indigo-500"
                              >
                                Here
                              </Badge>
                            )}
                          </div>
                        </SheetClose>
                      ))}
                    </div>
                  }
                  footerJSX={
                    <SheetClose asChild>
                      <Button
                        variant="link"
                        className="w-full text-textsubtle"
                        onClick={() => {
                          console.log("Login");
                        }}
                        id="mobile-login"
                      >
                        Do this Later
                      </Button>
                    </SheetClose>
                  }
                >
                  <MobileLogin
                    onVerifyOTP={() => {
                      const mobileLogin =
                        document.getElementById("mobile-login");
                      if (selectedRoute) {
                        window.location.href = selectedRoute;
                        if (mobileLogin) mobileLogin.click();
                      }
                    }}
                  />
                </CustomSheet>
              }
              loadingJSX={
                <div className="grid grid-cols-1 gap-10 w-full">
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </div>
              }
            >
              {response ? (
                <div className="grid grid-cols-1 gap-10 w-full">
                  {userMenus.map((menu) => (
                    <SheetClose asChild key={menu.path}>
                      <Link
                        href={menu.path}
                        className="flex items-center w-full hover:text-primary space-x-2 justify-between bg-white rounded-md"
                        key={menu.path}
                      >
                        <div className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full">
                          <div className="w-[10%]">{menu.icon}</div>
                          <p className="text-base font-medium w-full">
                            {menu.title}
                          </p>
                        </div>
                        {checkHere({
                          path: path || "",
                          menuPath: menu.path,
                        }) && (
                          <Badge
                            title="New"
                            className="rounded-md text-xs bg-indigo-500"
                          >
                            Here
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              ) : (
                <div className="px-1 w-full">
                  <MobileLogin />
                </div>
              )}
            </LoadingWrapper>
          </div>
        </CustomSheet>
      </div>
    </div>
  );
}

function UserMenuDesktop({ response }: { response: FetchMyProfileResponse }) {
  return (
    <div className="grid grid-cols-1 gap-5 w-full">
      {userMenus.map((menu) => (
        <DialogClose asChild key={menu.path}>
          <Link className="w-full" href={menu.path} key={menu.path}>
            <Setting
              icon={menu.icon}
              title={menu.title}
              titleClassName="text-base font-medium"
              subtitle={menu.subtitle}
            />
          </Link>
        </DialogClose>
      ))}
      <DialogClose asChild>
        <Link
          href="/user/sign-in"
          key="/user/sign-in"
          className="w-full"
          onClick={() => eraseCookie("user-token")}
        >
          <Setting
            icon={<LogOutIcon className="text-2xl" />}
            title="Logout"
            titleClassName="text-base font-medium"
            subtitle="Logout from your account"
          />
        </Link>
      </DialogClose>
    </div>
  );
}
