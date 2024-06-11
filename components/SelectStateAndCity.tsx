import {
  Country,
  ICity,
  City,
  IState,
  State as StateType,
} from "country-state-city";
import { useEffect, useState } from "react";
import TextInputWithDropdown from "./input/TextInputWithDropdown";

export default function SelectStateAndCity({
  state,
  city,
  onCityChange,
  onStateChange,
  selectCity,
  disabled,
  onFocusSelect,
}: {
  state: string;
  city: string;
  onCityChange: (city: ICity) => void;
  onStateChange: (state: IState) => void;
  selectCity: boolean;
  disabled?: boolean;
  onFocusSelect?: boolean;
}) {
  const indianStates = StateType.getStatesOfCountry(
    Country.getCountryByCode("IN")?.isoCode
  );
  const [indianCities, setIndianCities] = useState<ICity[]>(
    City.getCitiesOfState(
      "IN",
      indianStates.find((istate) => istate.name === state)?.isoCode ??
        indianStates[0].isoCode
    )
  );
  const [istate, setIState] = useState<IState>(
    indianStates.find((istate) => istate.name === state) ?? indianStates[0]
  );
  const [icity, setICity] = useState<ICity>(
    indianCities.find((icity) => icity.name === city) ?? indianCities[0]
  );

  useEffect(() => {
    console.log("state changed", istate);
    onStateChange(istate);
  }, []);

  useEffect(() => {
    onCityChange(icity);
  }, []);

  return (
    <div className="flex flex-col space-y-5 w-full">
      <TextInputWithDropdown
        value={istate ? istate.name : ""}
        mandatory={true}
        title="State"
        options={indianStates.map((state) => state.name)}
        placeholder="Eg. Tamil Nadu"
        onSelect={(value) => {
          const state = indianStates.find((istate) => istate.name === value);
          if (state === undefined) return;
          const cities = City.getCitiesOfState("IN", state.isoCode);
          if (cities.length === 0) return;
          setIState(state);
          setICity(cities[0]);
          setIndianCities(cities);
          onStateChange(state);
        }}
        disabled={disabled}
        onFocusSelect={onFocusSelect}
      />
      {selectCity && (
        <TextInputWithDropdown
          value={icity.name.toString()}
          mandatory={true}
          title="City"
          options={indianCities.map((city) => city.name)}
          placeholder="Eg. Mumbai"
          onSelect={(value) => {
            const city = indianCities.find((icity) => icity.name === value);
            console.log(city);
            if (city === undefined) return;
            setICity(city);
            onCityChange(city);
          }}
          disabled={disabled}
        />
      )}
    </div>
  );
}
