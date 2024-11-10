import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { FetchAppointmentResponse, Slot } from "@data/types";

export type CreateAppointmentRequest = {
  slot: Slot | null;
  appointmentRequestId?: string;
  addressId: string | null;
};

export async function createAppointment(
  request: CreateAppointmentRequest
): Promise<FetchAppointmentResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentResponse>({
    method: RequestMethod.POST,
    url: "create-appointment",
    body: request,
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.data;
}
