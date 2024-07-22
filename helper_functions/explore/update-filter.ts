import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import { PreferredGender, Gender, SortType } from "@data/enums";
import { ReadonlyURLSearchParams } from "next/navigation";
import { IState, State as StateType } from "country-state-city";

export function updateFilter({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}): WordSearchServiceRequest["filter"] {
  //dynamically import country-state-city to avoid circular dependency
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
  const states = StateType.getStatesOfCountry("IN");
  const stateName = searchParams.get("state")?.toLowerCase() ?? "";
  if (stateName) {
    if (!state) {
      state =
        states.find((item) => {
          const state = item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "");
          return state.includes(stateName);
        }) ?? null;
    }
  }

  const online = searchParams.get("online") === "false" ? false : true;

  const verified = searchParams.get("verified") === "false" ? false : true;

  return {
    state: state ? state.name : null,
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
