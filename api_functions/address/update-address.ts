import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";
import { LocationAttributes } from "@data/types";

type UpdateAddressRequest = {
  addressId: string;
  location: LocationAttributes;
  addressName: string;
};

export async function updateAddress(
  request: UpdateAddressRequest
): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "update-address",
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });

  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-address-by-userId`],
    });
  }

  return res.status;
}
