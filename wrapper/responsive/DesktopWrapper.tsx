import UnderlinedHeader from "@components/UnderlinedHeader";
import { PropsWithChildren, useState } from "react";

export default function DesktopWrapper({
  className,
  children,
  padding = true,
  maxWidth = false,
  title,
  hide = true,
}: PropsWithChildren<{
  className: string;
  padding?: boolean;
  maxWidth?: boolean;
  title?: string;
  hide?: boolean;
}>) {
  return (
    <div
      className={`hidden flex-1 ${hide ? "hidden" : "flex"}
       lg:flex w-full flex-col items-start justify-start space-y-5 ${
         padding ? "py-6 px-10" : ""
       } ${maxWidth ? "max-w-[90rem] mx-auto" : ""}`}
      id="desktop-wrapper"
    >
      {title && <UnderlinedHeader title={title} align="items-start" />}
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
}
