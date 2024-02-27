import { FcHome, FcBusinessman, FcCalendar, FcBriefcase } from "react-icons/fc";
import { MdLocalOffer } from "react-icons/md";

export type Menu = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  path: string;
  newTab?: boolean;
};

export type SubMenu = {
  title: string;
  description: string;
  path: string;
  newTab?: boolean;
};

export const menus: Menu[] = [
  {
    title: "Pricing",
    subtitle: "View our pricing",
    icon: <FcCalendar className="text-3xl" />,
    path: "/pricing",
  },
  {
    title: "Blogs",
    subtitle: "Read our blogs",
    icon: <FcBriefcase className="text-3xl" />,
    path: "/blogs",
  },
];

export const legal: { title: string; href: string; description: string }[] = [
  {
    title: "Terms of Service",
    href: "/compliance/terms-of-service",
    description:
      "The rules and guidelines that users must agree to in order to use a service.",
  },
  {
    title: "Privacy Policy",
    href: "/compliance/privacy-policy",
    description:
      "A legal document that discloses how a website gathers, stores, and shares a user's data.",
  },
  {
    title: "Data Retention Policy",
    href: "/compliance/data-retention-policy",
    description:
      "A policy that outlines how long data is stored after the data is no longer needed.",
  },
  {
    title: "Refund Policy",
    href: "/compliance/refund-policy",
    description: "A document that outlines the terms of a refund.",
  },
  {
    title: "Chat Guidelines",
    href: "/compliance/chat-guidelines",
    description:
      "A set of rules and guidelines that users must agree to in order to use a chat service.",
  },
];

export const learn: { title: string; href: string; description: string }[] = [
  {
    title: "Bookings",
    href: "/bookings",
    description: "See how it works",
  },
  {
    title: "Verification",
    href: "/verification",
    description: "Verify your account",
  },
  {
    title: "Contact us",
    href: "/contact",
    description: "Need help?",
  },
  {
    title: "Chat",
    href: "/chat",
    description: "Connect with clients without leaking your contact",
  },
];
