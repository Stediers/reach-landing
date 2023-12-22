import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AppointmentStatus, RequestMethod } from "@data/enums";
import { Price } from "@data/types";

export type FetchCustomerProfile_User = {
  id: string;
  name: string;
  mobileNumber: string;
  imageUrl: string | null;
  completedAppointments: number;
  ratedAppointments: number;
  cancelledAppointments: number;
  totalAppointments: number;
};

export type FetchCustomerProfile_AppointmentsWithYou = {
  id: string;
  appointmentStatus: AppointmentStatus;
  scheduledAt: Date;
  completedAt: Date | null;
  ratedAt: Date | null;
  cancelledAt: Date | null;
  service: {
    id: string;
    title: string;
    price: Price;
  };
};

type FetchCustomerProfile = {
  user: FetchCustomerProfile_User;
  appointmentsWithYou: FetchCustomerProfile_AppointmentsWithYou[];
};

export async function fetchCustomerProfile(
  userId: string
): Promise<FetchCustomerProfile | null> {
  const response = await fetchAPIProtected<FetchCustomerProfile>({
    url: `fetch-customer-profile?userId=${userId}`,
    method: RequestMethod.GET,
  });

  return response.data;
}
