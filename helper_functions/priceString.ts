import { Price } from "@data/types";

export function priceString({
  price,
  priceType = "paisa",
}: {
  price: number | null;
  priceType?: "paisa" | "rupee";
}) {
  const priceconv =
    price === null || price === void 0 || isNaN(price)
      ? void 0
      : Number(
          priceType === "paisa" ? Number(price / 100) : price
        ).toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });
  return priceconv === void 0 ? "" : priceconv;
}

export function showPrice(price: Price) {
  const basePrice = Number(price.price);
  if (price.discount === null || price.discount === void 0)
    return priceString({ price: basePrice, priceType: "paisa" });
  const discount = Number(price.discount.value);
  const discountedPrice = basePrice - (basePrice * discount) / 100;
  return priceString({ price: discountedPrice, priceType: "paisa" });
}
