import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AUTH_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export async function UpdateVerifyOtp(
  mobileNumber: string,
  otp: string
): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `update-verify-otp`,
    method: RequestMethod.POST,
    body: {
      otp: otp,
      mobileNumber: mobileNumber,
    },
    baseUrl: AUTH_API_URL,
    snackbar: true,
  });
  return response.status;
}
