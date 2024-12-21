import { RequestMethod } from "@data/enums";

var headers = new Headers();
const apiKey = process.env.EXPO_PUBLIC_COUNTRY_STATE_CITY_API_KEY ?? "YOUR_API";
console.log("apiKey", apiKey);
headers.append("X-CSCAPI-KEY", apiKey);

var requestOptions = {
  method: RequestMethod.GET,
  headers: headers,
};

// fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

export type FetchStatesResponse = {
  id: number;
  iso2: string;
  name: string;
};

export default async function fetchStates(): Promise<
  FetchStatesResponse[] | null
> {
  return await fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
    ...requestOptions,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      return null;
    });
}
