import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type TrackServiceRequest = {
  ipAddress?: string;
  guestId?: string;
  city: string;
  state: string;
  country: string;
  serviceId: string;
  whatsapp: boolean;
  search: boolean;
};

export async function trackService(
  data: TrackServiceRequest
): Promise<string | null> {
  const res = await fetchAPIPublic<string>({
    method: RequestMethod.POST,
    url: "track-service",
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    body: data,
    handleErrors: false,
  });

  return res.data;
}
