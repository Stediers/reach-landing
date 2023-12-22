import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import {
  AppointmentStatus,
  OnlinePlatform,
  PreferredGender,
  RequestMethod,
  ServiceType,
} from "@data/enums";
import {
  HomeAppointmentSnapshot,
  LocationAttributes,
  OfflineAppointmentSnapshot,
  OnlineAppointmentSnapshot,
  Price,
} from "@data/types";

export type FetchAppointmentResponse = {
  onlineSnapShotData: OnlineAppointmentSnapshot | null;
  offlineSnapShotData: OfflineAppointmentSnapshot | null;
  homeSnapShotData: HomeAppointmentSnapshot | null;
  appointment: {
    id: string;
    status: AppointmentStatus;
    transactionId: string | null;
    serviceId: string;
    feedback: {
      userBehaviourRating: number;
      serviceQualityRating: number;
    } | null;
  };
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

export async function fetchAppointment(
  appointmentId: string
): Promise<FetchAppointmentResponse | null> {
  const response = await fetchAPIProtected<FetchAppointmentResponse>({
    url: `fetch-appointment?appointmentId=${appointmentId}`,
    method: RequestMethod.GET,
  });

  return response.data;
}

// function validateResponse(response: FetchAppointmentByDateResponse): boolean {
//   if (!response) {
//     return false;
//   }
//   if (!response.appointment) {
//     return false;
//   }
//   if (!response.service) {
//     return false;
//   }
//   validateUser(response.user);
//   validateAppointment(response.appointment);
//   validateService(response.service);
//   return true;
// }

// function validateUser(user: FetchAppointment_User) {
//   if (!user) {
//     return true;
//   }
//   if (!user.id || !user.name || !user.mobileNumber) {
//     return false;
//   }
//   return true;
// }

// function validateAppointment(appointment: FetchAppointment_Appointment) {
//   if (
//     !appointment.id ||
//     !appointment.status ||
//     !appointment.scheduledAt ||
//     !appointment.createdAt ||
//     !appointment.mobileNumber ||
//     !appointment.address
//   ) {
//     return false;
//   }
//   return true;
// }

// function validateService(service: FetchAppointment_Service) {
//   if (
//     !service.baseData ||
//     !service.baseData.title ||
//     !service.baseData.visible ||
//     !service.baseData.rating ||
//     !service.baseData.totalAppointments ||
//     !service.baseData.totalRatedAppointments ||
//     !service.baseData.experience ||
//     !service.baseData.preferredGender ||
//     !service.baseData.serviceType ||
//     !service.baseData.id ||
//     !service.price
//   ) {
//     return false;
//   }
//   return true;
// }
