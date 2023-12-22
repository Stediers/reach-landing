import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AppointmentStatus, RequestMethod } from "@data/enums";

type UpdateBookingStatusRequest = {
  appointmentId: string;
  bookedAt: Date;
  status: AppointmentStatus.SCHEDULED | AppointmentStatus.CANCELLED;
};

export async function updateBookingStatus(
  request: UpdateBookingStatusRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "update-booking-status",
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });

  return res.status;
}
