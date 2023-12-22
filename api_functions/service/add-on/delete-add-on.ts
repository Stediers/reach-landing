import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function deleteAddOn(addOnId: string): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "delete-add-on?addOnId=" + addOnId,
    method: RequestMethod.DELETE,
    body: { addOnId },
    snackbar: true,
  });

  return res.status;
}
