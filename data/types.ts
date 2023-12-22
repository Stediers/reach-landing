import { type } from "os";
import {
  AddressType,
  AppointmentStatus,
  Currency,
  DraftStatus,
  Gender,
  OnlinePlatform,
  PreferredGender,
  PricingType,
  ServiceType,
} from "./enums";

type Opaque<T, K extends string> = T & { __typename: K };

export type Base64 = Opaque<string, "base64">;

export interface CanSaveAddService {
  title: boolean;
  whatsIncluded: boolean;
  price: boolean;
  tags: boolean;
  experience: boolean;
  location: boolean;
}

export type ApiResult<T> = {
  data?: T;
  status: {
    message: string;
    redirectUrl?: string;
  };
  errorMessage?: string; // This is only for tacking lambda timeout error or any internal code execution error in backend
};

export type TabData = {
  label: string;
};

export type ApiExecutionStatus<T> = {
  data: T | null;
  status: boolean;
};

export type LocationAttributes = {
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: number;
  lng: number;
  addressLine1: string;
  addressLine2: string;
  landmark: string | null;
  addressType: AddressType;
};
export function validateLocationAttributes(
  location: LocationAttributes
): boolean {
  if (!location.city) {
    return false;
  }
  if (!location.state) {
    return false;
  }
  if (!location.country) {
    return false;
  }
  if (!location.postalCode) {
    return false;
  }
  if (!location.lat) {
    return false;
  }
  if (!location.lng) {
    return false;
  }
  if (!location.addressLine1) {
    return false;
  }
  if (!location.addressLine2) {
    return false;
  }
  if (!location.addressType) {
    return false;
  }

  return true;
}

export type SelectInputOption = {
  icon?: React.ReactNode;
  text: string;
  value: string | number;
};

export type ContactOptions = {
  link: string;
  name: string;
  priority: number;
};

export interface Pagination {
  nextPageExists: boolean;
}

export interface CanSaveAddAddress {
  address: boolean;
  city: boolean;
  state: boolean;
  country: boolean;
  postalCode: boolean;
  latlng: boolean;
  name: boolean;
}

export interface Service {
  serviceId: string;
  userId: string;
  price: number | null;
  pricingType: PricingType | null;
  description: string | null;
  addressId: string | null;
  PreferredGender: PreferredGender | null;
  video: File | null;
  active: boolean;
  draftStatus: DraftStatus;
  serviceType: ServiceType;
  tags: string[];
  title: string | null;
  rating: number | null;
}

export interface ResponseLambda {
  message: string;
}

export type Slot = {
  id: number;
  time: string;
  status: "available" | "booked";
  date: Date;
};

export type StepData = {
  title: string;
  index: number;
  state: boolean;
  description: string;
};

export type AddOn = {
  title: string;
  description: string;
  price: number;
  attachedServiceIds: string[];
  imageUrls: string[];
  id?: string;
};

export interface Price {
  price: number;
  pricingType: PricingType;
  currency: Currency;
  priceId?: string;
  discount: Discount | null;
}

export interface Discount {
  value: number;
  name: string;
  discountId?: string;
  attachedPriceIds?: string[];
}
export function validateDiscount({
  discount,
  discountId = true,
  attachedPriceIds = true,
}: {
  discount: Discount;
  discountId?: boolean;
  attachedPriceIds?: boolean;
}): boolean {
  if (!discount.value) {
    return false;
  }
  if (!discount.name) {
    return false;
  }
  if (discountId && !discount.discountId) {
    return false;
  }
  if (attachedPriceIds && !discount.attachedPriceIds) {
    return false;
  }
  if (discount.value < 1 || discount.value > 99) {
    return false;
  }
  if (discount.name.length < 3 || discount.name.length > 50) {
    return false;
  }
  return true;
}

export function validatePrice(price: Price): boolean {
  if (!price.price) {
    return false;
  }
  if (!price.pricingType) {
    return false;
  }
  if (!price.currency) {
    return false;
  }
  return true;
}

export interface Address extends LocationAttributes {
  addressId: string;
  name: string;
}
export function validateAddress(address: Address): boolean {
  if (!address.addressId) {
    return false;
  }
  if (!address.name) {
    return false;
  }
  if (!validateLocationAttributes(address)) {
    return false;
  }
  return true;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export type Tracking = {
  id: string;
  city: string;
  state: string;
  country: string;
  spam: boolean;
  followUp: boolean;
  createdAt: Date;
};

export interface AppointmentBaseDataSnapshot {
  service: {
    title: string;
    whatsIncluded: string[];
    whatsNotIncluded: string[];
    requirements: string[];
    serviceId: string;
    imageUrls: string[];
  };
  gig: {
    firstName: string;
    lastName: string;
    profilePictureUrl: string;
    rating: number;
    userId: string;
  };
  addOns: {
    title: string;
    description: string;
    price: number;
    id: string;
  }[];
  appointmentId: string;
  scheduledAt: Date;
  completedAt: Date | null;
  cancelledAt: Date | null;
  ratedAt: Date | null;
}

export interface HomeAppointmentSnapshot extends AppointmentBaseDataSnapshot {
  address: Address;
}

export interface OnlineAppointmentSnapshot extends AppointmentBaseDataSnapshot {
  platform: OnlinePlatform;
  link: string;
}

export interface OfflineAppointmentSnapshot
  extends AppointmentBaseDataSnapshot {
  location: LocationAttributes;
  extraCharges: {
    [key: string]: number;
  };
}
