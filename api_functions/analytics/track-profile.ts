import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { ANALYTICS_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export type TrackProfileRequest = {
  ipAddress?: string;
  guestId?: string;
  city: string;
  state: string;
  country: string;
  profileId: string;
  instagram: boolean;
  whatsapp: boolean;
};

export async function trackProfile(
  data: TrackProfileRequest
): Promise<string | null> {
  const res = await fetchAPIPublic<string>({
    method: RequestMethod.POST,
    url: "track-profile",
    baseUrl: ANALYTICS_API_URL,
    body: data,
    handleErrors: false,
  });

  return res.data;
}
