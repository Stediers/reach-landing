export default function priceString(price: number | null) {
  return price === null || price === void 0
    ? void 0
    : price.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
}
