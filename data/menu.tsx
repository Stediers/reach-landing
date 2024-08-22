import {
  Search,
  Phone,
  SearchIcon,
  SearchSlashIcon,
  SearchCodeIcon,
  BookIcon,
} from "lucide-react";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { FcHome, FcBusinessman, FcCalendar, FcBriefcase } from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";

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
    title: "Blogs",
    subtitle: "Read our blogs",
    icon: <FcBriefcase className="text-3xl" />,
    path: "/learn",
  },
];

export const consoleMenus: Menu[] = [
  {
    title: "Browse",
    subtitle: "Search for services",
    icon: <Search className="w-6 h-6 shrink-0" />,
    path: "/explore",
  },
  {
    title: "Blogs",
    subtitle: "Read our blogs",
    icon: <BookIcon className="w-6 h-6 shrink-0" />,
    path: "/learn",
  },
  {
    title: "Search Partner",
    subtitle: "Find your specific partner",
    icon: <SearchCodeIcon className="w-7 h-7 shrink-0" />,
    path: "/explore/partner",
  },
];

export const userMenus: Menu[] = [
  {
    title: "My Profile",
    subtitle: "Manage your profile",
    icon: <AiOutlineUser className="text-2xl shrink-0" />,
    path: "/console/profile/",
  },
  {
    title: "Address",
    subtitle: "Manage your addresses",
    icon: <HiLocationMarker className="text-3xl shrink-0" />,
    path: "/console/profile/address",
  },
  {
    title: "My Callbacks",
    subtitle: "Request a callback",
    icon: <Phone className="w-5 h-5 shrink-0" />,
    path: "/console/callbacks",
  },
  {
    title: "My Appointments",
    subtitle: "Manage your appointments",
    icon: <FcBusinessman className="text-3xl" />,
    path: "/console/appointments",
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
  // {
  //   title: "Bookings",
  //   href: "/bookings",
  //   description:
  //     "Learn how and why choosing to book with us is the best decision",
  // },
  {
    title: "Verification",
    href: "/verification",
    description: "How do we verify our partners? Find out here",
  },
  {
    title: "Contact us",
    href: "/contact",
    description: "If you need anything, we are here to help",
  },
  // {
  //   title: "Chat",
  //   href: "/chat",
  //   description:
  //     "Our in platform chat is the safest way to communicate to partners before you know them",
  // },
];
