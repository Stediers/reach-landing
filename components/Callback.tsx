import { CallbackStatus } from "@data/enums";
import {
  Callback,
  FetchCustomerResponse,
  FetchPartnerResponse,
} from "@data/types";
import Link from "next/link";
import { Button } from "./ui/button";
import Card from "./Card";
import Chip from "./Chip";
import PriceComponent from "./price/MobilePrice";
import { ProfileDialog } from "./DialogPopup";
import { ProfilePopup } from "./DrawerPopup";

export function CallbackComponentDesktop({
  callback,
  footerJSX,
  partner,
}: {
  callback: Callback;
  footerJSX?: JSX.Element;
  partner: FetchPartnerResponse;
}) {
  return (
    <Card className="flex flex-col space-y-5 w-full">
      <div className="flex flex-col space-y-5 w-full">
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row justify-between items-start w-full space-x-4">
            <p className="text-lg font-medium first-letter:capitalize break-words">
              {callback.service.title}
            </p>
            <div className="flex flex-row justify-start space-x-3 items-center shrink-0">
              {callback.status === CallbackStatus.PENDING ? (
                <Chip
                  title="Pending"
                  className={`text-white bg-info text-xs`}
                />
              ) : callback.status === CallbackStatus.SUCCESS ? (
                <Chip
                  title="Success"
                  className={`text-white bg-success text-xs`}
                />
              ) : callback.status === CallbackStatus.FAILED ? (
                <Chip
                  title="Rejected"
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
          <ProfileDialog
            available={partner.available}
            gender={partner.gender}
            imageUrl={partner.imageUrl}
            name={partner.firstName + " " + partner.lastName}
            rating={partner.rating}
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  console.log("Call Partner");
                }}
              >
                Call Partner
              </Button>
            }
            triggerJSX={
              <p className="text-base font-medium first-letter:capitalize underline underline-offset-4 text-info">
                {partner.firstName} {partner.lastName}
              </p>
            }
          />
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Location
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {callback.location.city}, {callback.location.state}
          </p>
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Message
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {callback.message}
          </p>
        </div>
      </div>
      <PriceComponent price={callback.service.price} />
      {/* {callback.appointmentId ? (
        <Button
          variant="success"
          onClick={() => {
            console.log("View Appointment");
          }}
          asChild
        >
          <Link href={`/appointments/${callback.appointmentId}`}>
            View Appointment
          </Link>
        </Button>
      ) : (
        footerJSX
      )} */}
      {footerJSX}
    </Card>
  );
}

export function CallbackComponentMobile({
  callback,
  footerJSX,
  partner,
}: {
  callback: Callback;
  footerJSX?: JSX.Element;
  partner: FetchPartnerResponse;
}) {
  return (
    <Card className="flex flex-col space-y-5 w-full">
      <div className="flex flex-col space-y-5 w-full">
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex flex-row justify-between items-start w-full space-x-4">
            <p className="text-lg font-medium first-letter:capitalize break-words">
              {callback.service.title}
            </p>
            <div className="flex flex-row justify-start space-x-3 items-center shrink-0">
              {callback.status === CallbackStatus.PENDING ? (
                <Chip
                  title="Pending"
                  className={`text-white bg-info text-xs`}
                />
              ) : callback.status === CallbackStatus.SUCCESS ? (
                <Chip
                  title="Success"
                  className={`text-white bg-success text-xs`}
                />
              ) : callback.status === CallbackStatus.FAILED ? (
                <Chip
                  title="Rejected"
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
            available={partner.available}
            gender={partner.gender}
            imageUrl={partner.imageUrl}
            name={partner.firstName + " " + partner.lastName}
            rating={partner.rating}
            footerJSX={
              <Button
                variant="success"
                onClick={() => {
                  console.log("Call Partner");
                }}
              >
                Call Partner
              </Button>
            }
            triggerJSX={
              <p className="text-base font-medium first-letter:capitalize underline underline-offset-4 text-info">
                {partner.firstName} {partner.lastName}
              </p>
            }
          />
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Location
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {callback.location.city}, {callback.location.state}
          </p>
        </div>

        <div className="flex flex-col space-y-1 w-full">
          <p className="text-sm font-medium first-letter:capitalize text-textsubtle">
            Message
          </p>
          <p className="text-base font-medium first-letter:capitalize">
            {callback.message}
          </p>
        </div>
      </div>
      <PriceComponent price={callback.service.price} />
      {/* {callback.appointmentId ? (
        <Button
          variant="success"
          onClick={() => {
            console.log("View Appointment");
          }}
        >
          <Link href={`/appointments/${callback.appointmentId}`}>
            View Appointment
          </Link>
        </Button>
      ) : (
        footerJSX
      )} */}
      {footerJSX}
    </Card>
  );
}
