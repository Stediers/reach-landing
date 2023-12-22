import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import Calendar from "@components/input/Calendar";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  FetchAppointmentByDateResponse,
  fetchAppointmentsByDate,
} from "@api_functions/appointment/fetch-appointments-by-date";
import Card from "@components/Card";
import Chip from "@components/Chip";
import PriceComponent from "@components/Price";
import { AppointmentStatus } from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { State } from "@data/enums";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { vibration } from "@helper_functions/vibrate";
import { showCustomJSXPopup } from "@components/notifications/Popup";
import ListItem from "@components/ListItem";
import PopupWrapper from "@wrapper/PopupWrapper";

export default function Mobile({
  date,
  setDate,
  selectedDates,
  tag,
  setTag,
}: {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  selectedDates: Date[];
  tag: AppointmentStatus | null;
  setTag: Dispatch<SetStateAction<AppointmentStatus | null>>;
}) {
  console.log(date);
  return (
    <MobileWrapper
      className="flex flex-col items-center space-y-5"
      header="Appointments"
    >
      <Calendar date={date} setDate={setDate} selectedDates={[]} />
      <LineHeader title="Appointments" />
      <Tags selectedTag={tag} setSelectedTag={setTag} />
      {/* {showFilter ? (
        <Filter
          date={date}
          setDate={setDate}
          selectedTag={tag}
          setSelectedTag={setTag}
          setShowFilter={setShowFilter}
        />
      ) : (
        <div className="fixed bottom-5 left-5 z-10">
          <Button
            text="Filter"
            onClick={() => setShowFilter(true)}
            className="bg-primary text-white font-medium"
          />
        </div>
      )} */}
      <Appointments date={date} tag={tag} />
    </MobileWrapper>
  );
}

function Appointments({
  date,
  tag,
}: {
  date: Date | null;
  tag: AppointmentStatus | null;
}) {
  const [appointmentPageState, setAppointmentPageState] = useState(
    State.LOADING
  );
  const [appointments, setAppointments] = useState<
    FetchAppointmentByDateResponse[]
  >([]);
  useEffect(() => {
    setAppointmentPageState(State.LOADING);
    fetchAppointmentsByDate({
      date: date,
      appointmentStatus: tag,
    }).then((res) => {
      if (res) {
        console.log(res);
        setAppointments(res);
      } else {
        setAppointments([]);
      }
      setAppointmentPageState(State.SUCCESS);
    });
  }, [date, tag]);
  return (
    <LoadingWrapper
      pageState={appointmentPageState}
      className="w-full"
      showLogo={false}
    >
      <ListWrapper>
        {appointments.length > 0 ? (
          //missing data comes last
          appointments.map((appointment) => (
            <Appointment appointment={appointment} key={appointment.id} />
          ))
        ) : (
          <p className="text-textsubtle">No appointments found</p>
        )}
      </ListWrapper>
    </LoadingWrapper>
  );
}

