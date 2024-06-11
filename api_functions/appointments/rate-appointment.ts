import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Feedback } from "@data/types";

export interface RateAppointmentRequest {
  appointmentId: string;
  rating: Feedback;
}

export async function rateAppointment(
  request: RateAppointmentRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "rate-appointment",
    body: request,
    snackbar: true,
  });

  return res.status;
}
