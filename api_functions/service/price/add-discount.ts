import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";

export type AddDiscountRequest = {
  title: string;
  discount: number;
};

export async function addDiscount(
  discount: AddDiscountRequest
): Promise<boolean | undefined> {
  const response = await fetchAPIProtected({
    url: `add-discount`,
    method: RequestMethod.POST,
    body: discount,
    snackbar: true,
  });
  return response.status;
}
