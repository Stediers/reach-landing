import Button from "@components/Button";
import Card from "@components/Card";
import Loading from "@components/Loading";
import { Currency } from "@data/enums";
import { Discount } from "@data/types";
import MobileWrapper from "@wrapper/responsive/MobileWrapper";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Mobile({ discounts }: { discounts: Discount[] }) {
  return (
    <MobileWrapper
      header="My Offers"
      backLink="/console/services"
      className="flex flex-col items-center justify-start space-y-5"
    >
      <div className="flex flex-col items-start justify-start space-y-4 w-full">
        <Button
          text="Add New Offer"
          className="bg-primary text-white font-medium"
          link="/console/services/offers/add-offer"
        />
      </div>
      {discounts.length > 0 ? (
        discounts.map((discount, index) => (
          <DiscountCard
            title={discount.name}
            discount={discount.value}
            id={discount.discountId!!}
            attachedPriceIds={discount.attachedPriceIds ?? []}
            key={index}
          />
        ))
      ) : (
        <p className="text-textsubtle text-base font-medium">
          No offers available
        </p>
      )}
    </MobileWrapper>
  );
}

function DiscountCard({
  title,
  className,
  whileTap,
  discount,
  id,
  attachedPriceIds,
}: {
  title: string;
  className?: string;
  whileTap?: { scale: number };
  discount: number;
  id: string;
  attachedPriceIds: string[];
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
      <div className="flex flex-col items-start justify-start space-y-2 w-full">
        <div className="flex items-start justify-between w-full space-x-3 pr-2">
          <p
            className={`text-lg font-medium flex items-center !first-letter:capitalize`}
          >
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </p>
          <p className="text-md font-medium">{discount}% off</p>
        </div>
        <p className="text-sm text-textsubtle">
          {`Attached to ${attachedPriceIds.length} prices`}
        </p>
      </div>
      <div className="flex flex-col items-start justify-start space-y-3 w-full">
        <div className="h-[1px] w-full bg-gray" />
        <Link
          className="text-base font-medium space-x-2 pl-[2px] pr-[10px] flex items-center justify-between w-full"
          href={`/console/services/offers/manage/${id}`}
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
