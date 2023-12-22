import Link from "next/link";

export default function UnderlinedLink({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link href={link} className="underline underline-offset-4 text-info">
      {text}
    </Link>
  );
}
