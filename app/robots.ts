import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/search",
    },
    sitemap: "https://reachgig.com/sitemap.xml",
  };
}
