import {
  Country,
  ICity,
  City,
  IState,
  State as StateType,
} from "country-state-city";
import { useEffect, useState } from "react";
import TextInputWithDropdown from "./input/TextInputWithDropdown";
import { request } from "http";
import Card from "./Card";
import TextInput from "./input/TextInput";
import { fetchCity, FetchCityResponse } from "@api_functions/location/get-city";
import { debounce, set } from "lodash";
import { State } from "@data/enums";
import Setting from "./Setting";
import { Badge } from "./ui/badge";

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
  const [istate, setIState] = useState<IState | null>(
    indianStates.find((istate) => istate.name === state) ?? null
  );
  const [icity, setICity] = useState<ICity | null>(
    indianCities.find((icity) => icity.name === city) ?? null
  );

  useEffect(() => {
    console.log("state changed", istate);
    if (istate === null) return;
    onStateChange(istate);
  }, []);

  useEffect(() => {
    if (icity === null) return;
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
          setIndianCities(cities);
          onStateChange(state);
        }}
        disabled={disabled}
        onFocusSelect={onFocusSelect}
      />
      {selectCity && (
        <TextInputWithDropdown
          value={icity ? icity.name.toString() : ""}
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

function _fetchCity({
  city,
  setButtonState,
  setOptions,
}: {
  city: string;
  setButtonState: React.Dispatch<React.SetStateAction<State>>;
  setOptions: React.Dispatch<
    React.SetStateAction<{ city: string; state: string; country: string }[]>
  >;
}) {
  fetchCity({ city }).then((res) => {
    if (res) {
      setOptions(res);
    }
    setButtonState(State.IDLE);
  });
}

const debouncedFetchCity = debounce(_fetchCity, 500);

export function SelectStateAndCityAPI({
  onSelect,
}: {
  onSelect: (location: { city: string; state: string }) => void;
}) {
  const [search, setSearch] = useState("");
  const [searchState, setSearchState] = useState(State.IDLE);
  const [options, setOptions] = useState<FetchCityResponse[]>([]);
  const [selected, setSelected] = useState<FetchCityResponse | null>(null);
  return selected ? (
    <Setting
      title={selected.city}
      subtitle={selected.state.toLocaleLowerCase()}
      onClick={() => {
        setSelected(null);
        onSelect({ city: "", state: "" });
        setSearch("");
      }}
      icon={<Badge>Change</Badge>}
    />
  ) : (
    <div className="flex flex-col space-y-5 w-full">
      <TextInput
        onChange={(value) => {
          setSearch(value);
          setSearchState(State.LOADING);
          debouncedFetchCity({
            city: value,
            setButtonState: setSearchState,
            setOptions,
          });
        }}
        loading={searchState}
        value={search}
        placeholder="Enter your city"
        title="City"
      />
      {options.map((option) => (
        <Card
          key={option.city}
          onClick={() => {
            setSelected(option);
            onSelect({ city: option.city, state: option.state });
          }}
        >
          <p className="text-base">
            {option.city}, {option.state.toLocaleLowerCase()}
          </p>
        </Card>
      ))}
    </div>
  );
}
