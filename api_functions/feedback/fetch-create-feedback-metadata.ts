import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import { RequestMethod } from "@data/enums";
import { AddOn, Address } from "@data/types";

export type FetchCreateFeedbackMetadataResponse = {
  service: ServicesScreen;
  userAddresses: Address[];
  addOns: AddOn[];
};

export async function fetchCreateFeedbackMetadata(
  serviceId: string
): Promise<FetchCreateFeedbackMetadataResponse | null> {
  const response = await fetchAPIProtected<FetchCreateFeedbackMetadataResponse>(
    {
      url: `fetch-create-feedback-metadata?serviceId=${serviceId}`,
      method: RequestMethod.GET,
    }
  );
  return response.data;
}
