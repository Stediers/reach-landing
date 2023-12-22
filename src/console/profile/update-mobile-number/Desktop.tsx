import { UpdateSendOtp } from "@api_functions/auth/update-send-otp";
import { UpdateVerifyOtp } from "@api_functions/auth/update-verify-otp";
import Button from "@components/Button";
import TextInput from "@components/input/TextInput";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";
import { CountryCode, State } from "@data/enums";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

export default function Desktop({
  queryMobileNumber,
  mobileNumber,
  otp,
  setOTP,
  showOtp,
  setShowOtp,
  setMobileNumber,
}: {
  queryMobileNumber: string;
  mobileNumber: {
    countryCode: CountryCode;
    mobileNumber: string;
  };
  otp: string;
  setOTP: Dispatch<SetStateAction<string>>;
  showOtp: boolean;
  setShowOtp: Dispatch<SetStateAction<boolean>>;
  setMobileNumber: Dispatch<
    SetStateAction<{
      countryCode: CountryCode;
      mobileNumber: string;
    }>
  >;
}) {
  return (
    <DesktopWrapper className="flex flex-col items-center justify-center space-y-5 w-full px-5">
      <div className="flex flex-col items-center justify-center space-y-5 w-full max-w-lg">
        <SendOTP
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          showOTP={showOtp}
          setShowOTP={setShowOtp}
          queryMobileNumber={queryMobileNumber}
        />
        {showOtp && (
          <VerifyOTP
            otp={otp}
            setOTP={setOTP}
            setShowOTP={setShowOtp}
            mobileNumber={mobileNumber}
          />
        )}
      </div>
    </DesktopWrapper>
  );
}

function SendOTP({
  mobileNumber,
  setMobileNumber,
  showOTP,
  setShowOTP,
  queryMobileNumber,
}: {
  mobileNumber: {
    countryCode: CountryCode;
    mobileNumber: string;
  };
  setMobileNumber: Dispatch<
    SetStateAction<{
      countryCode: CountryCode;
      mobileNumber: string;
    }>
  >;
  showOTP: boolean;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  queryMobileNumber: string;
}) {
  const [sendOtpButtonState, setSendOtpButtonState] = useState(State.SUCCESS);
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      <TextInput
        onChange={(value) => {
          if (value.length > 10) return;
          setMobileNumber({
            ...mobileNumber,
            mobileNumber: value,
          });
        }}
        placeholder={queryMobileNumber.replace("+91", "")}
        value={mobileNumber.mobileNumber}
        title="Mobile Number"
        type="number"
        errorText={
          mobileNumber.mobileNumber.length < 10
            ? "Invalid Number"
            : mobileNumber.mobileNumber == queryMobileNumber.replace("+91", "")
            ? "enter a new number"
            : ""
        }
      />
      <Button
        text={
          sendOtpButtonState != State.SUCCESS ? "Sending OTP..." : "Send OTP"
        }
        onClick={async () => {
          setSendOtpButtonState(State.LOADING);
          const response = await UpdateSendOtp(
            mobileNumber.countryCode + mobileNumber.mobileNumber
          );
          if (response) {
            setShowOTP(true);
          }
          setSendOtpButtonState(State.SUCCESS);
        }}
        className={`w-full p-3 bg-primary text-white rounded-md text-md ${
          mobileNumber.mobileNumber.length < 10 || showOTP ? "opacity-50" : ""
        }`}
        disabled={
          mobileNumber.mobileNumber.length < 10 ||
          showOTP ||
          mobileNumber.mobileNumber == queryMobileNumber.replace("+91", "")
        }
      />
    </div>
  );
}

function VerifyOTP({
  otp,
  setOTP,
  setShowOTP,
  mobileNumber,
}: {
  otp: string;
  setOTP: Dispatch<SetStateAction<string>>;
  setShowOTP: Dispatch<SetStateAction<boolean>>;
  mobileNumber: {
    countryCode: CountryCode;
    mobileNumber: string;
  };
}) {
  const [verifyOTPButtonState, setVerifyOTPButtonState] = useState(
    State.SUCCESS
  );
  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full">
      <TextInput
        onChange={(value) => {
          if (value.length > 5) return;
          setOTP(value);
        }}
        placeholder="OTP"
        value={otp}
        title="OTP"
      />
      <Button
        text={
          verifyOTPButtonState != State.SUCCESS ? "Verifying OTP..." : "Verify"
        }
        onClick={async () => {
          setVerifyOTPButtonState(State.LOADING);
          const response = await UpdateVerifyOtp(
            mobileNumber.countryCode + mobileNumber.mobileNumber,
            otp
          );
          if (response) {
            router.push("/user/sign-in");
          }
          setVerifyOTPButtonState(State.SUCCESS);
        }}
        className={`w-full p-3 bg-primary text-white rounded-md text-md`}
      />
      <Button
        text="Change Mobile Number"
        onClick={() => {
          setShowOTP(false);
        }}
        className={`text-info underline underline-offset-4 rounded-md text-md`}
      />
    </div>
  );
}
