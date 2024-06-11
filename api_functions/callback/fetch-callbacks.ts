import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Callback } from "@data/types";

export async function fetchCallbacks(): Promise<Callback[] | null> {
  const res = await fetchAPIProtected<Callback[]>({
    method: RequestMethod.POST,
    url: "fetch-callbacks",
    snackbar: true,
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
    body: {},
  });

  return res.data;
}
