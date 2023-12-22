import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Tracking } from "@data/types";

export type FetchTrackingResponse = {
  tracking: Tracking[];
  baseData: {
    serviceId: string;
    title: string;
    totalViews: number;
  };
};

export async function fetchTrackingByServiceId(
  serviceId: string
): Promise<FetchTrackingResponse | null> {
  const res = await fetchAPIProtected<FetchTrackingResponse>({
    url: `fetch-tracking-by-serviceId?serviceId=${serviceId}`,
    method: RequestMethod.GET,
  });

  return res.data;
}
