import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult, FetchPartnerResponse } from "@data/types";

export async function fetchPartners({
  city,
  profession,
}: {
  city?: string;
  profession?: string;
}): Promise<FetchPartnerResponse[] | null> {
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
    const data: ApiResult<FetchPartnerResponse[]> = await response.json();
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