function Tags({
  selectedTag,
  setSelectedTag,
}: {
  selectedTag: AppointmentStatus | null;
  setSelectedTag: Dispatch<SetStateAction<AppointmentStatus | null>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <Tag tag={AppointmentStatus.COMPLETED} />
      {/* <Tag tag={AppointmentStatus.SCHEDULED} /> */}
      <Tag tag={AppointmentStatus.RATED} />
      <div className="col-span-2">
        <Tag tag={AppointmentStatus.CANCELLED} />
      </div>
    </div>
  );

  function Tag({ tag }: { tag: AppointmentStatus | null }) {
    return (
      <motion.div
        className={`flex items-center justify-center space-x-2 rounded-md px-2 py-[0.6rem] lg:py-1 ${
          selectedTag === tag ? "bg-primary" : "border border-textsubtle"
        }`}
        onClick={() => {
          vibration({ duration: 10, pattern: [0, 10, 10, 10] });
          if (selectedTag === tag) {
            setSelectedTag(null);
          } else {
            setSelectedTag(tag);
          }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <p
          className={`text-sm first-letter:capitalize ${
            selectedTag === tag
              ? "text-white font-medium"
              : "text-text font-medium"
          }`}
        >
          {tag}
        </p>
      </motion.div>
    );
  }
}

function Appointment({
  appointment,
}: {
  appointment: FetchAppointmentByDateResponse;
}) {
  return (
    <Card className="flex flex-col space-y-5 w-full">
      <div className="flex flex-col space-y-2 w-full">
        <div className="flex flex-row justify-between space-x-3 items-start w-full">
          <p className="text-md font-medium first-letter:capitalize">
            {appointment.service.title}
          </p>
          <div
            className="flex flex-row space-x-2 items-center shrink-0"
            onClick={() => {
              showCustomJSXPopup({
                title: "Time Logs",
                jsx: (
                  <div className="flex flex-col space-y-3 w-full">
                    <ListItem
                      title="completedAt"
                      value={
                        appointment.completedAt
                          ? new Date(appointment.completedAt).toDateString()
                          : "???"
                      }
                    />
                    <ListItem
                      title="ratedAt"
                      value={
                        appointment.ratedAt
                          ? new Date(appointment.ratedAt).toDateString()
                          : "Not rated"
                      }
                    />
                    <ListItem
                      title="cancelledAt"
                      value={
                        appointment.cancelledAt
                          ? new Date(appointment.cancelledAt).toDateString()
                          : "Not cancelled"
                      }
                    />
                  </div>
                ),
              });
            }}
          >
            <p className="text-sm font-medium first-letter:capitalize">
              {appointment.status === AppointmentStatus.CANCELLED
                ? new Date(
                    appointment.cancelledAt ? appointment.cancelledAt : ""
                  ).toDateString()
                : appointment.status === AppointmentStatus.COMPLETED
                ? new Date(
                    appointment.completedAt ? appointment.completedAt : ""
                  ).toDateString()
                : appointment.status === AppointmentStatus.SCHEDULED
                ? new Date(
                    appointment.scheduledAt ? appointment.scheduledAt : ""
                  ).toDateString()
                : appointment.status === AppointmentStatus.RATED
                ? new Date(
                    appointment.ratedAt ? appointment.ratedAt : ""
                  ).toDateString()
                : null}
            </p>
            <AiOutlineQuestionCircle className="text-info text-lg" />
          </div>
        </div>
        {appointment.status === AppointmentStatus.CANCELLED && (
          <Chip title="Cancelled" className={`text-white bg-danger text-xs`} />
        )}

        {appointment.status === AppointmentStatus.COMPLETED && (
          <Chip title="Completed" className={`text-white bg-info text-xs`} />
        )}

        {appointment.status === AppointmentStatus.SCHEDULED && (
          <Chip title="Scheduled" className={`text-white bg-success text-xs`} />
        )}

        {appointment.status === AppointmentStatus.RATED && (
          <Chip title="Rated" className={`text-white bg-rating-2.5 text-xs`} />
        )}

        {appointment.status === AppointmentStatus.SCHEDULED &&
          appointment.scheduledAt &&
          new Date(appointment.scheduledAt) < new Date() && (
            <Chip title="Due" className={`text-white bg-danger text-xs`} />
          )}
      </div>
      <div className="flex flex-col space-y-1 w-full">
        <p className="text-sm font-medium first-letter:capitalize">
          Performed to
        </p>
        {appointment.customer.name ? (
          <Link
            href={`/user/${appointment.customer.id}?backLink=/console/appointments`}
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <p className="text-base font-medium first-letter:capitalize underline underline-offset-4 text-info">
              {appointment.customer.name}
            </p>
          </Link>
        ) : (
          <p className="text-base font-medium first-letter:capitalize">
            User has not created an account yet
          </p>
        )}
      </div>
      <PriceComponent price={appointment.price} />
      <Button
        text="View"
        link={`/console/appointments/view-appointment/${appointment.id}`}
        className="bg-primary text-white font-medium"
      />
    </Card>
  );
}
