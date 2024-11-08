import { CUSTOMER_API_URL, SERVICE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import {
  ApiResult,
  FetchPartnerResponse,
  FetchServiceResponse,
} from "@data/types";

export type FetchServiceByServiceIdResponse = {
  gig: FetchPartnerResponse;
  service: FetchServiceResponse;
  callback: {
    requested: number;
    accepted: number;
  };
};

export async function fetchServiceByServiceId(
  serviceId: string
): Promise<FetchServiceByServiceIdResponse | null> {
  try {
    const response = await fetch(
      `${CUSTOMER_API_URL}/fetch-service-by-serviceId?serviceId=${serviceId}`,
      {
        next: {
          revalidate: 60,
        },
        method: RequestMethod[RequestMethod.GET],
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data: ApiResult<FetchServiceByServiceIdResponse> =
      await response.json();
    if (response.status === 200) {
      if (data.errorMessage) {
        return null;
      }
      return data.data ? data.data : null;
    }
    return null;
  } catch (error) {
    return null;
  }
}
