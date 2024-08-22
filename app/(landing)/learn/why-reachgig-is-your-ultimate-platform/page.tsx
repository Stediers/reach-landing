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
  title: "Why ReachGig Is Your Ultimate Platform",
  description:
    "Welcome to ReachGig, your gateway to a world of opportunities tailored specifically for Gig professionals like yourself. You might be wondering, 'What sets ReachGig apart from the sea of corporate websites out there?' Allow us to shed some light on that.",
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5">
      <BlogWrapper
        readTime={4}
        date={{
          day: 3,
          month: "March",
          year: 2024,
        }}
        tags={[BlogCategory.TIPS]}
        title="Why ReachGig Is Your Ultimate Platform"
        imageUrl="/images/why-reachgig-is-your-ultimate-platform.webp"
        link="/how-to-get-the-best-services"
        authors={[
          {
            name: "Deepakindresh Narayana Gandhi",
            link: "https://www.instagram.com/deepakintherace/",
          },
        ]}
      >
        <BlogText>
          Welcome to ReachGig, your gateway to a world of opportunities tailored
          specifically for Gig professionals like yourself. You might be
          wondering, &quot;What sets ReachGig apart from the sea of corporate
          websites out there?&quot; Allow us to shed some light on that.
        </BlogText>
        <BlogText>
          At ReachGig, we pride ourselves on being more than just another
          company site. We&apos;re a platform where your voice matters. Whether
          you have suggestions for new features, encounter challenges, or seek
          visibility promotions, we&apos;re here to listen and take action. Your
          needs are at the forefront of everything we do.
        </BlogText>
        <BlogText>
          Speaking of promotions, we believe in giving back to our community.
          That&apos;s why we offer free story features on Instagram to the first
          100 individuals who help spread the word about ReachGig by following
          us and tagging us in their stories. And rest assured, transparency is
          our policy – we&apos;ll provide proof of our promises every step of
          the way. Just don&apos;t forget to DM us ;)
        </BlogText>
        <BlogText>
          But it doesn&apos;t stop there. Our commitment to education means we
          regularly share valuable insights and resources to help you thrive in
          the Gig economy. From practical tips to industry trends, consider us
          your trusted ally on your professional journey.
        </BlogText>
        <BlogText>
          Now, you might be curious about our business model. Yes, we do earn a
          modest commission, but only when we deliver tangible results for you.
          And what do we do with those earnings? We reinvest them to expand
          <b>*OUR* Reach</b>, connecting you with even more potential clients
          and opportunities.
        </BlogText>
        <BlogText>
          At ReachGig, our mission is clear: to empower Gig professionals like
          you to succeed. We&apos;re not just another logo on your uniform –
          we&apos;re a partner invested in your success. So, come join us, and
          let&apos;s elevate your Gig experience together.
        </BlogText>
      </BlogWrapper>
    </div>
  );
}
