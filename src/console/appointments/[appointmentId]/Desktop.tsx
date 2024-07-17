import { attachAddressAppointment } from "@api_functions/appointments/attach-address-appointment";
import { RaiseDisputeRequest } from "@api_functions/appointments/raise-dispute";
import AppointmentCard from "@components/AppointmentCard";
import { BookingBillInvoice } from "@components/Bill";
import Card from "@components/Card";
import Checkout from "@components/Checkout";
import { CustomDialog, ProfileDialog } from "@components/DialogPopup";
import { ServicePopupDesktop } from "@components/DrawerPopup";
import Setting from "@components/Setting";
import { SubUnderlinedHeader } from "@components/UnderlinedHeader";
import RatingInput from "@components/input/RatingInput";
import TextArea from "@components/input/TextArea";
import UpdateAddressDrawer from "@components/manage-appointment/UpdateAddress";
import { showSnackBar } from "@components/notifications/Snackbar";
import { Button } from "@components/ui/button";
import { DialogClose } from "@components/ui/dialog";
import { DrawerClose } from "@components/ui/drawer";
import {
  AppointmentStatus,
  DisputeStatus,
  ServiceType,
  State,
} from "@data/enums";
import {
  FetchAppointmentResponse,
  CustomerFeedback,
  Price,
  Feedback,
  RoutePayment,
  Address,
  LocationAttributes,
} from "@data/types";
import { payWindow } from "@helper_functions/payment";
import { priceString } from "@helper_functions/priceString";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { Calendar } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AiFillAlert,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { BiRupee } from "react-icons/bi";

export default function Desktop({
  appointment,
  partnerFeedback,
  setPartnerFeedback,
  raiseDisputeRequest,
  setRaiseDisputeRequest,
  raiseDispute,
  rateAppointment,
  userAddresses,
  selectedAddress,
  setSelectedAddress,
}: {
  partnerFeedback: Feedback;
  setPartnerFeedback: Dispatch<SetStateAction<Feedback>>;
  appointment: FetchAppointmentResponse;
  raiseDisputeRequest: RaiseDisputeRequest;
  setRaiseDisputeRequest: Dispatch<SetStateAction<RaiseDisputeRequest>>;
  raiseDispute: () => Promise<void>;
  rateAppointment: () => Promise<void>;
  userAddresses: Address[];
  selectedAddress: Address | null;
  setSelectedAddress: Dispatch<SetStateAction<Address | null>>;
}) {
  return (
    <DesktopWrapper
      className="flex flex-col items-start space-y-5 w-full"
      title="View Appointment"
    >
      <div className="grid grid-cols-3 gap-x-10 w-full">
        <AppointmentCard status={appointment.status} id={appointment.id} />
        <div className="grid grid-cols-3 gap-2 w-full col-span-2">
          {appointment.scheduled.address ? (
            <SubComp
              title="Location"
              data={`${appointment.scheduled.address.addressLine1}, ${appointment.scheduled.address.addressLine2}, ${appointment.scheduled.address.city}, ${appointment.scheduled.address.state}, ${appointment.scheduled.address.postalCode}`}
            />
          ) : (
            <SubComp title="Location" data={`Online`} />
          )}
          <SubComp
            title="Date"
            data={`${new Date(appointment.scheduled.slot.date).toDateString()}`}
          />
          <SubComp title="Time" data={`${appointment.scheduled.slot.time}`} />
          {appointment.status === AppointmentStatus.COMPLETED &&
            appointment.completed &&
            (appointment.completed.partnerFeedback ? (
              <SubComp
                title="Feedback"
                data={
                  appointment.completed.partnerFeedback?.review || "No feedback"
                }
              />
            ) : (
              <SubComp title="Feedback" data="No feedback provided yet" />
            ))}
        </div>
      </div>
      <SubUnderlinedHeader title="Actions" />
      <div className="grid grid-cols-3 gap-2 w-full">
        {appointment.service.serviceType === ServiceType.OFFLINE && (
          <UpdateAddressDrawer
            address={selectedAddress}
            setAddress={setSelectedAddress}
            appointmentId={appointment.id}
            userAddresses={userAddresses}
            onSubmit={async (value) => {
              await attachAddressAppointment({
                addressId: value,
                appointmentId: appointment.id,
              });
              window.location.reload();
            }}
          />
        )}
        <RatingDrawer
          partnerFeedback={partnerFeedback}
          setPartnerFeedback={setPartnerFeedback}
          disabled={appointment.status !== AppointmentStatus.COMPLETED}
          rateAppointment={rateAppointment}
          rated={
            appointment.completed && appointment.completed.partnerFeedback
              ? true
              : false
          }
        />
        <RaiseDispute
          disabled={
            appointment.status === AppointmentStatus.COMPLETED ||
            appointment.status === AppointmentStatus.CANCELLED ||
            appointment.status === AppointmentStatus.REFUNDED
          }
          dispute={appointment.dispute}
          raiseDispute={raiseDispute}
          raiseDisputeRequest={raiseDisputeRequest}
          setRaiseDisputeRequest={setRaiseDisputeRequest}
        />
        <CheckPayment
          status={appointment.status}
          price={appointment.price}
          appointmentId={appointment.id}
          customerPayment={appointment.payment}
          mobileNumber={appointment.customer.mobileNumber}
          name={`${appointment.customer.name}`}
        />
      </div>
      <SubUnderlinedHeader title="Major Details" />
      <div className="grid grid-cols-3 gap-2 w-full">
        {appointment.otp ? <OTP otp={appointment.otp} /> : null}
        <ServicePopupDesktop
          service={appointment.service}
          location={appointment.partner.state + ", " + appointment.partner.city}
          triggerJSX={
            <Setting
              title={
                appointment.service.title.charAt(0).toUpperCase() +
                appointment.service.title.slice(1)
              }
              subtitle="Tap to view"
            />
          }
          price={appointment.price}
        />
        <ProfileDialog
          available={appointment.partner.available}
          imageUrl={appointment.partner.imageUrl}
          name={`${appointment.partner.firstName} ${appointment.partner.lastName}`}
          rating={appointment.partner.rating}
          gender={appointment.partner.gender}
          triggerJSX={<Setting title="Your Partner" subtitle="View Profile" />}
        />
        {appointment.status === AppointmentStatus.REFUNDED && <Refund />}
      </div>
    </DesktopWrapper>
  );
}

