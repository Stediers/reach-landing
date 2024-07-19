import { MetadataRoute } from "next";
import { Country, State as StateType } from "country-state-city";

const URL = "https://reachgig.com/explore";

export default function sitemap(): MetadataRoute.Sitemap {
  const country = Country.getCountryByCode("IN");
  let stateNames = [];
  const popularSearches = ["Makeup", "Photography", "Catering", "Decoration"];
  if (country) {
    stateNames = StateType.getStatesOfCountry(country.isoCode).map((state) =>
      state.name.replaceAll(/[^a-zA-Z0-9]/g, "")
    );
  } else {
    return [];
  }

  //   return states.map((state) => ({
  //   url: `${URL}?state=${state.name}`,
  //   lastModified: new Date().toISOString(),
  //   changeFrequency: "daily",
  //   priority: 0.7,
  // }));

  //create an array with every possible combination of state and popular search
  return stateNames.flatMap((state) =>
    popularSearches.map((search) => ({
      url: `${URL}?state=${state}&search=${search}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    }))
  );
}
