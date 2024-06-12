import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type PartnerReviewRequest = {
  rating: {
    behavior: number;
    serviceQuality: number;
  };
  review: string;
  serviceId: string;
};

export async function partnerReview(request: PartnerReviewRequest) {
  const res = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "/partner-review",
    body: request,
    snackbar: true,
  });

  return res;
}
