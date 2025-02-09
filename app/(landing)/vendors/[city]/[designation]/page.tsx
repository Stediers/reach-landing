import { fetchPartners } from "@api_functions/explore/fetch-partners";
import Profile from "./Profile";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import urlSpaceFixer from "@helper_functions/text/url-space-fixer";
import stringFormater from "@helper_functions/text/string-formater";
import { CustomerRoutes } from "@data/enums";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Revalidate more frequently for fresh content
export const revalidate = 600; // 10 minutes

export async function generateMetadata({
  params,
}: {
  params: { designation: string; city: string };
}): Promise<Metadata> {
  const cityName = stringFormater(params.city);
  const res = await fetchPartners({
    city: params.city,
    profession: params.designation,
  });

  if (!res) {
    const formattedDesignation = stringFormater(params.designation);
    return {
      title: `Hire ${formattedDesignation} in ${cityName} | Expert Services`,
      description: `Looking for professional ${formattedDesignation.toLowerCase()} services in ${cityName}? Find verified experts with reviews and competitive rates. Book securely today!`,
      keywords: `${formattedDesignation.toLowerCase()}, ${cityName.toLowerCase()}, hire ${formattedDesignation.toLowerCase()}, professional services, local experts`,
    };
  }

  const correctedDesignation = stringFormater(urlSpaceFixer(res.designation));
  const professionPlural = correctedDesignation.endsWith("s")
    ? correctedDesignation
    : `${correctedDesignation}s`;

  return {
    title: `Top ${professionPlural} in ${cityName} | Verified Professionals`,
    description: `Find the best ${correctedDesignation.toLowerCase()} in ${cityName}. Compare profiles, read verified reviews, and book appointments securely. Get matched with experienced ${professionPlural.toLowerCase()} today!`,
    keywords: `${correctedDesignation.toLowerCase()}, ${cityName.toLowerCase()}, top ${professionPlural.toLowerCase()}, hire ${correctedDesignation.toLowerCase()}, professional ${correctedDesignation.toLowerCase()}, local services`,
    alternates: {
      canonical: `https://reachgig.com/vendors/${params.city.toLowerCase()}/${params.designation.toLowerCase()}`,
    },
    openGraph: {
      title: `Top ${professionPlural} in ${cityName} | ReachGig`,
      type: "website",
      description: `Find and hire the best ${correctedDesignation.toLowerCase()} in ${cityName}. Compare profiles, read verified reviews, and book appointments securely. Start your search now!`,
      url: `https://reachgig.com/vendors/${params.city.toLowerCase()}/${params.designation.toLowerCase()}`,
      siteName: "ReachGig",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Top ${professionPlural} in ${cityName} | ReachGig`,
      description: `Find and hire the best ${correctedDesignation.toLowerCase()} in ${cityName}. Compare profiles, read verified reviews, and book appointments securely.`,
    },
  };
}

export default async function ProfessionalsListingPage({
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

  const cityName = stringFormater(params.city);
  const professionName = stringFormater(res.designation);

  return (
    <main className="w-full max-w-7xl mx-auto">
      <nav className="mb-8" aria-label="Back to city services">
        <Link
          href={CustomerRoutes.VENDORS_BY_CITY.replace(
            "[city]",
            params.city.toLowerCase()
          )}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>Back to all services</span>
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
          Top {professionName} in {cityName}
        </h1>
        <p className="mt-2 text-gray-600">
          Find and book the best {professionName.toLowerCase()} services in{" "}
          {cityName}
        </p>
      </header>

      {res.data.length === 0 ? (
        <section className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-700">
            No {professionName} Available
          </h2>
          <p className="mt-4 text-gray-600">
            We're currently expanding our network in {cityName}. Please check
            back soon or explore other services.
          </p>
        </section>
      ) : (
        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          aria-label={`${professionName} profiles in ${cityName}`}
        >
          {res.data.map((profile) => (
            <Profile key={profile.handle} partner={profile} />
          ))}
        </section>
      )}
    </main>
  );
}
