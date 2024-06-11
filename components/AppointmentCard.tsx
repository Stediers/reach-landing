import { AppointmentStatus } from "@data/enums";
import { Calendar } from "lucide-react";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillAlert,
} from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { FcExpired } from "react-icons/fc";
import Card from "./Card";

export default function AppointmentCard({ status }: { status: string }) {
  const displayStatus = (
    status.charAt(0).toUpperCase() + status.slice(1)
  ).replace(/_/g, " ");
  return status === AppointmentStatus.PAYMENT_PENDING ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-2">
      <BiRupee className="w-10 h-10 shrink-0 text-success" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        You have not paid the advance yet. Please pay the advance to confirm the
        appointment.
      </p>
    </Card>
  ) : status === AppointmentStatus.SCHEDULED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <Calendar className="w-10 h-10 shrink-0 text-success" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        The appointment is scheduled.
      </p>
    </Card>
  ) : status === AppointmentStatus.COMPLETED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <AiFillCheckCircle className="w-10 h-10 shrink-0 text-success" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        Hurrah! Your appointment is done. You can now provide feedback to your
        partner.
      </p>
    </Card>
  ) : status === AppointmentStatus.CANCELLED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <AiFillCloseCircle className="w-10 h-10 shrink-0 text-error" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        You have cancelled the appointment. The advance payment has been
        credited to the partner.
      </p>
    </Card>
  ) : status === AppointmentStatus.DISPUTED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <AiFillAlert className="w-10 h-10 shrink-0 text-danger" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        Your appointment is {status}
      </p>
    </Card>
  ) : status === AppointmentStatus.REFUNDED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <AiFillCheckCircle className="w-10 h-10 shrink-0 text-success" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        You have been refunded. Plase wait or contact support if you have not
        recieved the refund
      </p>
    </Card>
  ) : status === AppointmentStatus.EXPIRED ? (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <FcExpired className="w-10 h-10 shrink-0 text-error" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base text-center font-normal">
        You can ask the partner to reschedule or ignore the appointment
      </p>
    </Card>
  ) : (
    <Card className="w-full flex flex-col !items-center justify-start !space-y-1">
      <AiFillCheckCircle className="w-10 h-10 shrink-0 text-success" />
      <p className="text-lg font-medium first-letter:capitalize">
        {displayStatus}
      </p>
      <p className="text-base font-normal">Your appointment is {status}</p>
    </Card>
  );
}
