import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { OnlinePlatform, RequestMethod, S3BucketName } from "@data/enums";
import { LocationAttributes } from "@data/types";

export interface CreateFeedbackRequest {
  onlineAppointmentData?: {
    platform: OnlinePlatform;
    link: string;
  };
  offlineAppointmentData?: {
    location: LocationAttributes;
    extraCharges: {
      [key: string]: number;
    };
  };
  homeAppointmentData?: {
    addressId: string;
  };
  serviceId: string;
  imageUrls: string[];
  addOnIds: string[];
  mobileNumber: string;
}

export async function createFeedback(
  request: CreateFeedbackRequest
): Promise<string | null> {
  const response = await fetchAPIProtected<string>({
    url: "create-feedback",
    method: RequestMethod.POST,
    body: request,
    snackbar: true,
  });
  return response.data;
}
