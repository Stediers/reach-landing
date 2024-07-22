"use client";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { Button } from "@components/ui/button";
import { CustomSheet } from "@components/CustomSheet";
import LineHeader from "@components/LineHeader";
import Loading from "@components/Loading";
import Setting from "@components/Setting";
import MobileLogin from "@components/sign-in/MobileNumber";
import { DialogClose } from "@components/ui/dialog";
import { SheetClose } from "@components/ui/sheet";
import { Gender, PreferredGender, SortType, State } from "@data/enums";
import { consoleMenus, userMenus } from "@data/menu";
import checkHere from "@helper_functions/check-path-nav";
import { eraseCookie } from "@helper_functions/cookie";
import {
  IndianRupee,
  LocateIcon,
  LogOutIcon,
  Search,
  ShieldAlert,
  ShieldCheck,
  Star,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import TextInput from "@components/input/TextInput";
import { State as StateType } from "country-state-city";
import { Badge } from "@components/ui/badge";
import {
  BsGenderAmbiguous,
  BsGenderFemale,
  BsGenderMale,
} from "react-icons/bs";
import { FcDown } from "react-icons/fc";
import { AiFillCheckCircle, AiOutlineMenu } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { debounce } from "lodash";
import { updateFilter } from "@helper_functions/explore/update-filter";
import { getStateFromLocation } from "@helper_functions/explore/detectLocation";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { Skeleton } from "@components/ui/skeleton";
import useDidMountEffect from "@helper_functions/use-did-mount-effetc";
import { showSnackBar } from "@components/notifications/Snackbar";

function updateFilterRouter({
  filter,
  router,
  currentPath,
  setPageNavState,
}: {
  filter: WordSearchServiceRequest;
  router: AppRouterInstance;
  currentPath: string;
  setPageNavState: React.Dispatch<React.SetStateAction<State>>;
}) {
  const createLink = currentPath.split("?")[0] + "?";
  const searchParams = new URLSearchParams();
  searchParams.set("search", filter.query);
  searchParams.set("state", filter.filter.state ? filter.filter.state : "");
  searchParams.set("customerGender", filter.filter.customerGender);
  searchParams.set("partnerGender", filter.filter.partnerGender ?? "");
  searchParams.set("range", filter.filter.sort.range);
  searchParams.set("sort", filter.filter.sort.type);
  searchParams.set("online", filter.filter.online.toString());
  searchParams.set("verified", filter.filter.verified.toString());
  setPageNavState(State.SUCCESS);
  router.replace(createLink + searchParams.toString());
  // router.push(createLink + searchParams.toString());
  // router.prefetch(createLink + searchParams.toString());

  const link = createLink + searchParams.toString();

  showSnackBar({
    message: "Redirecting to " + link,
    state: State.SUCCESS,
  });

  // window.history.pushState({}, "", link);

  // const linkButton = document.getElementById("explore-link");
  // if (linkButton) {
  //   linkButton.setAttribute("href", link);
  //   linkButton.click();
  // }
}

const debouncedUpdateFilterRouter = debounce(updateFilterRouter, 500);

export function NavBar() {
  const searchParams = useSearchParams();

  const currentPath = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState<WordSearchServiceRequest["filter"]>(
    updateFilter({ searchParams })
  );

  const searchQuery = searchParams.get("search") ?? "";

  const [searchState, setSearchState] = useState<string>(searchQuery);

  const [pageNavState, setPageNavState] = useState<State>(State.SUCCESS);

  useDidMountEffect(() => {
    setPageNavState(State.LOADING);
    console.log("searchState: ", searchState);
    debouncedUpdateFilterRouter({
      filter: {
        filter,
        category: null,
        pagination: {
          limit: 10,
          page: 1,
        },
        query: searchState,
      },
      router: router,
      currentPath: currentPath,
      setPageNavState,
    });
  }, [searchState, filter]);

  // useEffect(() => {
  //   setFilter(updateFilter({ searchParams }));
  // }, []);
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

  return (
    <div className="sticky top-0 z-50 bg-white flex flex-col w-full items-center justify-center dark:border-gray-700">
      <Link hidden className="w-full hidden" href="/explore" id="explore-link">
        Explore
      </Link>
      <div className="flex flex-row items-center border-b justify-center w-full lg:px-10 px-5 py-3">
        <div className="lg:grid flex grid-cols-2 w-full justify-between">
          <Link className="flex flex-col w-fit" href={"/explore"}>
            <h1 className="text-xl font-medium">ReachGig</h1>
            <h2 className="text-sm text-gray-500 tracking-wide">
              Be your own Boss.
            </h2>
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
      {currentPath === "/explore" && (
        <LoadingWrapper
          pageState={pageNavState}
          loadingJSX={
            <div className="flex gap-x-5 z-20 p-3 border justify-start w-full overflow-x-scroll">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="w-40 h-10 shrink-0" key={index} />
              ))}
            </div>
          }
        >
          <Filter
            filter={filter}
            setFilter={setFilter}
            searchQuery={searchState}
            setSearchQuery={setSearchState}
          />
        </LoadingWrapper>
      )}
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
    <div className="lg:flex hidden justify-end" hidden>
      {response ? (
        <div className="flex flex-row items-center justify-end w-full space-x-10">
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
        </div>
      ) : pageState === State.LOADING ? (
        <div
          className="lg:flex items-center gap-x-10 w-full justify-end hidden"
          hidden
        >
          <Link
            className={`h-10 w-fit gap-x-3 flex items-center ${
              checkHere({ menuPath: "/explore", path })
                ? "text-primary"
                : "text-textsubtle"
            }`}
            href="/explore"
            key="/explore"
          >
            <p className="text-base font-medium">Explore</p>
          </Link>
          <Avatar className="rounded-md !h-10 !w-10 border hover:cursor-pointer flex justify-center">
            <Loading className="w-4 h-4" type="circle" />
          </Avatar>
        </div>
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
  return (
    <div className="lg:hidden flex flex-row items-center justify-end space-x-5 w-fit">
      {response ? (
        <CustomSheet
          title="Where to?"
          description="Navigate to your profile"
          triggerJSX={
            <Button variant="outline" size="icon">
              <AiOutlineMenu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          }
          footerJSX={
            <p className="text-sm text-gray-400 w-full text-center">
              © 2023 ReachGig. All rights reserved.
            </p>
          }
          maxWidth="w-[80%]"
        >
          <div className="flex flex-col items-start justify-start w-full space-y-10">
            {response ? (
              consoleMenus.map((menu) => (
                <SheetClose asChild key={menu.path}>
                  <Link
                    href={menu.path}
                    className="flex items-center w-full hover:text-primary space-x-2 justify-between bg-white rounded-md"
                    key={menu.path}
                  >
                    <div className="flex items-center space-x-5 cursor-pointer hover:text-primary">
                      <div className="w-[20%]">{menu.icon}</div>
                      <p className="text-base font-medium w-full">
                        {menu.title}
                      </p>
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
              ))
            ) : (
              <div className="px-1 w-full">
                <MobileLogin />
              </div>
            )}
            <LineHeader title="Account" />
            <div className="grid grid-cols-1 gap-10 w-full">
              {userMenus.map((menu) => (
                <Link
                  href={menu.path}
                  className="flex items-center w-full hover:text-primary space-x-2 justify-between bg-white rounded-md"
                  key={menu.path}
                >
                  <div className="flex items-center space-x-5 cursor-pointer hover:text-primary">
                    <div className="w-[20%]">{menu.icon}</div>
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
              ))}
            </div>
          </div>
        </CustomSheet>
      ) : pageState === State.LOADING ? (
        <Avatar className="rounded-md !h-10 !w-10 border hover:cursor-pointer flex justify-center">
          <Loading className="w-4 h-4" type="circle" />
        </Avatar>
      ) : (
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
                          path: "",
                        })
                          ? "text-primary"
                          : "text-textsubtle"
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
                    <Link
                      className={`h-10 w-fit gap-x-3 flex items-center ${
                        checkHere({
                          menuPath: menu.path,
                          path: "",
                        })
                          ? "text-primary"
                          : "text-textsubtle"
                      }`}
                      href={menu.path}
                    >
                      {menu.icon}
                      <p className="text-base tracking-wide">{menu.title}</p>
                    </Link>
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
      )}
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

function Filter({
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
      className="flex justify-center w-full gap-x-5 bg-white z-20 p-3 px-5 lg:px-10 border-b"
      hidden
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex lg:flex-row flex-col items-center justify-start lg:space-x-5 gap-y-5 w-full">
          <SearchServiceDesktop
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="lg:max-w-[70%] w-full flex flex-row items-center justify-start gap-x-5 overflow-x-scroll hide-scrollbar">
            <SearchServiceMobile
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <SelectState setFilter={setFilter} filter={filter} />
            <Online filter={filter} setFilter={setFilter} />
            {/* <Verified filter={filter} setFilter={setFilter} /> */}
            <SortTypeDropdown filter={filter} setFilter={setFilter} />
            <GenderDropdown filter={filter} setFilter={setFilter} />
          </div>
        </div>
      </div>
    </div>
  );
}

function GenderDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  return (
    <div className="w-fit">
      <CustomSheet
        title="Partner Preference"
        description="Select your partner's gender"
        triggerJSX={
          <Button variant="outline">
            {filter.partnerGender
              ? filter.partnerGender === Gender.MALE
                ? "Male"
                : "Female"
              : "Select"}
            <span className="ml-3">
              <FcDown className="w-5 h-5" />
            </span>
          </Button>
        }
        footerJSX={
          <p className="text-sm text-gray-400 w-full text-center">
            © 2023 ReachGig. All rights reserved.
          </p>
        }
      >
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <SheetClose asChild>
            <Setting
              title="Male"
              subtitle="Click to see"
              icon={
                filter.partnerGender && filter.partnerGender === Gender.MALE ? (
                  <AiFillCheckCircle className="w-6 h-6" />
                ) : (
                  <BsGenderMale className="w-6 h-6" />
                )
              }
              onClick={() => {
                setFilter({
                  ...filter,
                  partnerGender: Gender.MALE,
                });
              }}
            />
          </SheetClose>
          <SheetClose asChild>
            <Setting
              title="Female"
              subtitle="Click to see"
              icon={
                filter.partnerGender &&
                filter.partnerGender === Gender.FEMALE ? (
                  <AiFillCheckCircle className="w-6 h-6" />
                ) : (
                  <BsGenderFemale className="w-6 h-6" />
                )
              }
              onClick={() => {
                setFilter({
                  ...filter,
                  partnerGender: Gender.FEMALE,
                });
              }}
            />
          </SheetClose>
          <SheetClose asChild>
            <Setting
              title="No Preference"
              subtitle="Click to see"
              icon={
                !filter.partnerGender ? (
                  <AiFillCheckCircle className="w-6 h-6" />
                ) : (
                  <BsGenderAmbiguous className="w-6 h-6" />
                )
              }
              onClick={() => {
                setFilter({
                  ...filter,
                  partnerGender: null,
                });
              }}
            />
          </SheetClose>
        </div>
      </CustomSheet>
    </div>
  );
}

