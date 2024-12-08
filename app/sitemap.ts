import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { CustomerRoutes } from "@data/enums";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reachgig.com";

  // Main routes
  const mainRoutes = ["", "/partner-program"];

  // Learn routes
  const learnRoutes = [
    "/learn",
    "/learn/efficiency-hacks-for-stellar-service-and-maximum-income",
    "/learn/why-reachgig-is-your-ultimate-platform",
    "/learn/staying-motivated-and-overcoming-freelance-burnout",
    "/learn/safety-tips-for-gig-workers",
    "/learn/mental-health-and-wellbeing-for-freelancers",
    "/learn/gigs-vs-business",
    "/learn/india-the-land-of-gig-economy",
    "/learn/mastering-the-art-of-gig-work",
    "/learn/navigating-the-legal-maze",
  ];

  try {
    // Fetch dynamic gig handles
    const data = await fetchGigHandles();
    const gigHandles = data ? Array.from(new Set(data)) : [];
    const gigRoutes = gigHandles.map((handle) => ({
      url: `${baseUrl}${CustomerRoutes.PARTNER.replace(
        "[partnerHandle]",
        handle as string
      )}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    return [
      // Home page with highest priority
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 1,
      },
      // Main routes
      ...mainRoutes
        .filter((route) => route !== "")
        .map((route) => ({
          url: `${baseUrl}${route}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      // Learn routes
      ...learnRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      // Dynamic gig routes
      ...gigRoutes,
    ];
  } catch (error) {
    console.error(error);
    // Return static routes even if dynamic routes fail
    return [
      // Static routes remain accessible even on error
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 1,
      },
      ...mainRoutes
        .filter((route) => route !== "")
        .map((route) => ({
          url: `${baseUrl}${route}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ...learnRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ];
  }
}
