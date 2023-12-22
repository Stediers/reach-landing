import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { IndianLanguages, RequestMethod } from "@data/enums";
import { Base64, ContactOptions } from "@data/types";

type UpdateGigDetailsRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  designation: string;
  fluentLanguages: IndianLanguages[];
  contactOptions: ContactOptions[];
};

export async function updateGigDetails(
  request: UpdateGigDetailsRequest
): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `update-gig-details`,
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });

  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: ["fetch-console-gig-profile"],
    });
  }
  return response.status;
}
