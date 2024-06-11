import { fetchServiceByServiceId } from "@api_functions/service/fetch-service-by-serviceId";
import "swiper/css";
import "swiper/css/pagination";
//import debounce from loadsh
import { redirect } from "next/navigation";

import PriceComponent from "@components/price/MobilePrice";
import { Gender, PreferredGender, ServiceType } from "@data/enums";
import {
  AiFillHome,
  AiFillStar,
  AiFillVideoCamera,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import UnderlinedHeader from "@components/UnderlinedHeader";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { FetchPartnerResponse, FetchServiceResponse, Price } from "@data/types";
import { IoIosFemale, IoIosMale, IoIosTransgender } from "react-icons/io";
import Logo from "@components/Logo";
import Setting from "@components/Setting";
import { GiBowTieRibbon } from "react-icons/gi";
import TrackServiceComponent from "@components/track/track-service";
import LineHeader from "@components/LineHeader";
import ImageComponent from "@components/ImageComponent";
import { BsArrowLeftShort, BsShieldCheck, BsShieldSlash } from "react-icons/bs";
import Link from "next/link";
import { Metadata } from "next";
import ImageCarousel from "@components/ImageCarousel";
import IconWrapper from "@components/IconWrapper";
import { MdLocationCity } from "react-icons/md";
import { RequestCallback } from "@components/RequestCallback";
import { User } from "lucide-react";
import { CustomDialog } from "@components/DialogPopup";

const getFullName = (firstName: string, lastName: string) => {
  return (
    `${firstName} ${lastName}`.charAt(0).toUpperCase() +
    `${firstName} ${lastName}`.slice(1)
  );
};

export const generateMetadata = async ({
  params,
}: {
  params: { serviceId: string };
}): Promise<Metadata> => {
  const serviceId = params.serviceId;
  const response = await fetchServiceByServiceId(serviceId);
  if (!response) {
    return {
      title: "Service Not Found",
      description: "The service you are looking for does not exist",
    };
  } else {
    return {
      title: {
        absolute: `${response!!.service.title} | ReachGig`,
      },
      description: `${response!!.service.whatsIncluded.join(", ")}`,
    };
  }
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { serviceId: string };
  searchParams: {
    whatsapp?: boolean;
    search?: boolean;
    backLink?: string;
    preview?: boolean;
  };
}) {
  const serviceId = params.serviceId;
  const backLink = searchParams.backLink
    ? decodeURIComponent(searchParams.backLink)
    : null;

  const event = searchParams.whatsapp
    ? "whatsapp"
    : searchParams.search
    ? "search"
    : searchParams.preview
    ? "preview"
    : null;
  const response = await fetchServiceByServiceId(serviceId);
  if (!response) {
    redirect("/404");
  }

  const service = response && response!!.service;
  const gig = response && response!!.gig;
  const callback = response && response!!.callback;
  return response && service && gig && callback ? (
    <div className="min-h-screen w-screen flex justify-center items-start max-w-7xl">
      <div
        className="flex flex-col items-center justify-start w-full min-h-full pt-5"
        hidden
      >
        {backLink && (
          <Link
            className="w-full flex flex-row items-center justify-start space-x-5 pb-2 px-5"
            href={backLink}
          >
            <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
          </Link>
        )}
        {event !== "preview" && (
          <TrackServiceComponent serviceId={serviceId} event={event} />
        )}
        <div className="flex flex-col items-center justify-start w-full space-y-5 px-5 relative">
          <div className="flex flex-col items-center justify-center w-full space-y-2 pb-3">
            <Logo text="ReachGig" textStyle="text-2xl font-medium" />
            <Link
              className="text-base font-medium text-center text-textsubtle"
              href={`/partner/${gig.gigId}`}
              target="_blank"
            >
              partners with{" "}
              <span className="text-primary">
                {getFullName(gig.firstName, gig.lastName)}
              </span>{" "}
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-x-16 gap-x-0 lg:gap-y-20 lg:pt-8 justify-items-center lg:pb-20">
            <div className="flex flex-col items-start justify-start lg:justify-between w-full space-y-2">
              <div className="flex flex-col items-start justify-start w-full space-y-2">
                <h1 className="text-xl lg:text-2xl font-medium text-left first-letter:capitalize w-full">
                  {service.title}
                </h1>
                <div className="w-full lg:pb-5 pt-5">
                  <PriceComponent price={service.price} />
                </div>
                <div className="hidden w-full lg:flex flex-col gap-y-5" hidden>
                  <MajorDetails
                    service={service}
                    location={gig.city + ", " + gig.state}
                    callback={callback}
                  />
                  <RequestCallback serviceId={serviceId} />
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-y-5 w-full col-span-2 lg:col-span-1 lg:sticky lg:top-20"
              hidden
            >
              <ImageCarousel
                images={service.imageUrls}
                showImagePreview
                imageHeight="h-48 lg:h-[23rem]"
                autoPlay
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-y-5 lg:hidden">
              <LineHeader title="Essentials" />
              <MajorDetails
                service={service}
                location={gig.city + ", " + gig.state}
                callback={callback}
              />
            </div>
            <div className="block lg:hidden w-full col-span-2">
              <LineHeader title="About the service" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-col lg:justify-start items-start md:gap-x-10 lg:gap-x-10 lg:gap-y-20 gap-y-10 w-full lg:-mt-10">
              {service.whatsIncluded && service.whatsIncluded.length > 0 && (
                <ListWrapper
                  list={service.whatsIncluded}
                  title="What's included"
                  icon={<AiOutlineCheck className="text-2xl text-success" />}
                />
              )}
              {service.whatsNotIncluded &&
                service.whatsNotIncluded.length > 0 && (
                  <ListWrapper
                    list={service.whatsNotIncluded}
                    title="Do not expect"
                    icon={<AiOutlineClose className="text-2xl text-error" />}
                  />
                )}
              {service.requirements && service.requirements.length > 0 && (
                <ListWrapper
                  list={service.requirements}
                  title="Requirements"
                  icon={
                    <AiOutlineInfoCircle className="text-2xl text-danger" />
                  }
                />
              )}
            </div>
          </div>
          <div className="sticky bottom-0 w-full lg:hidden bg-white py-3 !border-none !outline-none">
            <RequestCallback serviceId={serviceId} />
          </div>
          <div
            className="flex flex-col items-start justify-start w-full gap-y-5 lg:pt-0 lg:pb-10"
            hidden
          >
            <div className="max-w-lg w-full">
              <UnderlinedHeader
                title="Know more about me"
                align="items-start"
                className="hidden lg:block"
              />
              <LineHeader title="Your Partner" className="lg:hidden" />
              <ProfileCard
                gig={gig}
                searchParams={searchParams}
                backLink={backLink ?? ""}
                serviceId={serviceId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

function ProfileCard({
  gig,
  searchParams,
  backLink,
  serviceId,
}: {
  gig: FetchPartnerResponse;
  searchParams: { whatsapp?: boolean; search?: boolean; backLink?: string };
  backLink: string;
  serviceId: string;
}) {
  return (
    <div className="w-full flex flex-col items-start justify-start space-y-5 lg:p-10 rounded-md lg:rounded-lg pb-5 lg:border mt-5 lg:mt-10">
      <div className="flex flex-col items-center justify-center w-full space-y-5">
        <ImageComponent
          popup={false}
          src={gig.imageUrl}
          alt={getFullName(gig.firstName, gig.lastName)}
          className="rounded-lg p-1 w-40 h-40 lg:w-40 lg:h-40"
        />
        <div className="flex flex-row items-center justify-center w-full gap-x-3 flex-wrap">
          {gig.languages.map((language, index) => (
            <Badge key={index} variant="infoOutline">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center w-full space-y-1">
          <p className="text-xl font-medium">
            {getFullName(gig.firstName, gig.lastName)}
          </p>
          <p className="text-base text-center">{gig.designation}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-x-10 justify-items-center items-start max-h-[4rem] pt-5">
        <IconWrapper
          icon={<AiFillStar className="text-3xl text-yellow-500" />}
          title={gig.rating ? Number(gig.rating).toFixed(1) : "N/A"}
        />
        <IconWrapper
          icon={
            gig.isVerified ? (
              <BsShieldCheck className="text-3xl text-success" />
            ) : (
              <BsShieldSlash className="text-3xl text-error" />
            )
          }
          title={gig.isVerified ? "Verified" : "Pending"}
        />
        <IconWrapper
          icon={
            gig.gender === Gender.MALE ? (
              <IoIosMale className="text-blue-500 text-3xl" />
            ) : gig.gender === Gender.FEMALE ? (
              <IoIosFemale className="text-pink-500 text-3xl" />
            ) : (
              <IoIosTransgender className="text-3xl text-purple-500" />
            )
          }
          title={gig.gender.charAt(0).toUpperCase() + gig.gender.slice(1)}
        />
      </div>
      <div className="lg:grid grid-cols-1 w-full gap-5 justify-items-center items-start pt-5">
        <Button variant="default" className="!w-full !bg-info" asChild>
          <Link
            href={{
              pathname: `/partner/${gig.gigId}`,
              query: {
                whatsapp: searchParams.whatsapp,
                backLink: `/service/${serviceId}${
                  backLink ? `?backLink=${backLink}` : ""
                }`,
              },
            }}
          >
            <p className="text-base font-medium">View Profile</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ListWrapper({
  list,
  title,
  icon,
}: {
  list: string[];
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-7">
      <UnderlinedHeader
        title={title}
        align="items-start"
        className="lg:!text-xl"
      />
      <div className="flex flex-col items-start justify-start w-full space-y-5">
        {list.map((item, index) => (
          <div
            className="flex flex-row items-start justify-start space-x-3 w-full"
            key={index}
          >
            <div className="shrink-0">{icon}</div>
            <p className="text-base lg:text-lg text-left break-words">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MajorDetails({
  service,
  location,
  callback,
}: {
  service: FetchServiceResponse;
  location: string;
  callback: {
    requested: number;
    accepted: number;
  };
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 justify-items-center">
      {service.serviceType === ServiceType.ONLINE ? (
        <Setting
          title="Online"
          subtitle="This service is provided online"
          icon={<AiFillVideoCamera className="text-3xl text-info" />}
        />
      ) : service.serviceType === ServiceType.OFFLINE ? (
        <Setting
          title="Offline"
          subtitle={location}
          icon={<MdLocationCity className="text-3xl text-info" />}
        />
      ) : service.serviceType === ServiceType.HOME && service.address ? (
        <Setting
          title="Home Service"
          subtitle={service.address.city + ", " + service.address.state}
          icon={<AiFillHome className="text-3xl text-info" />}
        />
      ) : null}
      {callback.requested > 0 ? (
        <CustomDialog
          triggerJSX={
            <Setting
              title="Callbacks"
              subtitle={`${callback.requested} requested`}
              icon={<User className="w-8 h-8 text-info" />}
            />
          }
          title="Callbacks"
          description="What is it?"
        >
          <div className="flex flex-col items-center justify-center w-full space-y-5">
            <p className="text-base w-full">
              Callback requests are requests from customers who are interested
              in this service and would like to know more about it. You can also
              request a callback from the partner to know more about the
              service.
            </p>
            <p className="text-base w-full">
              {callback.accepted} callbacks have been accepted by the partner
              till now.
            </p>
          </div>
        </CustomDialog>
      ) : null}
      <Setting
        title="Experience"
        subtitle={`I have ${service.experience} of experience`}
        icon={<GiBowTieRibbon className="text-3xl" />}
      />
      <Setting
        title="Preferred Gender"
        subtitle={
          service.preferredGender === PreferredGender.MALE
            ? "Male Audiences Only"
            : service.preferredGender === PreferredGender.FEMALE
            ? "Female Audiences Only"
            : "All Audiences"
        }
        icon={
          service.preferredGender === PreferredGender.MALE ? (
            <IoIosMale className="text-3xl text-blue-500" />
          ) : service.preferredGender === PreferredGender.FEMALE ? (
            <IoIosFemale className="text-3xl text-pink-500" />
          ) : (
            <IoIosTransgender className="text-3xl text-purple-500" />
          )
        }
      />
    </div>
  );
}
