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
    <div className="relative flex flex-col items-center justify-center scroll-smooth pb-20">
      <Hero
        image="/images/blogs.svg"
        title="Blogs"
        subtitle="Get the latest news, updates and tips on ReachGig!"
      />
      <SemiNav />
      <div className="grid gap-10 px-10 lg:grid-cols-3 lg:px-20 justify-items-center max-w-[100rem]">
        <BlogCard
          title="How to get the best services"
          description="Get the best services at the best prices. Get the best partners and services when booking with ReachGig!"
          imageUrl="/images/booking.svg"
          link="https://reachgig.com/blogs/how-to-get-the-best-services"
          tags={[BlogCategory.NEWS, BlogCategory.TIPS]}
        />
        <BlogCard
          title="How to verify your account"
          description="Know who you're dealing with. Our verification process ensures that you can trust the service providers on our platform."
          imageUrl="/images/verification.svg"
          link="https://reachgig.com/blogs/how-to-verify-your-account"
          tags={[BlogCategory.TIPS]}
        />
        <BlogCard
          title="How to get the best services"
          description="Get the best services at the best prices. Get the best partners and services when booking with ReachGig!"
          imageUrl="/images/booking.svg"
          link="https://reachgig.com/blogs/how-to-get-the-best-services"
          tags={[BlogCategory.NEWS]}
        />
        <BlogCard
          title="How to verify your account"
          description="Know who you're dealing with. Our verification process ensures that you can trust the service providers on our platform."
          imageUrl="/images/verification.svg"
          link="https://reachgig.com/blogs/how-to-verify-your-account"
          tags={[BlogCategory.TIPS]}
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
            className="first-letter:capitalize"
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
  tags: string[];
}) {
  return (
    <div className="flex flex-col items-center justify-start space-y-5 pt-10">
      <ImageComponent
        src={imageUrl}
        alt={title}
        className="w-full lg:h-[15rem] h-[10rem] object-cover"
      />
      <div className="flex flex-col items-center justify-center lg:items-start space-y-3">
        <div className="lg:flex flex-row items-center justify-center lg:justify-start space-x-3 hidden">
          {tags.map((tag) => (
            <Badge variant="infoOutline" key={tag}>
              <p className="text-xs font-medium text-info">{tag}</p>
            </Badge>
          ))}
        </div>
        <h2 className="text-2xl font-medium text-center lg:text-left tracking-tight w-full hover:cursor-pointer hover:underline underline-offset-4">
          {title}
        </h2>
        <div className="flex flex-row items-center justify-center lg:justify-start space-x-3 lg:hidden">
          {tags.map((tag) => (
            <Badge variant="infoOutline" key={tag}>
              <p className="text-xs font-medium text-info">{tag}</p>
            </Badge>
          ))}
        </div>
        <p className="text-base text-center lg:text-left w-full max-h-[5rem] overflow-ellipsis">
          {description}
        </p>
        <Button variant="info" asChild size="sm">
          Read More
        </Button>
      </div>
    </div>
  );
}
