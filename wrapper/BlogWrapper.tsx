import ImageComponent from "@components/ImageComponent";
import Share from "@components/blogs/Share";
import { Badge } from "@components/ui/badge";
import { BlogCategory } from "@data/enums";
import { Link } from "lucide-react";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

export function BlogWrapper({
  children,
  title,
  readTime,
  tags,
  date,
  imageUrl,
  link,
}: {
  children: React.ReactNode;
  title: string;
  readTime: number;
  tags: BlogCategory[];
  date: Date;
  imageUrl: string;
  link: string;
}) {
  return (
    <div className="max-w-3xl mx-auto rounded-lg lg:pb-10 lg:px-8 relative ">
      <div className="flex flex-col lg:space-y-7 space-y-4">
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex flex-row space-x-2 justify-start items-center">
            <p className="text-sm text-primary">{date.toDateString()}</p>
            <div className="h-[5px] w-[5px] bg-primary rounded-full overflow-hidden" />
            <p className="text-sm text-primary">Read Time: {readTime} mins</p>
          </div>
          <div className="flex flex-row space-x-3">
            {tags.map((tag) => (
              <Badge variant="infoOutline" key={tag}>
                <p className="text-xs font-medium text-info">{tag}</p>
              </Badge>
            ))}
          </div>
        </div>
        <ImageComponent
          src="/images/booking.svg"
          alt="Booking"
          className="w-full h-80 object-cover rounded-lg"
        />
        <div className="flex flex-col space-y-5 pt-10">{children}</div>
      </div>
      <div className="sticky bottom-5 right-0 w-full flex justify-center pt-5">
        <Share />
      </div>
    </div>
  );
}

export function BlogSubTitle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col space-y-4 lg:pt-5 pt-3">
      <h2 className="text-2xl font-medium">{title}</h2>
      {children}
    </div>
  );
}

export function BlogText({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-[#374151] leading-9">{children}</p>;
}

export function BlogList({ list }: { list: string[] }) {
  return (
    <ul className="list-disc pl-5">
      {list.map((item) => (
        <li className="py-1 text-[#374151] lg:leading-9 leading-7">{item}</li>
      ))}
    </ul>
  );
}
