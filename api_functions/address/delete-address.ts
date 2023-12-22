import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";

export async function deleteAddress(addressId: string) {
  const response = await fetchAPIProtected({
    url: `delete-address?addressId=${addressId}`,
    method: RequestMethod.DELETE,
    snackbar: true,
  });
  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-address-by-userId`],
    });
  }
  return response.status;
}
