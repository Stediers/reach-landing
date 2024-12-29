import { EXPLORE_API_URL } from "@data/api";
import { Gender, RequestMethod } from "@data/enums";
import { ApiResult } from "@data/types";

export type FetchCategoriesByCityResponse = {
  data: {
    profession: {
      name: string;
      description: string;
      code: string;
    };
    count: number;
  }[];
};
export async function fetchCategoriesByCity(
  city: string
): Promise<FetchCategoriesByCityResponse | null> {
  try {
    const response = await fetch(
      `${EXPLORE_API_URL}/fetch-categories-by-city?city=${city}`,
      {
        method: RequestMethod[RequestMethod.GET],
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: ApiResult<FetchCategoriesByCityResponse> =
      await response.json();
    if (response.status === 200) {
      if (data.errorMessage) {
        return null;
      }
      return data.data ? data.data : null;
    } else {
      console.log(data.errorMessage);
      throw new Error(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
