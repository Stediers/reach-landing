import { CUSTOMER_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import {
  ApiResult,
  FetchPartnerResponse,
  FetchServiceResponse,
  ServicePackage,
  Slot,
} from "@data/types";

export type FetchPartnerByPartnerIdResponse = {
  partner: FetchPartnerResponse;
  referrals: number;
  services: FetchServiceResponse[];
  packages: ServicePackage[];
  workingSlots: Slot[];
};

export async function fetchPartnerByPartnerId(
  gigId: string
): Promise<FetchPartnerByPartnerIdResponse | null> {
  try {
    const response = await fetch(
      `${CUSTOMER_API_URL}/fetch-gig-profile-by-gigId?gigId=${gigId}`,
      {
        method: RequestMethod[RequestMethod.GET],
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: ApiResult<FetchPartnerByPartnerIdResponse> =
      await response.json();
    if (response.status === 200) {
      if (data.errorMessage) {
        return null;
      }
      return data.data ? data.data : null;
    } else {
      console.log(data.errorMessage);
      throw new Error(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
