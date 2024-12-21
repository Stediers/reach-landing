"use client";

import { FetchPartnersResponse } from "@api_functions/explore/fetch-partners";
import ImageComponent from "@components/ImageComponent";
import { Avatar } from "@components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { CustomerRoutes } from "@data/enums";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiCarousel } from "react-icons/bi";

export default function Profile({
  partner,
}: {
  partner: FetchPartnersResponse["data"][0];
}) {
  const link = CustomerRoutes.PARTNER.replace(
    "[partnerHandle]",
    partner.handle || ""
  );
  console.log(link);
  const path = usePathname();
  console.log(path);
  return (
    <div className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden">
      <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer transition-all duration-150">
        <Carousel className="w-full group relative">
          {partner.serviceImages.length > 1 ? (
            <div className="absolute bottom-2 w-full rounded-lg z-10 lg:hidden flex justify-center">
              <div className="bg-black p-1 rounded-lg">
                <BiCarousel className="text-white text-2xl" />
              </div>
            </div>
          ) : null}
          <CarouselContent>
            {partner.serviceImages.map((image, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={1}>
                  <ImageComponent
                    src={image}
                    objectPosition="center"
                    alt={partner.name}
                    className="rounded-lg w-full h-full"
                    popup={false}
                    priority={index === 0}
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          {partner.serviceImages.length > 1 ? (
            <div
              className="group-hover:flex hidden flex-row items-start justify-between w-full  z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <CarouselNext className="right-5 hover:cursor-pointer" />
              <CarouselPrevious className="left-5 hover:cursor-pointer" />
            </div>
          ) : null}
        </Carousel>

        <Link
          className="flex flex-row items-start justify-between w-full"
          href={
            CustomerRoutes.PARTNER.replace(
              "[partnerHandle]",
              partner.handle || ""
            ) +
            "?backLink=" +
            path
          }
        >
          <div className="flex flex-row items-start justify-between w-full overflow-ellipsis ">
            <div className="flex flex-col items-start justify-center space-y-1">
              <p className="text-lg line-clamp-1 hover:cursor-pointer font-medium first-letter:capitalize hover:underline hover:underline-offset-4">
                {partner.name}
              </p>
              <div className="flex flex-row items-center justify-start space-x-1">
                <p className="text-sm text-textsubtle line-clamp-1">
                  {partner.designation}
                </p>
              </div>
            </div>
            <div
              className="shadow-lg top-2 right-2 w-10 h-10 flex justify-center items-center rounded-full z-20 bg-primary text-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageComponent
                src={partner.imageUrl}
                objectPosition="center"
                alt={partner.name}
                className="rounded-full w-full h-full"
                popup={true}
              />
            </div>
            {/* {service.rating ? (
              <div className="flex flex-row items-center justify-center space-x-1">
                <Star size={20} />
                <p className="text-base font-medium">{service.rating}</p>
              </div>
            ) : null} */}
          </div>
        </Link>
      </div>
    </div>
  );
}
