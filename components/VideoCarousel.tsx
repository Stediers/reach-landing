"use client";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function VideoCarousel({
  videos,
  videosHeight = "h-[35rem]",
  showImagePreview = false,
  previewImageHeight = "w-10 lg:w-12 h-10 lg:h-12",
  basis,
}: {
  videos: string[];
  videosHeight?: string;
  showImagePreview?: boolean;
  previewImageHeight?: string;
  basis?: string;
}) {
  const [showButtons, setShowButtons] = useState(false);
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
  }, [api]);

  console.log("images", videos);

  return (
    <div className="w-full overflow-hidden flex flex-col items-center justify-center space-y-2">
      <Carousel
        onMouseLeave={() => {
          setShowButtons(false);
        }}
        onMouseEnter={() => {
          setShowButtons(true);
        }}
        className="w-full overflow-hidden rounded-lg"
        setApi={setApi}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem id="0" className={`max-w-10 ${basis}`} key={index}>
              <div className={`w-full ${videosHeight} relative rounded-lg`}>
                <iframe
                  src={video}
                  className="w-full h-[60vh] lg:rounded-xl rounded-lg"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showButtons && videos.length > 1 ? (
          <>
            <CarouselNext className="right-5 disabled:pointer-events-none hover:cursor-pointer" />
            <CarouselPrevious className="left-5 disabled:pointer-events-none hover:cursor-pointer" />
          </>
        ) : null}
      </Carousel>
      {/* {showImagePreview ? (
        <div className="flex flex-row items-center justify-start w-full overflow-x-scroll hide-scrollbar space-x-2">
          {videos.map((image, index) => (
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
      ) : null} */}
    </div>
  );
}
