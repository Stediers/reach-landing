import { fetchAPIProtected } from "@api_functions/internal/base-functions";
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
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
    snackbar: true,
  });
  return response.status;
}
