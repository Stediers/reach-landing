import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { deleteItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import {
  OnlinePlatform,
  PreferredGender,
  RequestMethod,
  ServiceType,
} from "@data/enums";
import { Address, LocationAttributes, Price } from "@data/types";

export type BasicDetails = {
  title: string;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  experience: {
    years: number;
    months: number;
  };
};

export type OnlineServiceTypeDetails = {
  serviceType: ServiceType.ONLINE;
  preferredOnlinePlatforms: OnlinePlatform[];
};

export type OfflineServiceTypeDetails = {
  serviceType: ServiceType.OFFLINE;
  travelCharges: boolean;
};

export type HomeServiceTypeDetails = {
  serviceType: ServiceType.HOME;
  location: LocationAttributes | null;
  locationName: string;
  selectedAddress: Address | null;
};

export type ServiceMedia = {
  images: File[];
  video: File | null;
};

export type ServicePreferences = {
  preferredGender: PreferredGender;
  requirements: string[];
};

export type CreateHomeServiceRequest = {
  basicDetails: BasicDetails;
  serviceTypeDetails: HomeServiceTypeDetails;
  price: Price;
  serviceMedia: {
    images: string[];
    video: string | null;
  };
  servicePreferences: ServicePreferences;
  addOnIds: string[];
};

export type CreateOfflineServiceRequest = {
  basicDetails: BasicDetails;
  serviceTypeDetails: OfflineServiceTypeDetails;
  price: Price;
  serviceMedia: {
    images: string[];
    video: string | null;
  };
  servicePreferences: ServicePreferences;
  addOnIds: string[];
};

export type CreateOnlineServiceRequest = {
  basicDetails: BasicDetails;
  serviceTypeDetails: OnlineServiceTypeDetails;
  price: Price;
  serviceMedia: {
    images: string[];
    video: string | null;
  };
  servicePreferences: ServicePreferences;
  addOnIds: string[];
};

export async function addHomeService(request: CreateHomeServiceRequest) {
  const res = await fetchAPIProtected({
    url: `add-home-service`,
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });
  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return res.status;
}

export async function addOfflineService(request: CreateOfflineServiceRequest) {
  const res = await fetchAPIProtected({
    url: `add-offline-service`,
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });
  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return res.status;
}

export async function addOnlineService(request: CreateOnlineServiceRequest) {
  const res = await fetchAPIProtected({
    url: `add-online-service`,
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });
  if (res.status) {
    deleteItemsFromLocalStorage({
      keys: [`fetch-services-screen`],
    });
  }
  return res.status;
}
