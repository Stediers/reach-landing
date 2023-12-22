import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchTrackingServiceResponse = {
  services: {
    serviceId: string;
    title: string;
    totalViews: number;
    visible: boolean;
  }[];
  gain: number;
};

export async function fetchTrackingService(): Promise<FetchTrackingServiceResponse | null> {
  const res = await fetchAPIProtected<FetchTrackingServiceResponse>({
    url: `fetch-tracking-service`,
    method: RequestMethod.GET,
  });

  return res.data;
}
