import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Callback } from "@data/types";

export type FetchCallbackByServiceIdResponse = {
  loggedIn: boolean;
  callback: Callback | null;
};

export async function fetchCallbackByServiceId({
  serviceId,
}: {
  serviceId: string;
}): Promise<FetchCallbackByServiceIdResponse | null> {
  console.log("serviceId", serviceId);
  const res = await fetchAPIProtected<Callback>({
    method: RequestMethod.POST,
    url: "fetch-callback-by-serviceId?serviceId=" + serviceId,
    handleErrors: false,
    baseUrl: APPOINTMENT_API_URL,
  });

  return {
    loggedIn: res.status,
    callback: res.data,
  };
}
