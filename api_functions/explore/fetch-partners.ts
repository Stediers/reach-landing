import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult, FetchPartnerResponse } from "@data/types";

export type FetchPartnersResponse = {
  designation: string;
  data: {
    name: string;
    handle: string;
    designation: string;
    id: string;
    tagLine: string;
    bio: string;
    imageUrl: string;
    rating: number | null;
    languages: string[];
    serviceImages: string[];
  }[];
};

export async function fetchPartners({
  city,
  profession,
}: {
  city?: string;
  profession?: string;
}): Promise<FetchPartnersResponse | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/fetch-partners`, {
      method: RequestMethod[RequestMethod.POST],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        city,
        profession,
      }),
    });
    const data: ApiResult<FetchPartnersResponse> = await response.json();
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
