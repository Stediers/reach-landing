"use client";
import { FetchServiceCategoriesResponse } from "@api_functions/explore/fetch-service-categories";
import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import { eraseCookie } from "@api_functions/internal/cookie";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import Card from "@components/Card";
import { CustomSheet } from "@components/CustomSheet";
import { CustomDialog } from "@components/DialogPopup";
import { CustomDrawer } from "@components/DrawerPopup";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import Setting from "@components/Setting";
import RadioInput from "@components/input/RadioInput";
import TextInput from "@components/input/TextInput";
import { showSnackBar } from "@components/notifications/Snackbar";
import MobileLogin from "@components/sign-in/MobileNumber";
import { Button } from "@components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@components/ui/drawer";
import { Separator } from "@components/ui/separator";
import { SheetClose } from "@components/ui/sheet";
import { Skeleton } from "@components/ui/skeleton";
import {
  Gender,
  PreferredGender,
  ServiceCategory,
  SortType,
  State,
} from "@data/enums";
import { userMenus, menus, consoleMenus } from "@data/menu";
import { Category } from "@data/types";
import checkHere from "@helper_functions/check-path-nav";
import { DialogClose } from "@radix-ui/react-dialog";
import { Country, IState, State as StateType } from "country-state-city";
import { closest, distance } from "fastest-levenshtein";
import {
  Phone,
  AlignJustify,
  LogIn,
  ShieldCheck,
  ShieldX,
  LogOutIcon,
  LocateIcon,
  FilterIcon,
  Search,
  ArrowRightCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BiCarousel } from "react-icons/bi";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function ConsoleLayout({ children }: RootLayoutProps) {
  const category = useSearchParams().get("category") ?? null;
  const searchQuery = useSearchParams().get("search") ?? "";
  const customerGenderParams = useSearchParams().get("customerGender");
  const customerGender = customerGenderParams
    ? Object.values(PreferredGender).find(
        (item) => item === customerGenderParams
      )
    : PreferredGender.UNISEX;
  const partnerGenderParams = useSearchParams().get("partnerGender");
  const partnerGender = partnerGenderParams
    ? Object.values(Gender).find((item) => item === partnerGenderParams)
    : null;
  const typeParams = useSearchParams().get("range") ?? "rating";
  const sortParams = useSearchParams().get("sort");
  const sortType = sortParams
    ? Object.values(SortType).find((item) => item === sortParams)
    : SortType.HIGH_TO_LOW;
  const state = useSearchParams().get("state") ?? null;
  const getState = (state: string): IState | null => {
    if (!state) return null;
    const states = StateType.getStatesOfCountry("IN");
    return states.find((item) => item.name === state) ?? null;
  };
  const online = useSearchParams().get("online") === "false" ? false : true;

  const verified = useSearchParams().get("verified") ?? false;

  const [filter, setFilter] = useState<WordSearchServiceRequest["filter"]>({
    customerGender: customerGender ?? PreferredGender.UNISEX,
    online: online,
    partnerGender: partnerGender ?? null,
    sort: {
      range: sortType ?? SortType.HIGH_TO_LOW,
      type: typeParams === "rating" ? "rating" : "price",
    },
    state: state ? getState(state) : null,
    verified: verified === "true",
  });
  const selCategory =
    Object.values(ServiceCategory).find((item) => item === category) ?? null;

  const [selectedCategory, setSelectedCategory] =
    useState<ServiceCategory | null>(selCategory);

  const [searchState, setSearchState] = useState<string>(searchQuery);

  const path = usePathname();

  useEffect(() => {
    const search = document.getElementById("search");
    console.log("selectedCategory", selectedCategory);
    if (search) {
      search.click();
    }
  }, [filter, searchState, selectedCategory]);

  return (
    <div
      className="w-full flex flex-col justify-start items-center relative !z-50"
      vaul-drawer-wrapper=""
    >
      <Link
        href={{
          query: {
            verified: filter.verified,
            sort: JSON.stringify(filter.sort),
            state: filter.state?.name,
            online: filter.online,
            customerGender: filter.customerGender,
            partnerGender: filter.partnerGender,
            search: searchState,
            category: selectedCategory,
          },
        }}
        id="search"
        className="hidden"
        hidden
      >
        Search
      </Link>
      <div className="w-full flex flex-col justify-start items-center sticky top-0 z-50">
        <NavBar searchQuery={searchState} setSearchQuery={setSearchState} />
        {path === "/explore" ? (
          <DesktopFilter
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchState}
            setSearchQuery={setSearchState}
          />
        ) : null}
        {path === "/explore" ? (
          <MobileFilter
            categories={[]}
            filter={filter}
            setFilter={setFilter}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        ) : null}
      </div>
      {children}
    </div>
  );
}

function MobileServiceTypeDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  const indianStates = StateType.getStatesOfCountry(
    Country.getCountryByCode("IN")?.isoCode
  );
  const router = useRouter();
  const [state, setState] = useState<IState | null>(filter.state);
  const [optionsToShow, setOptionsToShow] = useState<string[]>(
    indianStates
      .map((state) => state.name)
      .sort((a, b) => {
        if (filter.state) {
          if (a === filter.state.name) return -1;
          if (b === filter.state.name) return 1;
        }
        return 0;
      })
  );
  const [text, setText] = useState(filter.state ? filter.state.name : "");
  useEffect(() => {
    if (text.length > 0) {
      //find the first three matches and set them to optionsToShow
      var match = indianStates.filter((option) =>
        option.name.toLowerCase().startsWith(text.toLowerCase())
      );
      if (match.length > 0) {
        setOptionsToShow(match.slice(0, 3).map((state) => state.name));
      } else {
        const closestMatch = closest(
          text,
          indianStates.map((state) => state.name)
        );
        if (!closestMatch) return setOptionsToShow([]);
        const distanceMatch = distance(text, closestMatch);
        if (distanceMatch > 3) return setOptionsToShow([]);
        const closestMatchIndex = indianStates.findIndex(
          (state) => state.name === closestMatch
        );
        const closestMatchOptions = indianStates
          .slice(closestMatchIndex, closestMatchIndex + 3)
          .map((state) => state.name);
        if (closestMatchOptions.length === 0) return setOptionsToShow([]);
        setOptionsToShow(closestMatchOptions);
      }
    } else {
      setOptionsToShow(
        indianStates
          .map((state) => state.name)
          //if state is already selected, set first element to that state
          .sort((a, b) => {
            if (filter.state) {
              if (a === filter.state.name) return -1;
              if (b === filter.state.name) return 1;
            }
            return 0;
          })
      );
    }
  }, [text]);
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Button
          variant="outline"
          className={`flex flex-row items-center justify-between w-full !rounded-none`}
        >
          {filter.state ? (
            <div className="flex flex-row items-center justify-between space-x-3 w-full">
              <p className="text-base overflow-hidden">{filter.state.name}</p>
              <LocateIcon className="w-6 h-6 shrink-0" />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between space-x-3 w-full">
              <p className="text-base">Everywhere</p>
              <LocateIcon className="w-6 h-6 shrink-0" />
            </div>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        onInteractOutside={() => {
          updateLocationFilter({ state, setFilter });
        }}
      >
        <DrawerHeader className="flex flex-col items-start w-full space-y-2">
          <DrawerTitle>
            <p className="text-xl font-medium">Where are you located?</p>
          </DrawerTitle>
          <DrawerDescription className="text-base font-normal text-left">
            The location you choose will help us show you the services available
            in your area.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex flex-col space-y-5 w-full">
          <TextInput
            value={text}
            onChange={(value) => {
              setText(value);
            }}
            placeholder="Search for a state"
            title="State"
          />
          {text.length === 0 ? (
            <DrawerClose asChild>
              <Card
                className="text-base flex !flex-row !space-y-0 !justify-between space-x-5 text-center w-full hover:cursor-pointer"
                onClick={() => {
                  setState(null);
                  updateLocationFilter({ state: null, setFilter });
                }}
              >
                <p>Everywhere</p>
                {!state ? (
                  <AiFillCheckCircle className="text-success w-6 h-6" />
                ) : (
                  <AiFillCheckCircle className="text-textsubtle w-6 h-6" />
                )}
              </Card>
            </DrawerClose>
          ) : null}
          {optionsToShow.length === 0 ? (
            <Card className="text-base text-center">
              <p>No results found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 gap-y-5 w-full max-w-full max-h-[30vh] overflow-y-scroll">
              {optionsToShow.map((value, index) => (
                <DrawerClose asChild key={index}>
                  <Card
                    className="text-base flex !flex-row !space-y-0 !justify-between space-x-5 text-center w-full"
                    key={index}
                    onClick={() => {
                      const selectedState = indianStates.find(
                        (item) => item.name === value
                      );
                      if (selectedState !== undefined) {
                        setState(selectedState);
                        updateLocationFilter({
                          state: selectedState,
                          setFilter,
                        });
                      }
                    }}
                  >
                    <p>
                      {value.length > 7 ? `${value.slice(0, 7)}...` : value}
                    </p>
                    {state && state.name === value ? (
                      <AiFillCheckCircle className="text-success w-6 h-6" />
                    ) : (
                      <AiFillCheckCircle className="text-textsubtle w-6 h-6" />
                    )}
                  </Card>
                </DrawerClose>
              ))}
            </div>
          )}
          <DrawerClose asChild>
            <Button
              variant="success"
              className="w-full"
              id="close"
              onClick={() => {
                updateLocationFilter({ state, setFilter });
              }}
            >
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DesktopServiceTypeDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  const indianStates = StateType.getStatesOfCountry(
    Country.getCountryByCode("IN")?.isoCode
  );
  const [optionsToShow, setOptionsToShow] = useState<string[]>(
    indianStates
      .map((state) => state.name)
      .sort((a, b) => {
        if (filter.state) {
          if (a === filter.state.name) return -1;
          if (b === filter.state.name) return 1;
        }
        return 0;
      })
  );
  const [text, setText] = useState(filter.state ? filter.state.name : "");
  useEffect(() => {
    if (text.length > 0) {
      //find the first three matches and set them to optionsToShow
      var match = indianStates.filter((option) =>
        option.name.toLowerCase().startsWith(text.toLowerCase())
      );
      if (match.length > 0) {
        setOptionsToShow(match.slice(0, 3).map((state) => state.name));
      } else {
        const closestMatch = closest(
          text,
          indianStates.map((state) => state.name)
        );
        if (!closestMatch) return setOptionsToShow([]);
        const distanceMatch = distance(text, closestMatch);
        if (distanceMatch > 3) return setOptionsToShow([]);
        const closestMatchIndex = indianStates.findIndex(
          (state) => state.name === closestMatch
        );
        const closestMatchOptions = indianStates
          .slice(closestMatchIndex, closestMatchIndex + 3)
          .map((state) => state.name);
        if (closestMatchOptions.length === 0) return setOptionsToShow([]);
        setOptionsToShow(closestMatchOptions);
      }
    } else {
      setOptionsToShow(
        indianStates
          .map((state) => state.name)
          //if state is already selected, set first element to that state
          .sort((a, b) => {
            if (filter.state) {
              if (a === filter.state.name) return -1;
              if (b === filter.state.name) return 1;
            }
            return 0;
          })
      );
    }
  }, [text]);
  return (
    <CustomDialog
      title="Where are you located?"
      maxWidth="!max-w-2xl"
      triggerJSX={
        <Button variant="outline" className="w-full gap-x-3">
          <LocateIcon className="w-5 h-5 shrink-0" />
          {filter.state ? `${filter.state.name.slice(0, 10)}...` : "Everywhere"}
        </Button>
      }
      closeId="close-location-desktop"
    >
      <TextInput
        value={text}
        onChange={(value) => {
          setText(value);
        }}
        placeholder="Search for a state"
        title="State"
      />
      {text.length === 0 ? (
        <Card
          className="text-base flex !flex-row !space-y-0 !justify-between space-x-5 text-center w-full hover:cursor-pointer"
          onClick={() => {
            updateLocationFilter({ state: null, setFilter });
            const close = document.getElementById("close-location-desktop");
            close?.click();
          }}
        >
          <p>Everywhere</p>
        </Card>
      ) : null}
      {optionsToShow.length === 0 ? (
        <Card className="text-base text-center">
          <p>No results found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-2 gap-y-5 w-full max-w-full max-h-[30vh] overflow-y-scroll">
          {optionsToShow.map((value, index) => (
            <Card
              className="text-base flex !flex-row !space-y-0 !justify-between space-x-5 text-center w-full"
              key={index}
              onClick={() => {
                const selectedState = indianStates.find(
                  (item) => item.name === value
                );
                if (selectedState) {
                  updateLocationFilter({ state: selectedState, setFilter });
                }
                const close = document.getElementById("close-location-desktop");
                close?.click();
              }}
            >
              <p>{value.length > 7 ? `${value.slice(0, 7)}...` : value}</p>
              {filter.state &&
              filter.state.name.toLowerCase() === value.toLowerCase() ? (
                <AiFillCheckCircle className="text-success w-6 h-6" />
              ) : (
                <AiFillCheckCircle className="text-textsubtle w-6 h-6" />
              )}
            </Card>
          ))}
        </div>
      )}
    </CustomDialog>
  );
}

function DesktopFilter({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      className="lg:grid grid-cols-6 w-full sticky top-0 gap-x-5 bg-white z-20 p-3 border-b hidden"
      hidden
    >
      <div className="col-span-2 flex flex-row space-x-5 items-center justify-center">
        <div className="flex flex-row space-x-5 items-center justify-center">
          <DesktopServiceTypeDropdown filter={filter} setFilter={setFilter} />
          <DesktopMoreFiltersDropdown filter={filter} setFilter={setFilter} />
          <SearchService
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    </div>
  );
}

function SearchService({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [search, setSearch] = useState(searchQuery);
  return (
    <CustomDialog
      title="Search for a service"
      description="Find the service you are looking for"
      triggerJSX={
        <Button variant="outline" className="w-full gap-x-3">
          <Search className="w-5 h-5 shrink-0" />
          <p className="text-base">Search</p>
        </Button>
      }
      footerJSX={
        <DialogClose asChild>
          <Button
            variant="success"
            className="w-full"
            onClick={() => setSearchQuery(search)}
          >
            Search
          </Button>
        </DialogClose>
      }
    >
      <TextInput
        value={search}
        onChange={(value) => setSearch(value)}
        placeholder="Search for a service"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchQuery(search);
          }
        }}
      />

      <LineHeader title="Tips" />
      <ul className="w-full space-y-5">
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">Use Keywords</p>
          <p className="text-sm text-gray-500">
            Use keywords to search for a service instead of a sentence. For
            example, &quot;plumber&quot; instead of &quot;I need a plumber&quot;
          </p>
        </li>
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">Dont use Location</p>
          <p className="text-sm text-gray-500">
            Use the location filter to find services near you, please refrain
            from searching for a location because it doesn&apos;t work yet.
          </p>
        </li>
        <li className="w-full flex flex-col space-y-1">
          <p className="text-base font-medium">
            Don&apos;t Search for Partners
          </p>
          <p className="text-sm text-gray-500">
            If you want to find a partner, use the &quot;Find a Partner&quot;
            page instead of searching for a service. This will help you find the
            right person for you.
          </p>
        </li>
      </ul>
    </CustomDialog>
  );
}

