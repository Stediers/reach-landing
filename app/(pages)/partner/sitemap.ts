import { fetchGigIds } from "@api_functions/explore/seo/get-gigIds";
import { fetchServiceIds } from "@api_functions/explore/seo/get-serviceIds";
import { MetadataRoute } from "next";

// const URL = "http://localhost:3000";
const URL = "https://customer.reachgig.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchGigIds();
    const gigIds = data ? data.gigIds : [];
    return gigIds.map((gigId) => ({
      url: `${URL}/partner/${gigId}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
