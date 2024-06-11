import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type ReportChatRequest = {
  chatId: string;
  reportReason: string;
  reportDescription: string;
};

export async function reportChat(request: ReportChatRequest): Promise<boolean> {
  const res = await fetchAPIProtected({
    method: RequestMethod.POST,
    url: "report-chat",
    baseUrl: process.env.NEXT_PUBLIC_UTILITY_API_URL,
    body: request,
    snackbar: true,
  });

  return res.status;
}
