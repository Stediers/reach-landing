const baseUrl = "https://www.reachgig.com";

const blogs = [
  {
    slug: "how-to-choose-wedding-photographer-india",
    title: "How to Choose the Right Wedding Photographer in India",
    description:
      "Planning your wedding and looking for the perfect photographer? This complete guide covers everything from photography styles and portfolio evaluation to pricing ranges and red flags.",
  },
  {
    slug: "makeup-artist-price-guide-india",
    title: "Makeup Artist Price Guide India 2025 — How Much Does Bridal Makeup Cost?",
    description:
      "Wondering how much a makeup artist charges in India? This comprehensive price guide breaks down bridal makeup costs by city.",
  },
  {
    slug: "mehndi-design-trends-indian-weddings",
    title: "Top Mehndi Design Trends for Indian Weddings in 2025",
    description:
      "From minimalist elegance to portrait mehndi, discover the hottest bridal mehndi trends of 2025.",
  },
  {
    slug: "how-to-hire-dj-for-event",
    title: "How to Hire a DJ for Your Event in India — Complete Guide",
    description:
      "Learn how to choose the right DJ, what equipment to expect, typical pricing across Indian cities, and key questions to ask before you book.",
  },
  {
    slug: "freelancer-vs-agency-which-to-hire",
    title: "Freelancer vs Agency: Which Should You Hire?",
    description:
      "Not sure whether to hire a freelancer or an agency? This honest comparison breaks down costs, quality, communication, and flexibility.",
  },
  {
    slug: "questions-to-ask-before-booking-service-provider",
    title: "Top Questions to Ask Before Booking a Service Provider",
    description:
      "Don't book a service provider without asking these essential questions first.",
  },
  {
    slug: "staying-motivated-and-overcoming-freelance-burnout",
    title: "Staying Motivated and Overcoming Freelance Burnout",
    description:
      "Explore the phenomenon of freelance burnout, its causes, and how to overcome it and stay motivated.",
  },
  {
    slug: "financial-management-tips",
    title: "Financial Management Tips for the Freelancers of India",
    description:
      "Step-by-step tips to help freelancers manage their finances efficiently and navigate taxation in India.",
  },
  {
    slug: "gigs-vs-business",
    title: "Exploring the World of Work: Owning a Business vs Doing Gigs",
    description:
      "Understanding the differences between owning a business and doing gigs to help you make an informed decision.",
  },
  {
    slug: "safety-tips-for-gig-workers",
    title: "10 Safety Tips for Gig Workers in the Modern Economy",
    description:
      "Ten essential safety tips to help gig workers stay safe and secure in day-to-day work.",
  },
  {
    slug: "mental-health-and-wellbeing-for-freelancers",
    title: "The Ultimate Guide to Mental Health and Wellbeing for Solopreneurs",
    description:
      "How freelancers can avoid burnout and maintain mental health while working independently.",
  },
  {
    slug: "navigating-the-legal-maze",
    title: "Navigating the Legal Maze: A Guide for Freelancers",
    description:
      "A guide to the legal landscape of freelancing and gig work in India.",
  },
  {
    slug: "why-reachgig-is-your-ultimate-platform",
    title: "Why ReachGig is Your Ultimate Platform",
    description:
      "What sets ReachGig apart as the gateway to opportunities for Gig professionals.",
  },
  {
    slug: "india-the-land-of-gig-economy",
    title: "India: The Land of Gig Economy",
    description:
      "India is a land of opportunities, and the gig economy is booming. Here's what you need to know.",
  },
  {
    slug: "mastering-the-art-of-gig-work",
    title: "Mastering the Art of Gig Work: Best Practices for Seamless Client Transactions",
    description:
      "Adhering to best practices can elevate your professionalism and enhance client satisfaction.",
  },
];

export async function GET() {
  const items = blogs
    .map(
      (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${baseUrl}/learn/${blog.slug}</link>
      <description><![CDATA[${blog.description}]]></description>
      <guid isPermaLink="true">${baseUrl}/learn/${blog.slug}</guid>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ReachGig Blog</title>
    <link>${baseUrl}/learn</link>
    <description>Expert insights, tips and comprehensive guides for freelancers, gig workers, and customers hiring service providers in India.</description>
    <language>en-in</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
