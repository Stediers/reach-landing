import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://reachgig.com";

  // Main routes
  const mainRoutes = ["", "/verification"];

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
  ];
}
