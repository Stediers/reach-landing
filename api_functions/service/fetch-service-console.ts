import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { ServicesScreen } from "./fetch-services-screen";

export async function fetchServiceConsole(
  serviceId: string
): Promise<ServicesScreen | null> {
  const response = await fetchAPIProtected<ServicesScreen>({
    url: `fetch-service-console?serviceId=${serviceId}`,
    method: RequestMethod.GET,
  });
  return response.data;
}
