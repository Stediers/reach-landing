import Card from "@components/Card";
import Loading from "@components/Loading";
import Link from "next/link";
import { useState } from "react";
import { IoMdArrowRoundForward } from "react-icons/io";

export default function LinkCard({
  title,
  description,
  link,
  icon = (
    <IoMdArrowRoundForward className="w-5 h-5 text-textsubtle group-hover:scale-110 transform transition-all duration-300 group-hover:text-text" />
  ),
}: {
  title: string;
  description: string;
  link: string;
  icon?: JSX.Element;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <Link href={link} passHref onClick={() => setLoading(!loading)}>
      <Card className="!px-5 items-center justify-between flex !flex-row space-x-3 !space-y-0 group">
        <div className="flex flex-col space-y-1">
          <p className="text-md font-medium">{title}</p>
          <p className="text-sm text-textsubtle">{description}</p>
        </div>
        {loading ? <Loading className="w-7 h-7" /> : icon}
      </Card>
    </Link>
  );
}
