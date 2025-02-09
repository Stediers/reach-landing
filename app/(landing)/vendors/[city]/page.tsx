import { fetchCategoriesByCity } from "@api_functions/explore/fetch-categories-by-city";
import Card from "@components/Card";
import { ServiceCardSkeleton } from "@components/ServiceCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import stringFormater from "@helper_functions/text/string-formater";

export const revalidate = 3600; // Revalidate every hour for fresh content

export const generateMetadata = async ({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> => {
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const res = await fetchCategoriesByCity(params.city);

  const baseDescription = `Find and hire trusted freelancers in ${cityName}. Compare prices, read verified reviews, and book securely through our integrated payment system. Get started today!`;

  if (!res?.data?.length) {
    return {
      title: `Hire Local Freelancers in ${cityName} | Top Rated Professionals`,
      description: baseDescription,
      keywords: `freelancers, ${cityName.toLowerCase()}, hire freelancers, local services`,
      alternates: {
        canonical: `https://reachgig.com/vendors/${params.city.toLowerCase()}`,
      },
      openGraph: {
        title: `Hire Local Freelancers in ${cityName} | ReachGig`,
        type: "website",
        description: baseDescription,
        url: `https://reachgig.com/vendors/${params.city.toLowerCase()}`,
        siteName: "ReachGig",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: `Hire Local Freelancers in ${cityName} | ReachGig`,
        description: baseDescription,
      },
    };
  }

  const topCategories = res.data
    .sort((a, b) => b.count - a.count)
    .filter((category) => category.count > 0)
    .map((category) => stringFormater(category.profession.name));

  const generateSEOContent = (categories: string[]) => {
    const categoryList = categories.join(", ");
    const title =
      categories.length > 1
        ? `Hire ${categoryList} Freelancers in ${cityName} | Top Rated & Reviewed`
        : `Hire ${categories[0]} Professionals in ${cityName} | Expert Services`;

    const description = `Find and hire expert ${categoryList.toLowerCase()} freelancers in ${cityName}. Compare prices, read verified reviews, and book securely through our integrated payment system. Get started today!`;

    return {
      title,
      description,
      keywords: `${categoryList.toLowerCase()}, freelancers, ${cityName.toLowerCase()}, hire freelancers, professional services`,
      alternates: {
        canonical: `https://reachgig.com/vendors/${params.city.toLowerCase()}`,
      },
      openGraph: {
        title,
        type: "website",
        description,
        url: `https://reachgig.com/vendors/${params.city.toLowerCase()}`,
        siteName: "ReachGig",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  };

  return generateSEOContent(topCategories.slice(0, 3));
};

export default async function FreelancerCategoryPage({
  params,
}: {
  params: { city: string };
}) {
  const cityName = params.city.charAt(0).toUpperCase() + params.city.slice(1);
  const res = await fetchCategoriesByCity(params.city);

  if (!res?.data) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center">
        <ServiceCardSkeleton />
      </div>
    );
  }

  const hasServices = res.data.some((value) => value.count > 0);

  return (
    <main className="w-full max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
          {hasServices
            ? `Professional Services in ${cityName}`
            : `Explore Services in ${cityName}`}
        </h1>
      </header>

      {!hasServices ? (
        <section className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-700">
            No Services Currently Available in {cityName}
          </h2>
          <p className="mt-4 text-gray-600">
            Check back soon as we&apos;re constantly adding new professionals to
            our platform.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {res.data
            .sort((a, b) => b.count - a.count)
            .filter((value) => value.count > 0)
            .map((value) => (
              <ProfessionCard
                key={value.profession.code}
                name={stringFormater(value.profession.name)}
                description={value.profession.description}
                city={cityName}
                link={value.profession.code}
                count={value.count}
              />
            ))}
        </section>
      )}
    </main>
  );
}

function ProfessionCard({
  name,
  description,
  city,
  link,
  count,
}: {
  name: string;
  description: string;
  city: string;
  link: string;
  count: number;
}) {
  return (
    <Link
      href={`/vendors/${city.toLowerCase()}/${link}`}
      className="block h-full transition-transform hover:-translate-y-1"
      aria-label={`View ${name} services in ${city}`}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          <div className="flex items-center text-blue-600 group">
            <span className="text-sm font-medium group-hover:underline">
              View Available Professionals
            </span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
