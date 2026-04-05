import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { ApiResult } from "@data/types";

export type SeededProfileResponse = {
  id: string;
  name: string;
  designation: string;
  city: string;
  state: string;
  handle: string;
  rating: number | null;
  totalRatings: number;
  imageUrl: string | null;
  phoneNumber: string | null;
  website: string | null;
  formattedAddress: string | null;
  googlePlaceId: string;
  googleBusinessStatus: string | null;
  googleTypes: string[];
  googlePhotoReference: string | null;
  latitude: number | null;
  longitude: number | null;
  claimed: boolean;
  claimedByUserId: string | null;
};

export async function fetchSeededProfile(
  handle: string
): Promise<SeededProfileResponse | null> {
  try {
    const response = await fetch(
      `${EXPLORE_API_URL}/fetch-seeded-profile?handle=${handle}`,
      {
        method: RequestMethod[RequestMethod.GET],
        headers: { "Content-Type": "application/json" },
      }
    );
    const data: ApiResult<SeededProfileResponse> = await response.json();
    if (response.status === 200 && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
