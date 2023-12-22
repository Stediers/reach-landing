import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

type FetchUserAutoCompleteResponse = {
  users: UserAutoCompleteResult[];
};

export type UserAutoCompleteResult = {
  userId: string;
  name: string;
  imageUrl: string | null;
  mobileNumber: string;
};

export async function fetchUserAutoComplete(
  searchQuery: string
): Promise<FetchUserAutoCompleteResponse | null> {
  const response = await fetchAPIProtected<FetchUserAutoCompleteResponse>({
    url: `fetch-autocomplete-results`,
    method: RequestMethod.POST,
    body: {
      searchQuery: searchQuery,
    },
  });

  return response.data;
}
