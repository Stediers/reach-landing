import { AppointmentBill, BookingBill } from "../data/types";

export function calculateBookingCharge({
  priceInPaisa,
  discount,
}: {
  priceInPaisa: number;
  discount: number;
}): BookingBill {
  const discountPrice = (priceInPaisa * discount) / 100;
  const endPrice = priceInPaisa - discountPrice;
  const advanceFeeInPaisa = (endPrice * 20) / 100;
  const platFormFeePaisa = calculatePlatformFee(advanceFeeInPaisa);
  const taxInPaisa = calculateTax(platFormFeePaisa);
  const maxAdvanceFee = 500000;
  if (platFormFeePaisa + taxInPaisa > maxAdvanceFee) {
    const tax = calculateTax(maxAdvanceFee);
    return {
      advanceFee: advanceFeeInPaisa,
      platformFee: maxAdvanceFee - tax,
      total: Math.round(maxAdvanceFee),
      tax: tax,
    };
  }
  return {
    advanceFee: advanceFeeInPaisa,
    platformFee: platFormFeePaisa,
    total: Math.round(advanceFeeInPaisa + platFormFeePaisa + taxInPaisa),
    tax: taxInPaisa,
  };
}

export function calculateAppointmentCharge({
  bookingFeeInPaisa,
  price,
  discount,
}: {
  bookingFeeInPaisa: number;
  price: number;
  discount: number;
}): AppointmentBill {
  const net = price - (price * discount) / 100;
  const netInPaisa = toPaisa(net);
  const chargeInPaisa = netInPaisa;
  const platformFeePaisa = calculatePlatformFee(chargeInPaisa);

  return {
    charge: chargeInPaisa,
    platformFee: platformFeePaisa,
    total: Math.round(chargeInPaisa + platformFeePaisa - bookingFeeInPaisa),
    bookingFee: bookingFeeInPaisa,
  };
}

export function toPaisa(amount: number): number {
  return Math.round(amount * 100);
}

export function calculatePlatformFee(advanceFeeInPaisa: number): number {
  const platformFee = (advanceFeeInPaisa * 20) / 100;
  // platform fee should be between Rs.100 and Rs.500
  if (platformFee < 10000) {
    return 10000;
  } else if (platformFee > 80000) {
    return 80000;
  }
  return platformFee;
}

export function calculateTax(amountInPaisa: number): number {
  const tax = (amountInPaisa * 18) / 100;
  return tax;
}

export function calculateTotalPrice({
  price,
  discount,
}: {
  price: number;
  discount: number;
}): number {
  const net = price - (price * discount) / 100;
  return Math.round(net);
}
