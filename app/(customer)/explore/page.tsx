"use client";
import {
  WordSearchServiceRequest,
  WordSearchServiceResponse,
  wordSearchService,
} from "@api_functions/explore/word-search-service";
import {
  Gender,
  PreferredGender,
  ServiceCategory,
  SortType,
  State,
} from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import { IState, State as StateType } from "country-state-city";
import { Pagination } from "@data/types";
import { useSearchParams } from "next/navigation";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import {
  ServiceCardSkeleton,
  ServiceCardDesktop,
  ServiceCardMobile,
} from "@components/ServiceCard";
import { debounce } from "lodash";
import Loading from "@components/Loading";

export default function Page() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? null;
  const customerGenderParams = searchParams.get("customerGender");
  const customerGender = customerGenderParams
    ? Object.values(PreferredGender).find(
        (item) => item === customerGenderParams
      )
    : PreferredGender.UNISEX;
  const partnerGenderParams = searchParams.get("partnerGender");
  const partnerGender = partnerGenderParams
    ? Object.values(Gender).find((item) => item === partnerGenderParams)
    : null;
  const sortParams: WordSearchServiceRequest["filter"]["sort"] =
    searchParams.get("sort")
      ? JSON.parse(searchParams.get("sort")!!)
      : {
          range: SortType.LOW_TO_HIGH,
          type: "price",
        };
  const sortRange = sortParams
    ? Object.values(SortType).find((item) => item === sortParams.range)
    : SortType.LOW_TO_HIGH;
  const sortType = sortParams.type;
  const state = searchParams.get("state") ?? null;
  const getState = (state: string): IState | null => {
    if (!state) return null;
    const states = StateType.getStatesOfCountry("IN");
    return states.find((item) => item.name === state) ?? null;
  };
  const online = searchParams.get("online") === "false" ? false : true;

  const verified = searchParams.get("verified") ?? false;
  const [pageState, setPageState] = useState<State>(State.SUCCESS);

  const [response, setResponse] = useState<WordSearchServiceResponse[]>([]);
  const [searchState, setSearchState] = useState(State.LOADING);

  const selCategory =
    Object.values(ServiceCategory).find((item) => item === category) ?? null;

  const search = searchParams.get("search") ?? "";

  console.log("search", search);

  console.log("params", {
    query: search,
    pagination: {
      limit: 10,
      page: 1,
    },
    filter: {
      customerGender: customerGender ?? PreferredGender.UNISEX,
      online: online,
      partnerGender: partnerGender,
      sort: {
        range: sortRange ?? SortType.HIGH_TO_LOW,
        type: sortType,
      },
      state: state ? getState(state) : null,
      verified: verified === "true",
    },
    category: selCategory,
  });

  useEffect(() => {
    setSearchState(State.LOADING);
    console.log("useEffect");
    _debounce({
      query: search,
      pagination: {
        limit: 10,
        page: 1,
      },
      setServices: setResponse,
      setSearchState,
      filter: {
        customerGender: customerGender ?? PreferredGender.UNISEX,
        online: online,
        partnerGender: partnerGender ?? null,
        sort: {
          range: sortRange ?? SortType.HIGH_TO_LOW,
          type: sortType,
        },
        state: state ? getState(state) : null,
        verified: verified === "true",
      },
      category: selCategory,
    });
  }, [
    customerGender,
    partnerGender,
    state,
    verified,
    category,
    online,
    search,
    sortRange,
    sortType,
  ]);

  // useEffect(() => {
  //   const navigator = window.navigator;
  //   if (!navigator.geolocation) {
  //     return;
  //   } else {
  //     //check if the user has allowed the location
  //     navigator.permissions.query({ name: "geolocation" }).then((result) => {
  //       if (result.state === "granted") {
  //         getStatefromLocation({ location: navigator.geolocation });
  //       } else if (result.state === "prompt") {
  //         setFilter((prev) => {
  //           return {
  //             ...prev,
  //             state: null,
  //             serviceType: ServiceType.ONLINE,
  //           };
  //         });
  //         console.log("prompt");
  //       } else if (result.state === "denied") {
  //         setFilter((prev) => {
  //           return {
  //             ...prev,
  //             state: null,
  //             serviceType: ServiceType.ONLINE,
  //           };
  //         });
  //         setItemsToLocalStorage({ key: "location", item: "denied" });
  //         console.log("denied");
  //       }
  //     });
  //   }
  // }, []);

  // async function getStatefromLocation({ location }: { location: Geolocation }) {
  //   location.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const loader = new Loader({
  //         apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  //         version: "weekly",
  //         libraries: ["places"],
  //       });

  //       loader.importLibrary("geocoding").then(() => {
  //         const geocoder = new google.maps.Geocoder();
  //         geocoder.geocode(
  //           { location: { lat: latitude, lng: longitude } },
  //           (results, status) => {
  //             if (status === "OK" && results) {
  //               const state = results.find((result) => {
  //                 return result.types.includes("administrative_area_level_1");
  //               });
  //               if (state) {
  //                 const stateName = state.formatted_address.split(", ")[0];
  //                 const istate = StateType.getStatesOfCountry("IN").find(
  //                   (state) => state.name === stateName
  //                 );
  //                 if (istate) {
  //                   setFilter((prev) => {
  //                     return {
  //                       ...prev,
  //                       state: istate,
  //                       serviceType: ServiceType.OFFLINE,
  //                     };
  //                   });
  //                 } else {
  //                   return null;
  //                 }
  //               } else {
  //                 return null;
  //               }
  //             } else {
  //               return null;
  //             }
  //           }
  //         );
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  //   return null;
  // }

  // useEffect(() => {
  //   setItemsToLocalStorage({ key: "filter", item: filter });
  // }, [filter]);

  return (
    <ConsoleWrapper
      title="Explore"
      desktopJSX={null}
      mobileJSX={null}
      simpleJSX={
        <Render response={response} searchState={searchState} search={search} />
      }
      state={pageState}
    />
  );
}

