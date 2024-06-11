import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import {
  Gender,
  PreferredGender,
  RequestMethod,
  ServiceType,
  SortType,
} from "@data/enums";
import {
  FetchPartnerResponse,
  FetchServiceResponse,
  Pagination,
  Price,
} from "@data/types";
import { ICity, IState } from "country-state-city";

export type WordSearchServiceRequest = {
  query: string;
  filter: {
    state: IState | null;
    verified: boolean;
    online: boolean;
    sort: {
      range: SortType;
      type: "price" | "rating";
    };
    customerGender: PreferredGender;
    partnerGender: Gender | null;
  };
  pagination: Pagination;
  category: string | null;
};

export type WordSearchServiceResponse = {
  service: FetchServiceResponse;
  partner: FetchPartnerResponse;
};

export async function wordSearchService(
  request: WordSearchServiceRequest
): Promise<WordSearchServiceResponse[] | null> {
  const response = await fetchAPIPublic<WordSearchServiceResponse[]>({
    method: RequestMethod.POST,
    url: "word-search-service",
    body: request,
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
