import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Address, LocationAttributes, validateAddress } from "@data/types";
import { ADDRESS_API_URL } from "@data/api";

export async function fetchAddressByAddressId({
  addressId,
}: {
  addressId: string;
}): Promise<Address | null> {
  const res = await fetchAPIProtected<Address>({
    url: `fetch-address-by-addressId?addressId=${addressId}`,
    method: RequestMethod.GET,
    baseUrl: ADDRESS_API_URL,
  });
  if (res.data) {
    if (!validateAddress(res.data)) {
      return null;
    } else {
      return res.data;
    }
  } else {
    return null;
  }
}
