import { State } from "@data/enums";
import ConsoleWrapper from "@wrapper/ConsoleWrapper";
import { GetServerSidePropsContext } from "next";
import Mobile from "@src/console/profile/update-location/Mobile";
import Desktop from "@src/console/profile/update-location/Desktop";
import { useState } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;
  if (!query.city || !query.state) {
    // redirect to /console/profile
    return {
      redirect: {
        destination: "/console/profile",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        city: query.city ?? "",
        state: query.state ?? "",
      },
    };
  }
}

export default function Main({ city, state }: { city: string; state: string }) {
  const [buttonState, setButtonState] = useState<State>(State.SUCCESS);
  const [selectedState, setSelectedState] = useState<string>(state);
  const [selectedCity, setSelectedCity] = useState<string>(city);
  return (
    <ConsoleWrapper
      title="Update Location"
      state={State.SUCCESS}
      mobileJSX={
        <Mobile
          buttonState={buttonState}
          city={city}
          selectedCity={selectedCity}
          selectedState={selectedState}
          setButtonState={setButtonState}
          setSelectedCity={setSelectedCity}
          setSelectedState={setSelectedState}
          state={state}
        />
      }
      desktopJSX={
        <Desktop
          buttonState={buttonState}
          city={city}
          selectedCity={selectedCity}
          selectedState={selectedState}
          setButtonState={setButtonState}
          setSelectedCity={setSelectedCity}
          setSelectedState={setSelectedState}
          state={state}
        />
      }
    />
  );
}
