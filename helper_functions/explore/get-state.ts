import { Country, IState, State as StateType, City } from "country-state-city";

export function getStateFromCity(city: string): IState | null {
  const states = StateType.getStatesOfCountry("IN");
  const state = states.find((state) => {
    const cities = City.getCitiesOfState("IN", state.isoCode);
    return cities.find((c) => c.name.toLowerCase() === city.toLowerCase());
  });
  return state ? state : null;
}

export function getStateFromStateName(stateName: string): IState | null {
  const states = StateType.getStatesOfCountry("IN");
  const state = states.find((state) => {
    return state.name.toLowerCase() === stateName.toLowerCase();
  });
  return state ? state : null;
}
