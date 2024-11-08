import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { APPOINTMENT_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export type RaiseDisputeRequest = {
  appointmentId: string;
  reason: string;
};

export async function raiseDispute(
  request: RaiseDisputeRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "raise-dispute",
    body: request,
    snackbar: true,
    baseUrl: APPOINTMENT_API_URL,
  });

  return res.status;
}
