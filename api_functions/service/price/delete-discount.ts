import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function deleteDiscount(discountId: string): Promise<boolean> {
  const response = await fetchAPIProtected({
    url: `delete-discount?discountId=${discountId}`,
    method: RequestMethod.DELETE,
    snackbar: true,
  });
  return response.status;
}
