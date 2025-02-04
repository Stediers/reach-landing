import { ServiceCardSkeleton } from "@components/ServiceCard";
import Card from "@components/Card";
import Image from "next/image";
import { fetchAllPartners } from "@api_functions/explore/seo/fetch-all-partners";
import { CustomerRoutes } from "@data/enums";
import Link from "next/link";
import { Metadata } from "next";
import PopularDesignations from "./PopularDesignations";

export const revalidate = 60 * 60; // 1 hour

export const metadata: Metadata = {
  title: {
    absolute:
      "ReachGig - Find Trusted Local Service Professionals in Tamil Nadu",
    template: "%s | ReachGig",
  },
  description:
    "Connect with 100+ verified service professionals in Tamil Nadu. Find trusted makeup artists, photographers, wedding planners & more. Secure payments & verified profiles guaranteed.",
  keywords: [
    "Local Service Providers Tamil Nadu",
    "Verified Professionals",
    "Makeup Artists",
    "Wedding Photographers",
    "Mehandi Artists",
    "Wedding Planners",
    "Secure Service Platform",
    "Trusted Professionals",
    "Service Provider Directory",
    "Book Local Services",
    "Professional Services Tamil Nadu",
    "Verified Service Providers",
    "Tamil Nadu Local Services",
  ].join(", "),
  alternates: {
    canonical: "https://reachgig.com/explore",
  },
  openGraph: {
    title: "ReachGig - Find Local Service Professionals in Tamil Nadu",
    description:
      "Connect with 100+ verified service professionals in Tamil Nadu. Find trusted makeup artists, photographers, wedding planners & more. Secure payments & identity verification.",
    url: "https://reachgig.com/explore",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/og-image.jpg", // Updated to more SEO-friendly name
        width: 1200,
        height: 630,
        alt: "ReachGig - Find Local Service Professionals in Tamil Nadu",
      },
    ],
    locale: "en_IN",
    siteName: "ReachGig",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachGig - Find Local Service Professionals in Tamil Nadu",
    description:
      "Connect with 100+ verified service professionals in Tamil Nadu. Find trusted makeup artists, photographers, wedding planners & more. Secure payments & identity verification.",
    images: ["https://reachgig.com/images/og-image.jpg"],
    site: "@reachgig",
    creator: "@reachgig",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured data for better SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ReachGig",
  url: "https://reachgig.com",
  logo: "https://reachgig.com/images/logo.webp",
  description:
    "A trusted platform connecting verified service providers with customers in Tamil Nadu.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  sameAs: [
    "https://facebook.com/reachgig",
    "https://twitter.com/reachgig",
    "https://instagram.com/reachgig",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1000",
  },
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: {
    designation: string;
  };
}) {
  const res = await fetchAllPartners();
  if (!res) return <ServiceCardSkeleton />;

  const selectedDesignation = searchParams.designation
    ? decodeURIComponent(searchParams.designation).replace(/-/g, " & ")
    : "All";

  const filteredDesignations =
    selectedDesignation === "All"
      ? res.sort((a, b) => b.partners.length - a.partners.length)
      : res
          .filter((partner) => partner.group === selectedDesignation)
          .sort((a, b) => b.partners.length - a.partners.length);

  return (
    <>
      {/* <JsonLd data={structuredData} /> */}
      <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar py-5 space-y-5">
        <PopularDesignations
          designations={res.map((partner) => partner.group)}
          selectedDesignation={selectedDesignation}
        />
        {filteredDesignations.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <h2 className="text-lg font-medium">
              No Profiles Found for {selectedDesignation}
            </h2>
          </div>
        ) : (
          filteredDesignations
            .sort((a, b) => b.partners.length - a.partners.length)
            .map(
              (partner, index) =>
                partner.partners.length > 0 && (
                  <section
                    key={index}
                    className="flex flex-col items-start justify-center space-y-1 w-full px-5 lg:px-10"
                  >
                    <h2 className="text-xl lg:text-2xl font-medium leading-snug">
                      {partner.group.charAt(0).toUpperCase() +
                        partner.group.slice(1)}
                    </h2>
                    <div className="flex flex-row justify-start items-center space-x-5 lg:space-x-10 w-full py-5 overflow-x-scroll">
                      {partner.partners.map((profile) => (
                        <Profile
                          key={profile.id}
                          name={profile.firstName + " " + profile.lastName}
                          designation={profile.tagLine}
                          image={profile.imageUrl}
                          handle={profile.handle}
                        />
                      ))}
                    </div>
                  </section>
                )
            )
        )}
      </div>
    </>
  );
}

function Profile({
  name,
  designation,
  image,
  handle,
}: {
  name: string;
  designation: string;
  image: string;
  handle: string;
}) {
  const link = CustomerRoutes.PARTNER.replace("[partnerHandle]", handle);

  return (
    <Link
      className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] max-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden"
      href={link}
      title={`View ${name}'s Profile - ${designation}`}
    >
      <Card className="flex flex-col items-start justify-center !space-y-3 transition-transform hover:shadow-md hover:cursor-pointer transform-gpu">
        <Image
          src={image}
          alt={`${name} - ${designation}`}
          className="w-40 h-40 rounded-lg bg-red-100 object-cover"
          width={160}
          height={160}
          loading="lazy"
        />
        <div className="flex flex-col items-start justify-center space-y-1">
          <h3 className="text-lg font-medium line-clamp-1">{name}</h3>
          <p className="text-sm text-textsubtle line-clamp-2">{designation}</p>
        </div>
      </Card>
    </Link>
  );
}
