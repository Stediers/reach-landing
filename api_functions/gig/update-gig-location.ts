import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";
import { Base64, LocationAttributes } from "@data/types";

export async function updateGigLocation({
  location,
}: {
  location: {
    city: string;
    state: string;
  };
}) {
  const response = await fetchAPIProtected({
    url: `update-gig-location`,
    method: RequestMethod.POST,
    body: {
      location,
    },
    snackbar: true,
  });

  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: ["fetch-console-gig-profile"],
    });
  }
  return response.status;
}
