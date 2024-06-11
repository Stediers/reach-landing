import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchMyProfileResponse = {
  user: {
    name: string;
    mobileNumber: string;
    imageUrl: string | null;
    rating: number;
  };
  isVerified: boolean;
};

export function validateFetchMyProfileResponse(
  response: FetchMyProfileResponse | null
): boolean {
  if (response === null) return false;

  const { user } = response;

  if (
    user.name === undefined ||
    user.mobileNumber === undefined ||
    user.imageUrl === undefined ||
    user.rating === undefined
  )
    return false;

  return true;
}

export async function fetchMyProfile(
  handleErrors?: boolean
): Promise<FetchMyProfileResponse | null> {
  const response = await fetchAPIProtected<FetchMyProfileResponse>({
    method: RequestMethod.GET,
    url: "fetch-my-profile",
    handleErrors,
  });

  return response.data;
}
