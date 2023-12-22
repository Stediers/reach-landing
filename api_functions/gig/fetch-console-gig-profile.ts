import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import {
  deleteItemsFromLocalStorage,
  getItemsFromLocalStorage,
} from "@api_functions/internal/local-storage";
import { IndianLanguages, MembershipType, RequestMethod } from "@data/enums";
import { Address, ContactOptions } from "@data/types";
import devLog from "@helper_functions/devLog";

export type FetchConsoleGigProfileResponse = {
  firstName: string;
  lastName: string;
  gigId: string;
  imageUrl: string | null;
  membershipType: MembershipType;
  recoveryEmails: string[];
  mobileNumber: string;
  contactOptions: ContactOptions[];
  location: {
    city: string;
    state: string;
  };
  availability: boolean;
  isVerified: boolean;
  rating: number | null;
  totalAppointments: number;
  totalRatedAppointments: number;
  designation: string;
  fluentLanguages: IndianLanguages[];
};

async function fetchApi(): Promise<FetchConsoleGigProfileResponse | null> {
  const res = (
    await fetchAPIProtected<FetchConsoleGigProfileResponse>({
      url: "fetch-console-gig-profile",
      method: RequestMethod.GET,
    })
  ).data;

  if (res) {
    if (!validateResponse(res)) {
      return null;
    } else {
      return res;
    }
  } else {
    return null;
  }
}

export async function fetchConsoleGigProfile(): Promise<FetchConsoleGigProfileResponse | null> {
  const response = getItemsFromLocalStorage<FetchConsoleGigProfileResponse>({
    key: "fetch-console-gig-profile",
  });

  if (response) {
    if (!validateResponse(response)) {
      deleteItemsFromLocalStorage({
        keys: ["fetch-console-gig-profile"],
      });
      return await fetchApi();
    } else {
      return response;
    }
  } else {
    return await fetchApi();
  }
}

function validateResponse(res: FetchConsoleGigProfileResponse): boolean {
  if (!res) {
    devLog("res is null");
    return false;
  }
  if (!res.firstName || !res.lastName) {
    devLog("name is null");
    return false;
  }
  if (!res.gigId) {
    devLog("gigId is null");
    return false;
  }
  if (!res.membershipType) {
    devLog("membershipType is null");
    return false;
  }
  if (!res.recoveryEmails) {
    devLog("recoveryEmails is null");
    return false;
  }
  if (!res.mobileNumber) {
    devLog("mobileNumber is null");
    return false;
  }
  if (!res.contactOptions) {
    devLog("contactOptions is null");
    return false;
  }
  if (!res.location) {
    devLog("location is null");
    return false;
  }
  if (res.availability === null) {
    devLog("availability is null");
    return false;
  }
  // if (!res.isVerified) {
  //   devLog("isVerified is null");
  //   return false;
  // }
  if (res.totalAppointments === null) {
    devLog("totalAppointments is null");
    return false;
  }
  if (res.totalRatedAppointments === null) {
    devLog("totalRatedAppointments is null");
    return false;
  }
  if (!res.designation) {
    devLog("designation is null");
    return false;
  }
  if (!res.fluentLanguages) {
    devLog("fluentLanguages is null");
    return false;
  }
  return true;
}
