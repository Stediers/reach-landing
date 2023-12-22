import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";
import { RequestMethod } from "@data/enums";
import { Address, validateAddress } from "@data/types";

type FetchAddressByUserIdResponse = {
  addresses: FetchAddressByUserIdAddresses[];
};

export interface FetchAddressByUserIdAddresses extends Address {
  attachedServices: {
    serviceId: string;
    title: string;
  }[];
}

export async function fetchAddressByUserId(): Promise<FetchAddressByUserIdResponse | null> {
  const response = await fetchAPIProtected<FetchAddressByUserIdResponse>({
    url: `fetch-address-by-userId`,
    method: RequestMethod.GET,
  });

  if (response.data) {
    if (!validateResponse(response.data)) {
      return null;
    } else {
      return response.data;
    }
  } else {
    return null;
  }
}

function validateResponse(response: FetchAddressByUserIdResponse) {
  if (!response) {
    return false;
  }
  if (!response.addresses) {
    return false;
  }
  response.addresses.forEach((address) => {
    if (!address.attachedServices) {
      return false;
    }
    validateAddress(address);
    address.attachedServices.forEach((service) => {
      if (!service.serviceId || !service.title) {
        return false;
      }
    });
  });
  return true;
}
