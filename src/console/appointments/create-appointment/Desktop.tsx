import { createAppointment } from "@api_functions/appointment/create-appointment";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import UserSelect from "@components/UserSelect";
import Calendar from "@components/input/Calendar";
import { showSnackBar } from "@components/notifications/Snackbar";
import { OnlinePlatform, PreferredGender, ServiceType } from "@data/enums";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { State } from "@data/enums";
import router from "next/router";
import { UserAutoCompleteResult } from "@api_functions/gig/fetch-user-autocomplete-result";
import Card from "@components/Card";
import IconWrapper from "@components/IconWrapper";
import PriceComponent from "@components/Price";
import AddressInput from "@components/input/AddressInput";
import SelectInput from "@components/input/SelectInput";
import verifyLocation from "@helper_functions/verifyLocation";
import { LocationAttributes } from "@data/types";
import Link from "next/link";
import { useState, Dispatch, SetStateAction } from "react";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
  date,
  setDate,
  selectedUser,
  setSelectedUser,
  mobileNumber,
  setMobileNumber,
  selectedService,
  setSelectedService,
  canSave,
  buttonState,
  setButtonState,
  services,
}: {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedUser: UserAutoCompleteResult | null;
  setSelectedUser: React.Dispatch<
    React.SetStateAction<UserAutoCompleteResult | null>
  >;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  selectedService: ServicesScreen | null;
  setSelectedService: React.Dispatch<
    React.SetStateAction<ServicesScreen | null>
  >;
  canSave: boolean;
  buttonState: State;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
  services: ServicesScreen[];
}) {
  return (
    <DesktopWrapper className="grid grid-cols-2 gap-10 w-full px-10">
      <div className="flex flex-col items-center space-y-5 w-full">
        <Calendar date={date} setDate={setDate} selectedDates={[]} />
        <SelectService
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          services={services}
        />
      </div>
      <div className="flex flex-col items-center space-y-5 w-full">
        <UserSelect
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
        />
        {/* <TimeInput date={date} setDate={setDate} /> */}
        {selectedService &&
          date &&
          date.getDate() >= new Date().getDate() &&
          date.getMonth() >= new Date().getMonth() &&
          date.getFullYear() >= new Date().getFullYear() &&
          (selectedService.baseData.serviceType === ServiceType.OFFLINE ? (
            <CreateOfflineAppointment
              date={date}
              mobileNumber={mobileNumber}
              selectedUser={selectedUser}
              selectedService={selectedService}
            />
          ) : selectedService.baseData.serviceType === ServiceType.ONLINE ? (
            <CreateOnlineAppointment
              date={date}
              mobileNumber={mobileNumber}
              selectedUser={selectedUser}
              selectedService={selectedService}
            />
          ) : (
            <Button
              text="Schedule Appointment"
              className={`bg-success text-white font-medium`}
              disabled={!canSave}
              onClick={async () => {
                setButtonState(State.LOADING);
                const res = await createAppointment({
                  date: date,
                  mobileNumber: mobileNumber.startsWith("+91")
                    ? mobileNumber
                    : `+91${mobileNumber}`,
                  serviceId: selectedService.serviceId,
                  userId: selectedUser ? selectedUser.userId : null,
                  addOnIds: [],
                });
                if (res) {
                  showSnackBar({
                    message: "Appointment created successfully",
                    state: State.SUCCESS,
                  });
                  router.push("/console/appointments");
                }
                setButtonState(State.SUCCESS);
              }}
              buttonState={buttonState}
            />
          ))}
        {!date ||
        date.getDate() < new Date().getDate() ||
        date.getMonth() < new Date().getMonth() ||
        date.getFullYear() < new Date().getFullYear() ? (
          <p className="text-textsubtle text-base text-center">
            Please select a valid date
          </p>
        ) : null}
      </div>
    </DesktopWrapper>
  );
}

function CreateOnlineAppointment({
  date,
  mobileNumber,
  selectedUser,
  selectedService,
}: {
  date: Date;
  mobileNumber: string;
  selectedUser: UserAutoCompleteResult | null;
  selectedService: ServicesScreen;
}) {
  const [onlinePlatform, setOnlinePlatform] = useState<OnlinePlatform | null>(
    null
  );

  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);

  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      <SelectInput
        onChange={(value) => setOnlinePlatform(value as OnlinePlatform)}
        title="Online Platform"
        options={Object.values(OnlinePlatform).map((platform) => ({
          value: platform,
          text: (platform.charAt(0).toUpperCase() + platform.slice(1)).replace(
            "_",
            " "
          ),
        }))}
      />
      <Button
        text="Schedule Appointment"
        className={`bg-success text-white font-medium`}
        disabled={
          (mobileNumber.length !== 10 && mobileNumber.length !== 13) ||
          !onlinePlatform ||
          !date
        }
        onClick={async () => {
          setButtonState(State.LOADING);
          const res = await createAppointment({
            date: date,
            mobileNumber: mobileNumber,
            serviceId: selectedService.serviceId,
            userId: selectedUser ? selectedUser.userId : null,
            addOnIds: [],
          });
          if (res) {
            showSnackBar({
              message: "Appointment created successfully",
              state: State.SUCCESS,
            });
            router.push("/console/appointments");
          }
          setButtonState(State.SUCCESS);
        }}
        buttonState={buttonState}
      />
    </div>
  );
}

