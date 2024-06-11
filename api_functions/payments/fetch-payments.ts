import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";
import { BookingBill } from "@data/types";

export type FetchPaymentsResponse = {
  id: string;
  requestedAmount: number;
  link: string;
  bookingBill: BookingBill;
};

export async function fetchPayments(): Promise<FetchPaymentsResponse[] | null> {
  const response = await fetchAPIProtected<FetchPaymentsResponse[]>({
    method: RequestMethod.GET,
    url: "fetch-payments",
  });

  return response.data;
}
