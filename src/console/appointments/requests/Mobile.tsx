import { AppointmentStatus, BookingStatus } from "@data/enums";
import {
  FetchAppointmentRequestResponse,
  FetchAppointmentResponse,
} from "@data/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import LineHeader from "@components/LineHeader";
import Appointment, { AppointmentRequestCard } from "@components/Appointment";
import Card from "@components/Card";
import { useRouter } from "next/navigation";

export default function Mobile({
  response,
  setResponse,
}: {
  response: FetchAppointmentRequestResponse[];
  setResponse: Dispatch<
    SetStateAction<FetchAppointmentRequestResponse[] | null>
  >;
}) {
  const router = useRouter();
  return (
    <MobileWrapper
      className="flex flex-col items-start space-y-5 w-full"
      header="Requests"
      backLink="/console/profile"
    >
      {response.length === 0 ? (
        <Card className="w-full p-5">
          <p className="text-center">No requests found</p>
        </Card>
      ) : (
        <div className="flex flex-col space-y-5 w-full">
          {response.map((request) => (
            <AppointmentRequestCard
              request={request}
              router={router}
              key={request.id}
            />
          ))}
        </div>
      )}
      {/* </DesktopHeaderWrapper> */}
    </MobileWrapper>
  );
}
