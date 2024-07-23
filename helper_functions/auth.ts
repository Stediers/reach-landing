import { sendOTP } from "@api_functions/auth/send-otp";
import { verifyOTP } from "@api_functions/auth/verify-otp";
import { setCookie } from "@api_functions/internal/cookie";
import { Country } from "@data/countries";
import { isValidPhoneNumber } from "libphonenumber-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

export async function sendOTPWrapper({
  mobileNumber,
  country,
}: {
  mobileNumber: string;
  country: Country;
}) {
  if (mobileNumber.length != country.maxLength) {
    return false;
  } else if (!isValidPhoneNumber(country.code + mobileNumber)) {
    return false;
  } else {
    const response = await sendOTP(country.code + mobileNumber);
    if (response) {
      return true;
    } else {
      return false;
    }
  }
}

export async function verifyOTPOnChange({
  mobileNumber,
  country,
  value,
  setLoading,
  setOTP,
  router,
  redirectUrl,
  onVerifyOTP,
}: {
  mobileNumber: string;
  country: Country;
  value: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOTP: Dispatch<SetStateAction<string[]>>;
  router: AppRouterInstance;
  redirectUrl: string | null;
  onVerifyOTP: (verified: boolean) => void;
}) {
  if (isNaN(Number(value))) return;
  setOTP(value.split(""));
  if (value.length == 4) {
    setLoading(true);
    const response = await verifyOTP(country.code + mobileNumber, value);
    if (response) {
      localStorage.setItem("mobileNumber", mobileNumber);
      setCookie("user-token", response.token, 30);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        const clodeMobilePopup = document.getElementById("mobile-login-popup");
        if (clodeMobilePopup) {
          clodeMobilePopup.click();
        }
        onVerifyOTP(true);
      }
      return;
    } else {
      onVerifyOTP(false);
      setLoading(false);
      setOTP([]);
    }
  }
}
