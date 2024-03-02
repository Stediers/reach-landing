import { BlogCategory, State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { BiRupee } from "react-icons/bi";
import { Button } from "@components/ui/button";
import { BookIcon } from "lucide-react";
import ImageComponent from "@components/ImageComponent";
import ComponentWrapper from "@wrapper/ComponentWrapper";
import Hero from "@components/Hero";
import { Badge } from "@components/ui/badge";
import { BlogTag } from "@wrapper/BlogWrapper";
import Link from "next/link";

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
    url: "https://reachgig.com/blogs",
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
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth pb-20 pt-10 max-w-[100rem]">
      <h1 className="text-4xl font-semibold w-full px-10">
        Learn with ReachGig
      </h1>
      <div className="grid gap-10 px-10 lg:grid-cols-3 lg:px-20 justify-items-center pt-10">
        <BlogCard
          title="Mastering the Art of Gig Work: Best Practices for Seamless Client Transactions"
          description="In today's gig economy, where flexibility and independence are highly valued, mastering the art of client transactions is key to success as a gig worker. Whether you're a makeup artist, gym trainer, or any other type of gig worker, adhering to best practices can elevate your professionalism and enhance client satisfaction."
          imageUrl="/images/booking.svg"
          link="/blogs/mastering-the-art-of-gig-work"
          tags={[BlogCategory.TIPS]}
        />
        <BlogCard
          title="India: The Land of Gig Economy"
          description="India is a land of opportunities, and the gig economy is no exception. With the rise of digital platforms and the increasing demand for flexible work, the gig economy is booming in India. If you're looking to join the gig economy in India, here's what you need to know."
          imageUrl="/images/india-the-land-of-gig-economy.svg"
          link="/blogs/india-the-land-of-gig-economy"
          tags={[BlogCategory.INFORMATION]}
        />
        <BlogCard
          title="Why ReachGig is Your Ultimate Platform"
          description='Welcome to ReachGig, your gateway to a world of opportunities tailored specifically for Gig professionals like yourself. You might be wondering, "What sets ReachGig apart from the sea of corporate websites out there?" Allow us to shed some light on that.'
          imageUrl="/images/why-reachgig-is-your-ultimate-platform.png"
          link="/blogs/why-reachgig-is-your-ultimate-platform"
          tags={[BlogCategory.INFORMATION]}
        />
      </div>
    </div>
  );
}

function SemiNav() {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 border-y w-full py-5 sticky top-20 bg-foreground z-10 px-5">
      <div className="flex flex-row items-start justify-start w-full space-x-5 flex-grow max-w-[100rem] overflow-x-scroll hide-scrollbar">
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
      className="flex flex-col items-center justify-start space-y-5 p-3 group hover:cursor-pointer"
      href={link}
    >
      <ImageComponent
        src={imageUrl}
        alt={title}
        className="w-full lg:h-[15rem] h-[10rem] object-cover"
      />
      <div className="flex flex-col items-center justify-center lg:items-start space-y-3">
        <div className="lg:flex flex-row items-center justify-center lg:justify-start space-x-3 hidden">
          {tags.map((tag) => (
            <BlogTag tag={tag} key={tag} />
          ))}
        </div>
        <h2 className="text-2xl font-medium text-center lg:text-left tracking-tight w-full hover:cursor-pointer hover:underline underline-offset-4 group-hover:underline">
          {title}
        </h2>
        <div className="flex flex-row items-center justify-center lg:justify-start space-x-3 lg:hidden">
          {tags.map((tag) => (
            <BlogTag tag={tag} key={tag} />
          ))}
        </div>
        <p className="text-base text-center lg:text-left w-full">
          {description.substring(0, 150)}...
        </p>
        <Button variant="info" asChild size="sm">
          Read More
        </Button>
      </div>
    </Link>
  );
}
