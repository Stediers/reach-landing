import { BlogCategory, State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import { BookAudioIcon, BookIcon } from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import ComponentWrapper from "@wrapper/ComponentWrapper";
import Hero from "@components/Hero";
import { Badge } from "@components/ui/badge";
import { BlogTag } from "@wrapper/BlogWrapper";
import Link from "next/link";
import VideoCarousel from "@components/VideoCarousel";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import RawCarousel from "@components/carousel/RawCarousel";
import { CarouselItem } from "@components/ui/carousel";

export const metadata: Metadata = {
  title: {
    default: "Blogs",
    template: "%s | ReachGig",
  },
  description:
    "Blog posts on ReachGig. Get the latest news, updates and tips on ReachGig!",
  openGraph: {
    title: "Blogs on ReachGig",
    description: "Get the latest news, updates and tips on ReachGig!",
    url: "https://reachgig.com/learn",
    type: "website",
    images: [
      {
        url: "",
        width: 800,
        height: 600,
        alt: "Booking",
      },
    ],
    locale: "en_US",
  },
};

export default function Page() {
  const podcastVideos = [
    "https://www.youtube.com/embed/9E-5_16Nsws?si=txsp9Ka9P4KcUIol",
    "https://www.youtube.com/embed/DojCGh-PNKc?si=ZLyrNDhZ8AQqaF7q",
  ];
  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20">
      <HeaderWrapper
        paddingTopRemove={true}
        title={
          <span className="!leading-snug">
            Our <br />{" "}
            <span className="text-primary font-semibold">Podcasts</span>{" "}
          </span>
        }
      >
        {/* <VideoCarousel
          videos={[
            "https://www.youtube.com/embed/9E-5_16Nsws?si=txsp9Ka9P4KcUIol",
            "https://www.youtube.com/embed/hb7DSyWHjZw?si=CwkgK4nSBQ1dlzNp",
            "https://www.youtube.com/embed/9E-5_16Nsws?si=txsp9Ka9P4KcUIol",
            "https://www.youtube.com/embed/hb7DSyWHjZw?si=CwkgK4nSBQ1dlzNp",
          ]}
          itemBasis="lg:basis-1/2"
        /> */}
        <RawCarousel showArrows={true} autoPlay={true}>
          {podcastVideos.map((video) => (
            <CarouselItem className="lg:basis-1/2" key={video}>
              <iframe
                src={video}
                title="YouTube video player"
                className="w-full h-[200px] lg:h-[400px] rounded-lg"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </CarouselItem>
          ))}
        </RawCarousel>
      </HeaderWrapper>
      <HeaderWrapper
        title={
          <span className="!leading-snug">
            Learn <br />{" "}
            <span className="text-primary font-semibold">From</span> Us
          </span>
        }
      >
        <div className="grid gap-20 lg:grid-cols-3 justify-items-center 2xl:grid-cols-4">
          {/* NEW BLOGS HERE */}
          <BlogCard
            title="Staying Motivated and Overcoming Freelance Burnout"
            description="As freelancers, we're often depicted as living the dream - setting our own schedules, working from anywhere, and pursuing our passions on our own terms. However, the reality is that freelancing comes with its own set of challenges, one of the most prevalent being burnout. The relentless hustle, unpredictable income, and constant pressure to perform can take a toll on our mental and physical well-being, leading to feelings of exhaustion, disillusionment, and overwhelm. In this blog post, we'll explore the phenomenon of freelance burnout, its causes, and most importantly, how to overcome it and stay motivated in the long run."
            imageUrl="/images/tired.svg"
            link="/learn/staying-motivated-and-overcoming-freelance-burnout"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="Financial Management Tips for the Freelancers of India"
            description="For freelancers in India, effective financial management is crucial for maintaining stability and compliance with tax laws. In this comprehensive guide, we'll provide step-by-step tips to help freelancers manage their finances efficiently and navigate the complexities of taxation in India."
            imageUrl="/images/finance.svg"
            link="/learn/financial-management-tips"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="Exploring the World of Work: Owning a Business vs Doing Gigs"
            description="In today's dynamic economy, individuals have more options than ever when it comes to earning a living. Two popular paths that many people consider are owning a business and doing gigs. Each option offers its own set of advantages and disadvantages, and understanding the differences can help you make an informed decision about your career path."
            imageUrl="/images/gigvb.svg"
            link="/learn/gigs-vs-business"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="10 Safety Tips for Gig Workers in the Modern Economy"
            description="In today's fast-paced gig economy, gig workers face unique challenges and safety concerns while navigating various gigs and tasks. Whether you're delivering food, providing rideshare services, or freelancing as a digital nomad, prioritizing safety is paramount. Here are ten essential safety tips to help gig workers stay safe and secure in your day-to-day work."
            imageUrl="/images/secure.svg"
            link="/learn/safety-tips-for-gig-workers"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="The Ultimate Guide to Mental Health and Wellbeing for Solopreneurs: How Freelancers Can Avoid Burnout"
            description="The freelance life beckons with promises of freedom, flexibility, and
            being your own boss. It's a dream many chase, and for good reason.
            But the reality of solopreneurship can have a hidden downside:
            isolation, long hours, and blurred work-life boundaries. These factors,
            if left unchecked, can take a toll on something crucial - your mental
            health."
            imageUrl="/images/mental-health.svg"
            link="/learn/mental-health-and-wellbeing-for-freelancers"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="Navigating the Legal Maze: A Guide for Freelancers"
            description="In today's rapidly evolving landscape of work, the rise of freelancing and gig work has reshaped the traditional notions of employment. No longer confined to a nine-to-five office job, individuals are embracing the freedom and flexibility offered by freelancing, turning their passions and skills into lucrative careers."
            imageUrl="/images/navigating-the-legal-maze.svg"
            link="/learn/navigating-the-legal-maze"
            tags={[BlogCategory.INFORMATION, BlogCategory.TIPS]}
          />
          <BlogCard
            title="Why ReachGig is Your Ultimate Platform"
            description='Welcome to ReachGig, your gateway to a world of opportunities tailored specifically for Gig professionals like yourself. You might be wondering, "What sets ReachGig apart from the sea of corporate websites out there?" Allow us to shed some light on that.'
            imageUrl="/images/why-reachgig-is-your-ultimate-platform.png"
            link="/learn/why-reachgig-is-your-ultimate-platform"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="India: The Land of Gig Economy"
            description="India is a land of opportunities, and the gig economy is no exception. With the rise of digital platforms and the increasing demand for flexible work, the gig economy is booming in India. If you're looking to join the gig economy in India, here's what you need to know."
            imageUrl="/images/india-the-land-of-gig-economy.svg"
            link="/learn/india-the-land-of-gig-economy"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="Mastering the Art of Gig Work: Best Practices for Seamless Client Transactions"
            description="In today's gig economy, where flexibility and independence are highly valued, mastering the art of client transactions is key to success as a gig worker. Whether you're a makeup artist, gym trainer, or any other type of gig worker, adhering to best practices can elevate your professionalism and enhance client satisfaction."
            imageUrl="/images/booking.svg"
            link="/learn/mastering-the-art-of-gig-work"
            tags={[BlogCategory.TIPS]}
          />
        </div>
      </HeaderWrapper>
    </div>
  );
}

