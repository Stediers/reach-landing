import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import {
  deleteItemsFromLocalStorage,
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";
import {
  PreferredGender,
  ServiceType,
  PricingType,
  Currency,
  RequestMethod,
} from "@data/enums";
import { Discount, Price, validatePrice } from "@data/types";

export type FetchServicesScreenResponse = {
  servicesScreen: ServicesScreen[];
};

export type ServicesScreen = {
  serviceId: string;
  baseData: {
    title: string;
    visible: boolean;
    rating: number | null;
    totalAppointments: number;
    totalRatedAppointments: number;
    preferredGender: PreferredGender;
    experience: Date;
    serviceType: ServiceType;
    imageUrls: string[];
  };
  price: Price;
  location: {
    city: string;
  };
};

async function fetchApi(): Promise<FetchServicesScreenResponse | null> {
  const response = (
    await fetchAPIProtected<FetchServicesScreenResponse>({
      url: `fetch-services-screen`,
      method: RequestMethod.GET,
    })
  ).data;

  if (response) {
    if (!validateResponse(response)) {
      return null;
    } else {
      return response;
    }
  } else {
    return null;
  }
}

export async function fetchServicesScreen(): Promise<FetchServicesScreenResponse | null> {
  const response = getItemsFromLocalStorage<FetchServicesScreenResponse>({
    key: `fetch-services-screen`,
  });

  if (response) {
    if (!validateResponse(response)) {
      deleteItemsFromLocalStorage({
        keys: [`fetch-services-screen`],
      });
      return await fetchApi();
    } else {
      return response;
    }
  } else {
    return await fetchApi();
  }
}

function validateResponse(response: FetchServicesScreenResponse): boolean {
  response.servicesScreen.forEach((service) => {
    try {
      if (new Date(service.baseData.experience).toString() === "Invalid Date") {
        throw new Error("Invalid Date");
      }
      if (!validatePrice(service.price)) {
        throw new Error("Invalid Price");
      }
    } catch (error) {
      return false;
    }
  });
  return true;
}
