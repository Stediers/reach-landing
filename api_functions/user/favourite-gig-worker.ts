import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FavouriteGigWorkerRequest = {
  userId: string;
  favourite: boolean;
};

export async function favouriteGigWorker(request: FavouriteGigWorkerRequest) {
  const response = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "favourite-gig-worker",
    body: request,
  });

  return response.status;
}
