import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";

type UpdateServiceVisibilityResponse = {
  visible: boolean;
};

export async function updateServiceVisibility(
  serviceId: string,
  visible: boolean
): Promise<UpdateServiceVisibilityResponse | null> {
  const response = await fetchAPIProtected<UpdateServiceVisibilityResponse>({
    url: `update-service-visibility`,
    method: RequestMethod.POST,
    body: {
      serviceId: serviceId,
      visible: visible,
    },
    snackbar: true,
  });

  if (response.data) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return response.data;
}
