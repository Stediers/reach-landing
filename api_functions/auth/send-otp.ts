import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function sendOTP(mobileNumber: string): Promise<boolean> {
  const response = await fetchAPIPublic({
    url: `send-otp`,
    method: RequestMethod.POST,
    body: {
      mobileNumber: mobileNumber,
    },
    snackbar: true,
  });
  return response.status;
}
