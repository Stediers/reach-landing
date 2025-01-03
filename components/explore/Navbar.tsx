"use client";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { Button } from "@components/ui/button";
import { CustomSheet } from "@components/CustomSheet";
import Setting from "@components/Setting";
import MobileLogin from "@components/sign-in/MobileNumber";
import { DialogClose } from "@components/ui/dialog";
import { SheetClose } from "@components/ui/sheet";
import { CustomerRoutes, State } from "@data/enums";
import { consoleMenus, userMenus } from "@data/menu";
import checkHere from "@helper_functions/check-path-nav";
import { eraseCookie } from "@helper_functions/cookie";
import { Bell, ChevronDownIcon, LogOutIcon, User2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Badge } from "@components/ui/badge";
import { AiFillCheckSquare, AiOutlineMenu } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import MobileLoginPopup from "@components/sign-in/MobileLoginPopup";
import { Skeleton } from "@components/ui/skeleton";
import AppDownload from "@components/DownloadApp";
import { getCityStateCountry } from "@helper_functions/getIpAddress";
import { GoLocation } from "react-icons/go";
import { CustomDialog } from "@components/DialogPopup";
import { BiDownArrow } from "react-icons/bi";
import Loading from "@components/Loading";
import {
  fetchAvilableCities,
  FetchAvilableCitiesResponse,
} from "@api_functions/explore/fetch-available-cities";
import Card from "@components/Card";
import { setItemsToLocalStorage } from "@api_functions/internal/local-storage";
import { getItemsFromLocalStorage } from "@helper_functions/local-storage";

