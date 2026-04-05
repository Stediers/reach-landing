import { fetchAvilableCities } from "@api_functions/explore/fetch-available-cities";
import { fetchCategoriesByCity } from "@api_functions/explore/fetch-categories-by-city";
import fetchCities from "@api_functions/explore/fetch-cities";
import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { fetchSeededHandles } from "@api_functions/explore/seo/fetch-seeded-handles";
import { CustomerRoutes } from "@data/enums";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://reachgig.com";

  // Main routes
  const mainRoutes = ["", "/partner-program", "/contact", "/vendors"];

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
    const gigData = await fetchGigHandles();
    const gigHandles = gigData ? Array.from(new Set(gigData)) : [];
    const gigRoutes = gigHandles.map((handle) => ({
      url: `${baseUrl}${CustomerRoutes.PARTNER.replace(
        "[partnerHandle]",
        handle as string
      )}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    // Fetch seeded (unclaimed) profile handles
    const seededHandles = await fetchSeededHandles();
    const seededRoutes = seededHandles.map((handle) => ({
      url: `${baseUrl}/${handle}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const citiesData = await fetchAvilableCities();
    const cities = citiesData ? citiesData : { cities: [] };
    const vendorCityRoutes = cities.cities.map((city) => ({
      url: `${baseUrl}/vendors/${city.name}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    const vendorRoutes = (
      await Promise.all(
        cities.cities.map(async (city) => {
          const designationsData = await fetchCategoriesByCity(city.name);
          const designations = designationsData ? designationsData.data : [];

          return designations
            .filter((designation) => designation.count > 0)
            .map((designation) => ({
              url: `${baseUrl}/vendors/${city.name}/${designation.profession.code}`,
              lastModified: new Date().toISOString(),
              changeFrequency: "daily" as const,
              priority: 0.8,
            }));
        })
      )
    ).flat();

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
      ...gigRoutes.map((route) => ({
        url: route.url,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      // Seeded profile routes
      ...seededRoutes.map((route) => ({
        url: route.url,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      // Vendor city hub routes
      ...vendorCityRoutes.map((route) => ({
        url: route.url,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      // Dynamic vendor routes
      ...vendorRoutes.map((route) => ({
        url: route.url,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
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
