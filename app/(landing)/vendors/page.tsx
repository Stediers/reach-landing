import { fetchAvilableCities } from "@api_functions/explore/fetch-available-cities";
import Card from "@components/Card";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Freelancers by City | Hire Local Professionals",
  description:
    "Browse verified freelancers and service providers across cities in India. Find photographers, makeup artists, DJs, mehndi designers and more near you. Book securely on ReachGig.",
  keywords:
    "freelancers near me, hire local freelancers, service providers India, photographers, makeup artists, DJs, mehndi designers, ReachGig vendors",
  alternates: {
    canonical: "https://reachgig.com/vendors",
  },
  openGraph: {
    title: "Find Freelancers by City | ReachGig",
    description:
      "Browse verified freelancers and service providers across cities in India. Book trusted professionals instantly.",
    url: "https://reachgig.com/vendors",
    type: "website",
    siteName: "ReachGig",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Freelancers by City | ReachGig",
    description:
      "Browse verified freelancers across cities in India. Book trusted professionals instantly.",
  },
};

export default async function Page() {
  const response = await fetchAvilableCities();
  if (!response) return null;
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {response.cities.map((city) => (
          <CityCard key={city.name} city={city.name} />
        ))}
      </div>
    </div>
  );
}

function CityCard({ city }: { city: string }) {
  return (
    <Link href={`/vendors/${city.toLowerCase()}`}>
      <Card className="flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-lg font-medium">{city}</h3>
      </Card>
    </Link>
  );
}
