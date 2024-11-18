"use client";
import {
  CarouselApi,
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { useState, useEffect } from "react";

export default function RawCarousel({
  children,
  showArrows = true,
  autoPlay = false,
  onClick = () => {
    //add hash to url
    window.location.href = "/#inspiration";
  },
}: {
  children: React.ReactNode;
  showArrows?: boolean;
  autoPlay?: boolean;
  onClick?: () => void;
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
    <div
      className="w-full flex flex-col items-center justify-center space-y-2"
      onClick={onClick}
    >
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
