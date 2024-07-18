import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import { PreferredGender, Gender, SortType } from "@data/enums";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Country, IState, State as StateType } from "country-state-city";
import { getStateFromCity } from "./get-state";

export function updateFilter({
  searchParams,
  city,
}: {
  searchParams: ReadonlyURLSearchParams;
  city: string | null;
}): WordSearchServiceRequest["filter"] {
  const customerGenderParams = searchParams.get("customerGender");
  const customerGender = customerGenderParams
    ? Object.values(PreferredGender).find(
        (item) => item === customerGenderParams
      )
    : PreferredGender.UNISEX;
  const partnerGenderParams = searchParams.get("partnerGender");
  const partnerGender = partnerGenderParams
    ? Object.values(Gender).find((item) => item === partnerGenderParams)
    : null;
  const typeParams = searchParams.get("range") === "price" ? "price" : "rating";
  const sortParams = searchParams.get("sort");
  const sortType = sortParams
    ? Object.values(SortType).find((item) => item === sortParams)
    : SortType.HIGH_TO_LOW;
  let state: IState | null = null;
  if (city) {
    state = getStateFromCity(city);
  } else {
    const states = StateType.getStatesOfCountry("IN");
    state =
      states.find((item) => {
        const state = item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "");
        return state.localeCompare(state) === 0;
      }) ?? null;
  }

  const online = searchParams.get("online") === "false" ? false : true;

  const verified = searchParams.get("verified") === "false" ? false : true;

  return {
    state: state ?? null,
    verified,
    online,
    sort: {
      range: sortType ?? SortType.HIGH_TO_LOW,
      type: typeParams,
    },
    customerGender: customerGender ?? PreferredGender.UNISEX,
    partnerGender: partnerGender ?? null,
  };
}
