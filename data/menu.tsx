import { AiFillDollarCircle } from "react-icons/ai";
import { FaUserEdit, FaUserShield } from "react-icons/fa";
import {
  FcBusiness,
  FcHome,
  FcBusinessman,
  FcCalendar,
  FcBriefcase,
  FcFeedback,
  FcFaq,
  FcEditImage,
} from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";
import { IoBagAddSharp } from "react-icons/io5";
import { MdLocalOffer } from "react-icons/md";

const baseConsolePath = "/console";
const baseLearnMorePath = "/learn-more";

export type Menu = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  path: string;
  submenus?: SubMenu[];
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
    title: "Dashboard",
    icon: <FcHome className="text-3xl" />,
    path: baseConsolePath,
    subtitle: "Go to home page",
  },
  {
    title: "My Appointments",
    subtitle: "Manage your appointments",
    icon: <FcCalendar className="text-3xl" />,
    path: baseConsolePath + "/appointments",
    submenus: [
      {
        title: "View Appointments",
        description: "View your appointments here",
        path: baseConsolePath + "/appointments",
      },
    ],
  },
  {
    title: "My Profile",
    subtitle: "Manage your profile",
    icon: <FcBusinessman className="text-3xl" />,
    path: baseConsolePath + "/profile",
    submenus: [
      {
        title: "View Profile",
        description: "View your profile here",
        //edit to profile
        path: baseConsolePath + "/profile",
      },
      {
        title: "Manage Profile",
        description: "Manage your profile here",
        path: baseConsolePath + "/profile",
      },
      {
        title: "Edit Profile",
        description: "Edit your profile here",
        path: baseConsolePath + "/profile/edit",
      },
      {
        title: "Manage Addresses",
        description: "Manage your addresses here",
        path: baseConsolePath + "/profile/manage-addresses",
      },
    ],
  },
  {
    title: "My Services",
    subtitle: "Manage your services",
    icon: <FcBriefcase className="text-3xl" />,
    path: baseConsolePath + "/services",
    submenus: [
      {
        title: "View Services",
        description: "View your services here",
        path: baseConsolePath + "/services",
      },
      {
        title: "Add New Service",
        description: "Add a new service here",
        path: baseConsolePath + "/services/add-service",
        newTab: true,
      },
    ],
  },
  // {
  //   title: "My Add-Ons",
  //   subtitle: "Manage your add-ons",
  //   icon: <IoBagAddSharp className="text-3xl text-indigo-500" />,
  //   path: baseConsolePath + "/services/add-ons",
  // },
  {
    title: "My Offers",
    subtitle: "Manage your offers",
    icon: <MdLocalOffer className="text-3xl" />,
    path: baseConsolePath + "/services/offers",
  },
  // {
  //   title: "Analytics",
  //   subtitle: "View your analytics",
  //   icon: <FcPositiveDynamic className="text-3xl" />,
  //   path: baseConsolePath + "/analytics",
  // },
  // {
  //   title: "Analytics",
  //   subtitle: "View your analytics",
  //   icon: <FcPositiveDynamic className="text-3xl" />,
  //   path: baseConsolePath + "/analytics",
  // },
  // {
  //   title: "Booking Requests",
  //   subtitle: "Manage your booking requests",
  //   icon: <FcCollaboration className="text-3xl" />,
  //   path: baseConsolePath + "/booking-requests",
  //   count: 3,
  // },
];

export const LearnMoreMenus = [
  {
    title: "Appointments",
    subtitle: "Learn more about appointments",
    icon: <FcCalendar className="text-3xl" />,
    path: baseLearnMorePath + "/appointments",
  },
  {
    title: "Services",
    subtitle: "Learn more about services",
    icon: <FcBriefcase className="text-3xl" />,
    path: baseLearnMorePath + "/services",
  },
  {
    title: "Prices",
    subtitle: "Learn more about prices",
    icon: <AiFillDollarCircle className="text-3xl" />,
    path: baseLearnMorePath + "/prices",
  },
  {
    title: "Profile",
    subtitle: "Learn more about profile",
    icon: <FcBusinessman className="text-3xl" />,
    path: baseLearnMorePath + "/profile",
  },
  {
    title: "Addresses",
    subtitle: "Learn more about addresses",
    icon: <HiLocationMarker className="text-3xl" />,
    path: baseLearnMorePath + "/addresses",
  },

  {
    title: "Color codes",
    subtitle: "Learn about color codes",
    icon: <FcFaq className="text-3xl" />,
    path: baseLearnMorePath + "/color-code",
  },

  {
    title: "Feedback",
    subtitle: "Learn about our feedback system.",
    icon: <FcFeedback className="text-3xl" />,
    path: baseLearnMorePath + "/feedback",
  },

  // {
  //   title: "Verification",
  //   subtitle: "Learn about our verification system.",
  //   icon: <FcApproval className="text-3xl" />,
  //   path: baseLearnMorePath + "/verification",
  // },
];
