import Card from "@components/Card";
import { ServiceCardSkeleton } from "@components/ServiceCard";
import Link from "next/link";
import { CustomerRoutes } from "@data/enums";
import Image from "next/image";
import {
  fetchPartners,
  FetchPartnersResponse,
} from "@api_functions/explore/fetch-partners";
import UnderlinedHeader from "@components/UnderlinedHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import { BiCarousel } from "react-icons/bi";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import ImageComponent from "@components/ImageComponent";
import Profile from "./Profile";
import { redirect } from "next/navigation";

//revalidate every 10 minutes
export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { designation: string; city: string };
}) {
  const res = await fetchPartners({
    city: params.city,
    profession: params.designation,
  });
  if (!res) {
    redirect("/not-found");
  }
  return (
    <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar py-5 space-y-5">
      <div className="flex flex-row items-center  justify-between w-full">
        {/* <h1 className="text-xl lg:text-2xl font-medium max-w-md">
          Explore <span className="text-primary">{res.designation}</span> in{" "}
          {params.city}
        </h1> */}
        <UnderlinedHeader title={`${res.designation}`} />
      </div>
      {res.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-3">
          <h3 className="text-lg font-medium">No Profiles Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {res.data.map((profile) => (
            <Profile key={profile.handle} partner={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
