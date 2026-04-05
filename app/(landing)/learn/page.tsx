import { BlogCategory } from "@data/enums";
import React from "react";
import { Metadata } from "next";
import { Button } from "@components/ui/button";
import ImageComponent from "@components/ImageComponent";
import { BlogTag } from "@wrapper/BlogWrapper";
import Link from "next/link";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import {
  fetchYouTubeVideos,
  fetchYouTubeShorts,
} from "@api_functions/youtube/fetch-youtube-videos";
import YouTubeGrid from "@components/youtube/YouTubeGrid";
import YouTubeShorts from "@components/youtube/YouTubeShorts";

export const metadata: Metadata = {
  title: "Learn from Industry Experts",
  description:
    "Discover expert insights, tips, and guides for freelancers and gig workers. Learn about financial management, legal compliance, work-life balance, and success strategies in the gig economy.",
  alternates: {
    canonical: "https://reachgig.com/learn",
    types: {
      "application/rss+xml": "https://reachgig.com/feed.xml",
    },
  },
  openGraph: {
    title: "ReachGig Learning Hub - Expert Guides for Gig Workers",
    description:
      "Expert insights, tips and comprehensive guides to help you succeed in the gig economy. Learn about finances, legal compliance, work-life balance and more.",
    url: "https://reachgig.com/learn",
    type: "website",
    images: [
      {
        url: "https://reachgig.com/images/og-learn.jpg",
        width: 1200,
        height: 630,
        alt: "ReachGig Learning Hub",
      },
    ],
    locale: "en_IN",
    siteName: "ReachGig",
  },
  keywords:
    "freelance tips, gig economy, freelancer guides, work-life balance, financial management, legal compliance, freelance success, gig work india",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://reachgig.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Learn",
      item: "https://reachgig.com/learn",
    },
  ],
};

export default async function Page() {
  const [videos, shorts] = await Promise.all([
    fetchYouTubeVideos(),
    fetchYouTubeShorts(),
  ]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center scroll-smooth pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HeaderWrapper
        paddingTopRemove={true}
        title={
          <span className="!leading-snug">
            Our <br />{" "}
            <span className="text-primary font-semibold">Podcasts</span>{" "}
          </span>
        }
      >
        <YouTubeGrid videos={videos} />
      </HeaderWrapper>
      <HeaderWrapper
        title={
          <span className="!leading-snug">
            Quick <br />{" "}
            <span className="text-primary font-semibold">Clips</span>
          </span>
        }
      >
        <YouTubeShorts shorts={shorts} />
      </HeaderWrapper>
      <HeaderWrapper
        title={
          <span className="!leading-snug">
            Learn <br />{" "}
            <span className="text-primary font-semibold">From</span> Us
          </span>
        }
      >
        <div className="grid gap-20 lg:grid-cols-3 justify-items-center">
          {/* NEW BLOGS HERE */}
          <BlogCard
            title="How to Choose the Right Wedding Photographer in India"
            description="Planning your wedding and looking for the perfect photographer? This complete guide covers everything from photography styles and portfolio evaluation to pricing ranges and red flags to watch out for. Make your special day unforgettable with the right choice."
            imageUrl="/images/booking.svg"
            link="/learn/how-to-choose-wedding-photographer-india"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="Makeup Artist Price Guide India 2025 — How Much Does Bridal Makeup Cost?"
            description="Wondering how much a makeup artist charges in India? This comprehensive price guide breaks down bridal makeup costs by city, compares HD vs airbrush makeup, reveals hidden costs, and helps you get the best value for your money."
            imageUrl="/images/grooming-service.svg"
            link="/learn/makeup-artist-price-guide-india"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="Top Mehndi Design Trends for Indian Weddings in 2025"
            description="From minimalist elegance to portrait mehndi, discover the hottest bridal mehndi trends of 2025. Learn about traditional vs modern styles, pricing expectations, and tips for darker, longer-lasting mehndi for your special day."
            imageUrl="/images/discover.svg"
            link="/learn/mehndi-design-trends-indian-weddings"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="How to Hire a DJ for Your Event in India — Complete Guide"
            description="Throwing a wedding, sangeet, or corporate event? Learn how to choose the right DJ, what equipment to expect, typical pricing across Indian cities, and key questions to ask before you book. Make your event unforgettable."
            imageUrl="/images/community.svg"
            link="/learn/how-to-hire-dj-for-event"
            tags={[BlogCategory.TIPS]}
          />
          <BlogCard
            title="Freelancer vs Agency: Which Should You Hire?"
            description="Not sure whether to hire a freelancer or an agency for your next project? This honest comparison breaks down costs, quality, communication, and flexibility to help you make the right choice for your specific needs."
            imageUrl="/images/negotiate.svg"
            link="/learn/freelancer-vs-agency-which-to-hire"
            tags={[BlogCategory.INFORMATION]}
          />
          <BlogCard
            title="Top Questions to Ask Before Booking a Service Provider"
            description="Don't book a service provider without asking these essential questions first. From pricing transparency to cancellation policies, this guide ensures you make informed hiring decisions and avoid costly mistakes."
            imageUrl="/images/review.svg"
            link="/learn/questions-to-ask-before-booking-service-provider"
            tags={[BlogCategory.TIPS]}
          />
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
