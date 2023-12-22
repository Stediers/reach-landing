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
import { AddOn, LocationAttributes, Slot, StepData } from "@data/types";
import Link from "next/link";
import { useState, Dispatch, SetStateAction } from "react";
import {
  AiFillDelete,
  AiFillHome,
  AiFillInfoCircle,
  AiFillVideoCamera,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import TimeSlots from "@components/input/SlotsInput";
import {
  showCustomJSXPopup,
  showYesNoPopup,
} from "@components/notifications/Popup";
import ListItem from "@components/ListItem";
import Steps from "@components/Steps";

export default function Mobile({
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
  slot,
  setSlot,
  steps,
  currentStep,
  setCurrentStep,
  createAppointment,
  addOns,
  selectedAddOns,
  setSelectedAddOns,
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
  slot: Slot | null;
  setSlot: React.Dispatch<React.SetStateAction<Slot | null>>;
  steps: StepData[];
  currentStep: StepData;
  setCurrentStep: React.Dispatch<React.SetStateAction<StepData>>;
  createAppointment: () => Promise<boolean>;
  addOns: AddOn[];
  selectedAddOns: string[];
  setSelectedAddOns: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center space-y-5"
      header="Create Appointment"
      backLink="/console/appointments"
    >
      <Wrapper
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
        buttonState={buttonState}
        createAppointment={createAppointment}
      >
        {currentStep.index === 0 && (
          <SelectService
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            services={services}
            setAddOns={setSelectedAddOns}
            setSlot={setSlot}
          />
        )}
        {currentStep.index === 1 && (
          <div className="flex flex-col items-center justify-center space-y-5 w-full">
            <Calendar date={date} setDate={setDate} selectedDates={[]} />
            {date && date.getDate() >= new Date().getDate() ? (
              <TimeSlots
                date={date}
                interval={30}
                selectedSlot={slot}
                setSelectedSlot={setSlot}
                busySlots={[]}
              />
            ) : null}
          </div>
        )}
        {currentStep.index === 2 && (
          <UserSelect
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
          />
        )}
        {currentStep.index === 3 &&
          (addOns.filter((addOn) =>
            addOn.attachedServiceIds.includes(selectedService?.serviceId!!)
          ).length > 0 ? (
            <SelectAddOns
              addOns={addOns}
              attachedAddOnIds={selectedAddOns}
              setAttachedAddOnIds={setSelectedAddOns}
              selectedServiceId={selectedService?.serviceId!!}
            />
          ) : (
            <Card className="flex flex-col items-center justify-center space-y-5 w-full">
              <p className="text-text text-center">
                You have not added any add-ons to this service. Please skip this
                step. You can always add add-ons later.
              </p>
            </Card>
          ))}
        {currentStep.index === 4 && (
          <div className="flex flex-col items-center justify-center space-y-5 w-full">
            {slot && (
              <div className="flex flex-col items-center justify-center space-y-5 w-full">
                <ListItem title="Date" value={slot.date.toDateString()} />
                <ListItem title="Time" value={slot.time} />
              </div>
            )}
            <div className="flex flex-col items-center justify-center space-y-5 w-full">
              <ListItem title="Mobile Number" value={mobileNumber} />
              {selectedUser && (
                <ListItem title="User" value={selectedUser.name} />
              )}
            </div>
            <ListItem
              title="Service"
              value={
                selectedService ? selectedService.baseData.title : "Select"
              }
            />
            <ListItem
              title="Add-Ons"
              value={
                selectedAddOns.length > 0
                  ? selectedAddOns
                      //only allow if serviceId in attachedServiceIds in addOn

                      .map((id) => {
                        const addOn = addOns.find((addOn) => addOn.id!! === id);
                        if (!addOn) return null;
                        return addOn.title;
                      })
                      .filter((title) => title !== null)
                      .join(", ")
                  : "None"
              }
            />
          </div>
        )}
      </Wrapper>
    </MobileWrapper>
  );
}

function SelectService({
  selectedService,
  setSelectedService,
  services,
  setAddOns,
  setSlot,
}: {
  selectedService: ServicesScreen | null;
  setSelectedService: Dispatch<SetStateAction<ServicesScreen | null>>;
  services: ServicesScreen[];
  setAddOns: Dispatch<SetStateAction<string[]>>;
  setSlot: Dispatch<SetStateAction<Slot | null>>;
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
              setAddOns([]);
              setSlot(null);
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
          defaultValue={
            selectedService ? selectedService.serviceId : services[0].serviceId
          }
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
    </Card>
  );
}

function Wrapper({
  children,
  currentStep,
  setCurrentStep,
  steps,
  createAppointment,
  buttonState,
}: {
  children: React.ReactNode;
  currentStep: StepData;
  setCurrentStep: Dispatch<SetStateAction<StepData>>;
  steps: StepData[];
  createAppointment: () => Promise<boolean>;
  buttonState: State;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      <Steps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
        title="Select Step"
      />
      <LineHeader title={steps[currentStep.index].description} />
      {children}
      <div className="flex flex-row items-center justify-between space-x-3 w-full">
        {currentStep.index !== 0 && (
          <Button
            text="Back"
            className="border border-primary text-primary font-medium"
            onClick={() => setCurrentStep(steps[currentStep.index - 1])}
            disabled={
              currentStep.index === steps.length - 1 || currentStep.index === 0
            }
          />
        )}
        {currentStep.index === steps.length - 1 ? (
          <Button
            text="Schedule"
            className={`bg-success text-white font-medium`}
            onClick={async () => {
              await createAppointment();
            }}
            disabled={steps.some((step) => !step.state)}
            buttonState={buttonState}
          />
        ) : (
          <Button
            text="Next"
            className="bg-primary text-white font-medium"
            onClick={() => setCurrentStep(steps[currentStep.index + 1])}
            disabled={
              currentStep.index === steps.length ||
              !steps[currentStep.index].state
            }
          />
        )}
      </div>
    </div>
  );
}

function SelectAddOns({
  addOns,
  attachedAddOnIds,
  setAttachedAddOnIds,
  selectedServiceId,
}: {
  addOns: AddOn[];
  attachedAddOnIds: string[];
  setAttachedAddOnIds: Dispatch<SetStateAction<string[]>>;
  selectedServiceId: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      {attachedAddOnIds.length > 0 && (
        <div className="flex flex-col items-center justify-start space-y-3 w-full">
          {attachedAddOnIds.map((id, index) => {
            const addOn = addOns.find((addOn) => addOn.id!! === id);
            if (!addOn) return null;
            return (
              <div
                className={`flex flex-row items-center justify-between w-full px-2 py-3 rounded-lg bg-white`}
                key={index}
              >
                <div className="flex flex-col items-start justify-center space-y-1">
                  <p className="text-base font-medium">{addOn.title}</p>
                  <p className="text-sm text-textsubtle font-medium">
                    {addOn.price}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-3">
                  <AiFillInfoCircle className="text-2xl text-info" />
                  <AiFillDelete
                    className="text-2xl text-error"
                    onClick={async () => {
                      const confirmation = await showYesNoPopup({
                        message: "Are you sure you want to remove this add-on?",
                        title: "Remove Add-On",
                      });
                      if (!confirmation) return;
                      setAttachedAddOnIds((prev) =>
                        prev.filter((id) => id !== addOn.id!!)
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {addOns
        .filter((addOn) => !attachedAddOnIds.includes(addOn.id!!))
        .filter((addOn) => addOn.attachedServiceIds.includes(selectedServiceId))
        .length > 0 && (
        <SelectInput
          title="Select Add-Ons"
          options={[
            ...addOns
              .filter((addOn) =>
                addOn.attachedServiceIds.includes(selectedServiceId)
              )
              .filter((addOn) => !attachedAddOnIds.includes(addOn.id!!))
              .map((addOn) => ({
                text: addOn.title + " - " + addOn.price + "%",
                value: addOn.id!!,
              })),
          ]}
          onChange={(value) => {
            setAttachedAddOnIds((prev) => [...prev, value.toString()]);
          }}
          reset={true}
        />
      )}
    </div>
  );
}
