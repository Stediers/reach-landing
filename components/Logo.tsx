import Link from "next/link";
import ReachSVG from "./svg/ReachSVG";

export default function Logo({
  textStyle = "text-2xl font-medium",
  text = "ReachGig",
  wings = "w-[8rem]",
  color = "#f40e1e",
  href = "/",
  flap = false,
}: {
  textStyle?: string;
  text?: string;
  wings?: string;
  color?: string;
  href?: string;
  flap?: boolean;
}) {
  return (
    <Link
      className={`flex flex-col items-center justify-center h-fit`}
      href={href}
    >
      <ReachSVG className={`py-0.5 ${wings}`} color={color} flap={flap} />
      <p className={`${textStyle} p-1`}>{text}</p>
    </Link>
  );
}
