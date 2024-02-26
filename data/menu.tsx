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
    title: "About us",
    icon: <FcHome className="text-3xl" />,
    path: "/about-us",
    subtitle: "Go to home page",
  },
  {
    title: "Pricing",
    subtitle: "Manage your appointments",
    icon: <FcCalendar className="text-3xl" />,
    path: "/pricing",
  },
  {
    title: "Bookings",
    subtitle: "Manage your profile",
    icon: <FcBusinessman className="text-3xl" />,
    path: "/bookings",
  },
  {
    title: "Verification",
    subtitle: "Manage your services",
    icon: <FcBriefcase className="text-3xl" />,
    path: "/verification",
  },
  {
    title: "Blogs",
    subtitle: "Manage your offers",
    icon: <MdLocalOffer className="text-3xl" />,
    path: "/blogs",
  },
];
