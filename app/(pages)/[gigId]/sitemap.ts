import { fetchGigHandles } from "@api_functions/explore/seo/get-gig-handles";
import { CustomerRoutes } from "@data/enums";
import { MetadataRoute } from "next";

const URL = "https://reachgig.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchGigHandles();
    //filter out duplicates
    const gigHandles = data
      ? data.filter((item, index) => data.indexOf(item) === index)
      : [];
    return gigHandles.map((handle) => ({
      url: CustomerRoutes.PARTNER.replace("[partnerHandle]", handle),
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}
