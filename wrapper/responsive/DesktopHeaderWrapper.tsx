import UnderlinedHeader from "@components/UnderlinedHeader";
import { PropsWithChildren } from "react";

export default function DesktopHeaderWrapper({
  children,
  title,
}: PropsWithChildren<{
  title: string;
}>) {
  return (
    <div className="w-full flex flex-col space-y-5">
      {/* <p className="text-lg font-medium">{title}</p> */}
      <UnderlinedHeader title={title} />
      {children}
    </div>
  );
}
