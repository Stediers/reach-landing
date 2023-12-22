import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AppointmentStatus, RequestMethod } from "@data/enums";
import { Price } from "@data/types";

export type FetchBookingsResponse = {
  id: string;
  appointmentStatus: AppointmentStatus;
  bookedAt: Date;
  cancelledAt: Date | null;
  service: {
    id: string;
    title: string;
    price: Price;
  };
  user: {
    id: string;
    name: string;
    mobileNumber: string;
  } | null;
};

export async function fetchBookings(): Promise<FetchBookingsResponse[] | null> {
  const res = await fetchAPIProtected<FetchBookingsResponse[]>({
    url: "fetch-bookings-gig",
    method: RequestMethod.GET,
  });
  return res.data;
}
