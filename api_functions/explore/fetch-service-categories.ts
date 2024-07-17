import {
  fetchAPIProtected,
  fetchAPIPublic,
} from "@api_functions/internal/base-functions";
import { EXPLORE_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";
import { Category } from "@data/types";

export type FetchServiceCategoriesResponse = {
  category: Category;
  exists: boolean;
};

// export async function fetchServiceByServiceId(
//   serviceId: string
// ): Promise<FetchServiceByServiceIdResponse | null> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API_URL}/fetch-service-by-serviceId?serviceId=${serviceId}`,
//       {
//         next: {
//           revalidate: 60,
//         },
//         method: RequestMethod[RequestMethod.GET],
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data: ApiResult<FetchServiceByServiceIdResponse> =
//       await response.json();
//     if (response.status === 200) {
//       if (data.errorMessage) {
//         return null;
//       }
//       return data.data ? data.data : null;
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// }

export async function fetchServiceCategories(): Promise<
  FetchServiceCategoriesResponse[] | null
> {
  try {
    const response = await fetch(
      `${EXPLORE_API_URL}/fetch-service-categories`,
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

    const data = await response.json();

    if (response.status === 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
