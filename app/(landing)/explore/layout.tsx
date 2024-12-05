"use client";
import React, { useEffect, useState } from "react";
import Footer from "@components/footer/Footer";
import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import { CustomSheet } from "@components/CustomSheet";
import LineHeader from "@components/LineHeader";
import Setting from "@components/Setting";
import TextInput from "@components/input/TextInput";
import { SheetClose } from "@components/ui/sheet";
import { Skeleton } from "@components/ui/skeleton";
import { CustomerRoutes, Gender, PreferredGender, State } from "@data/enums";
import { getStateFromLocation } from "@helper_functions/explore/detectLocation";
import { State as StateType } from "country-state-city";
import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@helper_functions/local-storage";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { debounce, filter } from "lodash";
import {
  VideoIcon,
  VideoOffIcon,
  ShieldCheck,
  ShieldAlert,
  Star,
  IndianRupee,
  Search,
  LocateIcon,
} from "lucide-react";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  BsGenderMale,
  BsGenderFemale,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { FcDown } from "react-icons/fc";
import {
  FetchMyProfileResponse,
  fetchMyProfile,
} from "@api_functions/profile/fetch-my-profile";
import { updateFilter } from "@helper_functions/explore/update-filter";
import useDidMountEffect from "@helper_functions/use-did-mount-effect";
import { useRouter } from "next-nprogress-bar";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import RadioInput from "@components/input/RadioInput";

type RootLayoutProps = {
  children: React.ReactNode;
};

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

  // window.history.pushState({}, "", link);

  // const linkButton = document.getElementById("explore-link");
  // if (linkButton) {
  //   linkButton.setAttribute("href", link);
  //   linkButton.click();
  // }
}

const debouncedUpdateFilterRouter = debounce(updateFilterRouter, 500);

export default function ConsoleLayout({ children }: RootLayoutProps) {
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
  return (
    <div className="w-full flex flex-col justify-start items-center relative !hide-scrollbar">
      <div className="w-full flex flex-col justify-start items-center space-y-5  sticky top-[4.55rem] z-50">
        {currentPath === CustomerRoutes.EXPLORE && (
          <LoadingWrapper
            pageState={pageNavState}
            loadingJSX={
              <div className="flex gap-x-5 z-20 p-3 border justify-start w-full overflow-x-scroll bg-white">
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
      {children}
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
  let recentSearches =
    getItemsFromLocalStorage<string[]>({ key: "recent-searches" }) || [];
  recentSearches = recentSearches.filter(
    (item, index) => recentSearches.indexOf(item) === index
  );
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
            recentSearches={recentSearches}
          />
          <div className="lg:max-w-[70%] w-full flex flex-row items-center justify-start gap-x-5 overflow-x-scroll hide-scrollbar">
            <SearchServiceMobile
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              recentSearches={recentSearches}
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
            Gender
            <span className="ml-3">
              <BsGenderAmbiguous className="w-5 h-5" />
            </span>
          </Button>
        }
        footerJSX={
          <div className="flex flex-col items-start justify-start w-full space-y-5">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </div>
        }
      >
        <div className="flex flex-col items-start justify-start w-full space-y-5">
          <RadioInput
            options={[
              {
                title: "Female",
                onClick: () => {
                  setFilter({
                    ...filter,
                    customerGender: PreferredGender.FEMALE,
                  });
                },
                icon:
                  filter.customerGender &&
                  filter.customerGender === PreferredGender.FEMALE ? (
                    <AiFillCheckCircle className="w-6 h-6" />
                  ) : (
                    <BsGenderFemale className="w-6 h-6" />
                  ),
              },
              {
                title: "Male",
                icon:
                  filter.customerGender &&
                  filter.customerGender === PreferredGender.MALE ? (
                    <AiFillCheckCircle className="w-6 h-6" />
                  ) : (
                    <BsGenderMale className="w-6 h-6" />
                  ),
                onClick: () => {
                  setFilter({
                    ...filter,
                    customerGender: PreferredGender.MALE,
                  });
                },
              },
            ]}
            cols="grid-cols-2"
            title="Your Gender"
          />
          <RadioInput
            options={[
              {
                title: "Female",
                onClick: () => {
                  setFilter({
                    ...filter,
                    partnerGender: Gender.FEMALE,
                  });
                },
                icon:
                  filter.partnerGender &&
                  filter.partnerGender === Gender.FEMALE ? (
                    <AiFillCheckCircle className="w-6 h-6" />
                  ) : (
                    <BsGenderFemale className="w-6 h-6" />
                  ),
              },
              {
                title: "Male",
                icon:
                  filter.partnerGender &&
                  filter.partnerGender === Gender.MALE ? (
                    <AiFillCheckCircle className="w-6 h-6" />
                  ) : (
                    <BsGenderMale className="w-6 h-6" />
                  ),
                onClick: () => {
                  setFilter({
                    ...filter,
                    partnerGender: Gender.MALE,
                  });
                },
              },
              {
                title: "No Preference",
                icon: !filter.partnerGender ? (
                  <AiFillCheckCircle className="w-6 h-6" />
                ) : (
                  <BsGenderMale className="w-6 h-6" />
                ),
                onClick: () => {
                  setFilter({
                    ...filter,
                    partnerGender: null,
                  });
                },
              },
            ]}
            cols="grid-cols-2"
            title="Partner Gender"
          />
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
  recentSearches,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  recentSearches: string[];
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
  recentSearches,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  recentSearches: string[];
}) {
  const [search, setSearch] = useState(searchQuery);
  return (
    <div className="w-full max-w-lg lg:hidden">
      <CustomSheet
        title="What are you looking for?"
        description="Eg. Bridal Makeup, Photography, etc."
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
              setItemsToLocalStorage({
                key: "recent-searches",
                item: [search, ...recentSearches.filter((i) => i !== search)],
              });
              const close = document.getElementById("close-search");
              if (close) {
                close.click();
              }
            }}
          />
          <LineHeader title="Popular Searches" />
          <div className="grid grid-cols-2 gap-5 w-full">
            {["Makeup", "Mehandi", "Photography", "Facial", "Haircut"].map(
              (item) => (
                <SheetClose asChild key={item}>
                  <Button
                    onClick={() => {
                      setSearch(item);
                      setSearchQuery(item);
                      setItemsToLocalStorage({
                        key: "recent-searches",
                        item: [
                          item,
                          ...recentSearches.filter((i) => i !== item),
                        ],
                      });
                    }}
                    variant="outline"
                  >
                    {item}
                  </Button>
                </SheetClose>
              )
            )}
          </div>
          <LineHeader title="Recent Searches" />
          {recentSearches.length === 0 ? (
            <p className="text-sm text-gray-500">No recent searches</p>
          ) : (
            <div className="grid grid-cols-2 gap-5 w-full">
              {recentSearches.map((item) => (
                <SheetClose asChild key={item}>
                  <Button
                    onClick={() => {
                      setSearch(item);
                      setSearchQuery(item);
                      setItemsToLocalStorage({
                        key: "recent-searches",
                        item: [
                          item,
                          ...recentSearches.filter((i) => i !== item),
                        ],
                      });
                    }}
                    variant="outline"
                  >
                    {item}
                  </Button>
                </SheetClose>
              ))}
            </div>
          )}
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
