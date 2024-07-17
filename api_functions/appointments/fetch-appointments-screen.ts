import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";

export async function fetchAppointmentsScreen(): Promise<
  FetchAppointmentResponse[] | null
> {
  const response = await fetchAPIProtected<FetchAppointmentResponse[]>({
    method: RequestMethod.POST,
    url: "fetch-appointments-screen",
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.data;
}
