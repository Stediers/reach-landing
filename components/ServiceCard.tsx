"use client";
import { ServiceType, PreferredGender } from "@data/enums";
import { FetchPartnerResponse, FetchServiceResponse } from "@data/types";
import { priceString, showPrice } from "@helper_functions/priceString";
import { Star } from "lucide-react";
import { BiCarousel } from "react-icons/bi";
import { ServicePopupMobile, ServicePopupDesktop } from "./DrawerPopup";
import ImageComponent from "./ImageComponent";
import { RequestCallback } from "./RequestCallback";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import Link from "next/link";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CustomDialog } from "./DialogPopup";
import { Badge } from "./ui/badge";
import BoxRating from "./BoxRating";

export function ServiceCardMobile({
  service,
  partner,
  serviceTrigger = <ServiceTrigger service={service} partner={partner} />,
}: {
  service: FetchServiceResponse;
  serviceTrigger?: JSX.Element;
  partner?: FetchPartnerResponse;
}): JSX.Element {
  return (
    <ServicePopupMobile
      price={service.price}
      service={service}
      footerJSX={
        <Button variant="success">
          <Link
            href={`/service/${service.id}`}
            passHref
            rel="noopener"
            target="_blank"
          >
            View Service
          </Link>
        </Button>
      }
      triggerJSX={serviceTrigger}
    />
  );
}

export function ServiceCardDesktop({
  service,
  location,
  serviceTrigger = <ServiceTrigger service={service} />,
}: {
  service: FetchServiceResponse;
  serviceTrigger?: JSX.Element;
  location: string;
}): JSX.Element {
  return (
    <ServicePopupDesktop
      location={location}
      footerJSX={
        <div className="grid grid-cols-2 gap-x-2 w-full">
          <Button variant="success">
            <Link
              href={`/service/${service.id}`}
              passHref
              rel="noopener"
              target="_blank"
            >
              View Service
            </Link>
          </Button>
          <RequestCallback serviceId={service.id} />
        </div>
      }
      triggerJSX={serviceTrigger}
      service={service}
      price={service.price}
    />
  );
}

