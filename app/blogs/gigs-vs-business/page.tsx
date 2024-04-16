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
import Link from "next/link";

export const metadata: Metadata = {
  title: "Exploring the World of Work: Owning a Business vs Doing Gigs",
  description:
    "In today's dynamic economy, individuals have more options than ever when it comes to earning a living. Two popular paths that many people consider are owning a business and doing gigs. Each option offers its own set of advantages and disadvantages, and understanding the differences can help you make an informed decision about your career path. #gigworker #business #businessman #businessowner #giglife",
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5">
      <BlogWrapper
        readTime={5}
        date={{
          day: 16,
          month: "April",
          year: 2024,
        }}
        tags={[BlogCategory.INFORMATION]}
        title="Exploring the World of Work: Owning a Business vs Doing Gigs"
        imageUrl="/images/gigvb.svg"
        link="/gigs-vs-business"
        authors={[
          {
            name: "Deepakindresh NG",
            link: "https://www.instagram.com/deepakintherace/",
          },
        ]}
      >
        <BlogText>
          In today&apos;s dynamic economy, individuals have more options than
          ever when it comes to earning a living. Two popular paths that many
          people consider are owning a business and doing gigs. Each option
          offers its own set of advantages and disadvantages, and understanding
          the differences can help you make an informed decision about your
          career path.
        </BlogText>
        <BlogSubTitle title="Doing Gigs">
          <BlogList
            list={[
              "Flexibility: Gigs offer flexibility in terms of work schedule, location, and project choice, allowing individuals to work when and where they want.",
              "Variety: Gig work provides opportunities to work on diverse projects, collaborate with different clients or companies, and gain experience in various industries or sectors.",
              "Low Barrier to Entry: Many gig opportunities have low barriers to entry, requiring minimal upfront investment or specialized skills. This makes gig work accessible to a wide range of individuals, including students, retirees, and freelancers.",
              "Work-Life Balance: Gig work can offer better work-life balance and autonomy, allowing individuals to prioritize personal time, family commitments, or other interests while earning an income.",
              "Skill Development: Gigs offer opportunities for skill development, learning, and professional growth and do only what you love and not have the hastle to do unecessary work.",
              "Lack of Benefits: Gig workers typically do not receive traditional employee benefits such as health insurance, retirement plans, paid leave, or job security. But don't worry, we got you covered ;)",
              "Income Instability: Gig work can be unpredictable, with fluctuating income levels and inconsistent work opportunities. But this is no different from owning a business, right?",
              "Independence: Gig workers have autonomy and independence in managing their work, setting their rates, and choosing their clients or projects.",
            ]}
          ></BlogList>
        </BlogSubTitle>
        <BlogSubTitle title="Owning a Business">
          <BlogList
            list={[
              "Control: As a business owner, you have full control over decision-making processes, including business operations, finances, and strategic direction.",
              "Potential for Growth: Owning a business offers the potential for significant growth and scalability, allowing you to expand your operations, hire employees, and increase profits over time.",
              "Long-term Stability: A successful business can provide long-term stability and financial security, as well as the potential for wealth accumulation and asset ownership.",
              "Risk and Uncertainty: Entrepreneurship involves inherent risks and uncertainties, including financial risks, market volatility, and business failure. There's no guarantee of success, and failure can result in significant financial losses.",
              "Time and Commitment: Running a business requires a considerable time commitment, dedication, and hard work. Business owners often need to invest long hours and sacrifice personal time to manage and grow their ventures.",
              "Financial Investment: Starting and operating a business requires a substantial financial investment, including startup costs, operating expenses, and potential debt or financing obligations.",
              "Responsibility and Stress: Business owners bear significant responsibility for the success and viability of their ventures, handle investors, which can lead to high levels of stress, pressure, and burnout.",
              "Legal and Regulatory Compliance: Businesses must comply with various legal and regulatory requirements, including tax laws, licensing, permits, and industry regulations.",
            ]}
          ></BlogList>
        </BlogSubTitle>
        <BlogSubTitle title="Conclusion">
          <BlogText>
            In conclusion, both owning a business and doing gigs offer unique
            opportunities and challenges. The choice between them depends on
            individual preferences, goals, and circumstances. Whether
            you&apos;re drawn to the stability of business ownership or the
            flexibility of gig work, it&apos;s essential to weigh the pros and
            cons carefully before making a decision about your career path.
          </BlogText>
        </BlogSubTitle>
      </BlogWrapper>
    </div>
  );
}
