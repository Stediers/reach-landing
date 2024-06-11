import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

export type FetchConsoleResponse = {
  chats: {
    id: string;
    name: string;
    imageUrl: string;
    unreadMessages: number;
  }[];
  isVerified: boolean;
};

export async function fetchConsole(): Promise<FetchConsoleResponse | null> {
  const res = await fetchAPIProtected<FetchConsoleResponse>({
    method: RequestMethod.GET,
    url: "fetch-console",
  });

  return res.data;
}
