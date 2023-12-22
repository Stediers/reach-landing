import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import Calendar from "@components/input/Calendar";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Card from "@components/Card";
import Chip from "@components/Chip";
import PriceComponent from "@components/Price";
import { AppointmentStatus, OnlinePlatform, ServiceType } from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { State } from "@data/enums";
import { motion } from "framer-motion";
import Link from "next/link";
import { Base64, LocationAttributes } from "@data/types";
import AddressInput from "@components/input/AddressInput";
import UserSelect from "@components/UserSelect";
import verifyLocation from "@helper_functions/verifyLocation";
import { ImagesInput } from "@components/input/MediaInput";
import { UserAutoCompleteResult } from "@api_functions/gig/fetch-user-autocomplete-result";
import SelectInput from "@components/input/SelectInput";
import { showQrCodePopup } from "@components/notifications/Popup";
import router from "next/router";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import UnderlinedHeader from "@components/UnderlinedHeader";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import { CreateFeedbackRequest } from "@api_functions/feedback/create-feedback";
import { FetchCreateFeedbackMetadataResponse } from "@api_functions/feedback/fetch-create-feedback-metadata";

export default function Desktop({
  service,
  serviceId,
  appointmentId,
  selectedUser,
  setSelectedUser,
  mobileNumber,
  setMobileNumber,
  location,
  setLocation,
  requestFeedbackButtonState,
  setRequestFeedbackButtonState,
  images,
  setImages,
  createFeedback,
  setAppointmentId,
  verifyBaseForm,
  verifyDynamicDataForm,
}: {
  serviceId: string;
  appointmentId: string;
  service: ServicesScreen | null;
  selectedUser: UserAutoCompleteResult | null;
  setSelectedUser: Dispatch<SetStateAction<UserAutoCompleteResult | null>>;
  mobileNumber: string;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  location: LocationAttributes | null;
  setLocation: Dispatch<SetStateAction<LocationAttributes | null>>;
  requestFeedbackButtonState: State;
  setRequestFeedbackButtonState: Dispatch<SetStateAction<State>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  createFeedback: (
    request: CreateFeedbackRequest
  ) => Promise<FetchCreateFeedbackMetadataResponse | null>;
  setAppointmentId: Dispatch<SetStateAction<string>>;
  verifyBaseForm: (mobileNumber: string) => boolean;
  verifyDynamicDataForm: (
    serviceType: ServiceType,
    location: LocationAttributes | null
  ) => boolean;
}) {
  return (
    //
    <></>
  );
}

function SelectLocation({
  location,
  setLocation,
}: {
  location: LocationAttributes | null;
  setLocation: Dispatch<SetStateAction<LocationAttributes | null>>;
}) {
  return (
    <AddressInput
      location={location}
      setLocation={setLocation}
      title="Where did the appointment take place?"
    />
  );
}
