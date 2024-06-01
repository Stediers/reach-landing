import { FcConferenceCall, FcBullish } from "react-icons/fc";
import { CiTrophy } from "react-icons/ci";
import { MdOutlinePriceCheck } from "react-icons/md";
import ImageComponent from "@components/ImageComponent";
import { FaHandshake } from "react-icons/fa";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { BsShieldCheck } from "react-icons/bs";
import ReachSVG from "@components/svg/ReachSVG";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import FeatureCard from "@components/FeatureCard";
import SideComponent from "@components/SideComponent";
import FreelancerWhatsapp from "@public/images/freelancer-whatsapp.png";
import PhoneProfile from "@public/images/phone-profile.png";
import "@styles/globals.css";
import { MoveDownIcon, MoveRightIcon } from "lucide-react";
import { AspectRatio } from "@components/ui/aspect-ratio";

const iconStyle = "lg:w-24 lg:h-24 w-20 h-20";

export const metadata: Metadata = {
  title: {
    default: "ReachGig",
    template: "%s on ReachGig",
  },
  description:
    "Find the best services and partners for your needs. Empowering the Gig Economy.",
  // openGraph: {
  //   title: "ReachGig",
  //   description:
  //     "Find the best services and partners for your needs. Empowering the Gig Economy.",
  //   url: "https://reachgig.com",
  //   type: "website",
  //   images: [
  //     {
  //       url: "",
  //       width: 800,
  //       height: 600,
  //       alt: "ReachGig",
  //     },
  //   ],
  //   locale: "en_US",
  // },
};

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center scroll-smooth">
      <Index />
      <BecomeAPartner />
      <TransformationDesktop />
      <ByeByeScammers />
      <What />
    </div>
  );
}

function TransformationDesktop() {
  return (
    <HeaderWrapper
      title="The Potential"
      className="items-center justify-center w-full flex flex-col space-y-16 max-w-7xl lg:px-10 px-5"
      id="who-we-are-and-what-we-do"
    >
      <div className="grid gap-10 lg:grid-cols-3 w-full justify-items-center items-center">
        <ImageComponent
          alt="freelancer-whatsapp"
          src={FreelancerWhatsapp}
          className="lg:w-[20rem] h-[40rem] !object-contain w-full !rounded-lg overflow-hidden"
          priority
          objectFit="contain"
          border={false}
        />
        <div
          className="lg:flex flex-col items-center justify-center space-y-5 w-full hidden"
          hidden
        >
          <MoveRightIcon className="lg:w-24 lg:h-24 w-20 h-20 text-primary" />
          <p className="lg:text-lg text-md text-center max-w-xl">
            Convert in a matter of minutes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-5 lg:hidden">
          <p className="lg:text-lg text-lg text-center max-w-xl">
            Convert in a matter of minutes
          </p>
          <MoveDownIcon className="lg:w-24 lg:h-24 w-20 h-20 text-primary" />
        </div>
        {/* <iframe
          src="https://customer.reachgig.com/service/b52989ea-1448-42cd-8d52-c808d0dedbe4"
          className="lg:w-[22rem] w-full h-[40rem] border-primary border-2 cursor-no-drop pointer-events-none rounded-lg"
          allow="autoplay; fullscreen"
          allowFullScreen
        /> */}
        <ImageComponent
          alt="phone-profile"
          src={PhoneProfile}
          className="lg:w-[20rem] h-[40rem] !object-contain w-full !rounded-lg overflow-hidden"
          priority
          objectFit="contain"
          border={false}
        />
      </div>
    </HeaderWrapper>
  );
}

