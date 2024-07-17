"use client";
import {
  AddressType,
  AppointmentStatus,
  DisputeStatus,
  State,
} from "@data/enums";
import {
  Address,
  CustomerFeedback,
  Feedback,
  FetchAppointmentResponse,
  LocationAttributes,
} from "@data/types";
import Mobile from "@src/console/appointments/[appointmentId]/Mobile";
import Desktop from "@src/console/appointments/[appointmentId]/Desktop";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { useEffect, useState } from "react";
import {
  FetchAppointmentResponseAPI,
  fetchAppointment,
} from "@api_functions/appointments/fetch-appointment";
import {
  RaiseDisputeRequest,
  raiseDispute,
} from "@api_functions/appointments/raise-dispute";
import { rateAppointment } from "@api_functions/appointments/rate-appointment";
import { showSnackBar } from "@components/notifications/Snackbar";
import { fetchAddressByUserId } from "@api_functions/address/fetch-address-by-userId";

export default function Page({
  params,
}: {
  params: { appointmentId: string };
}) {
  const [pageState, setPageState] = useState<State>(State.LOADING);
  const [response, setResponse] = useState<FetchAppointmentResponseAPI | null>(
    null
  );
  const [partnerFeedback, setPartnerFeedback] = useState<Feedback>({
    serviceQualityRating: 0,
    userBehaviourRating: 0,
    review: "",
  });

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  useEffect(() => {
    setPageState(State.LOADING);
    fetchAppointment(params.appointmentId).then((res) => {
      if (res) {
        console.log(res);
        setResponse(res);
        if (
          res.appointment.completed &&
          res.appointment.completed.partnerFeedback
        ) {
          setPartnerFeedback(res.appointment.completed.partnerFeedback);
        }
      }
      setPageState(State.SUCCESS);
    });
  }, []);

  const [raiseDisputeRequest, setRaiseDisputeRequest] =
    useState<RaiseDisputeRequest>({
      appointmentId: params.appointmentId,
      reason: "",
    });

  async function _raiseDispute() {
    const res = await raiseDispute(raiseDisputeRequest);
    if (res) {
      setResponse((prev) => {
        if (prev) {
          return {
            ...prev,
            status: AppointmentStatus.DISPUTED,
            dispute: {
              reason: raiseDisputeRequest.reason,
              status: DisputeStatus.PENDING,
              reasonForAction: null,
            },
          };
        } else {
          return null;
        }
      });
    } else {
      console.error("Failed to raise dispute");
    }
  }

  return (
    <ConsoleWrapper
      desktopJSX={
        response && (
          <Desktop
            appointment={response.appointment}
            partnerFeedback={partnerFeedback}
            setPartnerFeedback={setPartnerFeedback}
            raiseDisputeRequest={raiseDisputeRequest}
            setRaiseDisputeRequest={setRaiseDisputeRequest}
            raiseDispute={_raiseDispute}
            rateAppointment={() =>
              _rateAppointment({
                appointmentId: params.appointmentId,
                partnerFeedback,
              })
            }
            userAddresses={response.userAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )
      }
      mobileJSX={
        response && (
          <Mobile
            appointment={response.appointment}
            partnerFeedback={partnerFeedback}
            setPartnerFeedback={setPartnerFeedback}
            raiseDisputeRequest={raiseDisputeRequest}
            setRaiseDisputeRequest={setRaiseDisputeRequest}
            raiseDispute={_raiseDispute}
            rateAppointment={() =>
              _rateAppointment({
                appointmentId: params.appointmentId,
                partnerFeedback,
              })
            }
            userAddresses={response.userAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )
      }
      title="View Appointment"
      state={pageState}
    />
  );
}

async function _rateAppointment({
  appointmentId,
  partnerFeedback,
}: {
  appointmentId: string;
  partnerFeedback: Feedback;
}) {
  const res = await rateAppointment({
    appointmentId: appointmentId,
    rating: partnerFeedback,
  });
  if (res) {
    window.location.reload();
  }
}
