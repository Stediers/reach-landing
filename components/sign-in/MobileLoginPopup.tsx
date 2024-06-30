"use client";
import { sendOTP } from "@api_functions/auth/send-otp";
import { verifyOTP } from "@api_functions/auth/verify-otp";
import { getCookie, setCookie } from "@api_functions/internal/cookie";
import { CustomDialog } from "@components/DialogPopup";
import TextInput from "@components/input/TextInput";
import LoginPerks from "@components/LoginPerks";
import Logo from "@components/Logo";
import { Button } from "@components/ui/button";
import { Country, countries } from "@data/countries";
import { State } from "@data/enums";
import { sendOTPWrapper, verifyOTPOnChange } from "@helper_functions/auth";
import { isValidPhoneNumber } from "libphonenumber-js";
import { GetServerSidePropsContext } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import OtpInput from "react-otp-input";

export default function MobileLoginPopup({
  onVerifyOTP = () => {
    window.location.reload();
  },
  triggerJSX = <Button variant="default">Sign in</Button>,
}: {
  onVerifyOTP?: () => void;
  triggerJSX?: JSX.Element;
}) {
  const query = useSearchParams();
  const redirectUrl = query.get("redirectUrl");
  const [showOTP, setShowOTP] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [country, setCountry] = useState<Country>(countries["India"]);

  return (
    <CustomDialog
      title="Sign in"
      triggerJSX={triggerJSX}
      description="Enter your mobile number to sign in"
      maxWidth="max-w-md"
      footerJSX={
        showOTP ? null : (
          <Button
            variant="default"
            disabled={!verifyMobileNumber(mobileNumber, country.maxLength)}
            className="!w-full"
            onclick={async () => {
              const response = await sendOTPWrapper({
                mobileNumber,
                country,
              });
              if (response) {
                setShowOTP(true);
              }
            }}
          >
            Send OTP
          </Button>
        )
      }
    >
      <div className="flex flex-col items-center rounded-xl space-y-8 w-full">
        {showOTP ? (
          <VerifyOTP
            mobileNumber={mobileNumber}
            setShowOTP={setShowOTP}
            country={country}
            redirectUrl={redirectUrl}
            onVerifyOTP={onVerifyOTP}
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
        <LoginPerks />
      </div>
    </CustomDialog>
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
        // onKeyDown={async (e) => {
        //   if (e.key === "Enter") {
        //     const response = await sendOTPWrapper({
        //       mobileNumber,
        //       country,
        //     });
        //     if (response) {
        //       setShowOTP(true);
        //     }
        //   }
        // }}
      />
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
  onVerifyOTP,
}: {
  mobileNumber: string;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  country: Country;
  redirectUrl: string | null;
  onVerifyOTP: () => void;
}) {
  const [OTP, setOTP] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return !loading ? (
    <div className="flex flex-col items-start w-full space-y-4">
      <div className="flex flex-col items-start w-full space-y-2">
        <p className="text-base font-normal">
          Enter the OTP sent to <br />
        </p>
        <p className="font-medium text-md">
          {country.code} {mobileNumber}
        </p>
      </div>
      <OtpInput
        containerStyle={{
          width: "100%",
          display: "flex",
          gap: "0.5rem",
          justifyContent: "start",
        }}
        value={OTP.join("")}
        onChange={async (value) =>
          verifyOTPOnChange({
            mobileNumber,
            country,
            value,
            setLoading,
            setOTP,
            router,
            redirectUrl,
            onVerifyOTP,
          })
        }
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
