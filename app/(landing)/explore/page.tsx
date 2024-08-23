import { wordSearchService } from "@api_functions/explore/word-search-service";
import { Gender, PreferredGender, SortType } from "@data/enums";
import { ResolvingMetadata, Metadata } from "next";
import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { Render } from "@components/explore/Render";
import { ServiceCardSkeleton } from "@components/ServiceCard";

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
      state: searchParams.state ?? null,
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

  console.log("Explore: ", explore);

  if (searchParams.search) {
    return {
      title: `${explore.data.length} results found in ${searchParams.search}`,
      description: `Find the best ${searchParams.search} in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
      openGraph: {
        title: `${explore.data.length} results found in ${searchParams.search}`,
        description: `Find the best ${
          searchParams.search.length > 0 ? searchParams.search : "services"
        }
          in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
        images: [
          {
            url:
              explore.data.length > 0
                ? explore.data[0].service.imageUrls[0]
                : "",
            width: 800,
            height: 600,
            alt: searchParams.search,
          },
          {
            url:
              explore.data.length > 0
                ? explore.data[0].service.imageUrls[1]
                : "",
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
      title: `${explore.data.length} results found just for you`,
      description: `Find the best services in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
      openGraph: {
        title: `${explore.data.length} results found just for you`,
        description: `Find the best services in your area. Compare prices, reviews, and book safe appointments with trusted vendors.`,
        images: [
          {
            url:
              explore.data.length > 0
                ? explore.data[0].service.imageUrls[0]
                : "",
            width: 800,
            height: 600,
            alt: searchParams.search,
          },
          {
            url:
              explore.data.length > 0
                ? explore.data[0].service.imageUrls[1]
                : "",
            width: 1800,
            height: 1600,
            alt: searchParams.search,
          },
        ],
        type: "website",
        url: `https://reachgig.com/explore?state=${searchParams.state}&verified=${searchParams.verified}&online=${searchParams.online}&sort=${searchParams.sort}&range=${searchParams.range}&customerGender=${searchParams.customerGender}&partnerGender=${searchParams.partnerGender}`,
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
  unstable_noStore();
  console.log("Search Params: ", searchParams);

  const key =
    searchParams.search +
    searchParams.state +
    searchParams.verified +
    searchParams.online +
    searchParams.sort +
    searchParams.range +
    searchParams.customerGender +
    searchParams.partnerGender;

  return (
    <div className="flex flex-col w-full space-y-10">
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 w-full lg:px-10">
            {Array.from({ length: 10 }).map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        }
        key={key}
      >
        <Render
          search={searchParams.search ?? ""}
          searchParams={searchParams}
          key={key}
        />
      </Suspense>
    </div>
  );
}
