import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchMyPartnersResponse = {
  id: string;
  name: string;
  imageUrl: string;
  rating: number | null;
  appointmentsWithYou: number;
  designation: string;
  favourite: boolean;
  mobileNumber: string;
};

export async function fetchMyPartners(): Promise<
  FetchMyPartnersResponse[] | null
> {
  const res = await fetchAPIProtected<FetchMyPartnersResponse[]>({
    method: RequestMethod.GET,
    url: "fetch-my-partners",
  });

  return res.data;
}
