import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Slot } from "@data/types";

export type RescheduleAppointmentRequest = {
  slot: Slot;
  appointmentId: string;
};

export async function rescheduleAppointment(
  request: RescheduleAppointmentRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "reschedule-appointment",
    body: request,
    snackbar: true,
    baseUrl: APPOINTMENT_API_URL,
  });

  return res.status;
}
