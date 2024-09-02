import { AppointmentStatus, BookingStatus } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import LineHeader from "@components/LineHeader";
import Appointment from "@components/Appointment";

export default function Mobile({
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
    <MobileWrapper
      className="flex flex-col items-start space-y-5 w-full"
      header="My Appointments"
    >
      {/* {response.length > 0 ? (
        <div className="flex flex-col space-y-5 w-full">
          <TextInput
            type="text"
            placeholder="Search your bookings"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e)}
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Button variant="default">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-[15rem]"
              onClick={(e) => e.preventDefault()}
            >
              <DropdownMenuLabel className="font-medium text-lg">
                {filter.length === 7
                  ? "Showing all bookings"
                  : "Showing selected"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {Object.values(AppointmentStatus).map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filter.includes(status)}
                    className={`text-base ${
                      filter.includes(status) ? "text-success" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (filter.includes(status)) {
                        setFilter((prev) =>
                          prev.filter((item) => item !== status)
                        );
                      } else {
                        setFilter((prev) => [...prev, status]);
                      }
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Card className="flex flex-col items-start justify-center space-y-3 w-full">
          <p className="font-medium text-base">
            You don&apos;t have any appointments yet
          </p>
        </Card>
      )} */}
      <div className="flex flex-col space-y-5 w-full">
        {paymentPendingAppointments.length > 0 ? (
          <AppointmentWrapper title="Payment Pending">
            {paymentPendingAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {scheduledAppointments.length > 0 ? (
          <AppointmentWrapper title="Scheduled">
            {scheduledAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {completedAppointments.length > 0 ? (
          <AppointmentWrapper title="Completed">
            {completedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {disputedAppointments.length > 0 ? (
          <AppointmentWrapper title="Confirmed">
            {disputedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {refundedAppointments.length > 0 ? (
          <AppointmentWrapper title="Cancelled">
            {refundedAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {cancelledAppointments.length > 0 ? (
          <AppointmentWrapper title="Declined">
            {cancelledAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
        {expiredAppointments.length > 0 ? (
          <AppointmentWrapper title="Expired">
            {expiredAppointments.map((appointment) => (
              <Appointment appointment={appointment} key={appointment.id} />
            ))}
          </AppointmentWrapper>
        ) : null}
      </div>
      {/* </DesktopHeaderWrapper> */}
    </MobileWrapper>
  );
}

function AppointmentWrapper({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col space-y-5 w-full">
      <LineHeader title={title} />
      <div className="grid grid-cols-1 gap-5 justify-items-stretch w-full">
        {children}
      </div>
    </div>
  );
}
