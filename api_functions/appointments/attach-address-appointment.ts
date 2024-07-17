import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { LocationAttributes } from "@data/types";

interface AttachAddressAppointmentRequest {
  appointmentId: string;
  addressId: string;
}

export async function attachAddressAppointment(
  request: AttachAddressAppointmentRequest
) {
  const response = await fetchAPIProtected<AttachAddressAppointmentRequest>({
    method: RequestMethod.POST,
    url: "attach-address-appointment",
    body: request,
    baseUrl: APPOINTMENT_API_URL,
  });

  return response.status;
}
