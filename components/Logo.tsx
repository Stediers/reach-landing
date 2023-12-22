import Link from "next/link";
import ReachSVG from "./svg/ReachSVG";

export default function Logo({
  textStyle,
  text = "REACH",
  wings,
  color = "#f40e1e",
  href = "/console",
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
