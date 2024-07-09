import { AiFillAccountBook } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { ServiceCategory } from "./enums";

interface ServiceTypeInfo {
  title: string;
  description: string;
  icon?: IconType;
}

export const serviceTypeDescriptions: Record<ServiceCategory, ServiceTypeInfo> =
  {
    [ServiceCategory.FITNESS]: {
      title: "Fitness",
      description:
        "Services related to physical fitness, such as personal training, gym memberships, and fitness classes.",
      icon: AiFillAccountBook,
    },
    [ServiceCategory.BEAUTY]: {
      title: "Beauty",
      description:
        "Services related to beauty and personal care, including hairdressing, skincare, and makeup.",
      icon: AiFillAccountBook,
    },
    [ServiceCategory.VIDEOGRAPHY]: {
      title: "Videography",
      description:
        "Services related to capturing video content, such as filming events, creating promotional videos, and video editing.",
      icon: AiFillAccountBook,
    },
    [ServiceCategory.PHOTOGRAPHY]: {
      title: "Photography",
      description:
        "Services related to capturing still images, such as portrait photography, event photography, and photo editing.",
    },
    [ServiceCategory.MODELING]: {
      title: "Modeling",
      description:
        "Services related to modeling, including fashion modeling, commercial modeling, and runway modeling.",
    },
    [ServiceCategory.ACTING]: {
      title: "Acting",
      description:
        "Services related to acting, such as theatrical performances, film and television acting, and voice acting.",
    },
    [ServiceCategory.DANCING]: {
      title: "Dancing",
      description:
        "Services related to dance instruction, choreography, and performances, covering various dance styles and genres.",
    },
    [ServiceCategory.COOKING]: {
      title: "Cooking",
      description:
        "Services related to cooking, such as culinary classes, personal chefs, and catering services.",
    },
    [ServiceCategory.MUSIC]: {
      title: "Music",
      description:
        "Services related to music, including music lessons, instrument rentals, and live performances.",
    },
    [ServiceCategory.WRITING]: {
      title: "Writing",
      description:
        "Services related to writing, such as copywriting, content creation, and editing.",
    },
    [ServiceCategory.EVENT_PLANNING]: {
      title: "Event Planning",
      description:
        "Services related to event planning, including organizing weddings, corporate events, and parties.",
    },
    [ServiceCategory.GRAPHIC_DESIGN]: {
      title: "Graphic Design",
      description:
        "Services related to graphic design, including logo design, branding, and digital illustrations.",
    },
    [ServiceCategory.TUTORING]: {
      title: "Tutoring",
      description:
        "Services related to tutoring, offering assistance in various subjects and academic levels.",
    },
    [ServiceCategory.LANGUAGE_TRANSLATION]: {
      title: "Language Translation",
      description:
        "Services related to language translation, providing translation services for documents, websites, and more.",
    },
    [ServiceCategory.CAR_RENTAL]: {
      title: "Car Rental",
      description:
        "Services related to car rental, offering rental vehicles for short-term use, such as for travel or special events.",
    },
    [ServiceCategory.HOME_MAINTENANCE]: {
      title: "Home Maintenance",
      description:
        "Services related to home maintenance, including repairs, renovations, and upkeep tasks.",
    },
    [ServiceCategory.PET_CARE]: {
      title: "Pet Care",
      description:
        "Services related to pet care, such as pet sitting, grooming, and veterinary services.",
    },
    [ServiceCategory.SOFTWARE_DEVELOPMENT]: {
      title: "Software Development",
      description:
        "Services related to software development, including custom software solutions, web development, and mobile app development.",
    },
    [ServiceCategory.LEGAL_SERVICES]: {
      title: "Legal Services",
      description:
        "Services related to legal matters, such as legal advice, document drafting, and representation in court.",
    },
    [ServiceCategory.HEALTHCARE]: {
      title: "Healthcare",
      description:
        "Services related to healthcare, including medical consultations, diagnostic tests, and treatment.",
    },
    [ServiceCategory.ONLINE_MARKETING]: {
      title: "Online Marketing",
      description:
        "Services related to online marketing, including search engine optimization, social media marketing, and email campaigns.",
    },
  };
