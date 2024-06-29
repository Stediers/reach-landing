"use client";
import { sendOTP } from "@api_functions/auth/send-otp";
import { verifyOTP } from "@api_functions/auth/verify-otp";
import { setCookie } from "@api_functions/internal/cookie";
import ImageComponent from "@components/ImageComponent";
import TextInput from "@components/input/TextInput";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";
import {
  InputOTPGroup,
  InputOTPSlot,
  InputOTP,
} from "@components/ui/input-otp";
import { Country, countries } from "@data/countries";
import { State } from "@data/enums";
import { verifyMobileNumber } from "@helper_functions/verify";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { isValidPhoneNumber } from "libphonenumber-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Dispatch, SetStateAction, useState } from "react";
import SignInImage from "../../../public/images/sign-in.svg";
import SignInImage2 from "../../../public/images/sign-in-desktop.svg";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState<Country>(countries["India"]);

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirectUrl") || "/";

  return (
    <div className="flex flex-col items-center justify-start space-y-10 px-5 flex-1 py-5">
      <div className="flex flex-col items-center space-y-3 h-[25%]">
        <Logo />
        <p className="text-lg text-center font-medium">
          Find the Most Trustable Freelaners
        </p>
      </div>
      <div className="w-full flex flex-col items-start justify-start max-w-lg space-y-5 lg:border lg:p-5 lg:rounded-lg bg-white">
        {showOTP ? (
          <p className="lg:text-2xl text-xl font-medium">Verify OTP</p>
        ) : (
          <p className="lg:text-2xl text-xl font-medium">Sign in</p>
        )}
        {showOTP ? (
          <VerifyOTP
            mobileNumber={mobileNumber}
            setShowOTP={setShowOTP}
            country={country}
            redirectUrl={redirectUrl}
            router={router}
          />
        ) : (
          <MobileNumberInputMobile
            setShowOTP={setShowOTP}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            country={country}
            setCountry={setCountry}
          />
        )}
        <p className="text-sm text-textsubtle pt-5">
          By continuing, you agree to our{" "}
          <span className="text-primary underline">Terms of Service</span> and{" "}
          <span className="text-primary underline">Privacy Policy</span>
        </p>
      </div>
      <div
        className="absolute bottom-0 -z-10 w-full lg:flex justify-between items-end hidden"
        hidden
      >
        <ImageComponent
          src={SignInImage}
          alt="Sign in"
          className="w-full h-[30vh] lg:h-[40vh] lg:max-w-lg"
          border={false}
          objectFit="cover"
        />
        <ImageComponent
          src={SignInImage2}
          alt="Sign in"
          className="w-full h-[30vh] lg:h-[30vh] lg:max-w-lg"
          border={false}
          objectFit="cover"
        />
      </div>
      <div
        className="absolute bottom-0 -z-10 w-full flex justify-between items-center lg:hidden"
        hidden
      >
        <ImageComponent
          src={SignInImage}
          alt="Sign in"
          className="w-full h-[30vh] lg:h-[40vh] lg:max-w-lg"
          border={false}
          objectFit="cover"
        />
      </div>
    </div>
  );
}

function MobileNumberInputMobile({
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
        placeholder=" Your mobile number"
        title="Mobile Number"
        onChange={(value) => setMobileNumber(value)}
        value={mobileNumber}
        autoFocus={true}
        errorText={
          mobileNumber.length == 0
            ? ""
            : isValidPhoneNumber(country.code + mobileNumber)
            ? ""
            : "Invalid mobile number"
        }
        preIcon={<p className="text-base">{country.code}</p>}
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
        disabled={!verifyMobileNumber(mobileNumber, country.maxLength)}
        onclick={async () => {
          const response = await sendOTP(country.code + mobileNumber);
          if (response) {
            setShowOTP(true);
          }
        }}
        buttonstate={sendOTPButtonState}
      >
        Send OTP
      </Button>
    </div>
  );
}

function VerifyOTP({
  mobileNumber,
  setShowOTP,
  country,
  redirectUrl,
  router,
}: {
  mobileNumber: string;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  country: Country;
  redirectUrl: string;
  router: AppRouterInstance;
}) {
  const [loading, setLoading] = useState(false);
  return !loading ? (
    <div className="flex flex-col items-start w-full space-y-4">
      <p className="text-center text-base font-normal">
        Enter the OTP sent to&nbsp;
        <span className="font-medium text-base">
          {country.code} {mobileNumber}
        </span>{" "}
      </p>
      {/* <OtpInput
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
              setCookie("gig-token", response.token, 30);
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
      /> */}
      <InputOTP
        maxLength={4}
        pattern={REGEXP_ONLY_DIGITS}
        render={({ slots }) => (
          <InputOTPGroup className="gap-5">
            {slots.map((slot, index) => (
              <React.Fragment key={index}>
                <InputOTPSlot className="rounded-md border" {...slot} />
              </React.Fragment>
            ))}{" "}
          </InputOTPGroup>
        )}
        onChange={async (otp) => {
          if (otp.length == 4) {
            setLoading(true);
            const response = await verifyOTP(country.code + mobileNumber, otp);

            if (response) {
              localStorage.setItem("mobileNumber", mobileNumber);
              setCookie("gig-token", response.token, 30);
              router.push(redirectUrl);
              return;
            } else {
              setLoading(false);
            }
          }
        }}
      />
      <p
        className="text-center text-sm text-primary underline underline-offset-4 cursor-pointer"
        onClick={() => setShowOTP(false)}
      >
        Change mobile number
      </p>
    </div>
  ) : (
    <p className="text-center pt-3 text-[#a0a0a0]">Verifying OTP...</p>
  );
}