function SemiNav() {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 border-y w-full py-5 sticky top-20 bg-foreground z-10 px-5">
      <div className="flex flex-row items-start justify-start w-full space-x-5 flex-grow max-w-[90rem] overflow-x-scroll hide-scrollbar">
        {Object.values(BlogCategory).map((category) => (
          <Button
            variant="info"
            className="first-letter:capitalize lg:w-[10rem] w-[8rem]"
            key={category}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}

function BlogCard({
  title,
  description,
  imageUrl,
  link,
  tags,
}: {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: BlogCategory[];
}) {
  return (
    <Link
      className="flex flex-col items-center justify-start space-y-5 group hover:cursor-pointer"
      href={link}
    >
      <ImageComponent
        src={imageUrl}
        alt={title}
        className="w-full lg:h-[15rem] h-[10rem] object-cover"
      />
      <div className="flex flex-col items-center justify-center lg:items-start space-y-3">
        <div className="flex flex-row items-center justify-start lg:justify-start space-x-3 w-full">
          {tags.map((tag) => (
            <BlogTag tag={tag} key={tag} />
          ))}
        </div>
        <h2 className="lg:text-2xl text-xl font-medium text-left tracking-tight w-full hover:cursor-pointer hover:underline underline-offset-4 group-hover:underline">
          {title}
        </h2>
        <h3 className="text-base text-left w-full">
          {description.substring(0, 150)}...
        </h3>
        <Button variant="info" asChild size="sm">
          Read More
        </Button>
      </div>
    </Link>
  );
}
