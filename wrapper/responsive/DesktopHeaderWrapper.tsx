import UnderlinedHeader from "@components/UnderlinedHeader";
import { PropsWithChildren } from "react";

export default function DesktopHeaderWrapper({
  children,
  title,
  className = "flex flex-col w-full justify-center items-center space-y-10",
  align = "items-center",
}: PropsWithChildren<{
  title: string;
  className?: string;
  align?: "items-start" | "items-center" | "items-end";
}>) {
  return (
    <div className={className}>
      <UnderlinedHeader title={title} align={align} className="text-2xl" />
      {children}
    </div>
  );
}
