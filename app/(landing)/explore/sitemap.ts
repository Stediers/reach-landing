import { MetadataRoute } from "next";
import { Country, State as StateType } from "country-state-city";

const URL = "https://reachgig.com/explore";

export default function sitemap(): MetadataRoute.Sitemap {
  const country = Country.getCountryByCode("IN");
  if (!country) return [];

  const stateNames = StateType.getStatesOfCountry(country.isoCode).map(
    (state) => state.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")
  );

  const baseUrls = stateNames.map((state) => ({
    url: `${URL}?state=${state}`,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [...baseUrls];
}
