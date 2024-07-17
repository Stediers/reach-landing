import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { ADDRESS_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { LatLng, LocationAttributes } from "@data/types";

export interface AddAddressRequest {
  location: LocationAttributes;
  locationName: string;
}

export async function addAddress(request: AddAddressRequest): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `add-address`,
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
    baseUrl: ADDRESS_API_URL,
  });
  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-address-by-userId`],
    });
  }
  return response.status;
}
