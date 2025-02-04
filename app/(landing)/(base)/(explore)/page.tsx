import { ServiceCardSkeleton } from "@components/ServiceCard";
import Card from "@components/Card";
import Image from "next/image";
import { fetchAllPartners } from "@api_functions/explore/seo/fetch-all-partners";
import { CustomerRoutes } from "@data/enums";
import Link from "next/link";
import { Metadata } from "next";
import PopularDesignations from "./PopularDesignations";
import * as motion from "motion/react-client";

// ... (keeping all metadata)

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
      <div className="w-full flex flex-col justify-start items-start relative !hide-scrollbar py-5 space-y-5">
        <PopularDesignations
          designations={res.map((partner) => partner.group)}
          selectedDesignation={selectedDesignation}
        />

        {filteredDesignations.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-medium">
              No Profiles Found for {selectedDesignation}
            </h2>
          </motion.div>
        ) : (
          filteredDesignations
            .sort((a, b) => b.partners.length - a.partners.length)
            .map(
              (partner, index) =>
                partner.partners.length > 0 && (
                  <motion.section
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-start justify-center space-y-1 w-full px-5 lg:px-10"
                  >
                    <h2 className="text-xl lg:text-2xl font-medium leading-snug">
                      {partner.group.charAt(0).toUpperCase() +
                        partner.group.slice(1)}
                    </h2>
                    <div className="flex flex-row justify-start items-center space-x-5 lg:space-x-10 w-full py-5 overflow-x-scroll">
                      {partner.partners.map((profile, profileIndex) => (
                        <Profile
                          key={profile.id}
                          name={profile.firstName + " " + profile.lastName}
                          designation={profile.tagLine}
                          image={profile.imageUrl}
                          handle={profile.handle}
                          index={profileIndex}
                        />
                      ))}
                    </div>
                  </motion.section>
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
  index,
}: {
  name: string;
  designation: string;
  image: string;
  handle: string;
  index: number;
}) {
  const link = CustomerRoutes.PARTNER.replace("[partnerHandle]", handle);

  return (
    <Link
      className="flex flex-col items-start justify-center space-y-3 min-w-[13rem] max-w-[13rem] lg:!min-w-[18rem] lg:max-w-[18rem] overflow-hidden"
      href={link}
      title={`View ${name}'s Profile - ${designation}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          delay: Math.min(0.1 * index, 0.8),
          type: "spring",
          bounce: 0.2,
        }}
      >
        <Card className="flex flex-col items-start justify-center !space-y-3 transition-all duration-300 hover:shadow-md hover:cursor-pointer transform-gpu">
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
            <p className="text-sm text-textsubtle line-clamp-2">
              {designation}
            </p>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
