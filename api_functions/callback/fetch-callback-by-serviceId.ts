import { fetchAPIProtected } from "@api_functions/internal/base-functions";
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
    method: RequestMethod.GET,
    url: "fetch-callback-by-serviceId?serviceId=" + serviceId,
    handleErrors: false,
  });

  return {
    loggedIn: res.status,
    callback: res.data,
  };
}
