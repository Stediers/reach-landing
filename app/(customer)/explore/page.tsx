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
import { Pagination } from "@data/types";
import { redirect } from "next/navigation";
import { ServiceCardDesktop } from "@components/ServiceCard";
import { debounce } from "lodash";
import { getStateFromStateName } from "@helper_functions/explore/get-state";
import { ResolvingMetadata, Metadata } from "next";

type Props = {
  params: { id: string };
  searchParams?: {
    category: string;
    customerGender: string;
    partnerGender: string;
    sort: string;
    state: string;
    online: string;
    verified: string;
    range: string;
    search: string;
  };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  if (!searchParams)
    return {
      title: "No search params",
    };
  const explore = await wordSearchService({
    query: searchParams.search ?? "",
    filter: {
      state: searchParams.state
        ? getStateFromStateName(searchParams.state)
        : null,
      verified: searchParams.verified === "false" ? false : true,
      online: searchParams.online === "false" ? false : true,
      sort: {
        range:
          Object.values(SortType).find((item) => item === searchParams.range) ??
          SortType.HIGH_TO_LOW,
        type: searchParams.sort === "price" ? "price" : "rating",
      },
      customerGender:
        Object.values(PreferredGender).find(
          (item) => item === searchParams.customerGender
        ) ?? PreferredGender.UNISEX,
      partnerGender:
        Object.values(Gender).find(
          (item) => item === searchParams.partnerGender
        ) ?? null,
    },
    category: null,
    pagination: {
      limit: 10,
      page: 1,
    },
  });

  if (!explore)
    return {
      title: "No search results",
    };

  if (searchParams.search) {
    return {
      title: `${explore.length} results found in ${searchParams.search}`,
      description: `Find the best ${searchParams.search} in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
      openGraph: {
        title: `${explore.length} results found in ${searchParams.search}`,
        description: `Find the best ${
          searchParams.search.length > 0 ? searchParams.search : "services"
        }
          in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
        images: [
          {
            url: explore[0].service.imageUrls[0],
            width: 800,
            height: 600,
            alt: searchParams.search,
          },
          {
            url: explore[0].service.imageUrls[1],
            width: 1800,
            height: 1600,
            alt: searchParams.search,
          },
        ],
        type: "website",
        url: `https://reachgig.com/explore?search=${searchParams.search}&state=${searchParams.state}&verified=${searchParams.verified}&online=${searchParams.online}&sort=${searchParams.sort}&range=${searchParams.range}&customerGender=${searchParams.customerGender}&partnerGender=${searchParams.partnerGender}`,
      },
    };
  } else {
    return {
      title: `${explore.length} results found just for you`,
      description: `Find the best services in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
      openGraph: {
        title: `${explore.length} results found just for you`,
        description: `Find the best services in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
        images: [
          {
            url: explore[0].service.imageUrls[0],
            width: 800,
            height: 600,
            alt: searchParams.search,
          },
          {
            url: explore[0].service.imageUrls[1],
            width: 1800,
            height: 1600,
            alt: searchParams.search,
          },
        ],
        type: "website",
        url: `https://reachgig.com/explore?search=${searchParams.search}&state=${searchParams.state}&verified=${searchParams.verified}&online=${searchParams.online}&sort=${searchParams.sort}&range=${searchParams.range}&customerGender=${searchParams.customerGender}&partnerGender=${searchParams.partnerGender}`,
      },
    };
  }
}

export default async function Page({
  searchParams = {
    category: "",
    customerGender: "",
    partnerGender: "",
    sort: "",
    state: "",
    online: "",
    verified: "",
    range: "",
    search: "",
  },
}: {
  searchParams?: {
    category: string;
    customerGender: string;
    partnerGender: string;
    sort: string;
    state: string;
    online: string;
    verified: string;
    range: string;
    search: string;
  };
}) {
  console.log("Search Params: ", searchParams);
  let response: WordSearchServiceResponse[] | null = null;
  response = await wordSearchService({
    query: searchParams.search ?? "",
    filter: {
      state: searchParams.state
        ? getStateFromStateName(searchParams.state)
        : null,
      verified: searchParams.verified === "false" ? false : true,
      online: searchParams.online === "false" ? false : true,
      sort: {
        range:
          Object.values(SortType).find((item) => item === searchParams.range) ??
          SortType.HIGH_TO_LOW,
        type: searchParams.sort === "price" ? "price" : "rating",
      },
      customerGender:
        Object.values(PreferredGender).find(
          (item) => item === searchParams.customerGender
        ) ?? PreferredGender.UNISEX,
      partnerGender:
        Object.values(Gender).find(
          (item) => item === searchParams.partnerGender
        ) ?? null,
    },
    category: null,
    pagination: {
      limit: 10,
      page: 1,
    },
  });

  if (!response) redirect("/404");

  return <Render response={response} search="" />;
}

function Render({
  response,
  search,
}: {
  response: WordSearchServiceResponse[];
  search: string;
}): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-[85rem] p-5">
      {search.length > 0 && (
        <div className="flex flex-col items-start justify-center w-full col-span-full">
          <p className="lg:text-2xl text-xl font-medium">
            Search results for &quot;{search}&quot;
          </p>
        </div>
      )}
      {response.length > 0 ? (
        response.map((res) => (
          <ServiceCardDesktop
            key={res.service.id}
            service={res.service}
            location={res.partner.state + ", " + res.partner.city}
          />
        ))
      ) : (
        <p className="text-lg font-medium text-center col-span-full">
          No results found
        </p>
      )}
    </div>
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
