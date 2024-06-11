import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { getCookie } from "@api_functions/internal/cookie";
import { showYesNoPopup } from "@components/notifications/Popup";
import { RequestMethod } from "@data/enums";

type RefferGigResponse = {
  trackingId: string;
};

export async function refferGig({
  gigId,
}: {
  gigId: string;
}): Promise<RefferGigResponse | null> {
  const response = await fetchAPIProtected<RefferGigResponse>({
    method: RequestMethod.POST,
    url: `reffer-gig?gigId=${gigId}`,
    snackbar: true,
  });
  return response.data;
}