function Online({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  return (
    <div className="w-fit">
      <Button
        onClick={() => {
          setFilter({
            ...filter,
            online: !filter.online,
          });
        }}
        variant="outline"
      >
        {filter.online ? "Online" : "Offline"}
        {filter.online ? (
          <VideoIcon className="w-6 h-6 ml-3" />
        ) : (
          <VideoOffIcon className="w-6 h-6 ml-3" />
        )}
      </Button>
    </div>
  );
}

function Verified({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  return (
    <div className="w-fit">
      <Button
        onClick={() => {
          setFilter({
            ...filter,
            verified: !filter.verified,
          });
        }}
        variant="outline"
      >
        {filter.verified ? "Verified" : "Unverified"}
        {filter.verified ? (
          <ShieldCheck className="w-6 h-6 ml-3" />
        ) : (
          <ShieldAlert className="w-6 h-6 ml-3" />
        )}
      </Button>
    </div>
  );
}

function YourGenderDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  return (
    <div className="w-fit">
      <div
        className="flex flex-row items-center justify-start w-full space-x-3 hover:cursor-pointer"
        onClick={() => {
          setFilter({
            ...filter,
            customerGender:
              filter.customerGender === PreferredGender.MALE
                ? PreferredGender.FEMALE
                : PreferredGender.MALE,
          });
        }}
      >
        <p className="text-base font-medium">
          {filter.customerGender === PreferredGender.MALE ? "Male" : "Female"}
        </p>
        {filter.customerGender === PreferredGender.MALE ? (
          <BsGenderMale className="w-5 h-5 ml-3 text-info" />
        ) : (
          <BsGenderFemale className="w-5 h-5 ml-3 text-pink-500" />
        )}
      </div>
    </div>
  );
}

function SortTypeDropdown({
  filter,
  setFilter,
}: {
  filter: WordSearchServiceRequest["filter"];
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
}) {
  const [sort, setSort] = useState(filter.sort.type);
  return (
    <div className="w-fit">
      <Button
        onClick={() => {
          setFilter({
            ...filter,
            sort: {
              ...filter.sort,
              type: sort === "rating" ? "price" : "rating",
            },
          });
          setSort(sort === "rating" ? "price" : "rating");
        }}
        variant="outline"
      >
        {sort === "rating" ? "Rating" : "Price"}
        {sort === "rating" ? (
          <Star className="w-5 h-5 ml-3 text-yellow-500" />
        ) : (
          <IndianRupee className="w-5 h-5 ml-3" />
        )}
      </Button>
    </div>
  );
}

function SearchServiceDesktop({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [search, setSearch] = useState(searchQuery);
  return (
    <div className="w-full max-w-lg hidden lg:block">
      <TextInput
        value={search}
        onChange={(value) => setSearch(value)}
        placeholder="Search for a service"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchQuery(search);
          }
        }}
        preIcon={<Search className="w-5 h-5" />}
        icon={<Badge>Search</Badge>}
        onClick={() => setSearchQuery(search)}
      />
    </div>
  );
}

