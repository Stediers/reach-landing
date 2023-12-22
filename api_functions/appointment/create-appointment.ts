import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { OnlinePlatform, RequestMethod } from "@data/enums";
import { LocationAttributes } from "@data/types";

type CreateAppointmentRequest = {
  serviceId: string;
  userId: string | null;
  mobileNumber: string;
  date: Date;
  addOnIds: string[];
};

export async function createAppointment(
  request: CreateAppointmentRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "create-appointment",
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });

  return res.status;
}
