import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { AddOn } from "@data/types";

export default async function fetchAddOns(): Promise<AddOn[] | null> {
  const res = await fetchAPIProtected<AddOn[]>({
    url: "fetch-add-ons",
    method: RequestMethod.GET,
  });

  return res.data;
}

export function validateAddOn(addOn: AddOn) {
  if (!addOn.title) {
    console.log("No title");
    return "No title";
  }
  if (!addOn.price) {
    console.log("No price");
    return "No price";
  }
  if (!addOn.description) {
    console.log("No description");
    return "No description";
  }
  if (!addOn.imageUrls) {
    console.log("No imageUrls");
    return "No imageUrls";
  }
  if (!addOn.attachedServiceIds) {
    console.log("No attachedServiceIds");
    return "No attachedServiceIds";
  }
  return null;
}