function SearchServiceMobile({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [search, setSearch] = useState(searchQuery);
  return (
    <div className="w-full max-w-lg lg:hidden">
      <CustomSheet
        title="What are you looking for?"
        description="Eg. Plumber, Electrician, etc."
        triggerJSX={
          <Button variant="outline">
            {search.length > 0 ? search : "Search"}
            <span className="ml-3">
              <Search className="w-5 h-5" />
            </span>
          </Button>
        }
        footerJSX={
          <div className="flex flex-col items-start justify-start w-full space-y-5">
            <SheetClose asChild>
              <Button
                onClick={() => setSearchQuery(search)}
                variant="outline"
                className="w-full"
                id="close-search"
              >
                Close
              </Button>
            </SheetClose>
          </div>
        }
        maxWidth="w-full"
      >
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <TextInput
            title="Search"
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Search for a service"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchQuery(search);
                const close = document.getElementById("close-search");
                if (close) {
                  close.click();
                }
              }
            }}
            preIcon={<Search className="w-5 h-5" />}
            icon={<Badge>Search</Badge>}
            onClick={() => {
              setSearchQuery(search);
              const close = document.getElementById("close-search");
              if (close) {
                close.click();
              }
            }}
          />
          <LineHeader title="Popular Searches" />
          <div className="grid grid-cols-2 gap-5 w-full">
            {["Plumber", "Electrician", "Carpenter", "Painter"].map((item) => (
              <SheetClose asChild key={item}>
                <Button
                  onClick={() => {
                    setSearch(item);
                    setSearchQuery(item);
                  }}
                  variant="outline"
                >
                  {item}
                </Button>
              </SheetClose>
            ))}
          </div>
        </div>
      </CustomSheet>
    </div>
  );
}

