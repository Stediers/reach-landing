import {
  FetchPartnerByPartnerIdResponse,
  fetchPartnerByPartnerId,
} from "@api_functions/gig/fetch-gig-profile-by-gigId";
import {
  SeededProfileResponse,
  fetchSeededProfile,
} from "@api_functions/explore/seo/fetch-seeded-profile";
import Logo from "@components/Logo";
import { CustomerRoutes, Gender } from "@data/enums";
import { AiFillStar } from "react-icons/ai";
import {
  BsArrowLeftShort,
  BsGenderFemale,
  BsGenderMale,
  BsGenderTrans,
} from "react-icons/bs";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CallSetting, WhatsAppSetting } from "@components/contact/Contact";
import { Metadata } from "next";
import { ServiceCardDesktop } from "@components/ServiceCard";
import { AspectRatio } from "@components/ui/aspect-ratio";
import { Button } from "@components/ui/button";
import Card from "@components/Card";
import { MessageCircleCode, PhoneCallIcon, Star } from "lucide-react";
import { CustomDrawer } from "@components/DrawerPopup";
import { DrawerClose } from "@components/ui/drawer";
import StickyContact from "@components/contact/StickyContact";
import { CustomDialog } from "@components/DialogPopup";
import TrackProfileComponent from "@components/track/track-profile";
import * as motion from "motion/react-client";
import Calendar from "@components/input/Calendar";

export const revalidate = 60; // 1 minute

