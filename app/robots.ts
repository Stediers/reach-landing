import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/search?q=", "/admin/"], // Disallow search and admin
    },
    sitemap: "https://reachgig.com/sitemap.xml",
  };
}
