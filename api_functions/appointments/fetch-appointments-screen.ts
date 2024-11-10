import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import {
  FetchAppointmentRequestResponse,
  FetchAppointmentResponse,
} from "@data/types";

export type FetchAppointmentsScreenResponse = {
  appointments: FetchAppointmentResponse[];
  requests: FetchAppointmentRequestResponse[];
};

export async function fetchAppointmentsScreen(): Promise<FetchAppointmentsScreenResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentsScreenResponse>({
    method: RequestMethod.POST,
    url: "fetch-appointments-screen",
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.data;
}
