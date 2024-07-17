import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";

export async function fetchAppointment(
  appointmentId: string
): Promise<FetchAppointmentResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentResponse>({
    method: RequestMethod.GET,
    url: "fetch-appointment?appointmentId=" + appointmentId,
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.data;
}