export function ServiceTriggerDesktopProfile({
  service,
}: {
  service: FetchServiceResponse;
}): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer">
      <Carousel className="w-full group relative">
        {service.imageUrls.length > 1 ? (
          <div className="absolute bottom-2 w-full rounded-lg z-10 lg:hidden flex justify-center">
            <div className="bg-black p-1 rounded-lg">
              <BiCarousel className="text-white text-2xl" />
            </div>
          </div>
        ) : null}
        <CarouselContent>
          {service.imageUrls.map((image, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={1}>
                <ImageComponent
                  src={image}
                  objectPosition="top"
                  alt={service.title}
                  className="rounded-lg w-full h-full"
                  popup={false}
                  priority={index === 0}
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        {service.imageUrls.length > 1 ? (
          <div
            className="group-hover:flex hidden flex-row items-start justify-between w-full bg-red-100 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselNext className="right-5 hover:cursor-pointer" />
            <CarouselPrevious className="left-5 hover:cursor-pointer" />
          </div>
        ) : null}
      </Carousel>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-col items-start justify-center space-y-1">
          <p className="lg:text-xl text-lg font-medium first-letter:capitalize">
            {service.title.length > 20
              ? service.title.slice(0, 20) + "..."
              : service.title}
          </p>
          <div className="flex flex-row items-center justify-start space-x-1 text-lg">
            <p className="text-info">
              {service.serviceType === ServiceType.ONLINE
                ? "Online"
                : "Offline"}
            </p>
            <p className=" text-info">|</p>
            <p className=" text-info">{service.experience}</p>
            <p className=" text-info">|</p>
            <p className=" text-info">
              {service.preferredGender === PreferredGender.FEMALE
                ? "Female"
                : service.preferredGender === PreferredGender.MALE
                ? "Male"
                : "All"}{" "}
              Audiences
            </p>
          </div>
          <div className="flex flex-row items-center justify-start space-x-1">
            <p className="line-through text-base text-gray-500 font-medium">
              {priceString({
                price: service.price.price,
                priceType: "paisa",
              })}
            </p>
            <p className="text-lg font-medium">{showPrice(service.price)}</p>
          </div>
        </div>
        {service.rating ? (
          <div className="flex flex-row items-center justify-center space-x-1">
            <Star size={16} />
            <p className="text-sm font-medium">{service.rating}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ServiceTriggerMobileProfile({
  service,
}: {
  service: FetchServiceResponse;
}): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer">
      <Carousel className="w-full group relative">
        {service.imageUrls.length > 1 ? (
          <div className="absolute bottom-2 w-full rounded-lg z-10 lg:hidden flex justify-center">
            <div className="bg-black p-1 rounded-lg">
              <BiCarousel className="text-white text-2xl" />
            </div>
          </div>
        ) : null}
        <CarouselContent>
          {service.imageUrls.map((image, index) => (
            <CarouselItem key={index}>
              <ImageComponent
                src={image}
                objectPosition="top"
                alt={service.title}
                className="rounded-lg w-full lg:h-[300px] h-[250px]"
                popup={false}
                priority={index === 0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {service.imageUrls.length > 1 ? (
          <div
            className="group-hover:flex hidden flex-row items-start justify-between w-full bg-red-100 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselNext className="right-5 hover:cursor-pointer" />
            <CarouselPrevious className="left-5 hover:cursor-pointer" />
          </div>
        ) : null}
      </Carousel>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-col items-start justify-center space-y-1">
          <p className="text-xl font-medium first-letter:capitalize">
            {service.title.length > 20
              ? service.title.slice(0, 20) + "..."
              : service.title}
          </p>
          <div className="text-base flex flex-row items-center justify-start space-x-1">
            <p className="text-info">
              {service.serviceType === ServiceType.ONLINE
                ? "Online"
                : "Offline"}
            </p>
            <p className="text-info">|</p>
            <p className="text-info">{service.experience}</p>
            <p className="text-info">|</p>
            <p className="text-info">
              {service.preferredGender === PreferredGender.FEMALE
                ? "Female"
                : service.preferredGender === PreferredGender.MALE
                ? "Male"
                : "All"}{" "}
              Audiences
            </p>
          </div>
          <div className="flex flex-row items-center justify-start space-x-1">
            <p className="line-through text-sm text-gray-500 font-medium">
              {priceString({
                price: service.price.price,
                priceType: "paisa",
              })}
            </p>
            <p className="font-medium">{showPrice(service.price)}</p>
          </div>
        </div>
        {service.rating ? (
          <div className="flex flex-row items-center justify-center space-x-1">
            <Star size={16} />
            <p className="text-sm font-medium">{service.rating}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ServiceTrigger({
  service,
  partner,
}: {
  service: FetchServiceResponse;
  partner?: FetchPartnerResponse;
}): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer">
      <Carousel className="w-full group relative">
        {service.imageUrls.length > 1 ? (
          <div className="absolute bottom-2 w-full rounded-lg z-10 lg:hidden flex justify-center">
            <div className="bg-black p-1 rounded-lg">
              <BiCarousel className="text-white text-2xl" />
            </div>
          </div>
        ) : null}
        <CarouselContent>
          {service.imageUrls.map((image, index) => (
            <CarouselItem key={index}>
              <ImageComponent
                src={image}
                objectPosition="top"
                alt={service.title}
                className="rounded-lg w-full lg:h-[300px] h-[250px]"
                popup={false}
                priority={index === 0}
                quality={75}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {service.imageUrls.length > 1 ? (
          <div
            className="group-hover:flex hidden flex-row items-start justify-between w-full bg-red-100 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselNext className="right-5 hover:cursor-pointer" />
            <CarouselPrevious className="left-5 hover:cursor-pointer" />
          </div>
        ) : null}
      </Carousel>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row items-start justify-between w-[80%] overflow-ellipsis">
          <div className="flex flex-col items-start justify-center space-y-1">
            <p className="text-lg font-medium first-letter:capitalize">
              {service.title.length > 20
                ? service.title.slice(0, 20) + "..."
                : service.title}
            </p>
            <div className="flex flex-row items-center justify-start space-x-1 flex-wrap w-full">
              <p className="text-sm text-info">
                {service.serviceType === ServiceType.ONLINE
                  ? "Online"
                  : "Offline"}
              </p>
              <p className="text-sm text-info">|</p>
              <p className="text-sm text-info">{service.experience}</p>
              <p className="text-sm text-info">|</p>
              <p className="text-sm text-info">
                {service.preferredGender === PreferredGender.FEMALE
                  ? "Female"
                  : service.preferredGender === PreferredGender.MALE
                  ? "Male"
                  : "All"}{" "}
                Audiences
              </p>
            </div>
            <div className="flex flex-row items-center justify-start space-x-1">
              <p className="line-through text-sm text-gray-500 font-medium">
                {priceString({
                  price: service.price.price,
                  priceType: "paisa",
                })}
              </p>
              <p className="text-base font-medium">
                {showPrice(service.price)}
              </p>
            </div>
          </div>
          {service.rating ? (
            <div className="flex flex-row items-center justify-center space-x-1">
              <Star size={16} />
              <p className="text-sm font-medium">{service.rating}</p>
            </div>
          ) : null}
        </div>
        {partner ? (
          <div className="w-10 h-10 z-40" onClick={(e) => e.stopPropagation()}>
            <CustomDialog
              footerJSX={
                <Button variant="success">
                  <Link
                    href={`/partner/${partner.gigId}`}
                    passHref
                    rel="noopener"
                    target="_blank"
                  >
                    View Partner
                  </Link>
                </Button>
              }
              triggerJSX={
                <Avatar className="border border-gray-500 w-10 h-10 rounded-full">
                  <AvatarImage
                    src={partner?.imageUrl}
                    alt={partner?.firstName}
                    className="object-cover w-full h-full rounded-full"
                  />
                  <AvatarFallback>{partner?.firstName[0]}</AvatarFallback>
                </Avatar>
              }
              title="Partner Details"
              description="View partner details"
            >
              <div className="flex flex-col items-start justify-center space-y-5 w-full hover:cursor-pointer">
                <div className="flex flex-row items-start justify-start space-x-5">
                  <Avatar className="border border-gray-500 w-44 h-44 rounded-lg">
                    <AvatarImage
                      src={partner?.imageUrl}
                      alt={partner?.firstName}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <AvatarFallback>{partner?.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start justify-center space-y-3">
                    <div className="flex flex-col items-start justify-center space-y-1">
                      <p className="text-lg font-medium first-letter:capitalize">
                        {partner?.firstName} {partner?.lastName}
                      </p>
                      <p className="text-base text-primary font-medium">
                        {partner?.designation}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-start space-x-2">
                      <Badge variant="info">
                        <p className="text-sm font-medium">
                          {partner?.gender.charAt(0).toUpperCase() +
                            partner.gender.slice(1)}
                        </p>
                      </Badge>
                      {partner?.rating && partner.rating > 0 ? (
                        <Badge variant="success">
                          <p className="text-sm font-medium">
                            {partner?.rating}
                          </p>
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-5 w-full items-start">
                  <div className="flex flex-col items-start justify-center space-y-1">
                    <p className="text-base font-medium text-textsubtle">
                      Languages Spoken
                    </p>
                    <p className="text-base font-medium">
                      {partner?.languages.join(", ")}
                    </p>
                  </div>
                  <div className="flex flex-col items-start justify-center space-y-1">
                    <p className="text-base font-medium text-textsubtle">
                      Location
                    </p>
                    <p className="text-base font-medium">
                      {partner?.city}, {partner?.state}
                    </p>
                  </div>
                </div>
              </div>
            </CustomDialog>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer px-5 lg:px-0">
      <Skeleton className="rounded-lg w-full h-[300px]" />
      <div className="flex flex-col items-start justify-center space-y-1">
        <Skeleton className="text-lg font-medium first-letter:capitalize" />
        <Skeleton className="text-sm text-info" />
        <Skeleton className="line-through text-sm text-gray-500 font-medium" />
      </div>
    </div>
  );
}
