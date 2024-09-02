"use client";
import {
  PartnerSearchRequest,
  partnerSearch,
} from "@api_functions/explore/partner-search";
import ImageComponent from "@components/ImageComponent";
import RadioInput from "@components/input/RadioInput";
import TextInput from "@components/input/TextInput";
import { Skeleton } from "@components/ui/skeleton";
import { CustomerRoutes, Gender, State } from "@data/enums";
import { FetchPartnerResponse } from "@data/types";
import useDidMountEffect from "@helper_functions/use-did-mount-effetc";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { debounce, set } from "lodash";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

export default function Main() {
  //   const response = await fetchServiceCategories();
  //   if (response) {
  //     console.log("response", response);
  //   }
  const [request, setRequest] = useState<PartnerSearchRequest>({
    gender: null,
    query: "",
    pagination: {
      limit: 10,
      page: 1,
    },
  });
  const [response, setResponse] = useState<FetchPartnerResponse[] | null>(null);
  const [pageState, setPageState] = useState<State>(State.SUCCESS);
  const currentPath = usePathname();
  useDidMountEffect(() => {
    setPageState(State.LOADING);
    debouncedPartnerSearch({
      request,
      setResponse,
      setPageState,
    });
  }, [request]);
  return (
    <div className="relative w-full flex flex-col items-start justify-center scroll-smooth pb-20 py-5 px-5 lg:px-10 space-y-10 max-w-7xl">
      <div className="flex flex-col items-start justify-center w-full col-span-full space-y-5 max-w-lg">
        <h1 className="text-xl font-medium max-w-md">
          Find Partner by their name or handle
        </h1>
        <TextInput
          onChange={(value) => {
            setRequest({ ...request, query: value });
          }}
          value={request.query}
          placeholder="Search for a service"
          preIcon={<Search size={20} />}
        />
      </div>
      <LoadingWrapper
        pageState={pageState}
        showLogo={false}
        loadingJSX={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full px-1 lg:gap-5 gap-y-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <SearchSkeleton key={index} />
            ))}
          </div>
        }
      >
        {response && response.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full px-1 lg:gap-5 gap-y-10">
            {response.map((res) => (
              <Link
                href={`${CustomerRoutes.PARTNER.replace(
                  "[partnerHandle]",
                  res.handle!!
                )}?backLink=${currentPath}`}
                key={res.userId}
                shallow={true}
                className="hover:lg:outline rounded-lg lg:p-3"
              >
                <div className="flex flex-row items-start justify-start w-full space-x-3">
                  <ImageComponent
                    src={res.imageUrl}
                    alt={res.firstName}
                    className="w-14 h-14 rounded-full shrink-0"
                  />
                  <div className="flex flex-col items-start justify-start w-full">
                    <h1 className="text-lg font-medium">{res.firstName}</h1>
                    <p className="text-gray-500">{res.designation}</p>
                  </div>
                  {res.gender === Gender.MALE ? (
                    <BsGenderMale className="text-2xl" />
                  ) : (
                    <BsGenderFemale className="text-2xl" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : request.query.length > 0 ? (
          <div className="flex flex-col items-start justify-center space-y-3">
            <h1 className="text-xl font-medium">No results found</h1>
            <p className="text-gray-500">
              We couldn&apos;t find any service provider matching your search
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-center space-y-3">
            <p className="text-gray-500">
              Search for a service provider by their name or handle
            </p>
          </div>
        )}
      </LoadingWrapper>
    </div>
  );
}

async function _partnerSearch({
  request,
  setResponse,
  setPageState,
}: {
  request: PartnerSearchRequest;
  setResponse: React.Dispatch<
    React.SetStateAction<FetchPartnerResponse[] | null>
  >;
  setPageState: React.Dispatch<React.SetStateAction<State>>;
}) {
  setPageState(State.LOADING);
  const res = await partnerSearch(request);
  if (res) {
    console.log("res", res);
    setResponse(res);
    setPageState(State.SUCCESS);
  } else {
    setPageState(State.ERROR);
  }
}

function SearchSkeleton() {
  return (
    <div className="flex flex-row items-start justify-start w-full space-x-3 rounded-lg lg:p-3">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="flex flex-col items-start space-y-2 justify-start w-full">
        <Skeleton className="w-20 h-5" />
        <Skeleton className="w-10 h-4" />
      </div>
      <Skeleton className="w-6 h-6" />
    </div>
  );
}

const debouncedPartnerSearch = debounce(_partnerSearch, 500);
