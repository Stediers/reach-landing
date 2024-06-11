import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type GeneratePaymentLinkRequest = {
  bookingId: string;
};

export async function generatePaymentLink(
  request: GeneratePaymentLinkRequest
): Promise<string | null> {
  const response = await fetchAPIProtected<string>({
    method: RequestMethod.POST,
    url: "generate-payment-link",
    body: request,
    snackbar: true,
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
