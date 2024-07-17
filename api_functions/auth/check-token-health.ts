import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AUTH_API_URL } from "@data/api";
import { RequestMethod } from "@data/enums";

export async function checkTokenHealth({
  handleErrors = true,
}: {
  handleErrors?: boolean;
}) {
  try {
    const response = await fetchAPIProtected<boolean>({
      method: RequestMethod.GET,
      url: `check-token-health`,
      baseUrl: AUTH_API_URL,
      handleErrors,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
