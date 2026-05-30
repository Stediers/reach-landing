import { fetchAvilableCities } from "@api_functions/explore/fetch-available-cities";
import { fetchCategoriesByCity } from "@api_functions/explore/fetch-categories-by-city";
import fetchCities from "@api_functions/explore/fetch-cities";
import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { fetchSeededHandles } from "@api_functions/explore/seo/fetch-seeded-handles";
import { CustomerRoutes } from "@data/enums";
import {
  vendorCityPath,
  vendorDesignationPath,
} from "@helper_functions/text/vendor-url";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.reachgig.com";

  // Main routes
  const mainRoutes = [
    "",
    "/partner-program",
    "/contact",
    "/vendors",
    "/explore",
    "/verification",
  ];

  // Learn routes
  const learnRoutes = [
    "/learn",
    "/learn/financial-management-tips",
    "/learn/efficiency-hacks-for-stellar-service-and-maximum-income",
    "/learn/why-reachgig-is-your-ultimate-platform",
    "/learn/staying-motivated-and-overcoming-freelance-burnout",
    "/learn/safety-tips-for-gig-workers",
    "/learn/mental-health-and-wellbeing-for-freelancers",
    "/learn/gigs-vs-business",
    "/learn/india-the-land-of-gig-economy",
    "/learn/mastering-the-art-of-gig-work",
    "/learn/navigating-the-legal-maze",
    "/learn/how-to-choose-wedding-photographer-india",
    "/learn/makeup-artist-price-guide-india",
    "/learn/mehndi-design-trends-indian-weddings",
    "/learn/how-to-hire-dj-for-event",
    "/learn/freelancer-vs-agency-which-to-hire",
    "/learn/questions-to-ask-before-booking-service-provider",
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
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    // Fetch seeded (unclaimed) profile handles
    const seededHandles = await fetchSeededHandles();
    const seededRoutes = seededHandles.map((handle) => ({
      url: `${baseUrl}/${handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const citiesData = await fetchAvilableCities();
    const cities = citiesData ? citiesData : { cities: [] };

    // Fetch each city's designations once, then derive both the city hubs and
    // the city+designation routes from it. Only include cities/designations
    // that actually have providers (count > 0) — empty/"invalid" ones render a
    // noindex page, so listing them in the sitemap would just create
    // "Submitted URL marked noindex" warnings in Search Console.
    const cityResults = await Promise.all(
      cities.cities.map(async (city) => {
        const designationsData = await fetchCategoriesByCity(city.name);
        const designations = (
          designationsData ? designationsData.data : []
        ).filter((designation) => designation.count > 0);
        return { city, designations };
      })
    );

    const vendorCityRoutes = cityResults
      .filter(({ designations }) => designations.length > 0)
      .map(({ city }) => ({
        url: `${baseUrl}${vendorCityPath(city.name)}`,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    const vendorRoutes = cityResults.flatMap(({ city, designations }) =>
      designations.map((designation) => ({
        url: `${baseUrl}${vendorDesignationPath(
          city.name,
          designation.profession.code
        )}`,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }))
    );

    return [
      // Home page with highest priority
      {
        url: baseUrl,
        changeFrequency: "yearly" as const,
        priority: 1,
      },
      // Main routes
      ...mainRoutes
        .filter((route) => route !== "")
        .map((route) => ({
          url: `${baseUrl}${route}`,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      // Learn routes
      ...learnRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      // Dynamic gig routes
      ...gigRoutes.map((route) => ({
        url: route.url,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      // Seeded profile routes
      ...seededRoutes.map((route) => ({
        url: route.url,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      // Vendor city hub routes
      ...vendorCityRoutes.map((route) => ({
        url: route.url,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      // Dynamic vendor routes
      ...vendorRoutes.map((route) => ({
        url: route.url,
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
        changeFrequency: "yearly" as const,
        priority: 1,
      },
      ...mainRoutes
        .filter((route) => route !== "")
        .map((route) => ({
          url: `${baseUrl}${route}`,
          changeFrequency: "monthly" as const,
          priority: 0.8,
        })),
      ...learnRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ];
  }
}
