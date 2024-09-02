import Card from "@components/Card";
import Chip from "@components/Chip";
import TextInput from "@components/input/TextInput";
import PriceComponent from "@components/price/MobilePrice";
import { Button } from "@components/ui/button";
import { AppointmentStatus } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@components/ui/dropdown-menu";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import SubHeadingWrapper from "@wrapper/SubHeadingWrapper";
import Appointment from "@components/Appointment";

export default function Desktop({
  response,
  setResponse,
}: {
  response: FetchAppointmentResponse[];
  setResponse: Dispatch<SetStateAction<FetchAppointmentResponse[] | null>>;
}) {
  const [filter, setFilter] = useState<AppointmentStatus[]>([
    AppointmentStatus.CANCELLED,
    AppointmentStatus.COMPLETED,
    AppointmentStatus.DISPUTED,
    AppointmentStatus.PAYMENT_PENDING,
    AppointmentStatus.SCHEDULED,
    AppointmentStatus.REFUNDED,
    AppointmentStatus.EXPIRED,
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredAppointments: FetchAppointmentResponse[] = response.filter(
    (appointment) => {
      return (
        appointment.service.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.customer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
  );

  const cancelledAppointments = filter.includes(AppointmentStatus.CANCELLED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.CANCELLED
      )
    : [];

  const completedAppointments = filter.includes(AppointmentStatus.COMPLETED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.COMPLETED
      )
    : [];

  const disputedAppointments = filter.includes(AppointmentStatus.DISPUTED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.DISPUTED
      )
    : [];

  const paymentPendingAppointments = filter.includes(
    AppointmentStatus.PAYMENT_PENDING
  )
    ? filteredAppointments.filter(
        (appointment) =>
          appointment.status === AppointmentStatus.PAYMENT_PENDING
      )
    : [];

  const scheduledAppointments = filter.includes(AppointmentStatus.SCHEDULED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.SCHEDULED
      )
    : [];

  const refundedAppointments = filter.includes(AppointmentStatus.REFUNDED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.REFUNDED
      )
    : [];

  const expiredAppointments = filter.includes(AppointmentStatus.EXPIRED)
    ? filteredAppointments.filter(
        (appointment) => appointment.status === AppointmentStatus.EXPIRED
      )
    : [];

  return (
    <DesktopWrapper
      className="flex flex-col items-start space-y-5 w-full"
      title="Appointments"
    >
      {response.length == 0 ? (
        <div className="flex flex-col items-start justify-center space-y-3 w-full pt-20">
          <p className=" text-center font-medium text-lg">
            You don&apos;t have any appointments yet
          </p>
        </div>
      ) : null}
      <div className="flex flex-col space-y-10 w-full">
        {paymentPendingAppointments.length > 0 ? (
          <SubHeadingWrapper title="Payment Pending">
            {paymentPendingAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {completedAppointments.length > 0 ? (
          <SubHeadingWrapper title="Completed">
            {completedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {disputedAppointments.length > 0 ? (
          <SubHeadingWrapper title="Confirmed">
            {disputedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {scheduledAppointments.length > 0 ? (
          <SubHeadingWrapper title="Requested">
            {scheduledAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {refundedAppointments.length > 0 ? (
          <SubHeadingWrapper title="Cancelled">
            {refundedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {cancelledAppointments.length > 0 ? (
          <SubHeadingWrapper title="Declined">
            {cancelledAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
        {expiredAppointments.length > 0 ? (
          <SubHeadingWrapper title="Expired">
            {expiredAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </SubHeadingWrapper>
        ) : null}
      </div>
      {/* </DesktopHeaderWrapper> */}
    </DesktopWrapper>
  );
}
