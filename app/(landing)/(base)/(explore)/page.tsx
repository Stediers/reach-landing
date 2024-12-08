import { Suspense } from "react";
import { ServiceCardSkeleton } from "@components/ServiceCard";
import Card from "@components/Card";
import Image from "next/image";
import { fetchAllPartners } from "@api_functions/explore/seo/fetch-all-partners";
import { Button } from "@components/ui/button";
import { CustomerRoutes, Designation } from "@data/enums";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    default:
      "ReachGig - Find & Hire Trusted Local Service Professionals in Tamil Nadu",
    template: "%s - ReachGig",
  },
  description:
    "Connect with verified local service providers for makeup, photography, wedding planning & more. Secure payments, verified professionals & trusted services across Tamil Nadu. Get started for free!",
  keywords: [
    "Local Service Providers",
    "Verified Professionals",
    "Makeup Artists Tamil Nadu",
    "Wedding Photographers",
    "Mehandi Artists",
    "Wedding Planners",
    "Secure Service Platform",
    "Trusted Professionals",
    "Service Provider Directory",
    "Book Local Services",
    "Professional Services Tamil Nadu",
    "Verified Service Providers",
  ].join(", "),
  openGraph: {
    title: "ReachGig - Trusted Local Service Professionals in Tamil Nadu",
    description:
      "Find and hire verified local service providers. Secure payments, identity verification & trusted professionals for makeup, photography, wedding planning & more.",
    url: "https://reachgig.com",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/home1.svg",
        width: 1200,
        height: 630,
        alt: "ReachGig - Find Local Service Professionals",
      },
    ],
    locale: "en_IN",
    siteName: "ReachGig",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReachGig - Find Trusted Local Service Professionals",
    description:
      "Connect with verified local service providers. Secure payments & trusted professionals across Tamil Nadu.",
    images: ["https://reachgig.com/images/home1.svg"],
  },
  // other: {
  //   structured_data: JSON.stringify({
  //     "@context": "https://schema.org",
  //     "@type": "Organization",
  //     name: "ReachGig",
  //     url: "https://reachgig.com",
  //     logo: "https://reachgig.com/images/logo.webp",
  //     description:
  //       "A trusted platform connecting verified service providers with customers in Tamil Nadu.",
  //     address: {
  //       "@type": "PostalAddress",
  //       addressRegion: "Tamil Nadu",
  //       addressCountry: "IN",
  //     },
  //     sameAs: [
  //       "https://facebook.com/reachgig",
  //       "https://twitter.com/reachgig",
  //       "https://instagram.com/reachgig",
  //     ],
  //     aggregateRating: {
  //       "@type": "AggregateRating",
  //       ratingValue: "4.8",
  //       reviewCount: "1000",
  //     },
  //   }),
  // },
};

export default async function ExplorePage() {
  //dobnt cache this page
  const res = await fetchAllPartners();
  if (!res) return <ServiceCardSkeleton />;
  return (
    <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar py-5 space-y-5">
      <PopularDesignations designations={res.map((partner) => partner.group)} />
      {res
        .sort((a, b) => b.partners.length - a.partners.length)
        .map(
          (partner, index) =>
            partner.partners.length > 0 && (
              <div
                key={index}
                className="flex flex-col items-start justify-center space-y-1 w-full px-5 lg:px-10"
              >
                <h3 className="text-xl lg:text-2xl font-medium leading-snug">
                  {partner.group.charAt(0).toUpperCase() +
                    partner.group.slice(1)}
                </h3>
                <div className="flex flex-row justify-start items-center space-x-5 lg:space-x-10 w-full py-5 overflow-x-scroll">
                  {partner.partners.map((profile) => (
                    <Profile
                      key={profile.id}
                      name={profile.firstName + " " + profile.lastName}
                      designation={profile.bio}
                      image={profile.imageUrl}
                      id={profile.id}
                    />
                  ))}
                </div>
              </div>
            )
        )}
    </div>
  );
}

function PopularDesignations({ designations }: { designations: string[] }) {
  return (
    <div className="border-y-2 border-border w-full py-5">
      <div className="grid grid-flow-col gap-x-5 lg:gap-x-10 justify-start items-center lg:space-x-5 lg:space-y-0 w-full px-5 lg:px-10 overflow-x-scroll">
        <Button variant="default" className="!w-fit">
          All
        </Button>
        {/* {Object.values(Designation).map((designation) => (
          <Button key={designation} variant="close" className="!w-fit">
            {designation}
          </Button>
        ))} */}
        {designations.map((designation) => (
          <Button key={designation} variant="close" className="!w-fit">
            {designation}
          </Button>
        ))}
      </div>
    </div>
  );
}

function Profile({
  name,
  designation,
  image,
  id,
}: {
  name: string;
  designation: string;
  image: string;
  id: string;
}) {
  return (
    <Link
      className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] max-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden"
      href={CustomerRoutes.PARTNER.replace("[partnerHandle]", id)}
    >
      <Card className="flex flex-col items-start justify-center !space-y-3 transition-transform hover:shadow-md hover:cursor-pointer transform-gpu">
        <Image
          src={image}
          alt={name}
          className="w-40 h-40 rounded-lg bg-red-100 object-cover"
          width={160}
          height={160}
        />
        <div className="flex flex-col items-start justify-center space-y-1">
          <h4 className="text-lg font-medium line-clamp-1">{name}</h4>
          <p className="text-sm text-textsubtle line-clamp-2">{designation}</p>
        </div>
      </Card>
    </Link>
  );
}
