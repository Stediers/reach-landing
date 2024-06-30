import { type } from "os";
import {
  AddressType,
  AppointmentStatus,
  BookingStatus,
  CallbackStatus,
  Currency,
  DisputeStatus,
  DraftStatus,
  Gender,
  OnlinePlatform,
  PaymentStatus,
  PayoutStatus,
  PreferredGender,
  PricingType,
  ServiceCategory,
  ServiceType,
  SortType,
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

export type SelectInputOption = {
  icon?: React.ReactNode;
  text: string;
  value: string | number;
};

export interface CanSaveAddAddress {
  address: boolean;
  city: boolean;
  state: boolean;
  country: boolean;
  postalCode: boolean;
  latlng: boolean;
  name: boolean;
}

export interface ResponseLambda {
  message: string;
}

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

export interface Address extends LocationAttributes {
  addressId: string;
  name: string;
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

export type FormContent = {
  name: string;
  phone: string;
  email: string;
  question: string;
};

export type ContactOptions = {
  link: string;
  name: string;
  priority: number;
};

export type ApiResult<T> = {
  data?: T;
  status: {
    message: string;
    redirectUrl?: string;
  };
  errorMessage?: string; // This is only for tacking lambda timeout error or any internal code execution error in backend
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

export type Filter = {
  serviceType: ServiceType;
  location: {
    city: string;
    state: string;
  };
  sort: {
    range: SortType;
    type: "price" | "rating";
  };
  gender: Gender | null;
  experience: number;
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

export type ApiExecutionStatus<T> = {
  data: T | null;
  status: boolean;
};

export type Service = {
  price: number; // price of the service
  pricingType: PricingType; // pricing type of the service
  howItWorks: string[]; // array of strings
  preferredGender: PreferredGender; // Preferred Gender
  address: Address; // address of the service
  title: string; // title of the service
  negotiable: boolean; // is the price negotiable
  serviceType: ServiceType; // type of service
  experience: string; // experience of the service provider
  videoUrl: string; // video url of the service
  serviceQualityRating: number | null; // service quality rating
  priceFairnessRating: number | null; // price fairness rating
  myAchievements: MyAchievement[]; // array of strings
  overallRating: number | null; // overall rating
};

export type TabData = {
  id: string;
  label: string;
};

export type Feedback = {
  userBehaviourRating: number;
  serviceQualityRating: number;
  review: string;
};

export type BookingBill = {
  advanceFee: number;
  platformFee: number;
  total: number;
  tax: number;
};

export type Order = {
  amount: number;
  currency: string;
  orderId: string;
  receipt: string;
  status: string;
  paymentLink: string | null;
};

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

export interface LatLng {
  lat: number;
  lng: number;
}

export interface Price {
  price: number;
  pricingType: PricingType;
  currency: Currency;
  priceId?: string;
  discount: Discount | null;
  bookingBill: BookingBill;
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

export type AddOn = {
  title: string;
  description: string;
  price: number;
  attachedServiceIds: string[];
  imageUrls: string[];
  id?: string;
};

export type Pagination = {
  page: number;
  limit: number;
};

export type MyAchievement = {
  images: string[];
  comment: string;
  date: string;
  appointmentId: string;
};

export type AppointmentBaseData = {
  id: string;
  scheduledAt: Date;
  completedAt: Date;
  cancelledAt: Date;
  bookedAt: Date;
  ratedAt: Date;
  paidAt: Date | null;
  liveAt: Date | null;
};

export type User = {
  name: string;
  userId: string;
  userBehaviourRating: number;
  verification: {
    aadhar: boolean;
    skills: boolean;
  };
  image: string;
};

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

export interface ServiceView {
  user: {
    firstName: string;
    lastName: string;
    rating: number;
    socialMedia: string[];
    profilePhotoUrl: string;
    userId: string;
  };
  service: {
    title: string;
    description: string;
    videoUrl: string;
    imageUrls: string[];
    price: number;
    pricingType: PricingType;
    serviceType: ServiceType;
    location: {
      city: string;
      state: string;
      country: string;
    } | null;
    experience: string;
    rating: {
      quality: number;
      price: number;
      overallRatingGraphData: GraphDataPoint[];
    };
  };
}

export interface GraphDataPoint {
  name: string;
  value: number | Date;
}

export interface ResponseLambda {
  message: string;
}

export type FetchAppointmentResponse = {
  status: AppointmentStatus;
  id: string;
  service: FetchServiceResponse;
  customer: FetchCustomerResponse;
  partner: FetchPartnerResponse;
  price: Price;
  dispute: {
    reason: string | null;
    status: DisputeStatus;
    reasonForAction: string | null;
  } | null;
  callbackId: string;
  scheduled: {
    slot: Slot;
    address: Address | null;
  };
  completed: {
    partnerFeedback: Feedback | null;
    customerFeedback: CustomerFeedback | null;
  } | null;
  cancelled: {
    refundInitiated: boolean;
  } | null;
  otp: string | null;
  customerPayment: CustomerPayment[];
  partnerPayout: PartnerPayout | null;
};

export type CustomerPayment = {
  status: PaymentStatus;
  amountInPaisa: number;
  paymentId: string;
  url: string;
};

export type PartnerPayout = {
  payoutStatus: PayoutStatus;
  amountInPaisa: number;
  razorpayId: string;
};

export type Callback = {
  id: string;
  status: CallbackStatus;
  message: string;
  createdAt: Date;
  service: FetchServiceResponse;
  partner: FetchPartnerResponse;
  customer: FetchCustomerResponse;
  location: {
    city: string;
    state: string;
  };
  appointmentId: string | null;
};

export type FetchCustomerResponse = {
  userId: string;
  name: string;
  mobileNumber: string;
  imageUrl: string | null;
  rating: number | null;
};

export type FetchPartnerResponse = {
  firstName: string;
  lastName: string;
  gender: Gender;
  rating: number | null;
  city: string;
  state: string;
  totalRatings: number;
  available: boolean;
  userId: string;
  mobileNumber: string;
  serviceIds: string[];
  gigId: string;
  imageUrl: string;
  isVerified: boolean;
  designation: string;
  languages: string[];
  handle: string | null;
  exposeMobileNumber: boolean;
};

export type RazorpayPayment = {
  link: string;
  razorpayId: string;
  paymentDbId: string;
};

export type ServicePackage = {
  id: string;
  title: string;
  description: string;
  price: ServicePackagePrice;
  services: FetchServiceResponse[];
};

export type AppointmentBill = {
  charge: number;
  bookingFee: number;
  platformFee: number;
  total: number;
};

export type ServicePackagePrice = {
  price: number; // in paisa
  currency: Currency;
  discount: Discount | null;
  bookingBill: BookingBill;
};

export type FetchServiceResponse = {
  title: string;
  category: ServiceCategory;
  preferredGender: PreferredGender;
  rating: number | null;
  addOns: AddOn[];
  price: Price;
  address: Address | null;
  imageUrls: string[];
  serviceType: ServiceType;
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  experience: string;
  requirements: string[];
  onlinePlatforms: string[];
  deleted: boolean;
  visible: boolean;
  userId: string;
  bookings: {
    requested: number;
    confirmed: number;
    rated: number;
  };
  id: string;
};

export type PayloadChatMessage = {
  bookingId: string | null;
  chatId: string;
  createdAt: Date;
  deleted: boolean;
  id: string;
  message: string;
  read: boolean;
  sendByUserId: string;
  serviceId: string | null;
  updatedAt: Date;
};

export type PayloadBooking = {
  id: string;
  status: BookingStatus;
  chatId: string | null;
  feedback: Feedback | null;
};

export type CustomerFeedback = {
  rating: number;
  review: string | null;
};

export type Category = {
  title: string;
  enum: ServiceCategory;
  description: string;
};
