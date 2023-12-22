import Button from "@components/Button";
import LineHeader from "@components/LineHeader";
import Calendar from "@components/input/Calendar";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Card from "@components/Card";
import Chip from "@components/Chip";
import PriceComponent from "@components/Price";
import devLog from "@helper_functions/devLog";
import {
  AppointmentStatus,
  OnlinePlatform,
  PreferredGender,
  ServiceType,
} from "@data/enums";
import ListWrapper from "@wrapper/ListWrapper";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import { State } from "@data/enums";
import { motion } from "framer-motion";
import Link from "next/link";
import { AddOn, Address, Base64, LocationAttributes } from "@data/types";
import AddressInput from "@components/input/AddressInput";
import UserSelect from "@components/UserSelect";
import verifyLocation from "@helper_functions/verifyLocation";
import { ImagesInput } from "@components/input/MediaInput";
import { UserAutoCompleteResult } from "@api_functions/gig/fetch-user-autocomplete-result";
import SelectInput from "@components/input/SelectInput";
import {
  showCustomJSXPopup,
  showQrCodePopup,
  showYesNoPopup,
} from "@components/notifications/Popup";
import router from "next/router";
import { CreateFeedbackRequest } from "@api_functions/feedback/create-feedback";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import {
  clearLocalStorage,
  deleteItemsFromLocalStorage,
} from "@api_functions/internal/local-storage";
import IconWrapper from "@components/IconWrapper";
import Rating from "@components/Rating";
import {
  AiOutlineSetting,
  AiOutlineShareAlt,
  AiFillHome,
  AiFillVideoCamera,
  AiFillDelete,
  AiFillInfoCircle,
} from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import ImageComponent from "@components/ImageComponent";
import { FetchCreateFeedbackMetadataResponse } from "@api_functions/feedback/fetch-create-feedback-metadata";
import Setting from "@components/Setting";
import { FcBriefcase } from "react-icons/fc";
import PopupWrapper from "@wrapper/PopupWrapper";
import priceString from "@helper_functions/priceString";

export default function Mobile({
  selectedUser,
  setSelectedUser,
  mobileNumber,
  setMobileNumber,
  location,
  setLocation,
  requestFeedbackButtonState,
  setRequestFeedbackButtonState,
  images,
  setImages,
  setAppointmentId,
  verifyBaseForm,
  verifyDynamicDataForm,
  homeAppointmentData,
  offlineAppointmentData,
  onlineAppointmentData,
  response,
  createFeedback,
  selectedAddOnIds,
  setSelectedAddOnIds,
  setHomeAppointmentData,
  setOfflineAppointmentData,
  setOnlineAppointmentData,
}: {
  selectedUser: UserAutoCompleteResult | null;
  setSelectedUser: Dispatch<SetStateAction<UserAutoCompleteResult | null>>;
  mobileNumber: string;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  location: LocationAttributes | null;
  setLocation: Dispatch<SetStateAction<LocationAttributes | null>>;
  requestFeedbackButtonState: State;
  setRequestFeedbackButtonState: Dispatch<SetStateAction<State>>;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  setAppointmentId: Dispatch<SetStateAction<string>>;
  verifyBaseForm: (mobileNumber: string) => boolean;
  verifyDynamicDataForm: () => boolean;
  onlineAppointmentData?: CreateFeedbackRequest["onlineAppointmentData"];
  setOnlineAppointmentData: Dispatch<
    SetStateAction<CreateFeedbackRequest["onlineAppointmentData"]>
  >;
  offlineAppointmentData?: CreateFeedbackRequest["offlineAppointmentData"];
  setOfflineAppointmentData: Dispatch<
    SetStateAction<CreateFeedbackRequest["offlineAppointmentData"]>
  >;
  homeAppointmentData?: CreateFeedbackRequest["homeAppointmentData"];
  setHomeAppointmentData: Dispatch<
    SetStateAction<CreateFeedbackRequest["homeAppointmentData"]>
  >;
  response: FetchCreateFeedbackMetadataResponse;
  createFeedback: () => Promise<void>;
  selectedAddOnIds: string[];
  setSelectedAddOnIds: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-start h-full w-full space-y-5 relative"
      header="Request Feedback"
      backLink="/console/appointments"
      showNavBar={false}
    >
      <Setting
        title={response.service.baseData.title}
        subtitle="Tap to view Details"
        icon={<FcBriefcase className="text-3xl text-info" />}
        onClick={() =>
          showCustomJSXPopup({
            jsx: <ServiceCard item={response.service} />,
          })
        }
      />
      <LineHeader title="Feedback Details" />
      <UserSelect
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        showInfo
      />
      {response.service.baseData.serviceType !== ServiceType.HOME && (
        <LineHeader
          title={
            response.service.baseData.serviceType === ServiceType.OFFLINE
              ? "Where?"
              : "Online Platform"
          }
        />
      )}
      {response.service.baseData.serviceType === ServiceType.ONLINE && (
        <SelectOnlinePlatform
          onlineAppointmentData={onlineAppointmentData}
          setOnlineAppointmentData={setOnlineAppointmentData}
        />
      )}
      {response.service.baseData.serviceType === ServiceType.OFFLINE && (
        <SelectLocation location={location} setLocation={setLocation} />
      )}
      {response.addOns.length > 0 && <LineHeader title="Add-Ons" />}
      {response.addOns.length > 0 && (
        <AddOns
          addOns={response.addOns}
          attachedAddOnIds={selectedAddOnIds}
          setAttachedAddOnIds={setSelectedAddOnIds}
        />
      )}
      <Button
        text="Request Feedback"
        className="bg-success text-white font-medium"
        disabled={!verifyDynamicDataForm()}
        onClick={async () => {
          setRequestFeedbackButtonState(State.LOADING);
          await createFeedback();
          setRequestFeedbackButtonState(State.SUCCESS);
        }}
        buttonState={requestFeedbackButtonState}
      />
    </MobileWrapper>
  );
}

