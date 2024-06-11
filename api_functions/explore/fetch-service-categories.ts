import {
  fetchAPIProtected,
  fetchAPIPublic,
} from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Category } from "@data/types";

export type FetchServiceCategoriesResponse = {
  category: Category;
  exists: boolean;
};

export async function fetchServiceCategories(): Promise<
  FetchServiceCategoriesResponse[] | null
> {
  const response = await fetchAPIPublic<FetchServiceCategoriesResponse[]>({
    method: RequestMethod.GET,
    url: "fetch-service-categories",
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
