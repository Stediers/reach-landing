import {
  FetchPartnerByPartnerIdResponse,
  fetchPartnerByPartnerId,
} from "@api_functions/gig/fetch-gig-profile-by-gigId";
import Logo from "@components/Logo";
import {
  Gender,
  PreferredGender,
  ServiceCategory,
  ServiceType,
} from "@data/enums";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillStar,
} from "react-icons/ai";
import {
  BsArrowLeftShort,
  BsFillSpeakerFill,
  BsGenderFemale,
  BsGenderMale,
  BsGenderTrans,
} from "react-icons/bs";
import { MdEventAvailable, MdEventBusy } from "react-icons/md";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LineHeader from "@components/LineHeader";
import { CallSetting } from "@components/Contact";
import TrackProfileComponent from "@components/track/track-profile";
import ImageComponent from "@components/ImageComponent";
import { Metadata } from "next";
import {
  ServiceCardDesktop,
  ServiceCardMobile,
  ServiceTriggerDesktopProfile,
  ServiceTriggerMobileProfile,
} from "@components/ServiceCard";
import UnderlinedHeader from "@components/UnderlinedHeader";
import { Badge } from "@components/ui/badge";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { Button } from "@components/ui/button";
import Setting from "@components/Setting";
import Card from "@components/Card";
import { ServicePopupDesktop } from "@components/DrawerPopup";
import { RequestCallback } from "@components/RequestCallback";
import { FetchServiceResponse } from "@data/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { priceString, showPrice } from "@helper_functions/priceString";
import { Star } from "lucide-react";
import { BiCarousel } from "react-icons/bi";
import PartnerPrompt from "@components/PartnerPrompt";

export const generateMetadata = async ({
  params,
}: {
  params: { gigId: string };
}): Promise<Metadata> => {
  const gigId = params.gigId;
  const response = await fetchPartnerByPartnerId(gigId);
  if (!response) {
    return {
      title: "Profile",
      description: "Profile",
    };
  } else {
    return {
      title: `${response.partner.firstName} ${response.partner.lastName}`,
      description: `Profile of ${response.partner.firstName} ${response.partner.lastName} on ReachGig. I am ${response.partner.designation} currently working in ${response.partner.city}, ${response.partner.state}. `,
    };
  }
};