function CreateOfflineAppointment({
  date,
  mobileNumber,
  selectedUser,
  selectedService,
}: {
  date: Date;
  mobileNumber: string;
  selectedUser: UserAutoCompleteResult | null;
  selectedService: ServicesScreen;
}) {
  const [location, setLocation] = useState<LocationAttributes | null>(null);

  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);

  return (
    <div className="flex flex-col items-center justify-center space-y-3 w-full">
      <AddressInput
        location={location}
        setLocation={setLocation}
        title="Search Location"
      />
      <Button
        text="Schedule Appointment"
        className="bg-success text-white font-medium mt-5"
        disabled={
          (mobileNumber.length !== 10 && mobileNumber.length !== 13) ||
          !location ||
          !date ||
          !verifyLocation(location)
        }
        onClick={async () => {
          setButtonState(State.LOADING);
          const res = await createAppointment({
            date: date,
            mobileNumber: mobileNumber,
            serviceId: selectedService.serviceId,
            userId: selectedUser ? selectedUser.userId : null,
            addOnIds: [],
          });
          if (res) {
            showSnackBar({
              message: "Appointment created successfully",
              state: State.SUCCESS,
            });
            router.push("/console/appointments");
          }
          setButtonState(State.SUCCESS);
        }}
        buttonState={buttonState}
      />
    </div>
  );
}

function SelectService({
  selectedService,
  setSelectedService,
  services,
}: {
  selectedService: ServicesScreen | null;
  setSelectedService: Dispatch<SetStateAction<ServicesScreen | null>>;
  services: ServicesScreen[];
}) {
  return (
    <div className="flex flex-col items-center space-y-3 w-full">
      {services.length > 0 && (
        <SelectInput
          onChange={(value) => {
            const service = services.find(
              (service) => service.serviceId === value
            );
            if (service) {
              setSelectedService(service);
            } else {
              showSnackBar({
                message: "Service not found",
                state: State.ERROR,
              });
            }
          }}
          options={services.map((service) => ({
            text: service.baseData.title,
            value: service.serviceId,
          }))}
          defaultValue={services[0]?.serviceId}
        />
      )}
      {selectedService && <ServiceCard item={selectedService} />}
    </div>
  );
}

function ServiceCard({ item }: { item: ServicesScreen }) {
  const experienceString =
    new Date().getFullYear() -
      new Date(item.baseData.experience).getFullYear() >
    0
      ? `${
          new Date().getFullYear() -
          new Date(item.baseData.experience).getFullYear()
        } years`
      : `${
          new Date().getMonth() - new Date(item.baseData.experience).getMonth()
        } months`;
  return (
    <Card className="flex flex-col items-center justify-start !space-y-5 w-full !py-4">
      <h2 className="text-lg font-medium first-letter:capitalize text-center">
        {item.baseData.title}
      </h2>
      <div className="grid grid-cols-3 gap-2 justify-items-center w-full">
        <IconWrapper
          // title={new Date() - new Date(service.experience) + " years"}
          title={experienceString}
          icon={<GiBowTieRibbon className="text-2xl text-warning" />}
        />
        {item.baseData.serviceType === ServiceType.HOME && (
          <Link href={`/console/profile/manage-addresses`}>
            <IconWrapper
              title={item.location.city || "Somewhere in the world"}
              icon={<AiFillHome className="text-2xl text-info" />}
              whileTap={{ scale: 0.9 }}
            />
          </Link>
        )}
        {item.baseData.serviceType === ServiceType.ONLINE && (
          <IconWrapper
            title="Online"
            icon={<AiFillVideoCamera className="text-2xl text-info" />}
          />
        )}
        {item.baseData.serviceType === ServiceType.OFFLINE && (
          <IconWrapper
            title="Offline"
            icon={<HiLocationMarker className="text-2xl text-info" />}
          />
        )}
        <IconWrapper
          title={
            item.baseData.preferredGender === PreferredGender.FEMALE
              ? "Female"
              : item.baseData.preferredGender === PreferredGender.MALE
              ? "Male"
              : "Unisex"
          }
          icon={
            item.baseData.preferredGender === PreferredGender.FEMALE ? (
              <BsGenderFemale className="text-2xl text-pink-500" />
            ) : item.baseData.preferredGender === PreferredGender.MALE ? (
              <BsGenderMale className="text-2xl text-blue-500" />
            ) : (
              <BsGenderTrans className="text-2xl text-purple-500" />
            )
          }
        />
      </div>
      <div className="self-start px-1 flex flex-col items-start justify-start space-y-4 w-full">
        <Link
          href={`/console/price?serviceId=${item.serviceId}`}
          className="w-full"
        >
          <PriceComponent price={item.price} />
        </Link>
      </div>
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <Button
          text="View Details"
          link={`/console/services/share?serviceId=${item.serviceId}`}
          className="w-full bg-primary text-white font-medium"
        />
      </div>
    </Card>
  );
}
