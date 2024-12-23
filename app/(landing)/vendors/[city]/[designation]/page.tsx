import { fetchPartners } from "@api_functions/explore/fetch-partners";
import UnderlinedHeader from "@components/UnderlinedHeader";
import Profile from "./Profile";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import urlSpaceFixer from "@helper_functions/text/url-space-fixer";
import stringFormater from "@helper_functions/text/string-formater";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@components/ui/breadcrumb";
import { CustomerRoutes } from "@data/enums";

//revalidate every 10 minutes
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { designation: string; city: string };
}): Promise<Metadata> {
  const res = await fetchPartners({
    city: params.city,
    profession: params.designation,
  });
  if (!res) {
    return {
      title: "Top 10 " + params.designation + " in " + params.city,
    };
  }
  const correctedDesignation = urlSpaceFixer(res.designation);
  return {
    title:
      "Top 10 " + stringFormater(correctedDesignation) + " in " + params.city,
    description: `Tired of searching for ${correctedDesignation} in ${params.city}? ReachGig has got you covered. Explore top ${correctedDesignation} and find your dream freelancer today!`,
    keywords: `${correctedDesignation}, ${params.city}, Top 10 ${correctedDesignation} in ${params.city}, ReachGig`,
    alternates: {
      canonical: `https://reachgig.com/vendors/${params.city}/${params.designation}`,
    },
    openGraph: {
      title: "Top 10 " + correctedDesignation + " in " + params.city,
      type: "website",
      description: `Tired of searching for ${correctedDesignation} in ${params.city}? ReachGig has got you covered. Explore top ${correctedDesignation} in ${params.city} and find your dream freelancer today!`,
      url: `https://reachgig.com/vendors/${params.city}/${correctedDesignation}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: { designation: string; city: string };
}) {
  const res = await fetchPartners({
    city: params.city,
    profession: params.designation,
  });
  if (!res) {
    redirect("/not-found");
  }
  return (
    <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar space-y-5">
      <div className="flex flex-row items-center  justify-between w-full">
        {/* <h1 className="text-xl lg:text-2xl font-medium max-w-md">
          Explore <span className="text-primary">{res.designation}</span> in{" "}
          {params.city}
        </h1> */}
        <UnderlinedHeader
          title={`Top ${stringFormater(res.designation)} in ${stringFormater(
            params.city
          )}`}
        />
      </div>
      {res.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-3">
          <h3 className="text-lg font-medium">No Profiles Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
          {res.data.map((profile) => (
            <Profile key={profile.handle} partner={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
