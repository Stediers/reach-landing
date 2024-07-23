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
  padding = true,
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
  padding?: boolean;
}) {
  console.log("fetching data");
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
  if (!resAPI) redirect("/404");
  console.log("resAPI", resAPI);
  return (
    <div
      className={`flex flex-col w-full space-y-10 py-5 ${
        padding ? "px-5 lg:px-10" : ""
      }`}
    >
      {search.length > 0 && (
        <div className="flex flex-col items-start justify-center w-full col-span-full">
          <p className="lg:text-2xl text-xl font-medium">
            Search results for &quot;{search}&quot;
          </p>
        </div>
      )}
      {resAPI && resAPI.data.length > 0 ? (
        <PaginatedResults
          search={searchParams.search ?? ""}
          searchParams={searchParams}
          responseData={resAPI}
        />
      ) : (
        <div className="col-span-4 space-y-10 w-full flex flex-col items-start justify-center">
          <div className="flex flex-col items-start justify-center space-y-3">
            <h1 className="text-xl font-medium">No results found</h1>
            <p className="text-gray-500">
              Explore more services or try a different search term
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
