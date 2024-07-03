import { AppointmentStatus } from "@data/enums";
import { FetchAppointmentResponse } from "@data/types";
import Link from "next/link";
import Card from "./Card";
import Chip from "./Chip";
import { ProfilePopup } from "./DrawerPopup";
import PriceComponent from "./price/MobilePrice";
import { Button } from "./ui/button";

export default function Appointment({
  appointment,
}: {
  appointment: FetchAppointmentResponse;
}) {
  return (
    <Card className="flex flex-col space-y-5 w-full">
      <div className="flex flex-col space-y-5 w-full">
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row justify-between items-start w-full space-x-4">
            <p className="text-lg font-medium first-letter:capitalize break-all">
              {appointment.service.title}
            </p>
            <div className="flex flex-row justify-start space-x-3 items-center shrink-0">
              {appointment.status === AppointmentStatus.PAYMENT_PENDING ? (
                <Chip
                  title="Payment Pending"
                  className={`text-white bg-info text-xs`}
                />
              ) : appointment.status === AppointmentStatus.CANCELLED ? (
                <Chip
                  title="Cancelled"
                  className={`text-white bg-error text-xs`}
                />
              ) : appointment.status === AppointmentStatus.COMPLETED ? (
                <Chip
                  title="Completed"
                  className={`text-white bg-success text-xs`}
                />
              ) : appointment.status === AppointmentStatus.DISPUTED ? (
                <Chip
                  title="Disputed"
                  className={`text-white bg-error text-xs`}
                />
              ) : appointment.status === AppointmentStatus.SCHEDULED ? (
                <Chip
                  title="Scheduled"
                  className={`text-white bg-error text-xs`}
                />
              ) : appointment.status === AppointmentStatus.REFUNDED ? (
                <Chip
                  title="Refunded"
                  className={`text-white bg-error text-xs`}
                />
              ) : appointment.status === AppointmentStatus.EXPIRED ? (
                <Chip
                  title="Expired"
                  className={`text-white bg-error text-xs`}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Your Partner
          </p>
          <ProfilePopup
            triggerJSX={
              <p className="text-base font-medium first-letter:capitalize underline underline-offset-4 text-info">
                {appointment.partner.firstName} {appointment.partner.lastName}
              </p>
            }
            available={appointment.partner.available}
            gender={appointment.partner.gender}
            imageUrl={appointment.partner.imageUrl}
            name={`${appointment.partner.firstName} ${appointment.partner.lastName}`}
            rating={appointment.partner.rating}
            footerJSX={
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  variant="success"
                  onClick={() => {
                    window.open(`tel:${appointment.partner.mobileNumber}`);
                  }}
                >
                  Call Partner
                </Button>
                <Button variant="info" asChild>
                  <Link href={`/partner/${appointment.partner.gigId}`}>
                    View Profile
                  </Link>
                </Button>
              </div>
            }
          />
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Requested Date
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {new Date(appointment.scheduled.slot.date).toDateString()}
          </p>
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Time
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {appointment.scheduled.slot.time}
          </p>
        </div>
      </div>
      <PriceComponent price={appointment.price} />
      <div className="flex flex-row justify-between items-center w-full space-x-2">
        <Button variant="default" asChild>
          <Link href={`/console/appointments/${appointment.id}`}>
            View Details
          </Link>
        </Button>
      </div>
    </Card>
  );
}
