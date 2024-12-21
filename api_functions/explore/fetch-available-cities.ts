import { EXPLORE_API_URL } from "@data/api";
import { Gender, RequestMethod } from "@data/enums";
import { ApiResult } from "@data/types";

export type FetchAvilableCitiesResponse = {
  cities: { name: string; count: number }[];
};
export async function fetchAvilableCities(): Promise<FetchAvilableCitiesResponse | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/fetch-available-cities`, {
      method: RequestMethod[RequestMethod.GET],
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ApiResult<FetchAvilableCitiesResponse> = await response.json();
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
