import {
  AddressType,
  OnlinePlatform,
  S3BucketName,
  ServiceType,
  State,
} from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address, LocationAttributes } from "@data/types";
import {
  CreateFeedbackRequest,
  createFeedback,
} from "@api_functions/feedback/create-feedback";
import { UserAutoCompleteResult } from "@api_functions/gig/fetch-user-autocomplete-result";
import { GetServerSidePropsContext } from "next";
import SelectInput from "@components/input/SelectInput";
import {
  FetchCreateFeedbackMetadataResponse,
  fetchCreateFeedbackMetadata,
} from "@api_functions/feedback/fetch-create-feedback-metadata";
import AddressInput from "@components/input/AddressInput";
import Mobile from "@src/console/appointments/request-feedback/Mobile";
import Desktop from "@src/console/appointments/request-feedback/Desktop";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import verifyLocation from "@helper_functions/verifyLocation";
import { showSnackBar } from "@components/notifications/Snackbar";
import router from "next/router";
import { showOkPopup, showQrCodePopup } from "@components/notifications/Popup";
import uploadFileS3 from "@api_functions/utility/upload-file-to-S3";
import { verifyMobileNumber } from "@helper_functions/verify";
import getVitalLocalStoragStingData from "@api_functions/utility/get-vital-local-storage-data";
import devLog from "@helper_functions/devLog";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const serviceId = context.query.serviceId;

  if (!serviceId || (serviceId && typeof serviceId !== "string")) {
    return {
      redirect: {
        destination: "/console/appointments",
        permanent: false,
      },
    };
  }

  return {
    props: {
      serviceId: serviceId ?? null,
    },
  };
}

export default function Main({ serviceId }: { serviceId: string }) {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] =
    useState<FetchCreateFeedbackMetadataResponse | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [requestFeedbackButtonState, setRequestFeedbackButtonState] =
    useState<State>(State.SUCCESS);
  const [appointmentId, setAppointmentId] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const [location, setLocation] = useState<LocationAttributes | null>(null);
  const [onlineAppointmentData, setOnlineAppointmentData] =
    useState<CreateFeedbackRequest["onlineAppointmentData"]>();

  const [offlineAppointmentData, setOfflineAppointmentData] =
    useState<CreateFeedbackRequest["offlineAppointmentData"]>();

  const [homeAppointmentData, setHomeAppointmentData] =
    useState<CreateFeedbackRequest["homeAppointmentData"]>();

  const [selectedUser, setSelectedUser] =
    useState<UserAutoCompleteResult | null>(null);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchCreateFeedbackMetadata(serviceId).then((res) => {
      if (res) {
        console.log(res);
        setResponse(res);
        setPageState(State.SUCCESS);
        if (res.service.baseData.serviceType === ServiceType.ONLINE) {
          setOnlineAppointmentData({
            platform: OnlinePlatform.GOOGLE_MEET,
            link: "",
          });
        } else if (res.service.baseData.serviceType === ServiceType.OFFLINE) {
          setOfflineAppointmentData({
            location: {
              addressLine1: "",
              addressLine2: "",
              addressType: AddressType.HOME,
              city: "",
              country: "",
              landmark: "",
              lat: 0,
              lng: 0,
              postalCode: "",
              state: "",
            },
            // extraCharges: {
            //   [key: string]: number;
            // };
            extraCharges: {
              "Travel Charges": 0,
            },
          });
        } else if (res.service.baseData.serviceType === ServiceType.HOME) {
          setHomeAppointmentData({
            addressId: "",
          });
        } else {
          showSnackBar({
            message: "Invalid service type",
            state: State.ERROR,
          });
          router.push("/console/appointments");
        }
      } else {
        setPageState(State.ERROR);
      }
    });
  }, []);

  return (
    <ConsoleWrapper
      title="Request Feedback"
      state={pageState}
      mobileJSX={
        response && (
          <Mobile
            createFeedback={() =>
              _createFeedback({
                addOnIds: selectedAddOnIds,
                serviceId: response.service.serviceId,
                images: images,
                mobileNumber: mobileNumber,
                setRequestFeedbackButtonState: setRequestFeedbackButtonState,
                homeAppointmentData: homeAppointmentData,
                offlineAppointmentData: offlineAppointmentData,
                onlineAppointmentData: onlineAppointmentData,
                location: location,
              })
            }
            selectedAddOnIds={selectedAddOnIds}
            setSelectedAddOnIds={setSelectedAddOnIds}
            images={images}
            location={location}
            mobileNumber={mobileNumber}
            requestFeedbackButtonState={requestFeedbackButtonState}
            selectedUser={selectedUser}
            response={response}
            setAppointmentId={setAppointmentId}
            setImages={setImages}
            setLocation={setLocation}
            setMobileNumber={setMobileNumber}
            setRequestFeedbackButtonState={setRequestFeedbackButtonState}
            setSelectedUser={setSelectedUser}
            verifyBaseForm={verifyBaseForm}
            verifyDynamicDataForm={() =>
              verifyDynamicDataForm({
                serviceType: response.service.baseData.serviceType,
                offlineAppointmentData: offlineAppointmentData,
                onlineAppointmentData: onlineAppointmentData,
                homeAppointmentData: homeAppointmentData,
                location: location,
                mobileNumber,
              })
            }
            homeAppointmentData={homeAppointmentData}
            onlineAppointmentData={onlineAppointmentData}
            offlineAppointmentData={offlineAppointmentData}
            setHomeAppointmentData={setHomeAppointmentData}
            setOfflineAppointmentData={setOfflineAppointmentData}
            setOnlineAppointmentData={setOnlineAppointmentData}
          />
        )
      }
      desktopJSX={<></>}
    />
  );
}

