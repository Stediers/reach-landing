"use client";
import { useEffect, useState } from "react";
import ImageComponent from "../ImageComponent";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

export default function ImageCarousel({
  images,
  imageHeight = "h-48 lg:h-60",
  showImagePreview = false,
  previewImageHeight = "w-10 lg:w-12 h-10 lg:h-12",
  autoPlay = false,
  itemBasis = "w-1/3",
  border = true,
  bgCol = "bg-white",
  className = "",
  showArrows = true,
}: {
  images: string[];
  imageHeight?: string;
  showImagePreview?: boolean;
  previewImageHeight?: string;
  autoPlay?: boolean;
  itemBasis?: string;
  border?: boolean;
  bgCol?: string;
  className?: string;
  showArrows?: boolean;
}) {
  const [showButtons, setShowButtons] = useState(showArrows);
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      console.log("api not found");
      return;
    } else {
      console.log("api found");
      api.on("slidesInView", (e) => {
        setCurrent(e.selectedScrollSnap);
      });
    }
    if (autoPlay) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [api]);

  return (
    <div
      className={`w-full flex flex-col items-center justify-center space-y-2 ${className}`}
    >
      <Carousel
        onMouseLeave={() => {
          showArrows && setShowButtons(false);
        }}
        onMouseEnter={() => {
          showArrows && setShowButtons(true);
        }}
        className="w-full  bg-border"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="">
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem
                key={index}
                className={itemBasis}
                id={index.toString()}
              >
                <div
                  className={`w-full ${imageHeight} relative bg-transparent`}
                >
                  <ImageComponent
                    src={image}
                    alt="Image"
                    className={`rounded-md overflow-hidden object-contain  ${imageHeight} ${
                      border ? "border" : ""
                    }`}
                    objectFit="contain"
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <div className={`w-full ${imageHeight} relative rounded-lg`}>
              <Image
                src="/images/negotiate.svg"
                alt="Image"
                className="rounded-md object-contain border"
                fill
              />
            </div>
          )}
        </CarouselContent>
        {showButtons && images.length > 1 ? (
          <>
            <CarouselNext
              className={`right-5 disabled:pointer-events-none hover:cursor-pointer"
              }`}
            />
            <CarouselPrevious
              className={`left-5 disabled:pointer-events-none hover:cursor-pointer
              `}
            />
          </>
        ) : null}
      </Carousel>
      {showImagePreview && (
        <div className="flex flex-row items-center justify-start w-full overflow-x-scroll hide-scrollbar space-x-2">
          {images.map((image, index) => (
            <ImageComponent
              src={image}
              alt={`Service Image ${index}`}
              className={`${previewImageHeight} shrink-0 object-cover rounded-md hover:cursor-pointer ${
                current === index ? "border-2 border-primary" : ""
              }`}
              key={index}
              popup={false}
              onClick={() => {
                if (api) {
                  api.scrollTo(index);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function RawCarousel({
  children,
  showArrows = true,
  autoPlay = false,
}: {
  children: React.ReactNode;
  showArrows?: boolean;
  autoPlay?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      console.log("api not found");
      return;
    } else {
      console.log("api found");
    }
    if (autoPlay) {
      const interval = setInterval(() => {
        api.scrollNext();
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [api]);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="">{children}</CarouselContent>
        {showArrows ? (
          <>
            <CarouselNext
              className={`right-5 disabled:pointer-events-none hover:cursor-pointer"
              }`}
            />
            <CarouselPrevious
              className={`left-5 disabled:pointer-events-none hover:cursor-pointer
              `}
            />
          </>
        ) : null}
      </Carousel>
    </div>
  );
}
