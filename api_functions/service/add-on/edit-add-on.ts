import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { AddOn } from "@data/types";

export async function editAddOn(request: AddOn): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "edit-add-on",
    method: RequestMethod.POST,
    body: request,
  });

  return res.status;
}
