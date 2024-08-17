import Link from "next/link";
import { Button } from "./ui/button";
import ImageComponent from "./ImageComponent";
import { GoMoveToBottom } from "react-icons/go";
import { Link2Icon } from "lucide-react";
import { BiLinkAlt } from "react-icons/bi";

export function ProfileCard({
  images,
  name,
  profession,
  description,
  link,
  className,
}: {
  images: string[];
  name: string;
  profession: string;
  description: string;
  link: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col w-full items-start justify-start gap-y-5 ${className}`}
    >
      <ImageComponent
        src={images[0]}
        alt={`Service Image`}
        className="w-60 h-60 lg:w-[15rem] shrink-0 lg:h-[15rem] object-cover rounded-lg"
        popup={false}
      />
      <div className="flex flex-col items-start justify-start space-y-5 max-w-lg">
        <div className="flex flex-col items-start justify-center space-y-2">
          <p className="text-base font-medium text-white">{profession}</p>
          <Link
            href={link}
            target="_blank"
            className="flex items-center justify-start space-x-5 hover:text-primary hover:underline"
          >
            <h2 className="lg:text-4xl text-3xl font-medium">{name}</h2>
            <BiLinkAlt className="h-6 w-6 text-white cursor-pointer" />
          </Link>
        </div>
        <p className="text-lg text-left lg:!leading-10 leading-8">
          {description}
        </p>
      </div>
    </div>
  );
}
