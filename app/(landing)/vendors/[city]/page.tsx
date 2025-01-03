import { fetchCategoriesByCity } from "@api_functions/explore/fetch-categories-by-city";
import Card from "@components/Card";
import { ServiceCardSkeleton } from "@components/ServiceCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import stringFormater from "@helper_functions/text/string-formater";

export const generateMetadata = async ({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> => {
  const res = await fetchCategoriesByCity(params.city);
  if (!res) {
    return {
      title: "Freelancers in " + params.city + " | ReachGig",
    };
  } else {
    const topCategories = res.data
      .sort((a, b) => b.count - a.count)
      .map((category) => category.profession.name);
    if (topCategories.length === 3) {
      return {
        title: `Find ${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]} Freelancers in ${params.city} - Prices and Reviews`,
        description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
        keywords: `${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]}, Freelancers, ${params.city}, ReachGig`,
        alternates: {
          canonical: `https://reachgig.com/vendors/${params.city}`,
        },
        openGraph: {
          title: `Find ${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]} Freelancers in ${params.city} - Prices and Reviews`,
          type: "website",
          description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
          url: `https://reachgig.com/vendors/${params.city}`,
        },
      };
    } else if (topCategories.length === 2) {
      return {
        title: `${topCategories[0]}, ${topCategories[1]} Freelancers in ${params.city} - Prices and Reviews`,
        description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
        keywords: `${topCategories[0]}, ${topCategories[1]}, Freelancers, ${params.city}, ReachGig`,
        alternates: {
          canonical: `https://reachgig.com/vendors/${params.city}`,
        },
        openGraph: {
          title: `Find ${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]} Freelancers in ${params.city} - Prices and Reviews`,
          type: "website",
          description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
          url: `https://reachgig.com/vendors/${params.city}`,
        },
      };
    } else if (topCategories.length === 1) {
      return {
        title: `${topCategories[0]}s in ${params.city} - Prices and Reviews`,
        description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
        keywords: `${topCategories[0]}, Freelancers, ${params.city}, ReachGig`,
        alternates: {
          canonical: `https://reachgig.com/vendors/${params.city}`,
        },
        openGraph: {
          title: `Find ${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]} Freelancers in ${params.city} - Prices and Reviews`,
          type: "website",
          description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
          url: `https://reachgig.com/vendors/${params.city}`,
        },
      };
    } else
      return {
        title: `${topCategories[0]} Freelancers in ${params.city} - Prices and Reviews`,
        description: `The lastest list of Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
        keywords: `${topCategories[0]}, Freelancers, ${params.city}, ReachGig`,
        alternates: {
          canonical: `https://reachgig.com/vendors/${params.city}`,
        },
        openGraph: {
          title: `Find ${topCategories[0]}, ${topCategories[1]}, ${topCategories[2]} Freelancers in ${params.city} - Prices and Reviews`,
          type: "website",
          description: `One stop platform to hire the most trusted Freelancers in ${params.city} in reachgig. Have a safe and secure appointment by utilizing our integrated payment portals, authentic ratings, and secure communication channels.`,
          url: `https://reachgig.com/vendors/${params.city}`,
        },
      };
  }
};

export default async function Page({
  params,
}: {
  params: { designation: string; city: string };
}) {
  //dobnt cache this page
  const city = params.city;
  console.log("city", city);
  const res = await fetchCategoriesByCity(city);
  if (!res) return <ServiceCardSkeleton />;
  console.log("res", res.data);
  return (
    <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar space-y-5">
      <div className="flex flex-row items-center  justify-between w-full">
        <h1 className="text-xl lg:text-2xl font-medium max-w-md">
          Explore Services in {city}
        </h1>
        {/* <UnderlinedHeader title={`Explore Services in ${city}`} /> */}
      </div>
      {res.data.every((value) => value.count === 0) ? (
        <div className="flex flex-col items-center justify-center space-y-3">
          <h3 className="text-lg font-medium">No Services Found in {city}</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {res.data
            .sort((a, b) => b.count - a.count)
            .filter((value) => value.count > 0)
            .map((value) => (
              <ProfessionCard
                key={stringFormater(value.profession.name)}
                name={stringFormater(value.profession.name)}
                des={value.profession.description}
                city={city}
                link={value.profession.code}
                count={value.count}
              />
            ))}
        </div>
      )}
    </div>
  );
}

function ProfessionCard({
  name,
  des,
  city,
  link,
  count,
}: {
  name: string;
  des: string;
  city: string;
  link: string;
  count: number;
}) {
  return (
    <Link
      className="flex flex-col items-start justify-center space-y-3 overflow-hidden"
      href={`/vendors/${city}/${link}`}
    >
      <Card className="flex flex-col items-start justify-center !space-y-3 hover:cursor-pointer group">
        <div className="flex flex-col items-start justify-center space-y-2">
          <div className="w-full flex justify-between items-center">
            <h4 className="text-lg font-medium line-clamp-1">{name}</h4>
          </div>
          <p className="text-sm text-textsubtle line-clamp-2">{des}</p>
        </div>
        <div className="w-full flex text-info items-center space-x-2">
          <p className="text-sm font-medium underline-offset-4 group-hover:underline">
            <span>Explore</span>
          </p>
          <ArrowRight className="w-4 h-4" />
        </div>
      </Card>
    </Link>
  );
}
