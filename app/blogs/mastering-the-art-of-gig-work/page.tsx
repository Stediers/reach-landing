import { BlogCategory, State } from "@data/enums";
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import {
  BlogList,
  BlogSubTitle,
  BlogText,
  BlogWrapper,
} from "@wrapper/BlogWrapper";

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
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5">
      <BlogWrapper
        readTime={5}
        date={{
          day: 27,
          month: 2,
          year: 2024,
        }}
        tags={[BlogCategory.TIPS]}
        title="Mastering the Art of Gig Work: Best Practices for Seamless Client Transactions"
        imageUrl="/images/booking.svg"
        link="/how-to-get-the-best-services"
        authors={[
          {
            name: "DeepakIndresh Narayana Gandhi",
            link: "https://www.linkedin.com/in/deepakindresh-n/",
          },
        ]}
      >
        <BlogText>
          The best service is the one that fulfills your needs. It is the one
          that fits your budget and is of the highest quality. The best service
          is the one that fulfills your needs. It is the one that fits your
          budget and is of the highest quality. The best service is the one that
          fulfills your needs. It is the one that fits your budget and is of the
          highest quality. The best service is the one that fulfills your needs.
          It is the one that fits your budget and is of the highest quality. The
          best service is the one that fulfills your needs. It is
        </BlogText>
        <BlogSubTitle title="What is the best service?">
          <BlogText>
            The best service is the one that fulfills your needs. It is the one
            that fits your budget and is of the highest quality The best service
            is the one that fulfills your needs. It is the one that fits your
            budget and is of the highest quality The best service is the one
          </BlogText>
        </BlogSubTitle>
        <BlogSubTitle title="How to get the best service?">
          <BlogText>
            The best service is the one that fulfills your needs. It is the one
            that fits your budget and is of the highest quality The best service
            is the one that fulfills your needs. It is the one that fits your
            budget and is of the highest quality The best service is the one
          </BlogText>
        </BlogSubTitle>
        <BlogSubTitle title="How to get the best service?">
          <BlogList
            list={[
              "The best service is the one that fulfills your needs",
              "It is the one that fits your budget and is of the highest quality",
              "The best service is the one that fulfills your needs",
              "It is the one that fits your budget and is of the highest quality",
            ]}
          />
        </BlogSubTitle>
      </BlogWrapper>
    </div>
  );
}
