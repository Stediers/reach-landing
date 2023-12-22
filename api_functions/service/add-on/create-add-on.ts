import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type CreateAddOn = {
  title: string;
  description: string;
  price: number;
  serviceIds: string[];
  imageUrls: string[];
};

export async function createAddOn(request: CreateAddOn): Promise<boolean> {
  const res = await fetchAPIProtected({
    url: "create-add-on",
    method: RequestMethod.POST,
    body: request,
  });

  return res.status;
}
