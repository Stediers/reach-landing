import { Price } from "@data/types";
import { MdDiscount } from "react-icons/md";
import { priceString } from "@helper_functions/priceString";
import { Badge } from "@components/ui/badge";

export default function PriceComponent({
  price,
  slashedTextStyle = "text-textsubtle text-base font-medium self-center text-center",
  priceTextStyle = "text-success text-lg font-medium self-center text-center",
  textStyle = "text-lg font-medium self-center text-center",
  discountTextStyle = "text-info text-base font-medium self-center text-center",
  discountNameTextStyle = "text-xl font-medium self-center text-center",
}: {
  price: Price;
  slashedTextStyle?: string;
  priceTextStyle?: string;
  textStyle?: string;
  discountTextStyle?: string;
  discountNameTextStyle?: string;
}) {
  const discount =
    price.discount && price.discount.value > 0
      ? (price.discount.value * price.price) / 100
      : 0;
  const disCountedPrice =
    price.discount && price.discount.value > 0 ? price.price - discount : null;
  console.log(price.price);
  return price.price === 0 ? (
    <div
      className={`flex flex-col items-center justify-center space-y-2 font-medium border-black border p-3 w-full`}
    >
      <p className={`${textStyle} text-center w-full justify-center flex`}>
        Free
      </p>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Badge className="flex space-x-2 items-center" variant="infoOutline">
          <span className={"text-base text-info font-medium"}>
            Per {price.pricingType.toLowerCase()}
          </span>
        </Badge>
      </div>
      <p className="flex-grow text-sm text-textsubtle">
        Inclusive of all taxes and charges
      </p>
    </div>
  ) : disCountedPrice != null && price.discount && price.discount.value > 0 ? (
    <div
      className={`flex flex-col items-center justify-center space-y-2 font-medium border-black border p-3 w-full`}
    >
      <p className={`${discountNameTextStyle} self-center text-center`}>
        {price.discount.name}
      </p>
      <p className="self-center text-center">
        <span className={`line-through ${slashedTextStyle}`}>
          {priceString({ price: price.price, priceType: "paisa" })}
        </span>
        &nbsp;
        <span className={priceTextStyle}>
          {priceString({
            price: disCountedPrice,
            priceType: "paisa",
          })}
        </span>
      </p>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Badge className="flex space-x-2 items-center" variant="infoOutline">
          <span className={discountTextStyle}>{price.discount.value}% off</span>
          <MdDiscount className="text-info !text-xs" />
        </Badge>
        <Badge className="flex space-x-2 items-center" variant="infoOutline">
          <span className={"text-base text-info font-medium"}>
            Per {price.pricingType.toLowerCase()}
          </span>
        </Badge>
      </div>
      <p className="flex-grow text-sm text-textsubtle">
        Advance payment:{" "}
        {priceString({ price: price.bookingBill.total, priceType: "paisa" })}
      </p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center space-y-2 font-medium border-black border p-3 w-full">
      <p className={`${textStyle} text-center w-full justify-center flex`}>
        {priceString({
          price: price.price,
          priceType: "paisa",
        })}
      </p>
      <div className="flex flex-row items-center justify-center space-x-2">
        <Badge className="flex space-x-2 items-center" variant="infoOutline">
          <span className={"text-base text-info font-medium"}>
            Per {price.pricingType.toLowerCase()}
          </span>
        </Badge>
      </div>
      <p className="flex-grow text-sm text-textsubtle">
        Advance payment:{" "}
        {priceString({ price: price.bookingBill.total, priceType: "paisa" })}
      </p>
    </div>
  );
}
