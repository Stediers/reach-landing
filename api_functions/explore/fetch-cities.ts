import { RequestMethod } from "@data/enums";

var headers = new Headers();
const apiKey = process.env.EXPO_PUBLIC_COUNTRY_STATE_CITY_API_KEY ?? "YOUR_API";
headers.append("X-CSCAPI-KEY", apiKey);

var requestOptions = {
  method: RequestMethod.GET,
  headers: headers,
};

// fetch("https://api.countrystatecity.in/v1/countries/IN/states", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

export type FetchCitiesResponse = {
  id: number;
  name: string;
};

export default async function fetchCities({
  stateISO2,
}: {
  stateISO2: string;
}): Promise<FetchCitiesResponse[] | null> {
  return await fetch(
    `https://api.countrystatecity.in/v1/countries/IN/states/${stateISO2}/cities`,
    {
      ...requestOptions,
      redirect: "follow",
    }
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      return null;
    });
}
