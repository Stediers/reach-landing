import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { CustomerRoutes } from "@data/enums";
import { MetadataRoute } from "next";

const URL = "https://reachgig.com";

// Static routes that should always be in the sitemap
const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: URL,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    url: `${URL}/explore`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 0.9,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchGigHandles();
    const gigHandles = data ? Array.from(new Set(data)) : [];

    const dynamicRoutes = gigHandles.map((handle) => ({
      url: `${URL}${CustomerRoutes.PARTNER.replace("[partnerHandle]", handle)}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error);
    // Return static routes as fallback if dynamic routes fail
    return staticRoutes;
  }
}
