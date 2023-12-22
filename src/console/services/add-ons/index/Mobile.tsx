import Button from "@components/Button";
import Card from "@components/Card";
import ImageComponent from "@components/ImageComponent";
import Loading from "@components/Loading";
import { Currency } from "@data/enums";
import { AddOn } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Mobile({ addOns }: { addOns: AddOn[] }) {
  return (
    <MobileWrapper
      className="flex flex-col space-y-4 w-full"
      header="Add-Ons"
      backLink="/console/services"
    >
      <div className="flex flex-col items-start justify-start space-y-4 w-full">
        <Button
          text="Add New Add-On"
          className="bg-primary text-white font-medium"
          link="/console/services/add-ons/create-add-on"
        />
      </div>
      {addOns.map((addOn, index) => (
        <AddOnCard
          title={addOn.title}
          subtitle={addOn.description}
          price={addOn.price}
          id={addOn.id!!}
          attachedServiceIds={addOn.attachedServiceIds}
          key={index}
        />
      ))}
    </MobileWrapper>
  );
}

function AddOnCard({
  title,
  subtitle,
  className,
  whileTap,
  price,
  id,
  attachedServiceIds,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  whileTap?: { scale: number };
  price: number;
  id: string;
  attachedServiceIds: string[];
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Card
      className={`${className} ${whileTap ? "cursor-pointer" : ""} !space-y-5`}
      whileTap={whileTap}
      onClick={() => {
        setLoading(true);
      }}
    >
      {/* <ImageComponent
        className="w-full h-48"
        src="https://picsum.photos/200"
        alt=""
      /> */}
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <div className="flex flex-col items-start justify-start space-y-2 w-full">
          <div className="flex items-start justify-between w-full space-x-3 pr-2">
            <p
              className={`text-lg font-medium flex items-center !first-letter:capitalize`}
            >
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </p>
            <p className="text-md font-medium">
              {Number(price).toLocaleString("en-IN", {
                style: "currency",
                currency: Currency.INR,
              })}
            </p>
          </div>
          <p className="text-sm text-textsubtle">
            {`Attached to ${attachedServiceIds.length} services`}
          </p>
        </div>
        {subtitle && <p className={`text-left break-words`}>{subtitle}</p>}
      </div>
      <div className="flex flex-col items-start justify-start space-y-3 w-full">
        <div className="h-[1px] w-full bg-gray" />
        <Link
          className="text-base font-medium space-x-2 pl-[2px] pr-[10px] flex items-center justify-between w-full"
          href={`/console/services/add-ons/edit/${id}`}
        >
          <span className="">Manage</span>
          {loading ? (
            <Loading className="w-6 h-6" />
          ) : (
            <FaArrowRightLong className="inline-block w-4 h-4" />
          )}
        </Link>
      </div>
    </Card>
  );
}
