import LandingWrapper from "@wrapper/LandingWrapper";
import { State } from "@data/enums";
import { useEffect } from "react";
import Card from "@components/Card";
import Button from "@components/Button";

export default function Main() {
  useEffect(() => {
    // scroll to top of page on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingWrapper
      title="Reach"
      showFooter={true}
      state={State.SUCCESS}
      className="relative flex flex-col items-center justify-center scroll-smooth lg:p-10 p-5"
      showNavbar={true}
    >
      {/* <PricingSection /> */}
      <div className="flex flex-col items-center justify-center space-y-10 w-full">
        <p className="text-3xl font-semibold text-center">Pricing</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
          <PricingCard
            title="Basic"
            commission={0}
            description="Get in touch with partners for free and have your needs met. Feel free to explore the platform."
            features={["No booking fee", "Unlimited Partners to connect with"]}
            nonFeatures={[
              "Lack of partner verification",
              "No dedicated support",
            ]}
          />
          <PricingCard
            title="Standard"
            commission={10}
            description="Create bookings on the platform and get a dedicated support to assist you with your bookings."
            features={[
              "All Basic features",
              "Dedicated Customer Support",
              "Know your partner's verification status",
              "Give Feedback on partner's performance",
              "Get a Standard Badge",
            ]}
            nonFeatures={[]}
            isPopular
            // plus="Basic"
          />
          <PricingCard
            title="Pro"
            commission={20}
            description="Find the best partners for your needs and have 100% cashback if you are not satisfied."
            features={[
              "All Standard features",
              "Dedicated Relationship Manager",
              "Complete cashback if you are not satisfied",
              "Know your partner's verification status and any other information you need",
              "Get a Pro Badge",
            ]}
            nonFeatures={[]}
            // plus="Standard"
          />
        </div>
      </div>
    </LandingWrapper>
  );
}

interface PricingProps {
  title: string;
  description: string;
  commission: number;
  features: string[];
  nonFeatures: string[];
  isPopular?: boolean;
  plus?: string;
}

function PricingCard(props: PricingProps) {
  return (
    <Card className="!px-10 !pt-10 !pb-10 flex flex-col !space-y-5 justify-between relative">
      {props.isPopular ? (
        <span className="bg-success text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl font-medium">
          MOST POPULAR
        </span>
      ) : (
        <span className="hidden text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl font-medium">
          BASIC
        </span>
      )}
      <div className="flex flex-col items-start justify-start space-y-3 w-full pb-3">
        <div className="flex items-center justify-start space-x-2">
          <h1 className="text-xl font-medium">{props.title}</h1>
          {props.plus && (
            <div className="flex items-center justify-center space-x-1">
              <span className="text-sm font-semibold">+</span>
              <span className="text-sm font-semibold">{props.plus}</span>
            </div>
          )}
        </div>
        <h2 className="text-sm tracking-wider title-font mb-1 font-medium">
          {props.description}
        </h2>
        <div className="flex items-center justify-start space-x-2 pt-5">
          <span className="text-[3rem] text-gray-700 font-semibold">
            {props.commission}
          </span>
          <span className="block text-[2rem] font-semibold">%</span>
          <span className="text-textsubtle font-medium">
            of the partner&apos;s fee
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-4 w-full pt-5 pb-5 justify-start h-full">
        <ul className="flex flex-col space-y-4">
          {props.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-success font-semibold">&#10003;</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col space-y-4">
          {props.nonFeatures.map((nonFeature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-error font-semibold">&#10005;</span>
              <span className="text-textsubtle">{nonFeature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button text="Claim Now" className="bg-info text-white" link="/signup" />
    </Card>
  );
}

interface PricingOptionProps {
  title: string;
  percentage?: number;
  features: string[];
  nonFeatures: string[];
  isPopular?: boolean;
  subtitle?: string;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  title,
  percentage,
  features,
  isPopular,
  subtitle,
  nonFeatures,
}) => {
  return (
    <div
      className={`p-4 xl:w-1/3 md:w-1/2 w-full ${
        isPopular ? "border-indigo-500" : "border-gray-300"
      }`}
    >
      <div className="min-h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden justify-between">
        {isPopular && (
          <span className="bg-primary text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl font-medium">
            MOST POPULAR
          </span>
        )}
        <div className="flex flex-col items-start justify-center space-y-2 w-full pb-3">
          <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
            {title}
          </h2>
          <h1 className="text-4xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none flex justify-start items-center w-full">
            <span className="font-medium text-4xl">{percentage}</span>
            <span className="text-xl ml-1 font-normal text-gray-500">%</span>
            <span className="text-base ml-3 font-medium">
              of the partner&apos;s fee
            </span>
          </h1>
          <div className="flex flex-col space-y-4 w-full pt-5">
            <ul className="flex flex-col space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-success font-semibold">&#10003;</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col space-y-4">
              {nonFeatures.map((nonFeature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-error font-semibold">&#10005;</span>
                  <span className="text-textsubtle">{nonFeature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm pt-5">
          {subtitle ? subtitle : "Lorem ipsum dolor sit amet consectetur."}
        </p>
      </div>
    </div>
  );
};

function PricingSection() {
  return (
    <section className="body-font overflow-hidden">
      <div className="container mx-auto flex flex-col space-y-10">
        <div className="flex flex-col text-center w-full space-y-5">
          <h1 className="sm:text-4xl text-3xl font-medium">Pricing</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-md text-gray-500">
            This Fee Structure helps us to keep the lights on and also minimize
            the cost for our users.
          </p>
        </div>
        <div className="flex flex-wrap w-full">
          <PricingOption
            title="BASIC"
            percentage={0}
            features={[
              "No booking fee",
              "Unlimited Partners to connect with",
              "Give Feedback",
              "Get a Basic Badge",
            ]}
            nonFeatures={[
              "Lack of partner verification",
              "No dedicated support",
            ]}
            subtitle="For individuals trying out Reach"
          />
          <PricingOption
            title="STANDARD"
            percentage={10}
            features={[
              "Pay a booking fee of 10%",
              "Dedicated Customer Support",
              "Know your partner's verification status",
              "Give Feedback on partner's performance",
              "Get a Pro Badge",
            ]}
            nonFeatures={[]}
            isPopular
            subtitle="For individuals looking to get the best out of Reach"
          />
          <PricingOption
            title="PRO"
            percentage={20}
            features={[
              "Pay a booking fee of 20%",
              "Dedicated Relationship Manager",
              "Know your partner's verification status and any other information you need",
              "Give Feedback on partner's performance",
              "Get a Business Badge",
            ]}
            nonFeatures={[]}
            subtitle="For businesses with more than 5 employees"
          />
        </div>
      </div>
    </section>
  );
}

interface OrganizationSubscriptionProps {
  title: string;
  discountPercentage: number;
  advantages: string[];
  phoneNumber: string;
}

const OrganizationSubscription: React.FC<OrganizationSubscriptionProps> = ({
  title,
  discountPercentage,
  advantages,
  phoneNumber,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-start lg:space-y-12">
      <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 className="text-2xl text-text font-semibold md:text-4xl">
          {title}
        </h2>
      </div>
      <Card className="flex items-center justify-center lg:max-w-[400px] lg:!p-5">
        <h3 className="text-3xl font-semibold text-center">Booking Fee</h3>
        <div className="relative flex flex-col items-center justify-center space-y-0">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-[5rem] text-gray-700 font-bold">
              {discountPercentage}
            </span>
            <span className="block text-[4rem] font-bold">%</span>
          </div>
          <span className="text-textsubtle font-medium">(Capped at 800)</span>
        </div>
        <ul role="list" className="w-full space-y-4 py-6 m-auto text-gray-600">
          {advantages.map((advantage, index) => (
            <li key={index} className="space-x-2">
              <span className="text-primary font-semibold">&#10003;</span>
              <span>{advantage}</span>
            </li>
          ))}
        </ul>
        <button
          type="submit"
          title="Submit"
          className="block w-full py-3 px-6 text-center rounded-xl transition bg-primary hover:bg-primarydark"
        >
          <span className="text-white font-semibold">Send us an email</span>
        </button>
      </Card>
    </div>
  );
};
