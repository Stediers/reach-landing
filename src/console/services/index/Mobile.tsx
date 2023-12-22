import Button from "@components/Button";
import ListWrapper from "@wrapper/ListWrapper";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import { ServicesScreen } from "@api_functions/service/fetch-services-screen";
import Card from "@components/Card";
import Chip from "@components/Chip";
import IconWrapper from "@components/IconWrapper";
import PriceComponent from "@components/Price";
import Rating from "@components/Rating";
import { ServiceType, PreferredGender } from "@data/enums";
import Link from "next/link";
import { AiFillHome, AiFillVideoCamera } from "react-icons/ai";
import { BsGenderFemale, BsGenderMale, BsGenderTrans } from "react-icons/bs";
import { GiBowTieRibbon } from "react-icons/gi";
import { HiLocationMarker } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import ImageComponent from "@components/ImageComponent";
import { showInfoPopup } from "@components/notifications/Popup";
import VisibilityInfoIcon from "@public/lottie/visibility-chip-info.json";
import RatingInfoIcon from "@public/lottie/rating-chip-info.json";
import PreferredGenderInfoIcon from "@public/lottie/gender-info.json";
import LocationInfoIcon from "@public/lottie/location-info.json";
import ExperienceInfoIcon from "@public/lottie/experience-info.json";
import Lottie from "lottie-react";

export default function Mobile({ services }: { services: ServicesScreen[] }) {
  return (
    <MobileWrapper
      className="flex flex-col items-center justify-start h-full w-full space-y-5"
      header="My Services"
    >
      <Button
        text="Add a new service"
        link={`/console/services/add-service`}
        className="bg-primary shadow-sm text-white p-3 rounded-md text-center font-medium w-full text-base"
      />
      <ListWrapper>
        {services && services.length > 0 ? (
          services.map((item) => (
            <ServiceCard key={item.serviceId} item={item} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center space-y-5 w-full">
            <p className=" text-center font-medium text-lg">
              Get started by creating a new service
            </p>
          </div>
        )}
      </ListWrapper>
    </MobileWrapper>
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
    <Card className="flex flex-col items-center justify-start !space-y-8 w-full !p-0">
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
            onClick={() => {
              showInfoPopup({
                title: "Visibility",
                icon: (
                  <Lottie
                    animationData={VisibilityInfoIcon}
                    loop={true}
                    className="h-32 -mb-7"
                  />
                ),
                message:
                  "Shows whether your service is visible to customers of not. Change this setting by clicking 'Manage'",
              });
            }}
            className={`text-white ${
              item.baseData.visible ? "bg-success" : "bg-error"
            }`}
          />
          <div
            onClick={() => {
              showInfoPopup({
                title: "Rating",
                icon: (
                  <Lottie
                    animationData={RatingInfoIcon}
                    loop={true}
                    className="h-32 -mb-5"
                  />
                ),
                message:
                  "Shows the average rating of your service from customers.",
              });
            }}
            className="flex flex-row items-center justify-center space-x-3"
          >
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
            onClick={(): Promise<void> => {
              showInfoPopup({
                title: "Experience",
                icon: (
                  <Lottie
                    animationData={ExperienceInfoIcon}
                    loop={true}
                    className="h-40 -my-4"
                  />
                ),
                message:
                  "Shows the experience you have with this service in years.",
              });
              return Promise.resolve();
            }}
          />
          {item.baseData.serviceType === ServiceType.HOME && (
            <Link
              href={`/console/profile/manage-addresses?backLink=/console/services`}
            >
              <IconWrapper
                title={item.location.city || "Somewhere in the world"}
                icon={<AiFillHome className="text-2xl text-info" />}
                onClick={(): Promise<void> => {
                  showInfoPopup({
                    title: "Mode of Service",
                    icon: (
                      <Lottie
                        animationData={LocationInfoIcon}
                        loop={true}
                        className="h-64 -my-20"
                      />
                    ),
                    message: `Shows the mode in which your service is available. Currently set to ${item.baseData.serviceType}.`,
                  });
                  return Promise.resolve();
                }}
                whileTap={{ scale: 0.9 }}
              />
            </Link>
          )}
          {item.baseData.serviceType === ServiceType.ONLINE && (
            <IconWrapper
              title="Online"
              icon={<AiFillVideoCamera className="text-2xl text-info" />}
              onClick={(): Promise<void> => {
                showInfoPopup({
                  title: "Mode of Service",
                  icon: (
                    <Lottie
                      animationData={LocationInfoIcon}
                      loop={true}
                      className="h-64 -my-20"
                    />
                  ),
                  message: `Shows the mode in which your service is available. Currently set to ${item.baseData.serviceType}.`,
                });
                return Promise.resolve();
              }}
            />
          )}
          {item.baseData.serviceType === ServiceType.OFFLINE && (
            <IconWrapper
              title="Offline"
              icon={<HiLocationMarker className="text-2xl text-info" />}
              onClick={(): Promise<void> => {
                showInfoPopup({
                  title: "Mode of Service",
                  icon: (
                    <Lottie
                      animationData={LocationInfoIcon}
                      loop={true}
                      className="h-64 -my-20"
                    />
                  ),
                  message: `Shows the mode in which your service is available. Currently set to ${item.baseData.serviceType}.`,
                });
                return Promise.resolve();
              }}
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
            onClick={(): Promise<void> => {
              showInfoPopup({
                title: "Preferrend Gender",
                icon: (
                  <Lottie
                    animationData={PreferredGenderInfoIcon}
                    loop={true}
                    className="h-24"
                  />
                ),
                message: `Shows the gender that your service caters to.`,
              });
              return Promise.resolve();
            }}
          />
        </div>
        <div className="self-start px-1 flex flex-col items-start justify-start space-y-4 w-full">
          <PriceComponent price={item.price} />
        </div>
        <div className="flex flex-col items-start justify-start space-y-3 w-full">
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <div className="flex flex-row items-center justify-start space-x-2 w-full">
              <Button
                text="View"
                newTab={true}
                link={`https://reach-web-phi.vercel.app/service/${item.serviceId}`}
                className="bg-info text-white font-medium"
              />
              <Button
                text="Manage"
                link={`/console/services/manage?serviceId=${item.serviceId}`}
                className="bg-black text-white font-medium"
              />
            </div>
            <Button
              text="Request Feedback"
              link={`/console/appointments/request-feedback?serviceId=${item.serviceId}&&backLink=/console/services`}
              className="w-full bg-primary text-white font-medium"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
