import { WordSearchServiceRequest } from "@api_functions/explore/word-search-service";
import { PreferredGender, Gender, SortType } from "@data/enums";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Country, IState, State as StateType } from "country-state-city";
import { getStateFromCity } from "./get-state";
import { closest } from "fastest-levenshtein";

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
    // state =
    //   states.find((item) => {
    //     const state = item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "");
    //     return state.includes(searchParams.get("state")?.toLowerCase() ?? "");
    //   }) ?? null;
    // console.log("found state", state);
    // const closestMatch = closest(e.target.value, options);
    // if (!closestMatch) return setOptionsToShow([]);
    // const distanceMatch = distance(e.target.value, closestMatch);
    // if (distanceMatch > 3) return setOptionsToShow([]);
    // const closestMatchIndex = options.indexOf(closestMatch);
    // const closestMatchOptions = options.slice(
    //   closestMatchIndex,
    //   closestMatchIndex + 3
    // );
    // if (closestMatchOptions.length === 0)
    //   return setOptionsToShow([]);
    // setOptionsToShow(closestMatchOptions);
    const stateName = searchParams.get("state")?.toLowerCase() ?? "";
    if (stateName) {
      state =
        states.find((item) => {
          const state = item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "");
          const closestMatch = closest(
            stateName,
            states.map((item) =>
              item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "")
            )
          );
        }) ?? null;

      if (!state) {
        state =
          states.find((item) => {
            const state = item.name.toLowerCase().replace(/[^a-zA-Z ]/g, "");
            return state.includes(stateName);
          }) ?? null;
      }
    }
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
