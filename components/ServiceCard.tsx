"use client";
import { ServiceType, PreferredGender, CustomerRoutes } from "@data/enums";
import { FetchPartnerResponse, FetchServiceResponse } from "@data/types";
import { priceString, showPrice } from "@helper_functions/priceString";
import { Star } from "lucide-react";
import { BiCarousel } from "react-icons/bi";
import { ServicePopupMobile, ServicePopupDesktop } from "./DrawerPopup";
import ImageComponent from "./ImageComponent";
import { RequestCallback, RequestCallbackMobile } from "./RequestCallback";
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
import { Badge } from "./ui/badge";
import { DrawerClose } from "./ui/drawer";
import Image from "next/image";

export function ServiceCardMobile({
  service,
  partner,
  serviceTrigger = <ServiceTrigger service={service} partner={partner} />,
}: {
  service: FetchServiceResponse;
  serviceTrigger?: JSX.Element;
  partner: FetchPartnerResponse;
}): JSX.Element {
  return (
    <ServicePopupMobile
      price={service.price}
      service={service}
      footerJSX={
        <div className="flex flex-col items-start justify-center space-y-3 w-full">
          <div className="grid grid-cols-2 gap-x-2 w-full">
            <Button variant="success">
              <Link
                href={CustomerRoutes.SERVICE.replace(
                  "[serviceId]",
                  service.id.toString()
                ).replace("[partnerHandle]", partner.handle!!)}
                passHref
                rel="noopener"
                target="_blank"
              >
                View Service
              </Link>
            </Button>
            <RequestCallback serviceId={service.id} />
          </div>
          <DrawerClose asChild>
            <Button variant="close">Close</Button>
          </DrawerClose>
        </div>
      }
      triggerJSX={serviceTrigger}
    />
  );
}

export function ServiceCardDesktop({
  service,
  location,
  serviceTrigger = <ServiceTrigger service={service} />,
  handle,
}: {
  service: FetchServiceResponse;
  serviceTrigger?: JSX.Element;
  location: string;
  handle: string;
}): JSX.Element {
  return (
    <ServicePopupDesktop
      location={location}
      footerJSX={
        <div className="grid grid-cols-2 gap-x-2 w-full">
          <Button variant="success">
            <Link
              href={CustomerRoutes.SERVICE.replace(
                "[serviceId]",
                service.id.toString()
              ).replace("[partnerHandle]", handle)}
              passHref
              rel="noopener"
              target="_blank"
            >
              View In Detail
            </Link>
          </Button>
          <RequestCallback serviceId={service.id} type="mobile" />
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
            className="group-hover:flex hidden flex-row items-start justify-between w-full  z-20"
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
          <div className="flex flex-row items-center justify-start space-x-1">
            {service.price.discount ? (
              <p className="line-through text-base text-gray-500 font-medium">
                {priceString({
                  price: service.price.price,
                  priceType: "paisa",
                })}
              </p>
            ) : null}
            <p className="text-lg font-medium">{showPrice(service.price)}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-x-2 gap-y-3 flex-wrap w-full">
            <Badge variant="info">
              {service.serviceType === ServiceType.ONLINE
                ? "Online"
                : service.address
                ? "In Studio"
                : "Your Place"}
            </Badge>
            <Badge variant="infoOutline">{service.experience}</Badge>
            {service.preferredGender !== PreferredGender.UNISEX && (
              <Badge>
                {service.preferredGender === PreferredGender.FEMALE
                  ? "Women"
                  : service.preferredGender === PreferredGender.MALE
                  ? "Men"
                  : "All"}{" "}
                Only
              </Badge>
            )}
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
  eager,
  link,
}: {
  service: FetchServiceResponse;
  partner?: FetchPartnerResponse;
  eager?: boolean;
  link?: string;
}): JSX.Element {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer transition-all duration-150">
      <Carousel
        className="w-full group relative"
        onClick={(e) => e.stopPropagation()}
      >
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
                className="rounded-2xl w-full lg:h-[350px] h-[350px]"
                popup={false}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {service.imageUrls.length > 1 ? (
          <div
            className="group-hover:flex hidden flex-row items-start justify-between w-full  z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <CarouselNext className="right-5 hover:cursor-pointer" />
            <CarouselPrevious className="left-5 hover:cursor-pointer" />
          </div>
        ) : null}
      </Carousel>
      <div className="flex flex-row items-start justify-between w-full">
        <div className="flex flex-row items-start justify-between w-full overflow-ellipsis ">
          <div className="flex flex-col items-start justify-center space-y-1">
            {link ? (
              <Link href={link} passHref>
                <p className="text-lg hover:cursor-pointer font-medium first-letter:capitalize hover:underline hover:underline-offset-4">
                  {service.title.length > 30
                    ? service.title.slice(0, 30) + "..."
                    : service.title}
                </p>
              </Link>
            ) : (
              <p className="text-lg font-medium first-letter:capitalize">
                {service.title.length > 20
                  ? service.title.slice(0, 20) + "..."
                  : service.title}
              </p>
            )}
            <div className="flex flex-row items-center justify-start space-x-1">
              {service.price.discount ? (
                <p className="line-through text-sm text-gray-500 font-medium">
                  {priceString({
                    price: service.price.price,
                    priceType: "paisa",
                  })}
                </p>
              ) : null}
              <p className="text-lg font-medium">{showPrice(service.price)}</p>
            </div>
            <div className="flex flex-row items-center justify-start gap-x-2 gap-y-3 flex-wrap w-full">
              <Badge variant="info">
                {service.serviceType === ServiceType.ONLINE
                  ? "Online"
                  : service.address
                  ? "In Studio"
                  : "Your Place"}
              </Badge>
              {/* <p className="text-sm text-info">
                {service.experience} of experience
              </p> */}
              <Badge variant="infoOutline">
                {service.experience} of experience
              </Badge>
              {service.preferredGender !== PreferredGender.UNISEX && (
                <Badge>
                  {service.preferredGender === PreferredGender.FEMALE
                    ? "Women"
                    : service.preferredGender === PreferredGender.MALE
                    ? "Men"
                    : "All"}{" "}
                  Only
                </Badge>
              )}
            </div>
          </div>
          {service.rating ? (
            <div className="flex flex-row items-center justify-center space-x-1">
              <Star size={20} />
              <p className="text-base font-medium">{service.rating}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer px-5 lg:px-0">
      <Skeleton className="rounded-lg w-full h-[350px]" />
      <div className="flex flex-col items-start justify-center space-y-1">
        <Skeleton className="text-lg font-medium first-letter:capitalize" />
        <Skeleton className="text-sm text-info" />
        <Skeleton className="line-through text-sm text-gray-500 font-medium" />
      </div>
    </div>
  );
}
