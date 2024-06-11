"use client";
import { sendOTP } from "@api_functions/auth/send-otp";
import { verifyOTP } from "@api_functions/auth/verify-otp";
import { getCookie, setCookie } from "@api_functions/internal/cookie";
import TextInput from "@components/input/TextInput";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";
import { Country, countries } from "@data/countries";
import { State } from "@data/enums";
import { isValidPhoneNumber } from "libphonenumber-js";
import { GetServerSidePropsContext } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export default function Main() {
  const query = useSearchParams();
  const redirectUrl = query.get("redirectUrl") || "/";
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState<Country>(countries["India"]);

  return (
    <div className="flex flex-col items-center justify-center space-y-5 flex-1 min-h-screen w-screen">
      <div className="flex bg-white border-2 shadow-lg flex-col items-center w-[90%] py-5 rounded-xl max-w-[400px] px-5 space-y-5 h-fit">
        <Logo
          textStyle="font-medium text-3xl lg:text-4xl lg:font-medium lg:mt-2"
          wings="w-[10rem] lg:w-[12rem]"
        />
        {showOTP ? (
          <VerifyOTP
            mobileNumber={mobileNumber}
            setShowOTP={setShowOTP}
            country={country}
            redirectUrl={redirectUrl}
          />
        ) : (
          <MobileNumberInput
            setShowOTP={setShowOTP}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            country={country}
            setCountry={setCountry}
          />
        )}
      </div>
    </div>
  );
}

function MobileNumberInput({
  setShowOTP,
  mobileNumber,
  setMobileNumber,
  country,
  setCountry,
}: {
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  mobileNumber: string;
  setMobileNumber: Dispatch<SetStateAction<string>>;
  country: Country;
  setCountry: Dispatch<SetStateAction<Country>>;
}) {
  const [sendOTPButtonState, setSendOTPButtonState] = useState(State.SUCCESS);
  return (
    <div className="space-y-4 w-full flex flex-col items-center">
      <TextInput
        type="tel"
        placeholder="Ex: 9876543210"
        title="Mobile Number"
        onChange={(value) => setMobileNumber(value)}
        value={mobileNumber}
        autoFocus={true}
        errorText={
          isValidPhoneNumber(country.code + mobileNumber)
            ? ""
            : "Invalid mobile number"
        }
        maxLength={country.maxLength}
        onKeyDown={async (e) => {
          if (mobileNumber.length == country.maxLength) {
            if (e.key == "Enter") {
              setSendOTPButtonState(State.LOADING);
              const response = await sendOTP(country.code + mobileNumber);
              if (response) {
                setShowOTP(true);
              }
              setSendOTPButtonState(State.SUCCESS);
            }
          } else return;
        }}
      />
      <Button
        variant="default"
        disabled={!verifyMobileNumber(mobileNumber, country.maxLength)}
        className="!w-full"
        onClick={async () => {
          setSendOTPButtonState(State.LOADING);
          const response = await sendOTP(country.code + mobileNumber);
          if (response) {
            setShowOTP(true);
          }
          setSendOTPButtonState(State.SUCCESS);
        }}
      >
        {sendOTPButtonState == State.LOADING ? "Sending OTP..." : "Send OTP"}
      </Button>
    </div>
  );
}

function verifyMobileNumber(mobileNumber: string, maxLength: number) {
  if (mobileNumber.length != maxLength) {
    return false;
  } else if (!mobileNumber.match(/^[0-9]+$/)) {
    return false;
  } else {
    return true;
  }
}

function VerifyOTP({
  mobileNumber,
  setShowOTP,
  country,
  redirectUrl,
}: {
  mobileNumber: string;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  country: Country;
  redirectUrl: string;
}) {
  const [OTP, setOTP] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return !loading ? (
    <div className="flex flex-col items-center w-full space-y-4">
      <p className="text-center text-base font-normal">
        Enter the OTP sent to <br />
        <span className="font-medium text-md">
          {country.code} {mobileNumber}
        </span>
      </p>
      <OtpInput
        containerStyle={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
        }}
        value={OTP.join("")}
        onChange={async (value) => {
          if (isNaN(Number(value))) return;
          setOTP(value.split(""));
          if (value.length == 4) {
            setLoading(true);
            const response = await verifyOTP(
              country.code + mobileNumber,
              value
            );
            if (response) {
              localStorage.setItem("mobileNumber", mobileNumber);
              setCookie("user-token", response.token, 30);
              router.push(redirectUrl);
              return;
            } else {
              setLoading(false);
              setOTP([]);
            }
          }
        }}
        numInputs={4}
        inputType="number"
        renderSeparator={<span>-</span>}
        renderInput={(props) => (
          <input
            {...props}
            className="!text-base border-[1px] border-text rounded-md !w-10 h-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
          />
        )}
      />
      <p
        className="text-center text-sm text-primary underline underline-offset-4"
        onClick={() => setShowOTP(false)}
      >
        Change mobile number
      </p>
    </div>
  ) : (
    <p className="text-center pt-3 text-[#a0a0a0]">Verifying OTP...</p>
  );
}