export const generateMetadata = async (props: {
  params: Promise<{ gigId: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const gigId = params.gigId;
  const response = await fetchPartnerByPartnerId(gigId);

  if (!response) {
    // Try seeded profile
    const seeded = await fetchSeededProfile(gigId);
    if (seeded) {
      const location = `${seeded.city}, ${seeded.state}`;
      return {
        title: {
          absolute: `${seeded.name} - ${seeded.designation} in ${location} | ReachGig`,
        },
        description: `Find and book ${seeded.name}, a ${seeded.designation} in ${location}. ${
          seeded.rating ? `Rated ${seeded.rating}/5` : ""
        } Book on ReachGig.`,
        alternates: {
          canonical: `https://www.reachgig.com/${seeded.handle}`,
        },
        openGraph: {
          title: `${seeded.name} - ${seeded.designation} in ${location}`,
          description: `Book ${seeded.name}, a professional ${seeded.designation} in ${location}.`,
          url: `https://www.reachgig.com/${seeded.handle}`,
          type: "profile",
          siteName: "ReachGig",
        },
        keywords: [
          seeded.name.toLowerCase(),
          seeded.designation.toLowerCase(),
          seeded.city.toLowerCase(),
          `${seeded.designation.toLowerCase()} in ${seeded.city.toLowerCase()}`,
          `hire ${seeded.designation.toLowerCase()}`,
          `${seeded.designation.toLowerCase()} near me`,
          "reachgig",
        ],
        robots: {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
      };
    }

    return {
      title: "Professional Profile | ReachGig",
      description:
        "Find skilled professionals and service providers on ReachGig",
      robots: "noindex, nofollow",
    };
  }

  const name = `${response.partner.firstName} ${response.partner.lastName}`;
  const location = `${response.partner.city}, ${response.partner.state}`;
  const servicesList = response.services
    .slice(0, 3)
    .map((s) => s.title)
    .join(", ");

  const description = `Hire ${name}, an experienced ${
    response.partner.designation
  } based in ${location}. Professional offering ${
    response.partner.serviceIds?.length || 0
  } premium services including ${servicesList}. ✓ Verified Professional ${
    response.partner.rating
      ? `✓ ${response.partner.rating.toFixed(1)} Rating`
      : ""
  } ✓ Book now on ReachGig for quality service.`;

  return {
    title: {
      absolute: `${name} - Professional ${response.partner.designation} in ${location} | ReachGig`,
    },
    description,
    alternates: {
      canonical: `https://www.reachgig.com/${response.partner.handle}`,
    },
    openGraph: {
      title: `${name} - Top Rated ${response.partner.designation} in ${location}`,
      description,
      images: [
        {
          url: response.partner.imageUrl,
          width: 1200,
          height: 630,
          alt: `${name} - Professional ${response.partner.designation} in ${location}`,
        },
      ],
      url: `https://www.reachgig.com/${response.partner.handle}`,
      type: "profile",
      siteName: "ReachGig",
      locale: "en_IN",
      firstName: response.partner.firstName,
      lastName: response.partner.lastName,
      gender: response.partner.gender,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} - Expert ${response.partner.designation} | ReachGig`,
      description,
      images: [response.partner.imageUrl],
      creator: "@ReachGig",
    },
    keywords: [
      name.toLowerCase(),
      response.partner.designation.toLowerCase(),
      response.partner.city.toLowerCase(),
      response.partner.state.toLowerCase(),
      ...response.services.map((s) => s.title.toLowerCase()),
      `hire ${response.partner.designation.toLowerCase()}`,
      `${response.partner.designation.toLowerCase()} near me`,
      `${response.partner.designation.toLowerCase()} in ${location.toLowerCase()}`,
      "professional services",
      "book services online",
      "reachgig",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
};

export default async function Page(props: {
  params: Promise<{ gigId: string }>;
  searchParams: Promise<{
    whatsapp?: boolean;
    instagram?: boolean;
    backLink?: string;
    preview?: boolean;
  }>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const gigId = params.gigId;
  const response = await fetchPartnerByPartnerId(gigId);
  if (!response) {
    // Try seeded profile fallback
    const seeded = await fetchSeededProfile(gigId);
    if (seeded && !seeded.claimed) {
      return <SeededProfilePage profile={seeded} />;
    }
    redirect("/404");
  }

  const backLink = searchParams.backLink
    ? decodeURIComponent(searchParams.backLink)
    : null;

  const event = searchParams.whatsapp
    ? "whatsapp"
    : searchParams.instagram
    ? "instagram"
    : searchParams.preview
    ? "preview"
    : null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: `${response.partner.firstName} ${response.partner.lastName}`,
      jobTitle: response.partner.designation,
      description: response.partner.bio || `Professional ${response.partner.designation} based in ${response.partner.city}, ${response.partner.state}`,
      image: response.partner.imageUrl,
      url: `https://www.reachgig.com/${response.partner.handle}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: response.partner.city,
        addressRegion: response.partner.state,
        addressCountry: "IN",
      },
      knowsLanguage: response.partner.languages,
      ...(response.partner.rating && response.partner.rating > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: response.partner.rating.toFixed(1),
              ...(response.partner.totalRatings
                ? { reviewCount: response.partner.totalRatings.toString() }
                : {}),
              bestRating: "5",
              worstRating: "1",
            },
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.reachgig.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${response.partner.firstName} ${response.partner.lastName}`,
          item: `https://www.reachgig.com/${response.partner.handle}`,
        },
      ],
    },
  ];

  return response ? <Mobile /> : null;

  function Mobile() {
    return response ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-start w-full min-h-full pt-5 relative"
      >
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <TrackProfileComponent event={event} gigId={response.partner.gigId} />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-row items-center justify-start space-x-5 px-5"
        >
          {backLink && (
            <Link
              className="flex flex-row items-center justify-start space-x-5"
              href={backLink}
            >
              <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center justify-start w-full space-y-5 px-5"
        >
          <HeroPage response={response} />
          <AboutMe response={response} />
          <Availability response={response} />
          <MyServices response={response} />
        </motion.div>

        <ContactMe response={response} />

        {response.partner.exposeMobileNumber && (
          <StickyContact
            triggerJSX={<Button variant="default">Contact Me</Button>}
            dontShowIds={["contact-me", "hero"]}
          >
            <CustomDialog
              title="Contact Me"
              description="Reach me via"
              maxWidth="max-w-md"
              triggerJSX={
                <Button variant="default">
                  Contact Me
                  <PhoneCallIcon className="w-5 h-5 ml-2" />
                </Button>
              }
            >
              <div className="grid gap-5 w-full">
                <CallSetting mobileNumber={response.partner.mobileNumber} />
                <WhatsAppSetting mobileNumber={response.partner.mobileNumber} />
              </div>
            </CustomDialog>
          </StickyContact>
        )}
      </motion.div>
    ) : null;
  }
}

