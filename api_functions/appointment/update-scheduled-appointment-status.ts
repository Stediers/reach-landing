import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { AppointmentStatus, RequestMethod } from "@data/enums";

type UpdateScheduledAppointmentStatusRequest = {
  appointmentId: string;
  status: AppointmentStatus.COMPLETED | AppointmentStatus.CANCELLED;
};

export async function updateScheduledAppointmentStatus(
  request: UpdateScheduledAppointmentStatusRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "update-scheduled-appointment-status",
    method: RequestMethod.POST,
    body: request,
  });

  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [
        "fetch-appointments-calendar",
        `fetch-appointments-by-date?date=null&appointmentStatus=scheduled`,
        `fetch-appointments-by-date?date=null&appointmentStatus=completed`,
        `fetch-appointments-by-date?date=null&appointmentStatus=cancelled`,
        `fetch-appointments-by-date?date=null&appointmentStatus=rated`,
      ],
    });
  }

  return res.status;
}
