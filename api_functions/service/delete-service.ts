import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { showSnackBar } from "@components/notifications/Snackbar";
import { RequestMethod, State } from "@data/enums";
import router from "next/router";

export async function deleteService(serviceId: string) {
  const response = await fetchAPIProtected({
    url: `delete-service?serviceId=${serviceId}`,
    method: RequestMethod.DELETE,
    snackbar: true,
  });
  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return response.status;
}
