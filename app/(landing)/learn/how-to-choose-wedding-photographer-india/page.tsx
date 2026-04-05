import { BlogCategory } from "@data/enums";
import { Metadata } from "next";
import {
  BlogList,
  BlogSubTitle,
  BlogText,
  BlogWrapper,
} from "@wrapper/BlogWrapper";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How to Choose the Right Wedding Photographer in India | Complete Guide 2025",
  description:
    "A complete guide to choosing the perfect wedding photographer in India. Learn about photography styles, pricing, portfolio evaluation, and red flags to avoid. Find verified photographers on ReachGig.",
  keywords:
    "wedding photographer India, how to hire photographer, wedding photography tips, bridal photography, wedding photographer cost",
  openGraph: {
    title:
      "How to Choose the Right Wedding Photographer in India | Complete Guide 2025",
    description:
      "A complete guide to choosing the perfect wedding photographer in India. Learn about photography styles, pricing, portfolio evaluation, and red flags to avoid.",
    type: "article",
    publishedTime: "2025-04-05T00:00:00.000Z",
    authors: ["ReachGig Team"],
    images: [
      {
        url: "/images/booking.svg",
        width: 1200,
        height: 630,
        alt: "How to Choose the Right Wedding Photographer in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Choose the Right Wedding Photographer in India | Complete Guide 2025",
    description:
      "A complete guide to choosing the perfect wedding photographer in India. Learn about photography styles, pricing, portfolio evaluation, and red flags to avoid.",
    images: ["/images/booking.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Choose the Right Wedding Photographer in India | Complete Guide 2025",
  description:
    "A complete guide to choosing the perfect wedding photographer in India. Learn about photography styles, pricing, portfolio evaluation, and red flags to avoid.",
  author: {
    "@type": "Person",
    name: "ReachGig Team",
  },
  datePublished: "2025-04-05",
  image: "/images/booking.svg",
  publisher: {
    "@type": "Organization",
    name: "ReachGig",
    url: "https://reachgig.com",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5">
        <BlogWrapper
          readTime={8}
          date={{
            day: 5,
            month: "April",
            year: 2025,
          }}
          tags={[BlogCategory.TIPS]}
          title="How to Choose the Right Wedding Photographer in India | Complete Guide 2025"
          imageUrl="/images/booking.svg"
          link="/makeup-artist-price-guide-india"
          authors={[
            {
              name: "ReachGig Team",
              link: "https://reachgig.com",
            },
          ]}
        >
          <BlogText>
            Your wedding photographs are the one investment that actually
            appreciates in value over time. Unlike the flowers, the food, or the
            decor, your photos are what you&apos;ll revisit for decades. Choosing
            the right wedding photographer in India can feel overwhelming given
            the sheer number of options available today, but this guide will walk
            you through every step so you can make a confident, informed
            decision.
          </BlogText>

          <BlogSubTitle title="Why Your Choice of Wedding Photographer Matters">
            <BlogText>
              A skilled wedding photographer does far more than point a camera
              and click. They anticipate moments, manage lighting in challenging
              venues, and tell the story of your day in a way that feels
              authentic and emotional. A poor choice, on the other hand, can
              leave you with blurry images, missed moments, and lasting regret.
            </BlogText>
            <BlogText>
              Indian weddings are uniquely complex &mdash; multiple ceremonies
              spanning several days, varying lighting conditions from haldi to
              reception, and large guest lists that demand a photographer who can
              handle chaos gracefully. This is not a place to cut corners.
              Investing time in finding the right photographer pays off far more
              than spending extra on decor or catering.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Define Your Photography Style">
            <BlogText>
              Before you start browsing portfolios, get clear on the style you
              want. <strong>Candid photography</strong> captures unscripted,
              natural moments &mdash; the tears during the vidaai, the laughter
              during sangeet. <strong>Traditional photography</strong> focuses on
              posed, well-lit group shots and formal portraits that your family
              will love.
            </BlogText>
            <BlogText>
              <strong>Cinematic photography</strong> blends photojournalism with
              dramatic framing, often resulting in magazine-quality images.{" "}
              <strong>Drone photography</strong> is increasingly popular for
              capturing grand outdoor venues, baraat processions, and aerial
              shots of large gatherings. Many couples opt for a mix of two or
              more styles, so discuss this with your photographer upfront to
              ensure their strengths align with your vision.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="How to Check a Photographer's Portfolio">
            <BlogText>
              A portfolio should show consistency, not just a handful of
              exceptional shots. Look at full wedding albums rather than
              highlight reels &mdash; this tells you what the photographer
              delivers across an entire event, not just their best 10 photos.
              Pay attention to how they handle low-light situations like
              mehendi nights and indoor temple ceremonies.
            </BlogText>
            <BlogText>
              Check whether the editing style matches your preference &mdash;
              some photographers lean heavily into warm, saturated tones while
              others prefer muted, film-like aesthetics. Also look for
              storytelling: do the images flow naturally from getting-ready shots
              to the ceremony to the reception? A great photographer builds a
              narrative, not just a collection of pretty pictures.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Questions to Ask Before Booking">
            <BlogText>
              Start with experience: how many Indian weddings have they shot, and
              are they familiar with the specific rituals of your community
              (whether it&apos;s a South Indian wedding, a Punjabi wedding, or a
              Bengali ceremony)? Ask about their equipment &mdash; do they carry
              backup camera bodies and lenses? Equipment failure during a wedding
              is not uncommon, and a professional should always have a backup
              plan.
            </BlogText>
            <BlogText>
              Clarify deliverables in detail: how many edited photos will you
              receive, what is the turnaround time, do you get RAW files, and is
              an album included in the package? Ask whether they have shot at
              your venue before, as familiarity with a venue&apos;s lighting and
              layout can make a significant difference in the final output.
              Finally, understand their cancellation and refund policy before
              signing anything.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Understanding Pricing — What's Fair?">
            <BlogText>
              Wedding photography pricing in India varies enormously. For a
              single-day event, budget photographers charge between ₹15,000 and
              ₹40,000, mid-range professionals charge ₹50,000 to ₹1,00,000, and
              premium or celebrity photographers can charge ₹2,00,000 and above.
              Multi-day weddings naturally cost more, and destination weddings
              include travel and accommodation surcharges.
            </BlogText>
            <BlogText>
              What affects cost the most is the photographer&apos;s experience,
              the number of shooting days, the size of their team (lead shooter
              plus assistants), whether videography is bundled, and post-production
              complexity. Always ask for an itemized quote so you understand
              exactly what you&apos;re paying for. Be cautious of quotes that
              seem too good to be true &mdash; they often come with hidden costs
              or compromised quality.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Red Flags to Watch Out For">
            <BlogText>
              Avoid any photographer who refuses to provide a written contract.
              A contract protects both parties and should clearly outline
              deliverables, timelines, payment terms, and cancellation policies.
              If a photographer has no backup equipment plan, that&apos;s a
              serious risk &mdash; camera failures happen, and professionals plan
              for them.
            </BlogText>
            <BlogText>
              Be wary of unrealistic promises like &ldquo;we&apos;ll deliver
              5,000 edited photos in one week&rdquo; or photographers who are
              unwilling to show you full albums from past weddings. Also watch
              out for those who demand full payment upfront with no milestone
              structure. A standard payment plan is 30-50% advance with the
              balance due upon delivery of the final album.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Where to Find Verified Wedding Photographers">
            <BlogText>
              Finding a trustworthy photographer is easier when you use a
              platform that vets professionals.{" "}
              <Link href="/vendors" className="text-blue-600 underline">
                Browse verified wedding photographers on ReachGig
              </Link>{" "}
              to compare portfolios, read reviews, and connect directly with
              professionals in your city. Unlike generic listing sites, ReachGig
              focuses on verified service providers so you can book with
              confidence.
            </BlogText>
            <BlogText>
              You can also explore{" "}
              <Link href="/" className="text-blue-600 underline">
                ReachGig&apos;s homepage
              </Link>{" "}
              to discover a wide range of wedding services beyond photography,
              including makeup artists, decorators, and mehndi artists &mdash;
              all in one place. Having your vendor team on a single platform
              simplifies coordination and communication significantly.
            </BlogText>
          </BlogSubTitle>

          <BlogSubTitle title="Final Checklist Before You Book">
            <BlogList
              list={[
                "Shortlist at least 3 photographers and compare full wedding albums, not just highlights.",
                "Confirm the photography style matches your vision (candid, traditional, cinematic, or a mix).",
                "Ask about backup equipment and a second shooter for large events.",
                "Get a written contract with clear deliverables, timelines, and payment milestones.",
                "Verify pricing includes all costs — travel, accommodation, editing, album, and extras.",
                "Check online reviews and ask for references from past clients.",
                "Confirm turnaround time for edited photos and album delivery.",
                "Discuss the cancellation and refund policy before making any advance payment.",
              ]}
            />
          </BlogSubTitle>
        </BlogWrapper>
      </div>
    </>
  );
}
