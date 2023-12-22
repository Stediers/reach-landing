import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { AddOn, Address, Discount } from "@data/types";

export type FetchAddServiceMetadataResponse = {
  discounts: Discount[];
  addOns: AddOn[];
  addresses: Address[];
};

export async function fetchAddServiceMetadata(): Promise<FetchAddServiceMetadataResponse | null> {
  const res = await fetchAPIProtected<FetchAddServiceMetadataResponse>({
    url: "fetch-add-service-metadata",
    method: RequestMethod.GET,
  });
  return res.data;
}