function SelectState({
  setFilter,
  filter,
}: {
  setFilter: React.Dispatch<
    React.SetStateAction<WordSearchServiceRequest["filter"]>
  >;
  filter: WordSearchServiceRequest["filter"];
}) {
  const [search, setSearch] = useState("");
  const stateOptionsToShow = StateType.getStatesOfCountry("IN").filter(
    (state) => state.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (!filter.state) {
      getStateFromLocation().then((res) => {
        if (res) {
          const state =
            StateType.getStatesOfCountry("IN").find(
              (state) => state.name === res
            ) ?? null;
          if (state) {
            setFilter({
              ...filter,
              state: state.name,
            });
            const close = document.getElementById(res);
            if (close) {
              close.click();
            }
          }
        }
      });
    }
  }, []);
  return (
    <div className="w-fit">
      <CustomSheet
        title="Where are you from?"
        description="Select your state"
        triggerJSX={
          <Button variant="outline">
            {filter.state ? `${filter.state}` : "India"}
            <span className="ml-3">
              <LocateIcon className="w-5 h-5" />
            </span>
          </Button>
        }
        footerJSX={
          <SheetClose asChild>
            <Button variant="close">Close</Button>
          </SheetClose>
        }
      >
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <Button
            asyncOnClick={async () => {
              const res = await getStateFromLocation();
              if (res) {
                const state =
                  StateType.getStatesOfCountry("IN").find(
                    (state) => state.name === res
                  ) ?? null;
                setFilter({
                  ...filter,
                  state: state ? state.name : null,
                });
                setSearch(res);
                const close = document.getElementById(res);
                if (close) {
                  close.click();
                }
              } else {
                alert("Could not detect location");
              }
            }}
            variant="info"
          >
            Detect Location
            <span className="ml-3">
              <LocateIcon className="w-5 h-5" />
            </span>
          </Button>
          <LineHeader title="Search for a state" />
          <TextInput
            placeholder="Eg. Tamil Nadu"
            title="State"
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
          <div className="grid grid-cols-2 gap-5">
            {stateOptionsToShow.map((state) => (
              <SheetClose asChild key={state.name}>
                <Button
                  key={state.name}
                  id={state.name}
                  onClick={() => {
                    setFilter({
                      ...filter,
                      state: state.name,
                    });
                    setSearch(state.name);
                  }}
                  variant="outline"
                >
                  {state.name.length > 12
                    ? `${state.name.slice(0, 12)}...`
                    : state.name}
                </Button>
              </SheetClose>
            ))}
          </div>
        </div>
      </CustomSheet>
    </div>
  );
}
