"use client";

import { FetchPartnersResponse } from "@api_functions/explore/fetch-partners";
import BoxRating from "@components/BoxRating";
import ImageComponent from "@components/ImageComponent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { CustomerRoutes } from "@data/enums";
import { priceString } from "@helper_functions/priceString";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const rating = partner.rating
    ? partner.rating //generate random rating between 4 and 5 for now with decimals
    : Math.round((Math.random() * (5 - 4) + 4) * 10) / 10;

  return (
    <div className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden">
      <div className="flex flex-col items-start justify-center space-y-3 w-full hover:cursor-pointer transition-all duration-150">
        <Carousel className="w-full group relative">
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
              className="flex flex-row items-start justify-between w-full  z-20"
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
          <div className="flex flex-row items-start justify-between w-full overflow-ellipsis space-x-5">
            <div className="flex flex-col items-start justify-center space-y-1">
              <p className="text-lg line-clamp-1 underline underline-offset-4 hover:cursor-pointer font-medium first-letter:capitalize hover:underline hover:underline-offset-4">
                {partner.name}
              </p>
              <div className="flex flex-row items-center justify-start space-x-1">
                <div className="flex flex-col items-start justify-center space-y-1">
                  <p className="text-sm text-textsubtle line-clamp-1">
                    Per Session
                  </p>
                  <p className="text-base  line-clamp-2">
                    <span className="font-medium first-letter:capitalize">
                      {priceString({
                        price: partner.averagePrice.low,
                        priceType: "paisa",
                      })}
                    </span>
                    {" - "}
                    <span className="font-medium first-letter:capitalize">
                      {priceString({
                        price: partner.averagePrice.high,
                        priceType: "paisa",
                      })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* <div
              className="shadow-lg top-2 shrink-0 z-10 right-2 w-12 h-12 flex justify-center items-center rounded-full z-20 text-white cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageComponent
                src={partner.imageUrl}
                objectPosition="center"
                alt={partner.name}
                className="rounded-full w-full h-full"
                popup={true}
              />
            </div> */}
            <div className="flex flex-row items-center justify-center space-x-1">
              <BoxRating rating={rating} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
