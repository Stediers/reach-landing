import { fetchServiceByServiceId } from "@api_functions/service/fetch-service-by-serviceId";
import "swiper/css";
import "swiper/css/pagination";
//import debounce from loadsh
import { redirect } from "next/navigation";

import PriceComponent from "@components/price/MobilePrice";
import {
  CustomerRoutes,
  Gender,
  PreferredGender,
  ServiceType,
} from "@data/enums";
import {
  AiFillHome,
  AiFillStar,
  AiFillVideoCamera,
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import UnderlinedHeader, {
  SubUnderlinedHeader,
} from "@components/UnderlinedHeader";
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
import ImageCarousel from "@components/carousel/ImageCarousel";
import IconWrapper from "@components/IconWrapper";
import { MdLocationCity } from "react-icons/md";
import { RequestCallback } from "@components/RequestCallback";
import { User } from "lucide-react";
import { CustomDialog } from "@components/DialogPopup";
import { AddOnMobile } from "@components/AddOn";
import CustomImageGridLayout from "@components/CustomImageGridLayout";
import { ContactMeDrawer, ContactMeSheet } from "@components/contact/Contact";
import Card from "@components/Card";

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
      alternates: {
        canonical: `https://reachgig.com/${CustomerRoutes.SERVICE.replace(
          "[serviceId]",
          serviceId
        ).replace("[partnerHandle]", response!!.gig.handle!!)}`,
      },
      openGraph: {
        title: `${response!!.service.title} | ReachGig`,
        description: `${response!!.service.whatsIncluded.join(", ")}`,
        images: [
          {
            url:
              response.service.imageUrls.length > 0
                ? response.service.imageUrls[0]
                : "",
            width: 800,
            height: 600,
            alt: response.service.title,
          },
          {
            url:
              response.service.imageUrls.length > 1
                ? response.service.imageUrls[1]
                : "",
            width: 1800,
            height: 1600,
            alt: response.service.title,
          },
        ],
        type: "website",
        url: `https://reachgig.com/${CustomerRoutes.SERVICE.replace(
          "[serviceId]",
          serviceId
        ).replace("[partnerHandle]", response!!.gig.handle!!)}`,
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
  const backLink = searchParams.backLink;

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

  return (
    <div className="w-full flex flex-col items-start justify-center max-w-[85rem] lg:px-10 lg:py-10 relative">
      <div className="flex lg:hidden w-full" hidden>
        <ImageCarousel
          images={service.imageUrls}
          imageHeight="min-h-[30rem] lg:h-[30rem]"
          itemBasis="lg:basis-1/4"
          border={false}
          className="lg:rounded-lg bg-white overflow-hidden"
        />
      </div>
      <div className="hidden lg:flex w-full">
        <CustomImageGridLayout imageUrls={service.imageUrls} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-5 justify-items-center items-start">
        <div className="flex flex-col items-start justify-start w-full space-y-2 py-5 lg:px-0">
          <div className="flex flex-col items-start justify-start w-full space-y-2 px-5 lg:px-0">
            <h1 className="lg:text-2xl text-xl font-medium text-left first-letter:capitalize w-full lg:max-w-[60%]">
              {service.title}
            </h1>
            <Link
              href={`${CustomerRoutes.PARTNER.replace(
                "[partnerHandle]",
                gig.handle!!
              )}?backLink=${CustomerRoutes.SERVICE.replace(
                "[serviceId]",
                serviceId
              ).replace("[partnerHandle]", gig.handle!!)}${
                backLink ? `?backLink=${backLink}` : ""
              }`}
            >
              <h2 className="lg:text-lg text-base text-left first-letter:capitalize w-full text-primary underline underline-offset-4">
                {gig.firstName + " " + gig.lastName}
              </h2>
            </Link>
          </div>
          <div className="w-full grid grid-cols-1 items-start justify-start gap-y-5 px-5 lg:px-0 pt-5 lg:gap-x-10">
            <div className="flex flex-col items-start justify-start w-full space-y-5 max-w-lg">
              <PriceComponent price={service.price} />
              <MajorDetails
                service={service}
                location={gig.city + ", " + gig.state}
                callback={callback}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-start space-y-5 px-5 lg:px-0 pt-5">
            <LineHeader title="About the service" className="lg:hidden" />
            <div className="grid grid-cols-1 w-full gap-5 lg:gap-y-10">
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
        </div>
        <div className="lg:sticky lg:top-20 max-w-lg hidden lg:flex flex-col gap-y-5 w-full pt-10 ">
          <RequestCallback serviceId={serviceId} type="desktop" />
        </div>
      </div>
      <div className="sticky bottom-0 py-5 bg-white lg:hidden flex flex-col gap-y-5 w-full px-5">
        <RequestCallback serviceId={serviceId} type="mobile" />
      </div>
      <div className="w-full flex flex-col items-start justify-start space-y-5 pt-5 col-span-2 max-w-lg lg:px-0 px-5 mb-5">
        <UnderlinedHeader title="Know more about me" align="items-start" />
        <ProfileCard
          gig={gig}
          searchParams={searchParams}
          backLink={backLink ?? ""}
          serviceId={serviceId}
        />
      </div>
    </div>
  );
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
    <Card className="w-full flex flex-col items-start justify-start space-y-5 lg:p-10 rounded-md lg:rounded-lg pb-5 lg:border mt-5 lg:mt-10">
      <div className="flex flex-col lg:flex-row gap-x-5 items-center lg:items-start justify-center w-full gap-y-5">
        <ImageComponent
          popup={false}
          src={gig.imageUrl}
          alt={getFullName(gig.firstName, gig.lastName)}
          className="rounded-lg p-1 w-40 h-40 lg:w-40 lg:h-40 shrink-0"
        />
        {/* <div className="flex flex-row items-center lg:justify-start justify-center w-full gap-x-3 flex-wrap">
          {gig.languages.map((language, index) => (
            <Badge key={index} variant="infoOutline">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </Badge>
          ))}
        </div> */}
        <div className="flex flex-col lg:items-start items-center justify-center w-full space-y-1">
          <p className="text-xl font-medium">
            {getFullName(gig.firstName, gig.lastName)}
          </p>
          <p className="text-base text-center">{gig.designation}</p>
          <div className="grid grid-cols-3 w-full gap-x-10 justify-items-center items-start max-h-[4rem] pt-5">
            <IconWrapper
              icon={
                <AiFillStar className="text-3xl text-yellow-500 lg:text-2xl" />
              }
              title={gig.rating ? Number(gig.rating).toFixed(1) : "N/A"}
            />
            <IconWrapper
              icon={
                gig.isVerified ? (
                  <BsShieldCheck className="text-3xl text-success lg:text-2xl" />
                ) : (
                  <BsShieldSlash className="text-3xl text-error lg:text-2xl" />
                )
              }
              title={gig.isVerified ? "Verified" : "Pending"}
            />
            <IconWrapper
              icon={
                gig.gender === Gender.MALE ? (
                  <IoIosMale className="text-blue-500 text-3xl lg:text-2xl" />
                ) : gig.gender === Gender.FEMALE ? (
                  <IoIosFemale className="text-pink-500 text-3xl lg:text-2xl" />
                ) : (
                  <IoIosTransgender className="text-3xl text-purple-500 lg:text-2xl" />
                )
              }
              title={gig.gender.charAt(0).toUpperCase() + gig.gender.slice(1)}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-5 justify-items-center items-start pt-5">
        <ContactMeSheet mobileNumber={gig.mobileNumber} />
        <Button variant="default" className="!w-full !bg-info" asChild>
          <Link
            href={{
              pathname: CustomerRoutes.PARTNER.replace(
                "[partnerHandle]",
                gig.handle!!
              ),
              query: {
                whatsapp: searchParams.whatsapp,
                backLink: `${CustomerRoutes.SERVICE.replace(
                  "[serviceId]",
                  serviceId
                ).replace("[partnerHandle]", gig.handle!!)}${
                  backLink ? `?backLink=${backLink}` : ""
                }`,
              },
            }}
          >
            <p className="text-base font-medium">View Profile</p>
          </Link>
        </Button>
      </div>
    </Card>
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
    <div className="grid grid-cols-1 w-full gap-5 justify-items-center max-w-lg">
      {service.serviceType === ServiceType.ONLINE ? (
        <Setting
          title="Online"
          subtitle="This service is provided online"
          icon={<AiFillVideoCamera className="text-3xl text-info" />}
        />
      ) : service.serviceType === ServiceType.OFFLINE && !service.address ? (
        <Setting
          title="Offline"
          subtitle={location}
          icon={<MdLocationCity className="text-3xl text-info" />}
        />
      ) : service.serviceType === ServiceType.OFFLINE && service.address ? (
        <Setting
          title={service.address.name}
          subtitle={service.address.state + ", " + service.address.city}
          icon={<MdLocationCity className="text-3xl text-info" />}
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
        icon={<GiBowTieRibbon className="text-3xl text-info" />}
      />
      {service.preferredGender === PreferredGender.UNISEX ? null : (
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
      )}
      {service.rating ? (
        <Setting
          title="Rating"
          subtitle={service.rating > 0 ? service.rating.toFixed(1) : "New"}
          icon={<AiFillStar className="text-3xl text-yellow-500" />}
        />
      ) : null}
    </div>
  );
}
