import { RequestMethod } from "@data/enums";
import { ApiResult, Price } from "@data/types";

type FetchAppointmentByServiceIdResponse = {
  appointments: FetchAppointmentByServiceId_Appointment[];
};

export type FetchAppointmentByServiceId_Appointment = {
  appointmentId: string;
  userId: string;
  price: Price;
  user: {
    name: string;
    imageUrl: string;
  };
  ratedAt: Date;
  comment: string;
  imageUrls: string[];
};

export async function fetchAppointmentsByServiceId(
  serviceId: string
): Promise<FetchAppointmentByServiceIdResponse | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/fetch-appointments-by-serviceId?serviceId=${serviceId}`,
    {
      method: RequestMethod[RequestMethod.GET],
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data: ApiResult<FetchAppointmentByServiceIdResponse> =
    await response.json();
  if (response.status === 200) {
    if (data.errorMessage) {
      return null;
    }
    return data.data ? data.data : null;
  }
  return null;
}