function Render({
  response,
  searchState,
  search,
}: {
  response: WordSearchServiceResponse[];
  searchState: State;
  search: string;
}): JSX.Element {
  return (
    <LoadingWrapper
      className="grid grid-cols-1 lg:px-10 px-5 lg:py-10 py-5 items-start justify-items-center"
      pageState={searchState}
      showLogo={false}
      loadingJSX={
        <div className="flex flex-col items-center justify-center space-y-5 w-full lg:px-10 py-10 min-h-full">
          <Loading />
          {search.length > 0 ? (
            <p className="text-lg font-medium">
              Searching for &quot;{search}&quot;
            </p>
          ) : (
            <p className="text-lg font-medium">
              Finding the best services for you
            </p>
          )}
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full max-w-[85rem]">
        {search.length > 0 && (
          <div className="flex flex-col items-start justify-center w-full col-span-full">
            <p className="lg:text-2xl text-xl font-medium">
              Search results for &quot;{search}&quot;
            </p>
          </div>
        )}
        {response.length > 0 &&
          response.map((res) => (
            <ServiceCardDesktop
              key={res.service.id}
              service={res.service}
              location={res.partner.state + ", " + res.partner.city}
            />
          ))}
      </div>
      {response.length === 0 && searchState === State.SUCCESS ? (
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-lg font-medium">No services found</p>
        </div>
      ) : null}
    </LoadingWrapper>
  );
}

async function _wordSearchService({
  query,
  pagination,
  setServices,
  setSearchState,
  filter,
  category,
}: {
  query: string;
  pagination: Pagination;
  setServices: React.Dispatch<
    React.SetStateAction<WordSearchServiceResponse[]>
  >;
  setSearchState: React.Dispatch<React.SetStateAction<State>>;
  filter: WordSearchServiceRequest["filter"];
  category: ServiceCategory | null;
}) {
  setSearchState(State.LOADING);
  const response = await wordSearchService({
    pagination: pagination,
    query: query,
    filter: filter,
    category: category,
  });
  setSearchState(State.SUCCESS);
  console.log(response);
  if (!response) return setServices([]);
  setServices(response);
}

const _debounce = debounce(_wordSearchService, 500);
