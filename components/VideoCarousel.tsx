"use client";
import { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";

export default function VideoCarousel({
  videos,
  imageHeight = "h-48 lg:h-[40rem] w-full",
  autoPlay = false,
  itemBasis = "w-1/3",
  className = "",
}: {
  videos: string[];
  imageHeight?: string;
  autoPlay?: boolean;
  itemBasis?: string;
  className?: string;
}) {
  const [showButtons, setShowButtons] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      console.log("api not found");
      return;
    } else {
      console.log("api found");
      // api.on("slidesInView", (e) => {
      //   setCurrent(e.selectedScrollSnap);
      // });
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
          setShowButtons(false);
        }}
        onMouseEnter={() => {
          setShowButtons(true);
        }}
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {videos.length > 0
            ? videos.map((image, index) => (
                <CarouselItem
                  key={index}
                  className={itemBasis}
                  id={index.toString()}
                >
                  <div className={`w-full ${imageHeight} relative rounded-lg`}>
                    <iframe
                      src={image}
                      className={`w-full ${imageHeight} rounded-lg`}
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CarouselItem>
              ))
            : null}
        </CarouselContent>
        {showButtons && videos.length > 1 ? (
          <>
            <CarouselNext className="right-5 disabled:pointer-events-none hover:cursor-pointer" />
            <CarouselPrevious className="left-5 disabled:pointer-events-none hover:cursor-pointer" />
          </>
        ) : null}
      </Carousel>
    </div>
  );
}
