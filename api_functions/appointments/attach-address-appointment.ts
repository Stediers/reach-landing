import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { LocationAttributes } from "@data/types";

interface AttachAddressAppointmentRequest {
  appointmentId: string;
  address: LocationAttributes;
}

export async function attachAddressAppointment(
  request: AttachAddressAppointmentRequest
) {
  const response = await fetchAPIProtected<AttachAddressAppointmentRequest>({
    method: RequestMethod.POST,
    url: "attach-address-appointment",
    body: request,
  });

  return response.status;
}
