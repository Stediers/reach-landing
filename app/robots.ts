import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/user/*", "/auth/*", "/console/*", "/download"],
    },
    sitemap: "https://www.reachgig.com/sitemap.xml",
  };
}