function HeroPage({ response }: { response: FetchPartnerByPartnerIdResponse }) {
  return (
    <div
      className="flex flex-col items-center justify-between w-full py-5 space-y-10"
      id="hero"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Logo text="ReachGig" textStyle="text-2xl font-medium" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-x-36 gap-y-10 w-full max-w-5xl min-h-[50vh] self-center">
        <motion.div
          className="flex flex-col items-center justify-center lg:space-y-10 space-y-5 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:text-2xl text-lg font-normal"
          >
            Hi there! My name is
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex lg:text-5xl text-3xl flex-col items-center justify-center lg:space-y-5 space-y-3 w-full"
          >
            <span className="font-medium text-center">
              {response.partner.firstName.charAt(0).toUpperCase() +
                response.partner.firstName.slice(1)}
            </span>
            <span className="font-medium text-center">
              {response.partner.lastName.charAt(0).toUpperCase() +
                response.partner.lastName.slice(1)}
            </span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="lg:text-2xl text-base"
          >
            {response.partner.professions.join(" | ")}
          </motion.h2>

          {response.partner.exposeMobileNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CustomDrawer
                title="Contact Me"
                description="Reach me via"
                footerJSX={
                  <DrawerClose asChild>
                    <Button variant="close">Close</Button>
                  </DrawerClose>
                }
                triggerJSX={<Button variant="default">Contact Me</Button>}
              >
                <div className="grid lg:grid-cols-2 gap-5 w-full">
                  <CallSetting mobileNumber={response.partner.mobileNumber} />
                  <WhatsAppSetting
                    mobileNumber={response.partner.mobileNumber}
                  />
                </div>
              </CustomDrawer>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AspectRatio ratio={1}>
            <Image
              src={response.partner.imageUrl}
              alt={`${response.partner.firstName} ${response.partner.lastName} - ${response.partner.designation}`}
              className="rounded-md object-cover border"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={100}
            />
          </AspectRatio>
        </motion.div>
      </div>
    </div>
  );
}

function AboutMe({ response }: { response: FetchPartnerByPartnerIdResponse }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start justify-start space-y-5 w-full lg:px-20 lg:py-32 py-0"
    >
      <div className="grid lg:grid-cols-2 gap-x-36 lg:gap-y-10 space-y-5 w-full self-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-start space-y-5 w-full"
        >
          <p className="lg:text-5xl text-3xl font-medium !leading-normal">
            A Quick <br />
            <span className="text-primary">Introduction</span>
          </p>
          {response.partner.bio.length > 0 ? (
            <p className="lg:text-xl text-lg font-normal">
              {response.partner.bio}
            </p>
          ) : (
            <p className="lg:text-xl text-lg font-normal">
              I am a professional {response.partner.designation} based in{" "}
              {response.partner.city}, {response.partner.state}.
            </p>
          )}
        </motion.div>

        {/* Desktop Settings */}
        <div className="lg:flex flex-col items-start justify-start space-y-10 w-full hidden">
          {[
            {
              title: "I Speak In",
              description: response.partner.languages
                .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
                .join(", "),
              icon: <MessageCircleCode className="w-14 h-14" />,
            },
            {
              title: "My Gender",
              description:
                response.partner.gender.charAt(0).toUpperCase() +
                response.partner.gender.slice(1),
              icon:
                response.partner.gender === Gender.MALE ? (
                  <BsGenderMale className="text-blue-500 lg:w-14 lg:h-14 w-8 h-8" />
                ) : response.partner.gender === Gender.FEMALE ? (
                  <BsGenderFemale className="text-pink-500 lg:w-14 lg:h-14 w-8 h-8" />
                ) : (
                  <BsGenderTrans className="text-purple-500 lg:w-14 lg:h-14 w-8 h-8" />
                ),
            },
            ...(response.partner.rating && response.partner.rating > 0
              ? [
                  {
                    title: "My Rating",
                    description: response.partner.rating.toFixed(1),
                    icon: (
                      <AiFillStar className="text-yellow-500 lg:w-14 lg:h-14 w-8 h-8" />
                    ),
                  },
                ]
              : []),
          ].map((setting, index) => (
            <motion.div
              key={setting.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="w-full"
            >
              <LargeSetting {...setting} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Settings */}
        <div className="flex flex-col items-start justify-start space-y-5 w-full lg:hidden">
          {[
            {
              title: "I Speak In",
              description: response.partner.languages
                .map(
                  (language) =>
                    language.charAt(0).toUpperCase() + language.slice(1)
                )
                .join(", "),
            },
            {
              title: "My Gender",
              description:
                response.partner.gender.charAt(0).toUpperCase() +
                response.partner.gender.slice(1),
            },
            ...(response.partner.rating && response.partner.rating > 0
              ? [
                  {
                    title: "My Rating",
                    description: response.partner.rating.toFixed(1),
                  },
                ]
              : []),
            ...(response.partner.isVerified
              ? [
                  {
                    title: "Verified",
                    description: "I am a verified partner",
                  },
                ]
              : []),
          ].map((setting, index) => (
            <motion.div
              key={setting.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="w-full"
            >
              <SmallSetting {...setting} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Availability({
  response,
}: {
  response: FetchPartnerByPartnerIdResponse;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start justify-start space-y-5 w-full lg:px-20 py-6 lg:py-32"
    >
      <div className="grid lg:grid-cols-2 gap-x-36 lg:gap-y-10 space-y-5 w-full self-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-start space-y-5 w-full"
        >
          <p className="lg:text-5xl text-3xl font-medium !leading-normal">
            My <br />
            <span className="text-primary">Availability</span>
          </p>
          <p className="lg:text-xl text-lg font-normal">
            {response.partner.available
              ? "I am currently available for new bookings. Check my calendar for specific dates."
              : "I have limited availability right now. Please check my calendar for open slots."}
          </p>

          <div className="flex flex-row items-center justify-start space-x-2 flex-wrap gap-y-3">
            {response.workingSlots?.map((slot, index) => (
              <span
                key={slot.date.toISOString()}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {slot.date.toLocaleDateString()}
              </span>
            )) || (
              <>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Mon-Fri
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium">
                  9:00 AM - 6:00 PM
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Desktop Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:flex flex-col items-start justify-start w-full hidden max-w-lg"
        >
          <div className="w-full bg-white rounded-xl shadow-sm p-5 border">
            <Calendar
              date={null}
              selectedDates={[]}
              disabledDates={[]}
              leftAligned={true}
            />
          </div>
        </motion.div>

        {/* Mobile Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full lg:hidden"
        >
          <div className="w-full bg-white rounded-xl shadow-sm p-5 border">
            <Calendar
              date={null}
              selectedDates={[]}
              disabledDates={[]}
              leftAligned={true}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function LargeSetting({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="w-full bg-white lg:!p-7 lg:rounded-2xl rounded-xl text-text">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-start justify-start space-y-3 w-full">
          <p className="lg:text-2xl text-2xl font-medium">{title}</p>
          <p className="lg:text-xl text-lg">{description}</p>
        </div>
        {icon}
      </div>
    </Card>
  );
}

function SmallSetting({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-start justify-start space-y-3 w-full">
      <p className="lg:text-3xl text-xl font-medium">{title}</p>
      <div className="flex flex-row items-center justify-start space-x-2">
        <p className="text-lg lg:text-xl">{description}</p>
      </div>
    </div>
  );
}

function MyServices({
  response,
}: {
  response: FetchPartnerByPartnerIdResponse;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-start justify-start w-full lg:min-h-screen lg:p-20 lg:py-16 lg:space-y-20 space-y-10 py-6 pb-12 bg-white text-text"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:text-5xl text-3xl font-medium !leading-normal"
      >
        My
        <br />
        <span className="text-primary">Services</span>
      </motion.h2>

      {response.services.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-start space-y-5 w-full"
        >
          <p className="lg:text-2xl text-lg font-normal">
            I am currently not offering any services.
          </p>
          <p className="lg:text-2xl text-lg font-normal">
            Please check back later.
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:gap-14 gap-10 w-full">
          {response.services
            .sort(
              (a, b) => b.price.bookingBill.total - a.price.bookingBill.total
            )
            .map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: Math.min(0.1 * index, 0.8), // Cap maximum delay at 0.8s
                }}
              >
                <ServiceCardDesktop
                  service={service}
                  location={
                    response.partner.city + ", " + response.partner.state
                  }
                  handle={response.partner.handle!!}
                />
              </motion.div>
            ))}
        </div>
      )}
    </motion.div>
  );
}

function ContactMe({
  response,
}: {
  response: FetchPartnerByPartnerIdResponse;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-start justify-start lg:space-y-20 space-y-10 w-full min-h-screen bg-black lg:p-20 lg:py-24 text-white px-5 py-12"
      id="contact-me"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link className="flex flex-col w-full space-y-1" href={"/"}>
          <p className="lg:text-3xl text-xl font-medium">ReachGig</p>
          <p className="lg:text-lg text-base tracking-wide">
            Be your own Boss.
          </p>
        </Link>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-x-36 lg:gap-y-10 gap-y-5 w-full self-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start justify-start space-y-5 w-full"
        >
          <h2 className="lg:text-5xl text-3xl font-medium max-w-xl !leading-normal">
            Looking Forward to Work with You!
          </h2>
          <div className="flex flex-col items-start justify-start space-y-5 w-full">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="lg:text-xl text-lg font-normal"
            >
              {response.partner.firstName + " " + response.partner.lastName}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="lg:text-xl text-lg font-normal"
            >
              {response.partner.designation}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="lg:text-xl text-lg font-normal"
            >
              {response.partner.city}, {response.partner.state}
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-start justify-between h-full lg:space-y-20 space-y-10 w-full pt-5"
        >
          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">My Rating</p>
            <div className="flex flex-row items-center justify-start space-x-2">
              <Star className="text-yellow-500 w-5 h-5 lg:w-[2rem] lg:h-[2rem]" />
              <p className="lg:text-xl text-lg">
                {response.partner.rating
                  ? response.partner.rating.toFixed(1)
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">Availability</p>
            <p className="lg:text-xl text-lg">
              {response.partner.available
                ? "Expect a quick response"
                : "I might take some time to respond"}
            </p>
          </div>

          <div className="flex flex-col items-start justify-start lg:space-y-5 space-y-3 w-full">
            <p className="lg:text-3xl text-xl font-medium">Contact Me</p>
            <p className="lg:text-xl text-lg">
              {response.partner.exposeMobileNumber
                ? response.partner.mobileNumber
                : "Hidden"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-start justify-start space-y-5 w-full pt-10 lg:pt-0"
        >
          <p className="lg:text-3xl text-2xl font-medium">
            Explore our Marketplace!
          </p>
          <div className="flex flex-row items-center justify-start space-x-2">
            <Button variant="default" asChild>
              <Link href={CustomerRoutes.EXPLORE}>Click here</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SeededProfilePage({ profile }: { profile: SeededProfileResponse }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: profile.name,
    description: `Professional ${profile.designation} in ${profile.city}, ${profile.state}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: profile.formattedAddress,
      addressLocality: profile.city,
      addressRegion: profile.state,
      addressCountry: "IN",
    },
    ...(profile.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: profile.rating.toString(),
        reviewCount: profile.totalRatings.toString(),
        bestRating: "5",
        worstRating: "1",
      },
    }),
    ...(profile.latitude &&
      profile.longitude && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: profile.latitude,
          longitude: profile.longitude,
        },
      }),
    ...(profile.phoneNumber && { telephone: profile.phoneNumber }),
    ...(profile.website && { url: profile.website }),
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <div className="w-full bg-white border-b px-5 py-4">
        <Logo text="ReachGig" textStyle="text-2xl font-medium" />
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl px-5 py-16 space-y-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <span className="text-4xl font-semibold text-primary">
            {profile.name.charAt(0).toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col items-center space-y-3 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold">{profile.name}</h1>
          <h2 className="text-xl text-gray-600">{profile.designation}</h2>
          <p className="text-gray-500">
            {profile.city}, {profile.state}
          </p>
        </div>

        {/* Rating */}
        {profile.rating && profile.rating > 0 && (
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-medium">
              {Number(profile.rating).toFixed(1)}
            </span>
            {profile.totalRatings > 0 && (
              <span className="text-gray-400">
                ({profile.totalRatings} reviews)
              </span>
            )}
          </div>
        )}

        {/* Address */}
        {profile.formattedAddress && (
          <p className="text-gray-500 text-center max-w-md">
            {profile.formattedAddress}
          </p>
        )}

        {/* Claim Banner */}
        <div className="w-full max-w-lg bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 space-y-5 text-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Is this your business?</h3>
            <p className="text-gray-600">
              Claim your free profile to start getting bookings, manage
              appointments, and collect payments — all in one place.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link
              href={`https://www.reachgig.com/download?claim=${profile.handle}`}
              className="w-full"
            >
              <Button variant="default" className="w-full text-lg py-6">
                Claim Your Profile
              </Button>
            </Link>
            <p className="text-sm text-gray-400">
              Free forever. No commission on your earnings.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/10">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl font-semibold text-primary">Free</span>
              <span className="text-xs text-gray-500">Website</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl font-semibold text-primary">0%</span>
              <span className="text-xs text-gray-500">Commission</span>
            </div>
            <div className="flex flex-col items-center space-y-1">
              <span className="text-2xl font-semibold text-primary">2min</span>
              <span className="text-xs text-gray-500">Setup</span>
            </div>
          </div>
        </div>

        {/* What you get section */}
        <div className="w-full max-w-lg space-y-6 pt-8">
          <h3 className="text-2xl font-semibold text-center">
            What you get with ReachGig
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Your own professional website",
                desc: "A beautiful, shareable profile page with your services and pricing",
              },
              {
                title: "Online booking & payments",
                desc: "Collect advance payments and manage appointments in one place",
              },
              {
                title: "Share your rate card instantly",
                desc: "Stop typing the same prices on WhatsApp — just send a link",
              },
              {
                title: "Get discovered by new customers",
                desc: "Your profile ranks on Google for people searching for your services",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start space-x-4 p-4 rounded-xl bg-white border"
              >
                <div className="mt-1 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-black text-white px-5 py-12">
        <div className="max-w-3xl mx-auto space-y-5">
          <Link className="flex flex-col w-full space-y-1" href={"/"}>
            <p className="text-xl font-medium">ReachGig</p>
            <p className="text-base tracking-wide text-gray-400">
              Be your own Boss.
            </p>
          </Link>
          <p className="text-gray-400">
            <Link href={CustomerRoutes.EXPLORE}>Explore more professionals</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// function MyPackages({
//   response,
// }: {
//   response: FetchPartnerByPartnerIdResponse;
// }) {
//   return (
//     <div className="flex flex-col items-start justify-start w-full lg:min-h-screen lg:p-20 lg:py-16 lg:space-y-20 space-y-10 py-12 bg-white text-text">
//       <h2 className="lg:text-5xl text-3xl font-medium !leading-normal">
//         My
//         <br />
//         <span className="text-primary">Packages</span>
//       </h2>
//       <div className="grid lg:grid-cols-3 gap-14 w-full justify-items-start bg-red-100">
//         {response.packages.map((packageItem) => (
//           <Card
//             className="flex flex-col items-start justify-start w-full space-y-5 lg:!p-10 !p-0 border-none lg:border"
//             key={packageItem.id}
//           >
//             <div className="flex flex-col items-start justify-start space-y-3 w-full">
//               <div className="flex flex-row items-center justify-between space-x-2 w-full">
//                 <p className="lg:text-xl text-xl font-medium">
//                   {packageItem.title}
//                 </p>
//                 <Badge>{packageItem.services.length + " in One"}</Badge>
//               </div>
//               <p className="lg:text-xl text-base">
//                 {packageItem.description.length > 100
//                   ? packageItem.description.slice(0, 100) + "..."
//                   : packageItem.description}
//               </p>
//               <ul className="flex flex-col items-start justify-start space-y-2 w-full">
//                 {packageItem.services.map((service) => (
//                   <li
//                     key={service.id}
//                     className="flex flex-row items-start justify-between w-full"
//                   >
//                     <p className="lg:text-lg text-base font-medium">
//                       {service.title}
//                     </p>
//                     <p className="lg:text-lg text-base">
//                       {priceString({
//                         price: calculateTotalPrice({
//                           discount: service.price.discount?.value ?? 0,
//                           price: service.price.price,
//                         }),
//                       })}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <PriceComponent
//               price={{
//                 ...packageItem.price,
//                 pricingType: PricingType.SESSION,
//               }}
//             />
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