export function NavBar({ showMobileNav }: { showMobileNav: boolean }) {
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const [pageState, setPageState] = useState<State>(State.LOADING);
  useEffect(() => {
    const scrollToHashElement = () => {
      const hash = window.location.hash;
      console.log("hash", hash);
      if (!hash) return;

      const elementId = hash.slice(1); // Remove the # symbol
      const element = document.getElementById(elementId);

      console.log("element", element);

      if (element) {
        // Add a small delay to ensure the element is rendered
        setTimeout(() => {
          const headerOffset = 100; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    };

    scrollToHashElement();
  }, []);
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
  const excludedPaths = ["/explore", "/"];
  const [city, setCity] = useState<string | null>(null);
  return (
    <div
      className={`sticky top-0 !z-50 bg-white  border-b flex flex-col w-full items-center justify-center dark:border-gray-700 transition-all duration-300`}
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
          <div className="lg:hidden flex flex-row items-center justify-end space-x-5 w-fit">
            {/* <SelectCity city={city} setCity={setCity} /> */}
            <MobileProfile
              pageState={pageState}
              path={currentPath}
              response={response}
              city={city}
            />
          </div>
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
  return (
    <div className="lg:flex hidden justify-end w-full" hidden>
      <div className="flex flex-row items-center justify-end w-full space-x-10">
        <AppDownload
          triggerJSX={
            <p className="text-success font-medium hover:underline underline-offset-4">
              Become a Partner
            </p>
          }
        />
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
  city,
}: {
  path: string;
  response: FetchMyProfileResponse | null;
  pageState: State;
  city: string | null;
}) {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  return (
    <div className="lg:hidden flex flex-row items-center justify-end space-x-5 w-fit">
      {response ? <div className="w-fit"></div> : null}
      <div className="w-fit">
        <CustomSheet
          maxWidth="w-[80%]"
          title="Where to?"
          description="Navigate to your profile"
          triggerJSX={
            response ? (
              <div className="relative">
                <Avatar className="rounded-md !h-10 !w-10 border hover:cursor-pointer">
                  <AvatarImage
                    src={
                      response.user.imageUrl || "https://github.com/shadcn.png"
                    }
                    alt="Shad Mirza"
                    className="object-cover rounded-md"
                  />
                </Avatar>
                {response.requests.length > 0 && (
                  <p className="absolute -top-3 -right-3 z-10 bg-red-500 text-white rounded-full text-xs px-2 aspect-square flex items-center justify-center">
                    {response.requests.length}
                  </p>
                )}
              </div>
            ) : (
              <Button variant="outline" size="icon">
                <AiOutlineMenu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )
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
            {response && (
              <div className="flex flex-col items-center justify-start w-full space-y-5">
                <div className="flex flex-col items-center justify-center w-full space-y-3">
                  <Avatar className="rounded-md !h-40 !w-40 border hover:cursor-pointer">
                    <AvatarImage
                      src={
                        response.user.imageUrl ||
                        "https://github.com/shadcn.png"
                      }
                      alt="Shad Mirza"
                      className="object-cover rounded-md"
                    />
                  </Avatar>
                  <div className="flex flex-col items-center justify-center w-full space-y-2">
                    <p className="text-xl font-medium w-full text-center">
                      {response.user.name}
                    </p>
                    <p className="text-sm text-gray-500 w-full text-center">
                      {response.user.mobileNumber}
                    </p>
                  </div>
                  <Link
                    href={`/console/profile/edit`}
                    passHref
                    className="w-full"
                  >
                    <Button variant="dark">Edit</Button>
                  </Link>
                </div>
              </div>
            )}
            {response && response.requests.length > 0 && (
              <SheetClose asChild>
                <Link
                  className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full"
                  href={CustomerRoutes.APPOINTMENT_REQUESTS}
                >
                  <div className="w-[10%]">
                    <Bell className="h-[1.3rem] w-[1.3rem]" />
                  </div>
                  <p className="text-base font-medium w-full">
                    Appointment Requests
                  </p>
                  <Badge title="New" className="rounded-md text-xs bg-primary">
                    {response.requests.length}
                  </Badge>
                </Link>
              </SheetClose>
            )}
            <SheetClose asChild>
              <Link
                className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full"
                href={CustomerRoutes.VENDORS_BY_CITY.replace(
                  "[city]",
                  city || "chennai"
                )}
              >
                <div className="flex items-center justify-start space-x-5 cursor-pointer hover:text-primary w-full">
                  <div className="w-[10%]">
                    <User2 className="h-[1.3rem] w-[1.3rem]" />
                  </div>
                  <p className="text-base font-medium w-full">
                    Explore Vendors
                  </p>
                </div>
                {checkHere({
                  path: path || "",
                  menuPath: "/vendors",
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

function SelectCity({
  city,
  setCity,
}: {
  city: string | null;
  setCity: Dispatch<SetStateAction<string | null>>;
}) {
  const [state, setState] = useState<State>(State.LOADING);
  const [cities, setCities] = useState<FetchAvilableCitiesResponse | null>(
    null
  );
  const params = useParams();
  useEffect(() => {
    if (!params) return;
    setState(State.LOADING);
    const cityParam = params.city ? params.city.toString() : null;
    const designationParam = params.designation
      ? params.designation.toString()
      : undefined;
    Promise.all([
      getCityStateCountry(cityParam).then((res) => {
        if (res && res.city) {
          setCity(res.city);
        } else {
          setCity(null);
        }
      }),
      fetchAvilableCities(designationParam).then((res) => {
        if (res) {
          setCities(res);
        } else {
          setCities(null);
        }
      }),
    ]).then(() => {
      setState(State.SUCCESS);
    });
  }, []);
  const [designation, setDesignation] = useState<string | null>(null);
  useEffect(() => {
    console.log("params", params);
    if (!params.city || typeof params.city !== "string") {
      setCity(null);
      return;
    }
    if (!params.designation || typeof params.designation !== "string") {
      setDesignation(null);
    } else {
      setDesignation(params.designation);
    }
    setCity(params.city);
  }, [params.designation, params.city]);
  const path = designation
    ? `/vendors/[city]/${designation}`
    : `/vendors/[city]`;
  console.log("path", path);
  return state === State.SUCCESS ? (
    <CustomDialog
      title="Select City"
      triggerJSX={
        <Button variant="outline" className="space-x-2">
          <p className="text-base font-medium">{city || "Select City"}</p>
        </Button>
      }
      closeId="close-city-select"
    >
      <div className="grid grid-cols-2 gap-5 w-full">
        {cities
          ? cities.cities.map((cityData) => (
              <Link
                key={cityData.name}
                href={path.replace("[city]", cityData.name.toLowerCase())}
                onClick={() => {
                  const doc = document.getElementById("close-city-select");
                  if (doc) {
                    doc.click();
                  }
                }}
              >
                <Card key={cityData.name}>
                  <div className="flex flex-row items-center space-x-2 justify-between">
                    <p className="font-medium">
                      {cityData.name.charAt(0).toUpperCase() +
                        cityData.name.slice(1)}
                    </p>
                    {city?.toLowerCase() === cityData.name.toLowerCase() && (
                      <AiFillCheckSquare className="text-success text-xl" />
                    )}
                  </div>
                </Card>
              </Link>
            ))
          : null}
      </div>
    </CustomDialog>
  ) : state === State.LOADING ? (
    <div className="relative inline-flex space-x-2">
      <p className="text-sm font-light">Locating...</p>
    </div>
  ) : null;
}
