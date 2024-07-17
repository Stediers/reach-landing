import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { AUTH_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export type VerifyOtpResponse = {
  redirectUrl: string;
  token: string;
};

export async function verifyOTP(
  mobileNumber: string,
  otp: string
): Promise<VerifyOtpResponse | null> {
  const response = await fetchAPIPublic<VerifyOtpResponse>({
    url: `verify-user-otp`,
    method: RequestMethod.POST,
    body: {
      otp: otp,
      mobileNumber: mobileNumber,
    },
    snackbar: true,
    baseUrl: AUTH_API_URL,
  });
  return response.data;
}
