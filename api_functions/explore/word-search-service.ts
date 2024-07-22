import { fetchAPIPublic } from "@api_functions/internal/base-functions";
import { EXPLORE_API_URL } from "@data/api";
import {
  Gender,
  PreferredGender,
  RequestMethod,
  ServiceType,
  SortType,
} from "@data/enums";
import {
  ApiResult,
  FetchPartnerResponse,
  FetchServiceResponse,
  Pagination,
  Price,
} from "@data/types";
import { ICity, IState } from "country-state-city";

export type WordSearchServiceRequest = {
  query: string;
  filter: {
    state: string | null;
    verified: boolean;
    online: boolean;
    sort: {
      range: SortType;
      type: "price" | "rating";
    };
    customerGender: PreferredGender;
    partnerGender: Gender | null;
  };
  pagination: Pagination;
  category: string | null;
};

export type WordSearchServiceResponse = {
  data: { service: FetchServiceResponse; partner: FetchPartnerResponse }[];
  nextPage: boolean;
};

// export async function fetchPartnerByPartnerId(
//   gigId: string
// ): Promise<FetchPartnerByPartnerIdResponse | null> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API_URL}/fetch-gig-profile-by-gigId?gigId=${gigId}`,
//       {
//         method: RequestMethod[RequestMethod.GET],
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data: ApiResult<FetchPartnerByPartnerIdResponse> =
//       await response.json();
//     if (response.status === 200) {
//       if (data.errorMessage) {
//         return null;
//       }
//       return data.data ? data.data : null;
//     } else {
//       console.log(data.errorMessage);
//       throw new Error(data.errorMessage);
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export async function wordSearchService(
  request: WordSearchServiceRequest
): Promise<WordSearchServiceResponse | null> {
  try {
    const response = await fetch(`${EXPLORE_API_URL}/word-search-service`, {
      method: RequestMethod[RequestMethod.POST],
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const data: ApiResult<WordSearchServiceResponse> = await response.json();
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
