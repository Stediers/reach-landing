import {
  fetchAPIProtected,
  fetchAPIPublic,
} from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchCityResponse = {
  city: string;
  state: string;
  country: string;
};

export async function fetchCity({
  city,
}: {
  city: string;
}): Promise<FetchCityResponse[] | null> {
  const response = await fetchAPIPublic<FetchCityResponse[]>({
    method: RequestMethod.GET,
    url: "fetch-city?city=" + city,
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
