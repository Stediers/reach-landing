import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function UpdateSendOtp(mobileNumber: string): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `update-send-otp`,
    method: RequestMethod.POST,
    body: {
      mobileNumber: mobileNumber,
    },
    baseUrl: process.env.NEXT_PUBLIC_AUTH_API_URL,
    snackbar: true,
  });
  return response.status;
}
