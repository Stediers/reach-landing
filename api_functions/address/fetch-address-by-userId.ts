import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Address, validateAddress } from "@data/types";
import { ADDRESS_API_URL } from "@data/api";

export async function fetchAddressByUserId(
  handleErrors?: boolean
): Promise<Address[] | null> {
  const response = await fetchAPIProtected<Address[]>({
    url: `fetch-address-by-userId`,
    method: RequestMethod.GET,
    baseUrl: ADDRESS_API_URL,
    handleErrors: handleErrors,
  });

  if (response.data) {
    console.log(response.data);
    if (!validateResponse(response.data)) {
      return null;
    } else {
      return response.data;
    }
  } else {
    return null;
  }
}

function validateResponse(response: Address[]): boolean {
  if (!response) {
    return false;
  }
  if (!response) {
    return false;
  }
  console.log(response);
  response.forEach((address) => {
    validateAddress(address);
  });
  return true;
}
