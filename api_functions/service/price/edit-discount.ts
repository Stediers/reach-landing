import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Discount } from "@data/types";

export async function editDiscount(discount: Discount): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `edit-discount`,
    method: RequestMethod.POST,
    body: discount,
    snackbar: true,
  });
  return response.status;
}
