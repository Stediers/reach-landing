import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { AppointmentStatus, RequestMethod } from "@data/enums";
import { Price } from "@data/types";

type FetchAppointmentsRequest = {
  date: Date | null;
  appointmentStatus: AppointmentStatus | null;
};

export type FetchAppointmentByDateResponse = {
  id: string;
  status: AppointmentStatus;
  transactionId: string | null;
  service: {
    id: string;
    title: string;
  };
  feedback: {
    userBehaviourRating: number;
    serviceQualityRating: number;
  } | null;
  customer: {
    mobileNumber: string;
    name: string | null;
    id: string | null;
  };
  price: Price;
  scheduledAt: Date;
  completedAt: Date | null;
  cancelledAt: Date | null;
  ratedAt: Date | null;
};

async function fetchApi(
  request: FetchAppointmentsRequest
): Promise<FetchAppointmentByDateResponse[] | null> {
  const res = (
    await fetchAPIProtected<FetchAppointmentByDateResponse[]>({
      url: "fetch-appointments-by-date",
      method: RequestMethod.POST,
      body: request,
    })
  ).data;

  return res;
}

export async function fetchAppointmentsByDate(
  request: FetchAppointmentsRequest
): Promise<FetchAppointmentByDateResponse[] | null> {
  return await fetchApi(request);
}

// function validateResponse(response: FetchAppointmentByDateResponse[]): boolean {
//   if (!response) {
//     return false;
//   }
//   response.forEach((appointment) => {
//     if (!appointment.id) {
//       return false;
//     }
//     if (!appointment.appointmentStatus) {
//       return false;
//     }
//     if (!appointment.scheduledAt) {
//       return false;
//     }
//     if (!appointment.service) {
//       return false;
//     }
//     if (!appointment.service.id) {
//       return false;
//     }
//     if (!appointment.service.title) {
//       return false;
//     }
//     if (!validatePrice(appointment.service.price)) {
//       return false;
//     }
//     if (!appointment.service.price.currency) {
//       return false;
//     }
//   });
//   return true;
// }
