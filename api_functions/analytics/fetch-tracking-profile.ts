import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Tracking } from "@data/types";

export type FetchProfileTrackingResponse = {
  views: number;
  gain: number;
  flags: number;
  tracking: Tracking[];
};

export async function fetchProfileTracking(): Promise<FetchProfileTrackingResponse | null> {
  const res = await fetchAPIProtected<FetchProfileTrackingResponse>({
    url: `fetch-tracking-profile`,
    method: RequestMethod.GET,
  });

  return res.data;
}
