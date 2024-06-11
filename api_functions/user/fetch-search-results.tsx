import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { PreferredGender, ServiceType, RequestMethod } from "@data/enums";
import { Filter, Pagination, Price } from "@data/types";

export type FetchSearchResultsResponse_Service = {
  serviceId: string;
  baseData: {
    title: string;
    visible: boolean;
    rating: number | null;
    totalAppointments: number;
    totalRatedAppointments: number;
    preferredGender: PreferredGender;
    experience: Date;
    serviceType: ServiceType;
    imageUrls: string[];
  };
  price: Price;
};

export type FetchSearchResultsResponse_Gig = {
  name: string;
  rating: number | null;
  mobileNumber: string;
  imageUrl: string | null;
  totalAppointments: number;
};

type FetchSearchResultsResponse = {
  services: FetchSearchResultsResponse_Service[];
};

export async function fetchSearchResults({
  filter,
  query,
  pagination,
}: {
  filter: Filter;
  query: string;
  pagination: Pagination;
}): Promise<FetchSearchResultsResponse | null> {
  const response = await fetchAPIProtected<FetchSearchResultsResponse>({
    method: RequestMethod.POST,
    url: `fetch-search-results`,
    body: {
      query: query,
      filter: filter,
      pagination: pagination,
    },
  });

  return response.data;
}