export default async function Page({
  params,
  searchParams,
}: {
  params: { gigId: string };
  searchParams: {
    whatsapp?: boolean;
    instagram?: boolean;
    backLink?: string;
    preview?: boolean;
  };
}) {
  const gigId = params.gigId;

  const response = await fetchPartnerByPartnerId(gigId);
  if (!response) {
    redirect("/404");
  }

  console.log("response", response);
  const backLink = searchParams.backLink
    ? decodeURIComponent(searchParams.backLink)
    : null;

  const event = searchParams.whatsapp
    ? "whatsapp"
    : searchParams.instagram
    ? "instagram"
    : searchParams.preview
    ? "preview"
    : null;

  const uniqueCategories = response.services
    .map((service) => service.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  return response ? <Mobile /> : null;

  function Mobile() {
    return response ? (
      // <div
      //   className="flex flex-col items-center justify-start w-full min-h-full py-5 px-5"
      //   hidden
      // >
      //   {backLink && (
      //     <Link
      //       className="w-full flex flex-row items-center justify-start space-x-5"
      //       href={backLink}
      //     >
      //       <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
      //     </Link>
      //   )}
      //   <div className="flex flex-col items-center justify-start space-y-1 w-full">
      //     <Logo text="ReachGig" textStyle="text-2xl font-medium" />
      //   </div>
      //   {event !== "preview" && (
      //     <TrackProfileComponent gigId={response.partner.gigId} event={event} />
      //   )}
      //   <div className="flex flex-col items-center justify-start w-full min-h-full space-y-5 lg:space-y-10 bg-white lg:pt-10 pt-5">
      //     <Profile gig={response.partner} uniqueCategories={uniqueCategories} />
      //     <LineHeader title="My Services" className="lg:hidden" />
      //     <div className="flex flex-col items-center lg:items-start justify-start space-y-5 lg:space-y-10 w-full">
      //       {response.services.length > 0 ? (
      //         <div className="flex flex-col items-center justify-start space-y-5 w-full">
      //           <div
      //             className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-y-10 lg:gap-x-10 w-full"
      //             hidden
      //           >
      //             {response.services.map((service) => (
      //               <ServiceCardMobile key={service.id} service={service} />
      //             ))}
      //           </div>
      //           <div
      //             className="hidden lg:grid grid-cols-3 2xl:grid-cols-4 gap-5 justify-items-center w-full"
      //             hidden
      //           >
      //             {response.services.map((service) => (
      //               <ServiceCardDesktop key={service.id} service={service} />
      //             ))}
      //           </div>
      //         </div>
      //       ) : (
      //         <div className="flex flex-col items-center justify-center space-y-5 w-full">
      //           <Image
      //             alt="no services"
      //             src="/images/no-services.svg"
      //             width={200}
      //             height={200}
      //             priority
      //           />
      //           <h1 className="text-xl font-medium text-center">
      //             No services available
      //           </h1>
      //         </div>
      //       )}
      //     </div>
      //     <div
      //       className="sticky bottom-10 right-5 hidden lg:block w-full py-5 self-end max-w-[20rem]"
      //       hidden
      //     >
      //       <CallSetting mobileNumber={response.partner.mobileNumber} />
      //     </div>
      //   </div>
      // </div>
      <div className="flex flex-col items-center justify-start w-full min-h-full pt-5 relative">
        <HeroPage response={response} />
        <AboutMe response={response} />
        <MyServices response={response} />
        <ContactMe response={response} />
        <PartnerPrompt />
      </div>
    ) : null;
  }
}

function HeroPage({ response }: { response: FetchPartnerByPartnerIdResponse }) {
  return (
    <div className="flex flex-col items-center justify-between w-full py-5 px-5 space-y-10">
      <Logo text="ReachGig" textStyle="text-2xl font-medium" />
      <div className="grid lg:grid-cols-2 gap-x-36 gap-y-10 w-full max-w-5xl min-h-[50vh] self-center">
        <div className="flex flex-col items-center justify-center lg:space-y-10 space-y-5 w-full">
          <p className="lg:text-2xl text-lg font-normal">
            Hi there! My name is
          </p>
          <h1 className="flex lg:text-5xl text-4xl flex-col items-center justify-center lg:space-y-5 space-y-3 w-full">
            <span className="font-medium text-center">
              {response.partner.firstName.charAt(0).toUpperCase() +
                response.partner.firstName.slice(1)}
            </span>
            <span className="font-medium text-center">
              {response.partner.lastName.charAt(0).toUpperCase() +
                response.partner.lastName.slice(1)}
            </span>
          </h1>
          <p className="lg:text-2xl text-base font-medium capitalize text-primary">
            {response.partner.designation.toUpperCase()}
          </p>
          {/* <div className="grid grid-cols-3 gap-2 justify-items-center w-full  max-w-lg">
            <IconWrapper
              icon={
                <AiFillStar className="text-yellow-500 w-8 h-8 lg:w-[2rem] lg:h-[2rem]" />
              }
              title={
                response.partner.rating
                  ? response.partner.rating.toFixed(1)
                  : "N/A"
              }
            />
            <IconWrapper
              icon={
                response.partner.gender === Gender.MALE ? (
                  <BsGenderMale className="text-blue-500 text-3xl lg:w-[2rem] lg:h-[2rem]" />
                ) : response.partner.gender === Gender.FEMALE ? (
                  <BsGenderFemale className="text-pink-500 text-3xl lg:w-[2rem] lg:h-[2rem]" />
                ) : (
                  <BsGenderTrans className="text-purple-500 text-3xl lg:w-[2rem] lg:h-[2rem]" />
                )
              }
              title={
                response.partner.gender.charAt(0).toUpperCase() +
                response.partner.gender.slice(1)
              }
            />
            <IconWrapper
              icon={
                response.partner.available ? (
                  <MdEventAvailable className="text-success text-3xl lg:w-[2rem] lg:h-[2rem]" />
                ) : (
                  <MdEventBusy className="text-danger text-3xl lg:w-[2rem] lg:h-[2rem]" />
                )
              }
              title={response.partner.available ? "Available" : "Not Available"}
            />
          </div> */}
          {response.partner.exposeMobileNumber ? (
            <CallSetting mobileNumber={response.partner.mobileNumber} />
          ) : null}
        </div>
        <AspectRatio ratio={1}>
          <Image
            src={response.partner.imageUrl}
            alt="Image"
            className="rounded-md object-cover border"
            fill
            quality={100}
          />
        </AspectRatio>
      </div>
      <div />
    </div>
  );
}

function AboutMe({ response }: { response: FetchPartnerByPartnerIdResponse }) {
  return (
    <div className="flex flex-col items-start justify-start space-y-5 w-full lg:px-20 lg:py-32 px-5 py-0">
      <div className="grid lg:grid-cols-2 gap-x-36 lg:gap-y-10 space-y-5 w-full self-center">
        <div className="flex flex-col items-start justify-start space-y-5 w-full">
          <h2 className="lg:text-5xl text-3xl font-medium !leading-normal">
            A Quick <br />
            <span className="text-primary">Introduction</span>
          </h2>
          <p className="lg:text-2xl text-lg font-normal !leading-normal">
            Client satisfaction is my top priority. Whether you need a
            professional service or a casual chat, I am here to help you.
          </p>
        </div>
        <div
          className="lg:flex flex-col items-start justify-start space-y-10 w-full hidden"
          hidden
        >
          <LargeSetting
            title="Languages"
            description={response.partner.languages
              .map(
                (language) =>
                  language.charAt(0).toUpperCase() + language.slice(1)
              )
              .join(", ")}
            icon={<BsFillSpeakerFill className="w-14 h-14" />}
          />
          <LargeSetting
            title="My Gender"
            description={
              response.partner.gender.charAt(0).toUpperCase() +
              response.partner.gender.slice(1)
            }
            icon={
              response.partner.gender === Gender.MALE ? (
                <BsGenderMale className="text-blue-500 lg:w-14 lg:h-14 w-8 h-8" />
              ) : response.partner.gender === Gender.FEMALE ? (
                <BsGenderFemale className="text-pink-500 lg:w-14 lg:h-14 w-8 h-8" />
              ) : (
                <BsGenderTrans className="text-purple-500 text-3xl lg:w-14 lg:h-14 w-8 h-8" />
              )
            }
          />
          {response.partner.rating && response.partner.rating > 0 ? (
            <LargeSetting
              title="My Rating"
              description={
                response.partner.rating
                  ? response.partner.rating.toFixed(1)
                  : "N/A"
              }
              icon={
                <AiFillStar className="text-yellow-500 lg:w-14 lg:h-14 w-8 h-8" />
              }
            />
          ) : null}
        </div>
        <div className="flex flex-col items-start justify-start space-y-5 w-full lg:hidden">
          <SmallSetting
            title="Languages"
            description={response.partner.languages
              .map(
                (language) =>
                  language.charAt(0).toUpperCase() + language.slice(1)
              )
              .join(", ")}
          />
          <SmallSetting
            title="My Gender"
            description={
              response.partner.gender.charAt(0).toUpperCase() +
              response.partner.gender.slice(1)
            }
          />
          {response.partner.rating && response.partner.rating > 0 ? (
            <SmallSetting
              title="My Rating"
              description={
                response.partner.rating
                  ? response.partner.rating.toFixed(1)
                  : "N/A"
              }
            />
          ) : null}
          {response.partner.isVerified ? (
            // <div className="flex flex-col items-start justify-start space-y-3 w-full">
            //   <div className="flex flex-row items-center justify-start space-x-2">
            //     <p className="lg:text-4xl text-2xl font-medium">
            //       {response.partner.isVerified ? "Verified" : "Not Verified"}
            //     </p>
            //     {response.partner.isVerified ? (
            //       <AiFillCheckCircle className="text-success w-5 h-5 lg:w-[2rem] lg:h-[2rem]" />
            //     ) : (
            //       <AiFillCloseCircle className="text-white w-5 h-5 lg:w-[2rem] lg:h-[2rem]" />
            //     )}
            //   </div>
            //   <p className="lg:text-2xl text-xl">
            //     {response.partner.isVerified
            //       ? "I am a verified partner"
            //       : "I am not a verified partner"}
            //   </p>
            // </div>
            <SmallSetting
              title="Verified"
              description={
                response.partner.isVerified
                  ? "I am a verified partner"
                  : "I am not a verified partner"
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MyServices({
  response,
}: {
  response: FetchPartnerByPartnerIdResponse;
}) {
  return (
    <div className="flex flex-col items-start justify-start w-full lg:min-h-screen lg:p-20 lg:py-16 lg:space-y-20 space-y-10 py-12 px-5 bg-white text-text">
      <h2 className="lg:text-5xl text-3xl font-medium !leading-normal">
        My
        <br />
        <span className="text-primary">Services</span>
      </h2>
      <div className="lg:grid grid-cols-3 gap-14 w-full hidden pt-10" hidden>
        {response.services
          .sort((a, b) => b.price.bookingBill.total - a.price.bookingBill.total)
          .map((service) => (
            <ServiceCardDesktop
              key={service.id}
              service={service}
              serviceTrigger={
                <ServiceTriggerDesktopProfile service={service} />
              }
              location={response.partner.city + ", " + response.partner.state}
            />
          ))}
      </div>
      <div className="lg:hidden grid grid-cols-1 gap-10 w-full">
        {response.services.map((service) => (
          <ServiceCardMobile
            key={service.id}
            service={service}
            serviceTrigger={<ServiceTriggerMobileProfile service={service} />}
          />
        ))}
      </div>
    </div>
  );
}

function ContactMe({
  response,
}: {
  response: FetchPartnerByPartnerIdResponse;
}) {
  return (
    <div
      className="flex flex-col items-start justify-start lg:space-y-20 space-y-10 w-full min-h-screen bg-black lg:p-20 lg:py-24 text-white px-5 py-12"
      id="contact-me"
    >
      <Link className="flex flex-col w-full space-y-1" href={"/"}>
        <p className="lg:text-3xl text-xl font-medium">ReachGig</p>
        <p className="lg:text-lg text-base tracking-wide">Be your own Boss.</p>
      </Link>
      <div className="grid lg:grid-cols-2 gap-x-36 lg:gap-y-10 gap-y-5 w-full self-center">
        <div className="flex flex-col items-start justify-start space-y-5 w-full">
          <h2 className="lg:text-5xl text-3xl font-medium max-w-xl !leading-normal">
            Looking Forward to Work with You!
          </h2>
          <div className="flex flex-col items-start justify-start space-y-5 w-full">
            <p className="lg:text-xl text-lg font-normal">
              {response.partner.firstName + " " + response.partner.lastName}
            </p>
            <p className="lg:text-xl text-lg font-normal">
              {response.partner.designation}
            </p>
            <p className="lg:text-xl text-lg font-normal">
              {response.partner.city}, {response.partner.state}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between h-full lg:space-y-20 space-y-10 w-full pt-5">
          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">My Rating</p>
            <div className="flex flex-row items-center justify-start space-x-2">
              <Star className="text-yellow-500 w-5 h-5 lg:w-[2rem] lg:h-[2rem]" />
              <p className="lg:text-xl text-lg">
                {response.partner.rating
                  ? response.partner.rating.toFixed(1)
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">Availability</p>
            <p className="lg:text-xl text-lg">
              {response.partner.available
                ? "Expect a quick response"
                : "I might take some time to respond"}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">Contact Me</p>
            <p className="lg:text-xl text-lg">
              {response.partner.exposeMobileNumber
                ? response.partner.mobileNumber
                : "Hidden"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start space-y-5 w-full pt-10 lg:pt-0">
          <p className="lg:text-3xl text-2xl font-medium">
            Explore our Marketplace!
          </p>
          <div className="flex flex-row items-center justify-start space-x-2">
            <Button variant="default" asChild>
              <Link href="/explore">Click here</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconWrapper({
  icon,
  onClick,
  title,
  titleClassName = "text-textsubtle font-medium",
  whileTap,
}: {
  icon: React.ReactNode;
  title: string;
  onClick?: (e: any) => Promise<void>;
  titleClassName?: string;
  whileTap?: { scale: number };
}) {
  return (
    <div
      className="flex flex-col items-center space-y-2 w-full max-h-[4rem] lg:max-h-[7rem]"
      onClick={onClick}
    >
      {icon}
      <p className={`${titleClassName} text-center text-sm lg:text-base`}>
        {title}
      </p>
    </div>
  );
}

function LargeSetting({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="w-full bg-white lg:!p-7 lg:rounded-2xl rounded-xl text-text">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-start space-y-3 w-full">
          <p className="lg:text-2xl text-2xl font-medium">{title}</p>
          <p className="lg:text-xl text-lg">{description}</p>
        </div>
        {icon}
      </div>
    </Card>
  );
}

function SmallSetting({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start justify-start space-y-3 w-full">
      <p className="lg:text-3xl text-xl font-medium">{title}</p>
      <div className="flex flex-row items-center justify-start space-x-2">
        <p className="text-lg lg:text-xl">{description}</p>
      </div>
    </div>
  );
}
