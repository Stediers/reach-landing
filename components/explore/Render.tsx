import {
  WordSearchServiceResponse,
  wordSearchService,
} from "@api_functions/explore/word-search-service";
import { Gender, PreferredGender, SortType } from "@data/enums";
import { redirect } from "next/navigation";
import PaginatedResults from "./PaginatedResults";

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
  let response: WordSearchServiceResponse["data"] | null = null;
  const resAPI = await wordSearchService({
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

  if (resAPI) response = resAPI.data;

  if (!response) redirect("/404");
  return (
    <div className="flex flex-col w-full space-y-10 lg:px-10 px-5 py-5">
      {search.length > 0 && (
        <div className="flex flex-col items-start justify-center w-full col-span-full">
          <p className="lg:text-2xl text-xl font-medium">
            Search results for &quot;{search}&quot;
          </p>
        </div>
      )}
      {resAPI && (
        <PaginatedResults
          search={searchParams.search ?? ""}
          searchParams={searchParams}
          responseData={resAPI}
        />
      )}
    </div>
  );
}
