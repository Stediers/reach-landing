import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function generatePaymentLinkAppointment(
  appointmentId: string
): Promise<string | null> {
  const response = await fetchAPIProtected<string>({
    method: RequestMethod.GET,
    url: "generate-payment-link-appointment?appointmentId=" + appointmentId,
  });

  return response.data;
}
