import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchVerificationStatusResponse = {
  mobileNumberVerified: boolean;
  profileVerified: boolean;
  mobileNumberRejectionReason: string | null;
  profileRejectionReason: string | null;
};

export async function fetchVerificationStatus(): Promise<FetchVerificationStatusResponse | null> {
  const response = await fetchAPIProtected<FetchVerificationStatusResponse>({
    method: RequestMethod.GET,
    url: "fetch-verification-status",
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
