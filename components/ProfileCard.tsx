import Link from "next/link";
import { Button } from "./ui/button";
import ImageComponent from "./ImageComponent";
import { GoMoveToBottom, GoStarFill } from "react-icons/go";
import { Link2Icon, Star } from "lucide-react";
import { BiLinkAlt, BiPhoneCall } from "react-icons/bi";
import { Badge } from "./ui/badge";
import { IndianLanguages, State } from "@data/enums";
import Card from "./Card";
import Chip from "./Chip";
import {
  AiOutlineUser,
  AiOutlineWhatsApp,
  AiFillInstagram,
  AiFillCopy,
} from "react-icons/ai";
import QRCode from "react-qr-code";
import { CustomSheet } from "./CustomSheet";
import Rating from "./Rating";
import Setting from "./Setting";
import { showCustomJSXPopup } from "./notifications/Popup";
import { showSnackBar } from "./notifications/Snackbar";
import { SheetClose } from "./ui/sheet";
import IconWrapper from "./IconWrapper";
import { FcRatings } from "react-icons/fc";
import BoxRating from "./BoxRating";
import { FetchPartnerResponse } from "@data/types";

export default function CustomerProfileCard({
  mobileNumber,
  imageUrl,
  rating,
  name,
  fluentLanguages,
  className,
}: {
  name: string;
  mobileNumber: string;
  imageUrl: string | null;
  rating: number | null;
  fluentLanguages: IndianLanguages[];
  className?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_CUSTOMER_LINK;
  return (
    <Card className={`p-5 bg-white ${className}`}>
      <div className="flex flex-col items-center justify-start space-y-5">
        {imageUrl != null ? (
          <ImageComponent
            src={imageUrl}
            className="rounded-md w-[10rem] h-[10rem]"
            alt="Profile Picture"
          />
        ) : (
          <div className="flex items-center justify-center bg-background rounded-full p-2 shrink-0">
            <AiOutlineUser className="text-6xl " />
          </div>
        )}
        <div className="flex flex-col items-center justify-start space-y-1 w-full">
          <p className="text-lg font-medium w-full text-center">{name}</p>
          <p className="text-sm text-gray-500 w-full text-center">
            {mobileNumber}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center space-x-5">
        {rating != null ? (
          Array(5)
            .fill(0)
            .map((_, i) => {
              return (
                <GoStarFill
                  key={i}
                  className={`h-6 w-6 ${
                    i < rating ? "text-primary" : "text-gray-300"
                  }`}
                />
              );
            })
        ) : (
          <p className="text-sm text-gray-500">No rating yet</p>
        )}
      </div>
      <Link href={`/console/profile/edit`} passHref className="w-full">
        <Button variant="dark">Edit</Button>
      </Link>
    </Card>
  );
}

export function ProfileCard({ partner }: { partner: FetchPartnerResponse }) {
  return (
    <div className={`flex flex-col w-full items-start justify-start gap-y-5`}>
      <ImageComponent
        src={partner.imageUrl}
        alt={`Service Image`}
        className="w-60 h-60 lg:w-[15rem] shrink-0 lg:h-[15rem] object-cover rounded-lg"
        popup={false}
      />
      <div className="flex flex-col items-start justify-start space-y-5 max-w-lg">
        <div className="flex flex-col items-start justify-center space-y-2">
          <Badge>{partner.designation}</Badge>
          <Link
            href={`/${partner.handle}`}
            target="_blank"
            className="flex items-center justify-start space-x-5 hover:text-primary hover:underline"
          >
            <h2 className="lg:text-4xl text-3xl font-medium line-clamp-2 first-letter:capitalize">
              <span className="first-letter:capitalize">
                {partner.firstName.charAt(0).toUpperCase() +
                  partner.firstName.slice(1)}
              </span>{" "}
              <span className="first-letter:capitalize">
                {partner.lastName.charAt(0).toUpperCase() +
                  partner.lastName.slice(1)}
              </span>
            </h2>
            <BiLinkAlt className="h-6 w-6 text-white cursor-pointer" />
          </Link>
        </div>
      </div>
      <p className="text-lg text-left lg:!leading-10 leading-8 line-clamp-3">
        {partner.bio}
      </p>
    </div>
  );
}
