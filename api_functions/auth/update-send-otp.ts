import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AUTH_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export async function UpdateSendOtp(mobileNumber: string): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `update-send-otp`,
    method: RequestMethod.POST,
    body: {
      mobileNumber: mobileNumber,
    },
    baseUrl: AUTH_API_URL,
    snackbar: true,
  });
  return response.status;
}
