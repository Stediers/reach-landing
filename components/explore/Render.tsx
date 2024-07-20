import {
  WordSearchServiceResponse,
  wordSearchService,
} from "@api_functions/explore/word-search-service";
import { ServiceCardDesktop } from "@components/ServiceCard";
import { Gender, PreferredGender, SortType } from "@data/enums";
import { getStateFromStateName } from "@helper_functions/explore/get-state";
import { redirect } from "next/navigation";

export async function Render({
  search,
  searchParams,
}: {
  search: string;
  searchParams: {
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
  return (
    <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-full p-5 lg:px-10">
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
