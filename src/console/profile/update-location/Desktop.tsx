import Button from "@components/Button";
import { AiFillHome, AiOutlineExclamationCircle } from "react-icons/ai";
import Setting from "@components/Setting";
import { Dispatch, SetStateAction, useState } from "react";
import { MdApartment, MdWork, MdWorkOff } from "react-icons/md";
import { State } from "@data/enums";
import Card from "@components/Card";
import TextInputWithDropdown from "@components/input/TextInputWithDropdown";
import {
  ICity,
  IState,
  Country,
  City,
  State as StateType,
} from "country-state-city";
import router from "next/router";
import { updateGigLocation } from "@api_functions/gig/update-gig-location";
import DesktopWrapper from "@wrapper/responsive/DesktopWrapper";

export default function Desktop({
  selectedCity,
  setSelectedCity,
  selectedState,
  setSelectedState,
  city,
  state,
  buttonState,
  setButtonState,
}: {
  selectedCity: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
  selectedState: string;
  setSelectedState: Dispatch<SetStateAction<string>>;
  city: string;
  state: string;
  buttonState: State;
  setButtonState: (value: State) => void;
}) {
  return (
    <DesktopWrapper
      className="flex flex-col items-start justify-center space-y-10 w-full"
      header="Edit Location"
    >
      <div className="flex flex-col items-center justify-center space-y-5 w-full max-w-lg">
        <SelectStateAndCity
          state={selectedState}
          setState={setSelectedState}
          city={selectedCity}
          setCity={setSelectedCity}
        />
        <Card className="flex flex-col items-center justify-start !space-y-3 w-full">
          <AiOutlineExclamationCircle className="text-4xl text-error" />
          <p className="text-base text-center">
            This is your base location. You will be shown to customers in this
            city for any offline services you provide.
          </p>
        </Card>
        <Button
          className={`bg-success text-white w-full`}
          buttonState={buttonState}
          onClick={async () => {
            setButtonState(State.LOADING);
            await updateGigLocation({
              location: { city: selectedCity, state: selectedState },
            });
            router.push("/console/profile");
            setButtonState(State.SUCCESS);
          }}
          text="Save"
          disabled={
            selectedCity.length === 0 ||
            selectedState.length === 0 ||
            (selectedCity === city && selectedState === state)
          }
        />
      </div>
    </DesktopWrapper>
  );
}

function SelectStateAndCity({
  state,
  setState,
  city,
  setCity,
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}) {
  const [icity, setICity] = useState<ICity | null>(null);
  const [istate, setIState] = useState<IState | null>(null);
  const indianStates = StateType.getStatesOfCountry(
    Country.getCountryByCode("IN")?.isoCode
  );
  const indianCities = indianStates.find((istate) => istate.name === state)
    ?.isoCode
    ? City.getCitiesOfState(
        "IN",
        indianStates.find((istate) => istate.name === state)?.isoCode!!
      )
    : [];

  return (
    <div className="flex flex-row items-center justify-start space-x-5 w-full">
      {state.length === 0 ? (
        <TextInputWithDropdown
          value={state}
          mandatory={true}
          title="State"
          options={indianStates.map((state) => state.name)}
          placeholder="Eg. Maharashtra"
          onSelect={(value) => {
            setState(value);
            setIState(
              indianStates.find((istate) => istate.name === value) ?? null
            );
          }}
        />
      ) : (
        <Setting
          title={state}
          icon={<MdApartment className="text-xl" />}
          subtitle="Click to change"
          onClick={() => {
            setState("");
            setCity("");
          }}
        />
      )}
      {city.length === 0 ? (
        <TextInputWithDropdown
          value={city}
          mandatory={true}
          title="City"
          options={indianCities.map((city) => city.name)}
          placeholder="Eg. Mumbai"
          onSelect={(value) => {
            setCity(value);
            setICity(
              indianCities.find((icity) => icity.name === value) ?? null
            );
          }}
        />
      ) : (
        <Setting
          title={city}
          icon={<AiFillHome className="text-xl" />}
          subtitle="Click to change"
          onClick={() => setCity("")}
        />
      )}
    </div>
  );
}