function OTP({ otp }: { otp: string }) {
  return (
    <CustomDialog
      triggerJSX={
        <Setting
          title="Your OTP"
          subtitle="Share it after the appointment"
          icon={<p className="text-lg font-medium text-text">{otp}</p>}
        />
      }
      title="Your OTP"
      description="This is your one time password. Share it with the partner to complete the appointment"
      footerJSX={
        <DrawerClose id="close-drawer" className="w-full">
          <Button variant="success">Close</Button>
        </DrawerClose>
      }
    >
      <div className="grid grid-cols-4 gap-2 w-full justify-items-center">
        {otp.split("").map((item, index) => (
          <p
            key={index}
            className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md text-lg"
          >
            {item}
          </p>
        ))}
      </div>
      <p className="text-base font-medium text-error first-letter:capitalize">
        You will not be able to raise a dispute after sharing the otp with the
        partner.
      </p>
    </CustomDialog>
  );
}

function RatingDrawer({
  partnerFeedback,
  setPartnerFeedback,
  disabled,
  rateAppointment,
  rated,
}: {
  partnerFeedback: Feedback;
  setPartnerFeedback: Dispatch<SetStateAction<Feedback>>;
  disabled: boolean;
  rateAppointment: () => Promise<void>;
  rated: boolean;
}) {
  return disabled ? null : rated ? (
    <CustomDialog
      triggerJSX={<Setting title="Feedback" subtitle="View Details" />}
      title="Feedback"
      description="You have already provided feedback for this appointment"
    >
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          How did the partner perform?
        </p>
        <p className="text-base first-letter:capitalize">
          {partnerFeedback.serviceQualityRating} stars
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          How did the partner behave?
        </p>
        <p className="text-base first-letter:capitalize">
          {partnerFeedback.userBehaviourRating} stars
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          Additional Comments
        </p>
        <p className="text-base first-letter:capitalize">
          {partnerFeedback.review || "No feedback provided"}
        </p>
      </div>
    </CustomDialog>
  ) : (
    <CustomDialog
      triggerJSX={<Setting title="Provide Feedback" subtitle="Tap to rate" />}
      title="Rate your partner"
      description="This helps other partners to know about the customer"
      footerJSX={
        <Button
          variant="success"
          disabled={
            partnerFeedback.serviceQualityRating === 0 ||
            partnerFeedback.userBehaviourRating === 0
          }
          onclick={async () => {
            await rateAppointment();
          }}
        >
          Submit
        </Button>
      }
    >
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          How did the partner perform?
        </p>
        <p className="text-sm font-normal text-textsubtle">
          Rate from 1 to 5 stars
        </p>
        <RatingInput
          onChange={(value) =>
            setPartnerFeedback({
              ...partnerFeedback,
              serviceQualityRating: value,
            })
          }
          rating={partnerFeedback.serviceQualityRating || 0}
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          How did the partner behave?
        </p>
        <p className="text-sm font-normal text-textsubtle">
          Rate from 1 to 5 stars
        </p>
        <RatingInput
          onChange={(value) =>
            setPartnerFeedback({
              ...partnerFeedback,
              userBehaviourRating: value,
            })
          }
          rating={partnerFeedback.userBehaviourRating || 0}
        />
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">
          Additional Comments
        </p>
        <p className="text-sm font-normal text-textsubtle">
          Provide feedback to the customer
        </p>
        <TextArea
          placeholder="Type your feedback here..."
          onChange={(value) =>
            setPartnerFeedback({
              ...partnerFeedback,
              review: value,
            })
          }
          value={partnerFeedback.review}
          title="Feedback"
        />
      </div>
    </CustomDialog>
  );
}