function MobileFilter({
  categories,
  filter,
  setFilter,
  setSelectedCategory,
  selectedCategory,
}: {
  categories: FetchServiceCategoriesResponse[];
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ServiceCategory | null>
  >;
  selectedCategory: ServiceCategory | null;
}) {
  return (
    <div className="w-full grid lg:hidden grid-cols-2 bg-white" hidden>
      <MobileServiceTypeDropdown filter={filter} setFilter={setFilter} />
      <MobileMoreFiltersDropdown
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

const updateLocationFilter = ({
  state,
  setFilter,
}: {
  state: IState | null;
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) => {
  setFilter((prev) => ({
    ...prev,
    state: state,
  }));
  //change location in url
  // const link = document.getElementById("search");
  // if (state && link) {
  //   link.click();
  // } else if (!state && link) {
  //   showSnackBar({
  //     message: "Searching everywhere",
  //     state: State.SUCCESS,
  //   });
  //   link.click();
  // } else {
  //   showSnackBar({
  //     message: "Error updating location",
  //     state: State.ERROR,
  //   });
  // }
};

function NavBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [response, setResponse] = useState<FetchMyProfileResponse | null>(null);
  const path = usePathname();
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
  const [search, setSearch] = useState(searchQuery);
  return (
    <div className="sticky top-0 z-50 bg-white border-b flex w-full items-center justify-center lg:px-10 px-5 py-3 dark:border-gray-700">
      <div className="grid grid-cols-2 w-full">
        <Link className="flex flex-col w-full" href={"/"}>
          <p className="text-xl font-medium">ReachGig</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Be your own Boss.
          </p>
        </Link>
        <div
          className="lg:flex items-center gap-x-10 w-full justify-end hidden"
          hidden
        >
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
            <div className="w-fit gap-x-3">
              <CustomDialog
                title="Where to?"
                maxWidth="!max-w-2xl"
                triggerJSX={
                  <div className="h-10 w-fit gap-x-3 flex items-center">
                    <AlignJustify className="shrink-0 w-4 h-4" />
                    <p className="text-base font-medium">My Profile</p>
                  </div>
                }
              >
                <UserMenuDesktop response={response} />
              </CustomDialog>
            </div>
          ) : pageState === State.LOADING ? (
            <Loading className="w-5 h-5" />
          ) : (
            <div className="w-fit gap-x-3">
              <CustomSheet
                title="Sign in"
                canClose
                description="Sign in to unlock more features"
                triggerJSX={
                  <Button variant="outline" className="w-fit">
                    Sign In
                  </Button>
                }
                footerJSX={
                  <p className="text-sm text-gray-400 w-full text-center">
                    © 2023 ReachGig. All rights reserved.
                  </p>
                }
              >
                {response ? (
                  <div className="flex flex-col items-start justify-start w-full space-y-5">
                    <div className="grid grid-cols-1 gap-4 w-full">
                      {consoleMenus.map((menu) => (
                        <SheetClose asChild key={menu.path}>
                          <Link
                            className={`flex flex-row items-center justify-between w-full space-x-5 ${
                              checkHere({
                                menuPath: menu.path,
                                path,
                              })
                                ? "text-primary"
                                : ""
                            }`}
                            href={menu.path}
                          >
                            <div className="flex flex-row items-center justify-start w-full space-x-5">
                              {menu.icon}
                              <p className="text-lg tracking-wide font-medium">
                                {menu.title}
                              </p>
                            </div>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                    <LineHeader title="Account" />
                    <div className="grid grid-cols-2 gap-4 w-full">
                      {userMenus.map((menu) => (
                        <SheetClose asChild key={menu.path}>
                          <Button
                            className="w-full"
                            key={menu.path}
                            asChild
                            variant="close"
                          >
                            <Link
                              className={`h-10 w-fit gap-x-3 flex items-center  ${
                                checkHere({
                                  menuPath: menu.path,
                                  path,
                                })
                                  ? "text-primary"
                                  : ""
                              }`}
                              href={menu.path}
                            >
                              {menu.icon}
                              <p className="text-base tracking-wide">
                                {menu.title}
                              </p>
                            </Link>
                          </Button>
                        </SheetClose>
                      ))}
                    </div>
                    <LineHeader title="Critical" />
                    <Button className="w-full space-x-5" variant="error">
                      <Link href="/user/sign-in">Logout</Link>
                      <LogOutIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="px-1 w-full">
                    <MobileLogin />
                  </div>
                )}
              </CustomSheet>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end space-x-5 w-full lg:hidden">
          <div className="w-10">
            <CustomSheet
              title="Search"
              canClose
              description="Find the service you are looking for"
              triggerJSX={
                <Button variant="outline" className="w-fit">
                  <Search className="w-5 h-5" />
                </Button>
              }
              footerJSX={
                <p className="text-sm text-gray-400 w-full text-center">
                  © 2023 ReachGig. All rights reserved.
                </p>
              }
            >
              <div className="w-full space-y-5 flex flex-col">
                <TextInput
                  value={search}
                  onChange={(value) => setSearch(value)}
                  placeholder="Search for a service"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuery(search);
                    }
                  }}
                />
                <SheetClose asChild>
                  <Link href={`/explore?search=${search}`}>
                    <Button
                      variant="success"
                      className="w-full"
                      onClick={() => setSearchQuery(search)}
                    >
                      Search
                    </Button>
                  </Link>
                </SheetClose>
              </div>
              <LineHeader title="Tips" />
              <ul className="w-full space-y-5">
                <li className="w-full flex flex-col space-y-1">
                  <p className="text-base font-medium">Use Keywords</p>
                  <p className="text-sm text-gray-500">
                    Use keywords to search for a service instead of a sentence.
                    For example, &quot;plumber&quot; instead of &quot;I need a
                    plumber&quot;
                  </p>
                </li>
                <li className="w-full flex flex-col space-y-1">
                  <p className="text-base font-medium">Dont use Location</p>
                  <p className="text-sm text-gray-500">
                    Use the location filter to find services near you, please
                    refrain from searching for a location because it
                    doesn&spao;t work yet.
                  </p>
                </li>
                <li className="w-full flex flex-col space-y-1">
                  <p className="text-base font-medium">
                    Don&apos;t Search for Partners
                  </p>
                  <p className="text-sm text-gray-500">
                    If you want to find a partner, use the &quot;Find a
                    Partner&quot; page instead of searching for a service. This
                    will help you find the right person for you.
                  </p>
                </li>
              </ul>
            </CustomSheet>
          </div>
          <div className="w-10">
            <CustomSheet
              title={response ? response.user.name : "Sign In"}
              canClose
              description={
                response
                  ? response.user.mobileNumber
                  : "Sign in to unlock more features"
              }
              triggerJSX={
                <Button variant="outline" className="w-fit">
                  <AlignJustify className="w-4 h-4" />
                </Button>
              }
              footerJSX={
                <p className="text-sm text-gray-400 w-full text-center">
                  © 2023 ReachGig. All rights reserved.
                </p>
              }
            >
              {response ? (
                <div className="flex flex-col items-start justify-start w-full space-y-5">
                  <div className="grid grid-cols-1 gap-4 w-full">
                    {consoleMenus.map((menu) => (
                      <SheetClose asChild key={menu.path}>
                        <Link
                          className={`flex flex-row items-center justify-between w-full space-x-5 ${
                            checkHere({
                              menuPath: menu.path,
                              path,
                            })
                              ? "text-primary"
                              : ""
                          }`}
                          href={menu.path}
                        >
                          <div className="flex flex-row items-center justify-start w-full space-x-5">
                            {menu.icon}
                            <p className="text-lg tracking-wide font-medium">
                              {menu.title}
                            </p>
                          </div>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <LineHeader title="Account" />
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {userMenus.map((menu) => (
                      <SheetClose asChild key={menu.path}>
                        <Button
                          className="w-full"
                          key={menu.path}
                          asChild
                          variant="close"
                        >
                          <Link
                            className={`h-10 w-fit gap-x-3 flex items-center  ${
                              checkHere({
                                menuPath: menu.path,
                                path,
                              })
                                ? "text-primary"
                                : ""
                            }`}
                            href={menu.path}
                          >
                            {menu.icon}
                            <p className="text-base tracking-wide">
                              {menu.title}
                            </p>
                          </Link>
                        </Button>
                      </SheetClose>
                    ))}
                  </div>
                  <LineHeader title="Critical" />
                  <Button className="w-full space-x-5" variant="error">
                    <Link href="/user/sign-in">Logout</Link>
                    <LogOutIcon className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="px-1 w-full">
                  <MobileLogin />
                </div>
              )}
            </CustomSheet>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserMenuDesktop({ response }: { response: FetchMyProfileResponse }) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
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
      {/* <DialogClose asChild>
        <Link href="/profile/verify" key="/profile/verify" className="w-full">
          <Setting
            icon={
              response.isVerified ? (
                <ShieldCheck className="w-8 h-8 text-success" />
              ) : (
                <ShieldX className="w-8 h-8" />
              )
            }
            title={response.isVerified ? "Verified" : "Get verified"}
            titleClassName="text-base font-medium"
            subtitle="Amplify your profile"
          />
        </Link>
      </DialogClose> */}
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

function MobileMoreFiltersDropdown({
  filter,
  setFilter,
  categories,
  setSelectedCategory,
  selectedCategory,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
  categories: FetchServiceCategoriesResponse[];
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ServiceCategory | null>
  >;
  selectedCategory: ServiceCategory | null;
}) {
  const [online, setOnline] = useState(filter.online);
  const [verified, setVerified] = useState(filter.verified);
  const [range, setRange] = useState(filter.sort.range);
  const [type, setType] = useState(filter.sort.type);
  const [partnerGender, setPartnerGender] = useState(filter.partnerGender);
  const [customerGender, setCustomerGender] = useState(filter.customerGender);

  return (
    <CustomDrawer
      title="More Filters"
      description="Filter your search results"
      triggerJSX={
        <Button variant="outline" className="w-full gap-x-3 !rounded-none">
          <FilterIcon className="w-5 h-5 shrink-0" />
          <p className="text-base">Filters</p>
        </Button>
      }
      footerJSX={
        <DrawerClose asChild>
          <Button
            variant="success"
            className="w-full"
            onClick={() => {
              updatePrimaryFilter({
                online,
                verified,
                range,
                type,
                setFilter,
                customerGender,
                partnerGender,
              });
            }}
          >
            Done
          </Button>
        </DrawerClose>
      }
    >
      <RadioInput
        title="Your Gender"
        options={[
          {
            onClick: () => {
              setCustomerGender(PreferredGender.MALE);
            },
            title: "Male",
            selected: customerGender === PreferredGender.MALE,
          },
          {
            onClick: () => {
              setCustomerGender(PreferredGender.FEMALE);
            },
            title: "Female",
            selected: customerGender === PreferredGender.FEMALE,
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Preferred Gender of Partner"
        options={[
          {
            onClick: () => {
              setPartnerGender(Gender.MALE);
            },
            title: "Male",
            selected: partnerGender === Gender.MALE,
          },
          {
            onClick: () => {
              setPartnerGender(Gender.FEMALE);
            },
            title: "Female",
            selected: partnerGender === Gender.FEMALE,
          },
          {
            onClick: () => {
              setPartnerGender(null);
            },
            title: "No Preference",
            selected: partnerGender === null,
            className: "col-span-2",
          },
        ]}
        cols="grid-cols-2"
      />

      <RadioInput
        title="Do you want to see online services?"
        options={[
          {
            onClick: () => {
              setOnline(true);
            },
            title: "Yes",
            selected: online,
          },
          {
            onClick: () => {
              setOnline(false);
            },
            title: "No",
            selected: !online,
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Do you want to see only verified partners?"
        options={[
          {
            onClick: () => {
              setVerified(true);
            },
            title: "Yes",
            selected: verified,
          },
          {
            onClick: () => {
              setVerified(false);
            },
            title: "No",
            selected: !verified,
          },
        ]}
        cols="grid-cols-2"
      />

      <RadioInput
        title="Sort by Price or Rating"
        options={[
          {
            onClick: () => {
              setType("price");
            },
            title: "Price",
            selected: type === "price",
          },
          {
            onClick: () => {
              setType("rating");
            },
            title: "Rating",
            selected: type === "rating",
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Range"
        options={[
          {
            onClick: () => {
              setRange(SortType.HIGH_TO_LOW);
            },
            title: "High to Low",
            selected: range === SortType.HIGH_TO_LOW,
          },
          {
            onClick: () => {
              setRange(SortType.LOW_TO_HIGH);
            },
            title: "Low to High",
            selected: range === SortType.LOW_TO_HIGH,
          },
        ]}
        cols="grid-cols-2"
      />
    </CustomDrawer>
  );
}

function DesktopMoreFiltersDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  const [online, setOnline] = useState(filter.online);
  const [verified, setVerified] = useState(filter.verified);
  const [range, setRange] = useState(filter.sort.range);
  const [type, setType] = useState(filter.sort.type);
  const [partnerGender, setPartnerGender] = useState(filter.partnerGender);
  const [customerGender, setCustomerGender] = useState(filter.customerGender);
  return (
    <CustomDialog
      title="More Filters"
      closeId="close-more-filters-desktop"
      footerJSX={
        <Button
          variant="success"
          className="w-full"
          onClick={() => {
            updatePrimaryFilter({
              online,
              verified,
              range,
              type,
              setFilter,
              customerGender,
              partnerGender,
            });

            const close = document.getElementById("close-more-filters-desktop");
            close?.click();
          }}
        >
          Done
        </Button>
      }
      maxWidth="!max-w-2xl"
      triggerJSX={
        <Button variant="outline" className="w-full gap-x-3">
          <FilterIcon className="w-5 h-5 shrink-0" />
          <p className="text-base">Filters</p>
        </Button>
      }
      onInteractOutside={() =>
        updatePrimaryFilter({
          online,
          verified,
          range,
          type,
          setFilter,
          customerGender,
          partnerGender,
        })
      }
    >
      <RadioInput
        title="Your Gender"
        options={[
          {
            onClick: () => {
              setCustomerGender(PreferredGender.MALE);
            },
            title: "Male",
            selected: customerGender === PreferredGender.MALE,
          },
          {
            onClick: () => {
              setCustomerGender(PreferredGender.FEMALE);
            },
            title: "Female",
            selected: customerGender === PreferredGender.FEMALE,
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Preferred Gender of Partner"
        options={[
          {
            onClick: () => {
              setPartnerGender(Gender.MALE);
            },
            title: "Male",
            selected: partnerGender === Gender.MALE,
          },
          {
            onClick: () => {
              setPartnerGender(Gender.FEMALE);
            },
            title: "Female",
            selected: partnerGender === Gender.FEMALE,
          },
          {
            onClick: () => {
              setPartnerGender(null);
            },
            title: "No Preference",
            selected: partnerGender === null,
          },
        ]}
        cols="grid-cols-3"
      />

      <RadioInput
        title="Do you want to see online services?"
        options={[
          {
            onClick: () => {
              setOnline(true);
            },
            title: "Yes",
            selected: online,
          },
          {
            onClick: () => {
              setOnline(false);
            },
            title: "No",
            selected: !online,
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Do you want to see only verified partners?"
        options={[
          {
            onClick: () => {
              setVerified(true);
            },
            title: "Yes",
            selected: verified,
          },
          {
            onClick: () => {
              setVerified(false);
            },
            title: "No",
            selected: !verified,
          },
        ]}
        cols="grid-cols-2"
      />

      <RadioInput
        title="Sort by Price or Rating"
        options={[
          {
            onClick: () => {
              setType("price");
            },
            title: "Price",
            selected: type === "price",
          },
          {
            onClick: () => {
              setType("rating");
            },
            title: "Rating",
            selected: type === "rating",
          },
        ]}
        cols="grid-cols-2"
      />
      <RadioInput
        title="Range"
        options={[
          {
            onClick: () => {
              setRange(SortType.HIGH_TO_LOW);
            },
            title: "High to Low",
            selected: range === SortType.HIGH_TO_LOW,
          },
          {
            onClick: () => {
              setRange(SortType.LOW_TO_HIGH);
            },
            title: "Low to High",
            selected: range === SortType.LOW_TO_HIGH,
          },
        ]}
        cols="grid-cols-2"
      />
    </CustomDialog>
  );
}

function updatePrimaryFilter({
  online,
  verified,
  range,
  type,
  setFilter,
  customerGender,
  partnerGender,
}: {
  online: boolean;
  verified: boolean;
  range: SortType;
  type: "price" | "rating";
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
  customerGender: PreferredGender;
  partnerGender: Gender | null;
}) {
  setFilter((prev) => ({
    ...prev,
    online: online,
    verified: verified,
    customerGender: customerGender,
    partnerGender: partnerGender,
    sort: {
      range: range,
      type: type,
    },
  }));
}
