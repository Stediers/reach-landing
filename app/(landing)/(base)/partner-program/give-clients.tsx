import FeatureCard from "@components/FeatureCard";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import { Phone, StarsIcon, Calendar, Clock, CreditCard } from "lucide-react";
import { FaSuitcase } from "react-icons/fa";
import * as motion from "motion/react-client";

export function GiveClients() {
  const features = [
    {
      heading: "Service Catalog",
      description: "Mention what you offer with its price and duration.",
      icon: <FaSuitcase size={40} />,
    },
    {
      heading: "Easy Contact",
      description: "Give your clients numerous ways to contact you.",
      icon: <Phone size={40} />,
    },
    {
      heading: "Trustable Reviews",
      description: "Let your clients leave a review for your services.",
      icon: <StarsIcon size={40} />,
    },
    {
      heading: "Online Booking",
      description:
        "Allow clients to schedule appointments directly through your website.",
      icon: <Calendar size={40} />,
    },
    {
      heading: "Real-time Availability",
      description: "Display your up-to-date schedule and availability slots.",
      icon: <Clock size={40} />,
    },
    {
      heading: "Secure Payments",
      description: "Accept payments and deposits through various methods.",
      icon: <CreditCard size={40} />,
    },
  ];

  return (
    <HeaderWrapper
      title={
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.2,
          }}
          className="!leading-snug"
        >
          Give Clients
          <br />
          <span className="text-primary">what they want</span>
        </motion.span>
      }
      mobileAlign="center"
      desktopAlign="center"
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 w-full">
        {features.map((feature, index) => (
          <motion.div
            key={feature.heading}
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.8, // Increased visibility requirement
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.2,
            }}
          >
            <FeatureCard
              heading={feature.heading}
              description={feature.description}
              icon={feature.icon}
            />
          </motion.div>
        ))}
      </div>
    </HeaderWrapper>
  );
}
