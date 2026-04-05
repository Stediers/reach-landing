import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult } from "@data/types";

export async function fetchSeededHandles(): Promise<string[]> {
  try {
    const response = await fetch(
      `${EXPLORE_API_URL}/get-seeded-handles`,
      {
        method: RequestMethod[RequestMethod.GET],
        headers: { "Content-Type": "application/json" },
      }
    );
    const data: ApiResult<string[]> = await response.json();
    if (response.status === 200 && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
