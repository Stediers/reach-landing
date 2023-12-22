import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { PreferredGender, RequestMethod } from "@data/enums";
import { AddOn, Address, Price } from "@data/types";

export type EditServiceRequest = {
  serviceId: string;
  preferredGender: PreferredGender;
  additionalRequirements: string[];
  price: Price;
  selectedAddressId: string | null;
  imageUrls: string[];
  discountId: string | null;
  addOnIds: string[];
};

export async function editService(
  service: EditServiceRequest
): Promise<boolean | undefined> {
  const response = await fetchAPIProtected({
    url: `edit-service`,
    method: RequestMethod.POST,
    body: service,
    snackbar: true,
  });
  if (response.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return response.status;
}

export type FetchEditServiceMetadataResponse = {
  serviceId: string;
  title: string;
  preferredGender: PreferredGender;
  additionalRequirements: string[];
  imageUrls: string[];
  price: Price;
  discounts: {
    name: string;
    value: number;
    discountId: string;
  }[];
  location: {
    addresses: Address[];
    selectedAddressId: string;
  } | null;
  visible: boolean;
  addOns: {
    addOns: AddOn[];
    attachedAddOnIds: string[];
  };
};

export async function fetchEditServiceMetaData(
  serviceId: string
): Promise<FetchEditServiceMetadataResponse | null> {
  const response = await fetchAPIProtected<FetchEditServiceMetadataResponse>({
    url: `fetch-edit-service-metadata?serviceId=${serviceId}`,
    method: RequestMethod.GET,
  });
  return response.data;
}
