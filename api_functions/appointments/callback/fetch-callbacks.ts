import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Callback } from "@data/types";

export async function fetchCallbacks(): Promise<Callback[] | null> {
  const res = await fetchAPIProtected<Callback[]>({
    method: RequestMethod.POST,
    url: "fetch-callbacks",
    baseUrl: APPOINTMENT_API_URL,
    body: {},
  });

  return res.data;
}
