import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AppointmentStatus, RequestMethod } from "@data/enums";
import { Pagination, Price } from "@data/types";

type FetchAppointmentsRequest = {
  serviceId: string | null;
  appointmentStatus: AppointmentStatus | null;
  page: number;
  limit: number;
};

interface FetchAppointmentsByDateResponse extends Pagination {
  appointments: AppointmentResponse[];
}

export type AppointmentResponse = {
  appointmentId: string;
  createdAt: Date;
  status: AppointmentStatus;
  comment: string | null;
  images: string[];
  requestRating: Date;
  user: {
    name: string | null;
    userId: string;
  };
  ratedAt: Date | null;
  price: Price;
  service: {
    serviceId: string;
    title: string;
    deleted: boolean;
  };
};

export async function fetchAppointmentsByDate(
  request: FetchAppointmentsRequest
): Promise<FetchAppointmentsByDateResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentsByDateResponse>({
    url: `fetch-feedbacks`,
    method: RequestMethod.POST,
    body: request,
  });
  return response.data;
}
