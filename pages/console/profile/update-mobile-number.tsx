import { CountryCode, State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Mobile from "@src/console/profile/update-mobile-number/Mobile";
import Desktop from "@src/console/profile/update-mobile-number/Desktop";

export function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  if (!query)
    return {
      redirect: {
        destination: "/console/profile",
        permanent: false,
      },
    };
  if (!query.mobileNumber || typeof query.mobileNumber !== "string")
    return {
      redirect: {
        destination: "/console/profile",
        permanent: false,
      },
    };
  return {
    props: {
      mobileNumber: query.mobileNumber,
    },
  };
}

export default function Main({ mobileNumber }: { mobileNumber: string }) {
  const [mobileNumberState, setMobileNumberState] = useState<{
    countryCode: CountryCode;
    mobileNumber: string;
  }>({
    countryCode: CountryCode.IN,
    mobileNumber: "",
  });
  const [otp, setOTP] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  return (
    <ConsoleWrapper
      title="Update Mobile Number"
      state={State.SUCCESS}
      desktopJSX={
        <Desktop
          mobileNumber={mobileNumberState}
          otp={otp}
          showOtp={showOTP}
          queryMobileNumber={mobileNumber}
          setMobileNumber={setMobileNumberState}
          setOTP={setOTP}
          setShowOtp={setShowOTP}
        />
      }
      mobileJSX={
        <Mobile
          mobileNumber={mobileNumberState}
          otp={otp}
          showOtp={showOTP}
          queryMobileNumber={mobileNumber}
          setMobileNumber={setMobileNumberState}
          setOTP={setOTP}
          setShowOtp={setShowOTP}
        />
      }
    />
  );
}
