import { showSnackBar } from "@components/notifications/Snackbar";
import { EXPLORE_API_URL } from "@data/api";
import { Gender, RequestMethod, State } from "@data/enums";
import { ApiResult, FetchPartnerResponse, Pagination } from "@data/types";

export type PartnerSearchRequest = {
  query: string;
  gender: Gender | null;
  pagination: Pagination;
};

export async function partnerSearch(
  request: PartnerSearchRequest
): Promise<FetchPartnerResponse[] | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/partner-search`, {
      method: RequestMethod[RequestMethod.POST],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
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
    showSnackBar({
      message: "An error occurred. Please try again later.",
      state: State.ERROR,
    });
    return null;
  }
}
