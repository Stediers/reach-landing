import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";

export async function fetchAppointmentsScreen(): Promise<
  FetchAppointmentResponse[] | null
> {
  const response = await fetchAPIProtected<FetchAppointmentResponse[]>({
    method: RequestMethod.GET,
    url: "fetch-appointments-screen",
  });

  return response.data;
}