function ByeByeScammers() {
  return (
    <section
      className="flex flex-col items-center justify-center w-full lg:min-h-[70vh] min-h-[50vh] bg-success px-10 lg:px-0"
      id="Index"
    >
      <div className="flex flex-col items-center justify-start w-full max-w-7xl space-y-5">
        <BsShieldCheck className="lg:w-24 lg:h-24 w-20 h-20 text-white" />
        <h3 className="lg:text-5xl text-3xl font-bold text-white">
          Bye Bye Scammers
        </h3>
        <p className="text-lg text-center max-w-xl text-white">
          We have a strict verification process to ensure that only genuine
          service providers are listed on ReachGig.
        </p>
        <div className="flex flex-col items-center justify-center space-y-5 lg:space-y-0 lg:flex-row lg:space-x-5 pt-5">
          <Button asChild variant="outline">
            <Link href="/verification">How does it work?</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BecomeAPartner() {
  return (
    <HeaderWrapper
      title="Grow with us"
      className="items-center justify-center w-full flex flex-col lg:space-y-16 space-y-10"
      id="who-we-are-and-what-we-do"
    >
      <div className="grid gap-10 px-5 lg:grid-cols-2 lg:px-10 justify-items-center">
        <SideComponent
          title="Your own Profile"
          description="Get your own profile page to showcase your services and expertise."
          imageUrl="/images/brand-yourself.svg"
        />
        <SideComponent
          title="Less Ghosting"
          description="Let your customer know what, how and when you offer your services before they reach out to you. This will help you get more genuine leads."
          imageUrl="/images/ghost.svg"
        />
        <SideComponent
          title="Be Discovered"
          description="We enable you and your services to be found on Google and other search engines. This enhances your online presence."
          imageUrl="/images/discover.svg"
        />
        <SideComponent
          title="Get Paid on Time"
          description="Get paid for your services. No more chasing payments. We take care of it for you."
          imageUrl="/images/paid.svg"
        />
        <SideComponent
          title="Customer Reviews"
          description="Get genuine reviews from your customers, helping you build your reputation and credibility."
          imageUrl="/images/review.svg"
        />
        {/* <SideComponent
          title="Join the Community"
          description="Leverage our social media to connect with other experts in your field and grow your business."
          imageUrl="/images/community.svg"
        /> */}
      </div>
      <Button asChild variant="success" className="w-fit">
        <Link href="https://partner.reachgig.com" className="w-fit">
          Get Started
        </Link>
      </Button>
    </HeaderWrapper>
  );
}

function What() {
  return (
    <HeaderWrapper
      title="What we Do"
      className="items-center justify-center w-full flex flex-col space-y-16"
      id="who-we-are-and-what-we-do"
    >
      <div className="lg:grid grid-cols-3 lg:gap-x-10 lg:gap-y-10 w-full lg:justify-items-center flex flex-col items-start justify-center space-y-10 lg:space-y-0">
        <FeatureCard
          icon={<CiTrophy className={`${iconStyle} text-yellow-500`} />}
          heading="Level up"
          description="Improve how your present your services to your customers."
        />
        <FeatureCard
          icon={<FaHandshake className={`${iconStyle} text-green-500`} />}
          heading="Effective Communication"
          description="Lets bridge the gap between the service providers and the customers."
        />
        <FeatureCard
          icon={
            <MdOutlinePriceCheck className={`${iconStyle} text-blue-500`} />
          }
          heading="Price is Right"
          description="Find the right price for your services and get paid on time."
        />
        <FeatureCard
          icon={<FcConferenceCall className={iconStyle} />}
          heading="Community"
          description="Learn from other experts in your field and grow your business."
        />
        <FeatureCard
          icon={<FcBullish className={iconStyle} />}
          heading="Get the job done"
          description="Quick and seamless process to get the job done with ease."
        />
      </div>
    </HeaderWrapper>
  );
}

function Index() {
  const partnerLink = process.env.NEXT_PUBLIC_PARTNER_LINK || "/user/sign-up";
  const customerLink = process.env.NEXT_PUBLIC_CUSTOMER_LINK || "/user/sign-up";
  return (
    <section
      className="flex flex-col items-center justify-center w-full min-h-[75vh] relative"
      id="Index"
    >
      <div className="flex lg:flex-row flex-col items-center lg:justify-between justify-start space-y-10 lg:space-y-0 w-full max-w-7xl px-5 py-10 lg:px-16">
        <div className="flex flex-col lg:items-start items-center justify-center space-y-5">
          <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 lg:items-start">
            <div className="flex">
              <ReachSVG color="#f40e1e" className="w-40" />
            </div>
            <h1 className="lg:text-5xl text-3xl font-bold lg:text-left text-center">
              <span className="text-primary leading-relaxed">
                Brand Yourself
              </span>{" "}
              <br />
              the right way
            </h1>
            <p className="text-lg text-center">Stand out to your clients</p>
          </div>
          <div className="grid grid-cols-1 gap-5 pt-5">
            <Button asChild variant="success">
              <Link href={partnerLink}>Start your Journey</Link>
            </Button>
            {/* <Button asChild variant="outline">
              <Link href={`${customerLink}`}>Find Services</Link>
            </Button> */}
          </div>
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="!rounded-2xl lg:w-[40rem] lg:h-full w-full h-[15rem] overflow-hidden"
        >
          <source src="/videos/home-page.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* <div className="w-full lg:absolute flex justify-center !object-cover items-center overflow-hidden relative">
          <video autoPlay loop muted playsInline className="w-full h-full">
            <source src="/videos/home-page.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
      </div>
    </section>
  );
}
