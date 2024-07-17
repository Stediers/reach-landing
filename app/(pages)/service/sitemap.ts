import { fetchServiceIds } from "@api_functions/explore/seo/get-serviceIds";
import { MetadataRoute } from "next";

// const URL = "http://localhost:3000";
const URL = "https://customer.reachgig.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchServiceIds();
    console.log(data);
    const serviceIds = data ? data.serviceIds : [];
    return serviceIds.map((serviceId) => ({
      url: `${URL}/service/${serviceId}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
