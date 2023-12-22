import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function requestRating({
  appointmentId,
}: {
  appointmentId: string;
}): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `request-rating?appointmentId=${appointmentId}`,
    method: RequestMethod.POST,
  });
  return response.status;
}
