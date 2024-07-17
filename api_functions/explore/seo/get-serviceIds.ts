import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult } from "@data/types";

export type FetchServiceIdsResponse = {
  serviceIds: string[];
};

export async function fetchServiceIds(): Promise<FetchServiceIdsResponse | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/get-serviceIds`, {
      method: RequestMethod[RequestMethod.GET],
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ApiResult<FetchServiceIdsResponse> = await response.json();
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
