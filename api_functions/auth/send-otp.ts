import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { AUTH_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export async function sendOTP(mobileNumber: string): Promise<boolean> {
  const response = await fetchAPIPublic({
    url: `send-otp`,
    method: RequestMethod.POST,
    body: {
      mobileNumber: mobileNumber,
    },
    snackbar: true,
    baseUrl: AUTH_API_URL,
  });
  return response.status;
}
