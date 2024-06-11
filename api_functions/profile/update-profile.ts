import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { Base64 } from "@data/types";

type UpdateProfileRequest = {
  name: string;
  profilePicture: string;
};

export async function updateProfile(
  data: UpdateProfileRequest
): Promise<boolean> {
  const response = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "update-profile",
    body: data,
  });

  return response.status;
}
