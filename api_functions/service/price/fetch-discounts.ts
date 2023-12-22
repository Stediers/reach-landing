import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Discount } from "@data/types";

export async function fetchDiscounts(): Promise<Discount[] | null> {
  const res = await fetchAPIProtected<Discount[]>({
    url: `fetch-discounts`,
    method: RequestMethod.GET,
  });
  return res.data;
}
