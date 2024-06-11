import { PricingType } from "@data/enums";
import { Price } from "@data/types";
import { MdDiscount } from "react-icons/md";
import { priceString } from "@helper_functions/priceString";
import { Badge } from "@components/ui/badge";

export default function DesktopPriceComponent({
  price,
  slashedTextStyle = "text-textsubtle text-lg font-medium",
  priceTextStyle = "text-success text-lg font-medium",
  textStyle = "text-lg font-medium text-center",
  discountTextStyle = "text-info text-base font-medium",
  discountNameTextStyle = "text-xl font-medium",
  pricingTypeTextStyle = "text-xl font-medium",
}: {
  price: Price;
  slashedTextStyle?: string;
  priceTextStyle?: string;
  textStyle?: string;
  discountTextStyle?: string;
  discountNameTextStyle?: string;
  pricingTypeTextStyle?: string;
}) {
  const disCountedPrice =
    price.discount && price.discount.value > 0
      ? price.price - (price.price * price.discount.value) / 100
      : null;
  return disCountedPrice != null &&
    price.discount &&
    price.discount.value > 0 ? (
    <div className="flex flex-row items-center justify-center font-medium border rounded-lg p-3 space-x-2 w-full">
      <div className={`flex flex-col items-start justify- space-y-2 w-full`}>
        <p className={`${discountNameTextStyle}`}>{price.discount.name}</p>
        <p className="flex-grow text-sm text-textsubtle">
          Inclusive of all taxes and charges
        </p>
        <p>
          <span className={`line-through ${slashedTextStyle}`}>
            {priceString({ price: price.price, priceType: "paisa" })}
          </span>
          &nbsp;
          <span className={priceTextStyle}>
            {priceString({
              price: disCountedPrice + price.bookingBill.total,
              priceType: "paisa",
            })}
          </span>
        </p>
        <Badge className="flex space-x-2 items-center" variant="infoOutline">
          <span className={discountTextStyle}>{price.discount.value}% off</span>
          <MdDiscount className="text-info" />
        </Badge>
      </div>
      <div className="flex justify-center w-[30%]">
        <p className={`${pricingTypeTextStyle} first-letter:capitalize`}>
          {price.pricingType === PricingType.HOUR ? "Per Hour" : "Per Session"}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-2 font-medium border-black border p-3 w-full">
      <p className={`${textStyle} text-center w-full justify-center flex`}>
        {priceString({ price: price.price, priceType: "paisa" })}
        <span className={textStyle}>
          {" / " + price.pricingType.toLowerCase()}
        </span>
      </p>
      <p className="flex-grow text-sm">Inclusive of all taxes</p>
    </div>
  );
}
