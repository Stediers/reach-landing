import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://reachgig.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    // {
    //   url: "https://reachgig.com/verification",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    // },
    // {
    //   url: "https://reachgig.com/learn",
    //   lastModified: new Date(),
    //   changeFrequency: "monthly",
    // },
  ];
}
