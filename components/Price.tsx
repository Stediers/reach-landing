import { Currency, PricingType } from "@data/enums";
import { Discount, Price } from "@data/types";
import { MdDiscount } from "react-icons/md";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "./Button";

export default function PriceComponent({
  price,
  slashedTextStyle = "text-textsubtle text-md font-medium self-center text-center",
  priceTextStyle = "text-success text-md font-medium self-center text-center",
  textStyle = "text-md font-medium self-center text-center",
  discountTextStyle = "text-info text-md font-medium self-center text-center",
  discountNameTextStyle = "text-md font-medium self-center text-center",
}: {
  price: Price;
  slashedTextStyle?: string;
  priceTextStyle?: string;
  textStyle?: string;
  discountTextStyle?: string;
  discountNameTextStyle?: string;
}) {
  const disCountedPrice =
    price.discount && price.discount.value > 0
      ? price.price - (price.price * price.discount.value) / 100
      : null;
  return disCountedPrice != null &&
    price.discount &&
    price.discount.value > 0 ? (
    <motion.div
      className={`flex flex-col items-center justify-center space-y-2 font-medium border-black border p-3 w-full`}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <p className={`${discountNameTextStyle} self-center text-center`}>
        {price.discount.name}
      </p>
      <p className="self-center text-center">
        <span className={`line-through ${slashedTextStyle}`}>
          {Number(price.price).toLocaleString("en-IN", {
            style: "currency",
            currency: Currency.INR,
          })}
        </span>
        &nbsp;
        <span className={priceTextStyle}>
          {disCountedPrice.toLocaleString("en-IN", {
            style: "currency",
            currency: Currency.INR,
          })}
        </span>
        <span className={`${textStyle} first-letter:capitalize`}>
          {" / " +
            (price.pricingType === PricingType.HOUR ? "Hour" : "Session")}
        </span>
      </p>
      <div className={`${discountTextStyle} flex space-x-2 items-center`}>
        (<p> {price.discount.value}% off</p>
        <MdDiscount className="text-info" />)
      </div>
    </motion.div>
  ) : (
    <p
      className={`${textStyle} text-center border-black border p-3 w-full justify-center flex`}
    >
      {Number(price.price).toLocaleString("en-IN", {
        style: "currency",
        currency: Currency.INR,
      })}
      <span className={textStyle}>
        {" / " + price.pricingType.toLowerCase()}
      </span>
    </p>
  );
}
