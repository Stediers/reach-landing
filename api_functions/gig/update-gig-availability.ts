import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";

type UpdateGigAvailabilityResponse = {
  available: boolean;
};

export async function updateGigAvailability(): Promise<UpdateGigAvailabilityResponse | null> {
  const response = await fetchAPIProtected<UpdateGigAvailabilityResponse>({
    url: `update-gig-availability`,
    method: RequestMethod.POST,
    snackbar: true,
  });
  if (response.data) {
    deleteItemsFromLocalStorage({
      keys: ["fetch-console-gig-profile"],
    });
  }

  return response.data;
}
