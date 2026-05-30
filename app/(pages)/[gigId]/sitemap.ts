import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { CustomerRoutes } from "@data/enums";
import { MetadataRoute } from "next";

const URL = "https://reachgig.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchGigHandles();
    // Use Set to efficiently remove duplicates
    const gigHandles = data ? Array.from(new Set(data)) : [];

    return gigHandles.map((handle) => ({
      url: `${URL}${CustomerRoutes.PARTNER.replace("[partnerHandle]", handle)}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error(error); // Better error logging
    return [];
  }
}
