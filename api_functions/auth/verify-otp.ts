import { fetchAPIPublic } from "@api_functions/internal/base-functions";
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
  });
  return response.data;
}
