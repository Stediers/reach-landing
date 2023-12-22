import {
  FetchCustomerProfile_User,
  FetchCustomerProfile_AppointmentsWithYou,
} from "@api_functions/customer/fetch-customer-profile";
import Button from "@components/Button";
import Card from "@components/Card";
import Chip from "@components/Chip";
import ImageComponent from "@components/ImageComponent";
import LineHeader from "@components/LineHeader";
import PriceComponent from "@components/Price";
import Setting from "@components/Setting";
import { AppointmentStatus } from "@data/enums";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import DefaultProfileImage from "@public/images/default-profile-image.jpeg";

export default function Desktop({
  user,
  appointmentsWithYou,
}: {
  user: FetchCustomerProfile_User | null;
  appointmentsWithYou: FetchCustomerProfile_AppointmentsWithYou[];
}) {
  return (
    <DesktopWrapper className="flex flex-col items-center justify-start w-full space-y-5">
      {user && (
        <div className="flex flex-col items-center justify-center space-y-5 w-full">
          <Card className="flex flex-col items-center justify-center space-y-5">
            <ImageComponent
              src={user.imageUrl || DefaultProfileImage}
              alt="Customer Profile Image"
              className="rounded-full w-32 h-32"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-medium text-md">{user.name}</p>
              <p className="font-medium text-base text-textsubtle">
                {user.mobileNumber}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center space-x-5 w-full">
              <Button
                text="Call"
                className="bg-info text-white font-medium"
                onClick={() => window.open(`tel:${user.mobileNumber}`)}
              />
              <Button
                text="Message"
                className="bg-info text-white font-medium"
                onClick={() => window.open(`sms:${user.mobileNumber}`)}
              />
            </div>
          </Card>
          <LineHeader title="Appointments" />
          <div className="flex flex-col items-start justify-start space-y-3 w-full">
            <Setting
              title="Total Appointments"
              subtitle="Looks good!"
              icon={
                <p className="text-lg font-medium">{user.totalAppointments}</p>
              }
              hover={false}
            />
            <Setting
              title="Rated Appointments"
              subtitle={
                user.ratedAppointments > user.totalAppointments / 2
                  ? "Looks good!"
                  : "Not enough ratings"
              }
              icon={
                <p className="text-lg font-medium">{user.ratedAppointments}</p>
              }
              hover={false}
            />
            <Setting
              title="Cancelled Appointments"
              subtitle={
                user.cancelledAppointments > 10
                  ? "Too many!"
                  : "You can trust this user"
              }
              icon={
                <p className="text-lg font-medium">
                  {user.cancelledAppointments}
                </p>
              }
              hover={false}
            />
          </div>
        </div>
      )}
      {appointmentsWithYou && appointmentsWithYou.length > 0 && (
        <div className="flex flex-col items-start justify-start space-y-5 w-full">
          <LineHeader title="Appointments With You" />
          {appointmentsWithYou.map((appointment) => (
            <Card
              className="flex flex-col items-start justify-between bg-white !space-y-5"
              key={appointment.id}
            >
              <div className="flex flex-col space-y-2 w-full">
                <div className="flex items-center justify-between space-x-5  w-full">
                  <p className="text-md font-medium first-letter:capitalize">
                    {appointment.service.title}
                  </p>
                  <p className="text-sm">
                    {new Date(appointment.scheduledAt).toDateString()}
                  </p>
                </div>
                {appointment.appointmentStatus ===
                  AppointmentStatus.CANCELLED && (
                  <Chip
                    title="Cancelled"
                    className={`text-white bg-danger text-xs`}
                  />
                )}

                {appointment.appointmentStatus ===
                  AppointmentStatus.COMPLETED && (
                  <Chip
                    title="Completed"
                    className={`text-white bg-info text-xs`}
                  />
                )}

                {appointment.appointmentStatus ===
                  AppointmentStatus.SCHEDULED && (
                  <Chip
                    title="Scheduled"
                    className={`text-white bg-success text-xs`}
                  />
                )}

                {appointment.appointmentStatus === AppointmentStatus.RATED && (
                  <Chip
                    title="Rated"
                    className={`text-white bg-yellow-400 text-xs`}
                  />
                )}
              </div>
              <PriceComponent price={appointment.service.price} />
              <div className="flex flex-col space-y-2 w-full">
                <Button
                  text="View Details"
                  className="w-full bg-primary text-white font-medium"
                  link={`/console/appointments/view-appointment/${appointment.id}`}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </DesktopWrapper>
  );
}