function RaiseDispute({
  disabled,
  raiseDisputeRequest,
  dispute,
  raiseDispute,
  setRaiseDisputeRequest,
}: {
  disabled: boolean;
  raiseDisputeRequest: RaiseDisputeRequest;
  setRaiseDisputeRequest: Dispatch<SetStateAction<RaiseDisputeRequest>>;
  raiseDispute: () => Promise<void>;
  dispute: FetchAppointmentResponse["dispute"];
}) {
  return dispute ? (
    <CustomDialog
      triggerJSX={<Setting title="Dispute Details" subtitle="View Details" />}
      title="Dispute Details"
      description="A Dispute has been raised for this appointment"
      footerJSX={
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            variant="info"
            disabled={
              dispute.status === DisputeStatus.EXPIRED ||
              dispute.status === DisputeStatus.RESOLVED
            }
          >
            Call Support
          </Button>
          <DrawerClose id="close-drawer" className="w-full">
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </div>
      }
    >
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">Reason</p>
        <p className="text-base first-letter:capitalize">{dispute.reason}</p>
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <p className="text-base font-medium first-letter:capitalize">Status</p>
        <p className="text-base first-letter:capitalize">{dispute.status}</p>
      </div>
    </CustomDialog>
  ) : disabled ? (
    <Setting
      title="Raise Dispute"
      subtitle="Can't raise"
      onClick={() => {
        showSnackBar({
          message:
            "You can only raise a dispute if the appointment is not completed",
          state: State.ERROR,
        });
      }}
    />
  ) : (
    <CustomDialog
      triggerJSX={<Setting title="Raise Dispute" subtitle="Tap to raise" />}
      title="Raise Dispute"
      description="Are you sure you want to raise a dispute?"
      footerJSX={
        <Button variant="error" onclick={async () => await raiseDispute()}>
          Raise Dispute
        </Button>
      }
    >
      <TextArea
        title="What went wrong?"
        onChange={(value) =>
          setRaiseDisputeRequest((prev) => ({ ...prev, reason: value }))
        }
        placeholder="Type your reason here..."
        value={raiseDisputeRequest.reason}
      />
    </CustomDialog>
  );
}

