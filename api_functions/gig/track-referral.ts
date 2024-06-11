import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export async function trackReferral({ referralId }: { referralId: string }) {
  const response = await fetchAPIProtected<boolean | null>({
    method: RequestMethod.POST,
    url: `track-refferal?referralId=${referralId}`,
    snackbar: true,
  });
  return response.status;
}
