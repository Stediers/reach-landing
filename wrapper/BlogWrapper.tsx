import ImageComponent from "@components/ImageComponent";
import Share from "@components/blogs/Share";
import { Badge } from "@components/ui/badge";
import { BlogCategory } from "@data/enums";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

export function BlogWrapper({
  children,
  title,
  readTime,
  tags,
  date,
  imageUrl,
  link,
  authors,
}: {
  children: React.ReactNode;
  title: string;
  readTime: number;
  tags: BlogCategory[];
  date: {
    day: number;
    month:
      | "January"
      | "February"
      | "March"
      | "April"
      | "May"
      | "June"
      | "July"
      | "August"
      | "September"
      | "October"
      | "November"
      | "December";
    year: number;
  };
  imageUrl: string;
  link: string;
  authors: {
    name: string;
    link: string;
  }[];
}) {
  const month =
    date.month === "January"
      ? 0
      : date.month === "February"
      ? 1
      : date.month === "March"
      ? 2
      : date.month === "April"
      ? 3
      : date.month === "May"
      ? 4
      : date.month === "June"
      ? 5
      : date.month === "July"
      ? 6
      : date.month === "August"
      ? 7
      : date.month === "September"
      ? 8
      : date.month === "October"
      ? 9
      : date.month === "November"
      ? 10
      : date.month === "December"
      ? 11
      : 0;
  const createdDate = new Date(date.year, month, date.day);
  return (
    <div className="max-w-3xl mx-auto rounded-lg lg:pb-10 lg:px-8 relative ">
      <div className="flex flex-col lg:space-y-7 space-y-4">
        <Link href="/blogs" className="w-full">
          <ArrowLeft className="w-6 h-6 text-primary hover:cursor-pointer hover:saturate-100" />
        </Link>
        <div className="flex flex-col space-y-3">
          <h1 className="lg:text-3xl text-2xl font-semibold">{title}</h1>
          <div className="flex flex-row space-x-2 justify-start items-center">
            <p className="text-sm text-textsubtle">
              {createdDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div className="h-[5px] w-[5px] bg-textsubtle rounded-full overflow-hidden" />
            <p className="text-sm text-textsubtle">
              Read Time: {readTime} mins
            </p>
            <div className="h-[5px] w-[5px] bg-textsubtle rounded-full overflow-hidden hidden lg:block" />
            <p className="text-sm text-textsubtle hidden lg:block">
              By{" "}
              {authors.map((author) => (
                <Link
                  href={author.link}
                  key={author.name}
                  className="hover:underline hover:text-primary hover:cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                >
                  {author.name}
                  {authors.length > 1 && " & "}
                </Link>
              ))}
            </p>
          </div>
          <p className="text-sm text-textsubtle lg:hidden">
            By{" "}
            {authors.map((author) => (
              <Link
                href={author.link}
                key={author.name}
                className="underline cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                {author.name}
                {authors.length > 1 && " & "}
              </Link>
            ))}
          </p>
          <div className="flex flex-row space-x-3">
            {tags.map((tag) => (
              <BlogTag tag={tag} key={tag} />
            ))}
          </div>
        </div>
        <ImageComponent
          src={imageUrl}
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
      <h2 className="lg:text-2xl text-xl font-medium">{title}</h2>
      {children}
    </div>
  );
}

export function BlogText({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-[#374151] leading-9">{children}</p>;
}

export function BlogList({
  list,
  numbered,
}: {
  list: string[];
  numbered?: boolean;
}) {
  return (
    <ul className={`${numbered ? "list-decimal" : "list-disc"} pl-5`}>
      {list.map((item) => (
        <li className="py-1 text-[#374151] lg:leading-9 leading-7" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function BlogTag({ tag }: { tag: BlogCategory }) {
  return (
    <Badge variant="infoOutline">
      <p className="text-xs font-medium text-info">
        {tag.charAt(0).toUpperCase() + tag.slice(1)}
      </p>
    </Badge>
  );
}
