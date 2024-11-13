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
    const searchTerm = searchParams.search.toLowerCase();
    const state = searchParams.state ? ` in ${searchParams.state}` : "";
    const serviceType =
      searchParams.online === "true" ? "online services" : "local services";

    return {
      title: `${explore.data.length} ${searchTerm} ${serviceType}${state} | ReachGig`,
      description: `Compare and book trusted ${searchTerm} ${serviceType}${state}. ✓ Verified providers ✓ Real reviews ✓ Secure booking ✓ Best prices guaranteed.`,
      keywords: `${searchTerm}, ${serviceType}, book ${searchTerm}, ${searchTerm} near me, trusted ${searchTerm}, professional ${searchTerm}${state}, ${
        explore.data.length > 0
          ? explore.data
              .slice(0, 3)
              .map((item) => item.service.title)
              .join(", ")
          : ""
      }`,
      openGraph: {
        title: `Find and Book ${searchTerm} ${serviceType}${state} | ReachGig`,
        description: `Compare prices and reviews for ${searchTerm} ${serviceType}${state}. Book safe appointments with trusted and verified vendors. 100% satisfaction guaranteed.`,
        images: [
          {
            url:
              explore.data.length > 0
                ? explore.data[0].service.imageUrls[0]
                : "",
            width: 800,
            height: 600,
            alt: `Best ${searchTerm} ${serviceType}${state}`,
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
    const state = searchParams.state ? ` in ${searchParams.state}` : "";
    const serviceType =
      searchParams.online === "true" ? "Online Services" : "Local Services";

    return {
      title: `Book Trusted ${serviceType} service partners in ${state} | ReachGig`,
      description: `Discover and book professional ${serviceType.toLowerCase()}${state}. ✓ Verified providers ✓ Real customer reviews ✓ Secure booking ✓ Competitive prices ✓ Safe appointments.`,
      keywords: `book services${state}, professional services, trusted providers, local services, online services, service marketplace${
        explore.data.length > 0
          ? ", " +
            explore.data
              .slice(0, 3)
              .map((item) => item.service.title)
              .join(", ")
          : ""
      }`,
      openGraph: {
        title: `Top-Rated ${serviceType}${state} | ReachGig`,
        description: `Find and book the best ${serviceType.toLowerCase()}${state}. Compare prices, read verified reviews, and book safe appointments with trusted service providers.`,
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
