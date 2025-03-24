import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Callback } from "@data/types";

export type RequestCallbackRequest = {
  serviceId: string;
  message: string;
  location: {
    city: string;
    state: string;
  };
  addonIds: string[];
};

export async function requestCallback(
  request: RequestCallbackRequest
): Promise<Callback | null> {
  const res = await fetchAPIProtected<Callback>({
    method: RequestMethod.POST,
    url: "request-callback",
    body: request,
    snackbar: true,
    baseUrl: APPOINTMENT_API_URL,
  });

  return res.data;
}
