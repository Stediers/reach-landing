import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";

export async function fetchAppointment(
  appointmentId: string
): Promise<FetchAppointmentResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentResponse>({
    method: RequestMethod.GET,
    url: "fetch-appointment?appointmentId=" + appointmentId,
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
  });

  return response.data;
}