function CheckPayment({
  price,
  status,
  appointmentId,
  customerPayment,
  mobileNumber,
  name,
}: {
  price: Price;
  status: AppointmentStatus;
  appointmentId: string;
  customerPayment: RoutePayment;
  name: string;
  mobileNumber: string;
}) {
  return (
    <CustomDialog
      triggerJSX={
        <Setting
          title={
            status === AppointmentStatus.PAYMENT_PENDING
              ? "Pay Now"
              : status === AppointmentStatus.REFUNDED
              ? "Refunded"
              : "Payment Details"
          }
          subtitle={priceString({
            price: price.bookingBill.total,
            priceType: "paisa",
          })}
          icon={
            status === AppointmentStatus.PAYMENT_PENDING ? (
              <BiRupee className="w-8 h-8 text-primary" />
            ) : (
              <AiFillCheckCircle className="w-8 h-8 text-success" />
            )
          }
        />
      }
      title="Payment Details"
      description="What happened to the advance payment?"
      footerJSX={
        <Checkout
          disabled={customerPayment.paid ? true : false}
          mobileNumber={mobileNumber}
          name={name}
          orderId={customerPayment?.orderId || ""}
          onCompletePayment={async (response) => window.location.reload()}
        />
      }
    >
      <BookingBillInvoice bill={price.bookingBill} />
      {status === AppointmentStatus.SCHEDULED ? (
        <p className="text-base font-medium first-letter:capitalize">
          Your payment is still with us. The advance will be transferred only
          when you provide the otp from the partner.
        </p>
      ) : status === AppointmentStatus.PAYMENT_PENDING ? (
        <p className="text-base font-medium first-letter:capitalize">
          Pay the advance to confirm the appointment. The advance will be held
          with us until the appointment is completed, so don&apos;t worry and
          focus on your work.
        </p>
      ) : status === AppointmentStatus.REFUNDED ? (
        <p className="text-base font-medium first-letter:capitalize">
          The advance payment has been credited to your account. You can check
          your payment history for more details.
        </p>
      ) : status === AppointmentStatus.COMPLETED ? (
        <p className="text-base font-medium first-letter:capitalize">
          The advance payment has been credited to the partner. You can check
          your payment history for more details.
        </p>
      ) : status === AppointmentStatus.CANCELLED ? (
        <p className="text-base font-medium first-letter:capitalize">
          The advance payment has been credited to the partner. This is done
          since we want to ensure that the partner is not at loss.
        </p>
      ) : (
        <p className="text-base font-medium first-letter:capitalize">
          The advance payment has been credited to your account. You can check
          your payment history for more details.
        </p>
      )}
    </CustomDialog>
  );
}

function CancelAppointmentButton() {
  const [reason, setReason] = useState("");
  return (
    <CustomDialog
      triggerJSX={
        <Button variant="link" className="!text-error">
          Cancel Appointment
        </Button>
      }
      title="Cancel Appointment"
      description="Are you sure you want to cancel this appointment?"
      footerJSX={<Button variant="error">Yes, Cancel</Button>}
    >
      <TextArea
        title="What went wrong?"
        onChange={(value) => setReason(value)}
        value={reason}
        placeholder="Type your reason here..."
      />
    </CustomDialog>
  );
}

function SubComp({ title, data }: { title: string; data: string }) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
        {title}
      </p>
      <p className="text-base font-medium first-letter:capitalize">{data}</p>
    </div>
  );
}

function Refund() {
  return (
    <CustomDialog
      triggerJSX={<Setting title="Refunded" subtitle="View Details" />}
      title="Refund Details"
      description="What happened to the advance payment?"
      footerJSX={
        <DrawerClose id="close-drawer" className="w-full">
          <Button variant="success">Close</Button>
        </DrawerClose>
      }
    >
      <p className="text-base font-medium first-letter:capitalize">
        Since the appointment was cancelled by you, the refund amount was
        credited to the customer.
      </p>
      <p className="text-base font-medium first-letter:capitalize text-error">
        Important: You will not be recieving your advance payment.
      </p>
    </CustomDialog>
  );
}
