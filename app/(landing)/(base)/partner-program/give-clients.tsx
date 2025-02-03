import FeatureCard from "@components/FeatureCard";
import HeaderWrapper from "@wrapper/HeaderWrapper";
import {
  Phone,
  StarsIcon,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  MessageSquare,
  User,
} from "lucide-react";
import { FaSuitcase } from "react-icons/fa";

export function GiveClients() {
  return (
    <HeaderWrapper
      title={
        <span className="!leading-snug">
          Give Clients
          <br />
          <span className="text-primary">what they want</span>
        </span>
      }
      mobileAlign="center"
      desktopAlign="center"
      className="items-center justify-center w-full flex flex-col space-y-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 w-full">
        <FeatureCard
          heading="Service Catalog"
          description="Mention what you offer with its price and duration."
          icon={<FaSuitcase size={40} />}
        />
        <FeatureCard
          heading="Easy Contact"
          description="Give your clients numerous ways to contact you."
          icon={<Phone size={40} />}
        />
        <FeatureCard
          heading="Trustable Reviews"
          description="Let your clients leave a review for your services."
          icon={<StarsIcon size={40} />}
        />
        <FeatureCard
          heading="Online Booking"
          description="Allow clients to schedule appointments directly through your website."
          icon={<Calendar size={40} />}
        />
        <FeatureCard
          heading="Real-time Availability"
          description="Display your up-to-date schedule and availability slots."
          icon={<Clock size={40} />}
        />
        <FeatureCard
          heading="Secure Payments"
          description="Accept payments and deposits through various methods."
          icon={<CreditCard size={40} />}
        />
      </div>
    </HeaderWrapper>
  );
}