//true-> all good
//false -> error
function verifyDynamicDataForm({
  serviceType,
  offlineAppointmentData,
  onlineAppointmentData,
  homeAppointmentData,
  location,
  mobileNumber,
}: {
  serviceType: ServiceType;
  offlineAppointmentData?: CreateFeedbackRequest["offlineAppointmentData"];
  onlineAppointmentData?: CreateFeedbackRequest["onlineAppointmentData"];
  homeAppointmentData?: CreateFeedbackRequest["homeAppointmentData"];
  location?: LocationAttributes | null;
  mobileNumber: string;
}) {
  if (!verifyBaseForm(mobileNumber)) {
    return false;
  }
  if (
    serviceType === ServiceType.OFFLINE &&
    offlineAppointmentData &&
    location &&
    verifyLocation(location)
  ) {
    devLog("offline appointment data", offlineAppointmentData);
    return true;
  }
  if (
    serviceType === ServiceType.ONLINE &&
    onlineAppointmentData &&
    onlineAppointmentData.platform.length > 0
  ) {
    return true;
  }
  if (
    serviceType === ServiceType.HOME &&
    homeAppointmentData &&
    homeAppointmentData.addressId.length > 0
  ) {
    return true;
  } else {
    return false;
  }
}

//true -> all good
//false -> error
function verifyBaseForm(mobileNumber: string) {
  if (verifyMobileNumber(mobileNumber, 10)) {
    const userMobileNumber = getVitalLocalStoragStingData({
      key: "mobileNumber",
    });
    devLog("userMobileNumber", userMobileNumber);
    if (mobileNumber === userMobileNumber || mobileNumber === "0000000000") {
      devLog("same mobile number");
      return false;
    } else {
      return true;
    }
  } else {
    devLog("invalid mobile number");
    return false;
  }
}

async function _createFeedback({
  images,
  mobileNumber,
  setRequestFeedbackButtonState,
  addOnIds,
  serviceId,
  onlineAppointmentData,
  offlineAppointmentData,
  homeAppointmentData,
  location,
}: {
  images: File[];
  mobileNumber: string;
  setRequestFeedbackButtonState: Dispatch<SetStateAction<State>>;
  addOnIds: string[];
  serviceId: string;
  onlineAppointmentData?: CreateFeedbackRequest["onlineAppointmentData"];
  offlineAppointmentData?: CreateFeedbackRequest["offlineAppointmentData"];
  homeAppointmentData?: CreateFeedbackRequest["homeAppointmentData"];
  location: LocationAttributes | null;
}): Promise<void> {
  setRequestFeedbackButtonState(State.LOADING);
  const imageUrls = await Promise.all(
    images.map(async (image) => {
      const res = await uploadFileS3({
        bucketName: S3BucketName.APPOINTMENT,
        file: image,
        fileName: image.name + Date.now(),
      });

      if (res) {
        return res;
      } else {
        return null;
      }
    })
  );

  const res = await createFeedback({
    addOnIds: addOnIds,
    imageUrls: imageUrls.filter((url) => url !== null) as string[],
    mobileNumber: mobileNumber,
    serviceId: serviceId,
    homeAppointmentData: homeAppointmentData,
    offlineAppointmentData: {
      location: location!!,
      extraCharges: offlineAppointmentData?.extraCharges ?? {},
    },
    onlineAppointmentData: onlineAppointmentData,
  });

  if (res) {
    await showQrCodePopup({
      code: res,
      title: "Success",
    });
    router.push("/console/appointments");
  }
  setRequestFeedbackButtonState(State.SUCCESS);
}