function AddOns({
  addOns,
  attachedAddOnIds,
  setAttachedAddOnIds,
}: {
  addOns: AddOn[];
  attachedAddOnIds: string[];
  setAttachedAddOnIds: Dispatch<SetStateAction<string[]>>;
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
      {addOns.filter((addOn) => !attachedAddOnIds.includes(addOn.id!!)).length >
        0 && (
        <SelectInput
          title="Select Add-Ons"
          reset={true}
          options={[
            ...addOns
              .filter((addOn) => !attachedAddOnIds.includes(addOn.id!!))
              .map((addOn) => ({
                text: addOn.title + " - " + priceString(addOn.price),
                value: addOn.id!!,
              })),
          ]}
          onChange={(value) => {
            setAttachedAddOnIds((prev) => [...prev, value.toString()]);
          }}
        />
      )}
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
    <div className="flex flex-col items-center justify-start !space-y-8 w-full !p-0">
      <Swiper
        // @ts-ignore
        modules={[Pagination]}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        spaceBetween={100}
        loop={true}
        className="w-full flex items-center justify-center"
      >
        <div className="flex flex-row items-center justify-between space-x-2 w-full absolute z-50 px-3 top-3">
          <Chip
            title={item.baseData.visible ? "Visible" : "Hidden"}
            className={`text-white ${
              item.baseData.visible ? "bg-success" : "bg-error"
            }`}
          />
          <div className="flex flex-row items-center justify-center space-x-3">
            <Rating rating={item.baseData.rating} />
          </div>
        </div>
        {item.baseData.imageUrls.map((url) => (
          <SwiperSlide
            className="w-full min-h-[12rem] flex items-center justify-center"
            key={url}
          >
            <ImageComponent src={url} alt="s" className="w-full h-[12rem]" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col items-center justify-start space-y-7 w-full px-3 pb-3">
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
            <Link
              href={`/console/profile/manage-addresses?backLink=/console/services`}
            >
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
          {/* {item.baseData.totalAppointments > 0 && (
            <PerformanceCard
              ratedAppointments={item.baseData.totalRatedAppointments}
              totalAppointments={item.baseData.totalAppointments}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}

function SelectLocation({
  location,
  setLocation,
}: {
  location: LocationAttributes | null;
  setLocation: Dispatch<SetStateAction<LocationAttributes | null>>;
}) {
  return (
    <AddressInput
      location={location}
      setLocation={setLocation}
      title="Where did the appointment take place?"
    />
  );
}

function SelectOnlinePlatform({
  onlineAppointmentData,
  setOnlineAppointmentData,
}: {
  onlineAppointmentData?: CreateFeedbackRequest["onlineAppointmentData"];
  setOnlineAppointmentData: Dispatch<
    SetStateAction<CreateFeedbackRequest["onlineAppointmentData"]>
  >;
}) {
  return (
    <SelectInput
      title="Online Platform"
      options={Object.values(OnlinePlatform).map((item) => {
        return {
          text: item,
          value: item,
        };
      })}
      //prev can be undefined
      onChange={(value) => {
        setOnlineAppointmentData({
          platform: value as OnlinePlatform,
          link: "",
        });
      }}
      defaultValue={OnlinePlatform.GOOGLE_MEET.toString()}
    />
  );
}
