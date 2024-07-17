import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Address, FetchAppointmentResponse } from "@data/types";

export type FetchAppointmentResponseAPI = {
  appointment: FetchAppointmentResponse;
  userAddresses: Address[];
};

export async function fetchAppointment(
  appointmentId: string
): Promise<FetchAppointmentResponseAPI | null> {
  const response = await fetchAPIProtected<FetchAppointmentResponseAPI>({
    method: RequestMethod.GET,
    url: "fetch-appointment?appointmentId=" + appointmentId,
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.data;
}
