"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useRef } from "react";
import { FetchPartnerResponse } from "@data/types";

const PartnersRow = ({
  partners,
  speed = 100,
}: {
  partners: FetchPartnerResponse[];
  speed?: number;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [clones, setClones] = useState(2);

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new ResizeObserver(() => {
      if (!rowRef.current) return;
      const containerWidth = rowRef.current.parentElement?.offsetWidth || 0;
      const rowWidth = rowRef.current.scrollWidth;
      const needed = Math.ceil(containerWidth / rowWidth) + 1;
      setClones(Math.max(needed, 2));
    });

    observer.observe(rowRef.current.parentElement as Element);
    return () => observer.disconnect();
  }, [partners]);

  return (
    <div className="flex overflow-hidden relative w-full">
      <div
        ref={rowRef}
        className="flex gap-4 animate-scroll whitespace-nowrap"
        style={{
          animation: `scroll ${
            partners.length * (1000 / speed)
          }s linear infinite`,
        }}
      >
        {Array(clones)
          .fill(partners)
          .flat()
          .map((partner, index) => (
            <ProfileCard key={`${partner.handle}-${index}`} data={partner} />
          ))}
      </div>
    </div>
  );
};

const ProfileCard = ({ data }: { data: FetchPartnerResponse }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex-shrink-0 w-48 lg:w-64 hover:cursor-pointer group">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-40 h-40 lg:w-56 lg:h-56 rounded-lg overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src={data.imageUrl}
                alt={`${data.firstName} ${data.lastName}`}
                width={224}
                height={224}
                className="w-full h-full object-cover bg-black"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-1">
              <p className="text-lg lg:text-xl font-medium text-center line-clamp-1">
                {`${data.firstName} ${data.lastName}`}
              </p>
              <p className="text-sm lg:text-base font-normal text-textsubtle text-center">
                {data.designation}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="!p-0 !m-0 !space-y-0 !gap-y-0 h-[90vh]">
        <DialogHeader className="w-full flex flex-col items-start justify-start space-y-2 border-b p-5 h-[10vh]">
          <DialogTitle className="font-medium text-xl first-letter:capitalize">
            {`${data.firstName} ${data.lastName}`}
          </DialogTitle>
          <DialogDescription className="text-sm text-textsubtle">
            {data.designation}
          </DialogDescription>
        </DialogHeader>
        <iframe
          src={`https://reachgig.com/${data.handle}`}
          className="w-full h-[82vh]"
        />
      </DialogContent>
    </Dialog>
  );
};

export default function InfinitePartners({
  response,
}: {
  response: FetchPartnerResponse[] | null;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-8 py-10">
      <div className="flex flex-col items-center justify-center space-y-2 w-full">
        <p className="text-md lg:text-xl text-center font-semibold text-textsubtle tracking-wide">
          USED BY THESE AMAZING PEOPLE
        </p>
        <p className="text-sm lg:text-base text-center font-medium text-textsubtle tracking-wide">
          Click on one of the profiles to see their website
        </p>
      </div>
      <div className="w-full">
        <PartnersRow partners={response || []} speed={100} />
      </div>
    </div>
  );
}
