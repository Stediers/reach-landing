import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { showSnackBar } from "@components/notifications/Snackbar";
import {
  Gender,
  IndianLanguages,
  RequestMethod,
  S3BucketName,
  State,
} from "@data/enums";
import { Base64, ContactOptions, LocationAttributes } from "@data/types";

export interface CreateGigRequest {
  firstName: string;
  lastName: string;
  profilePicture: File | null;
  contactOptions: ContactOptions[];
  designation: string;
  gender: Gender;
  location: {
    city: string;
    state: string;
  };
  languages: IndianLanguages[];
}

export async function createGig(
  request: CreateGigRequest,
  mobileNumber: string
): Promise<boolean> {
  if (!request.profilePicture) {
    showSnackBar({
      message: "Please upload a profile picture",
      state: State.ERROR,
    });
    return false;
  }
  const imageUrl = await uploadFileS3({
    bucketName: S3BucketName.USER,
    file: request.profilePicture,
    fileName: `gig/${mobileNumber}/${request.profilePicture.name}`,
  });
  const response = await fetchAPIProtected({
    url: `create-gig`,
    method: RequestMethod.POST,
    body: {
      ...request,
      profilePicture: imageUrl,
    },
    snackbar: true,
  });
  return response.status;
}
