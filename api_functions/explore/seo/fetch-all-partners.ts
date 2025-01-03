import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult, FetchPartnerResponse } from "@data/types";

export type FetchAllPartners = {
  group: string;
  partners: {
    firstName: string;
    lastName: string;
    bio: string;
    imageUrl: string;
    handle: string;
    designation: string;
    id: string;
    tagLine: string;
  }[];
};

export async function fetchAllPartners(): Promise<FetchAllPartners[] | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/fetch-all-partners`, {
      method: RequestMethod[RequestMethod.GET],
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ApiResult<FetchAllPartners[]> = await response.json();
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
