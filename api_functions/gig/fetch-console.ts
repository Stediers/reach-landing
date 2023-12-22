import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import {
  AppointmentStatus,
  OnlinePlatform,
  RequestMethod,
  ServiceType,
} from "@data/enums";
import { LatLng, LocationAttributes, Price } from "@data/types";

export type FetchConsoleResponse = {
  serviceViews: number;
  profileViews: number;
  completedAppointments: number;
  services: boolean;
};

export async function fetchConsole(): Promise<FetchConsoleResponse | null> {
  const response = await fetchAPIProtected<FetchConsoleResponse>({
    url: "fetch-console",
    method: RequestMethod.GET,
  });
  return response.data;
}
