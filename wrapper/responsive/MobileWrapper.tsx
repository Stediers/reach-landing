"use client";
import { showYesNoPopup } from "@components/notifications/Popup";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { PropsWithChildren } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

export default function MobileWrapper({
  className,
  children,
  header,
  backLink,
  padding = true,
  headerTopPadding = true,
  headerBottomPadding = true,
}: PropsWithChildren<{
  className: string;
  header?: string;
  backLink?: string;
  padding?: boolean;
  headerTopPadding?: boolean;
  headerBottomPadding?: boolean;
}>) {
  return (
    <div
      className={`max-w-lg min-h-full lg:hidden w-full flex flex-col space-y-3 items-center py-5 ${
        padding == true ? "px-5" : ""
      } justify-start`}
      id="mobile-wrapper"
      hidden
    >
      {header ? (
        <HeaderComponent
          title={header}
          backLink={backLink}
          topPadding={headerTopPadding}
          bottomPadding={headerBottomPadding}
        />
      ) : null}
      <div className={`w-full flex-1`}>
        <div className={className}>{children}</div>
      </div>
    </div>
  );
}

function HeaderComponent({
  title,
  backLink,
  className,
  warnBeforeLeaving,
  topPadding,
  bottomPadding,
}: {
  title: string;
  backLink?: string;
  className?: string;
  warnBeforeLeaving?: boolean;
  topPadding?: boolean;
  bottomPadding?: boolean;
}) {
  const query = useSearchParams();
  const backLinkFromQuery = query && query.get("backLink");
  const link = backLinkFromQuery ? backLinkFromQuery : backLink;
  const router = useRouter();
  return (
    <div
      className={`self-center flex flex-col items-center justify-center space-y-2 w-full max-w-lg uppercase ${
        bottomPadding ? "pb-5" : ""
      }`}
    >
      {link && link.length > 0 && (
        <motion.div className="w-full" whileTap={{ x: -5 }}>
          <div
            onClick={() => {
              if (warnBeforeLeaving) {
                showYesNoPopup({
                  title: "Are you sure?",
                  message: "You will lose all unsaved changes",
                }).then((res) => {
                  if (res) {
                    router.push(link);
                  } else {
                    return;
                  }
                });
              } else {
                router.push(link);
              }
            }}
          >
            <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
          </div>
        </motion.div>
      )}
      <div className="w-fit flex flex-col items-center space-y-1">
        <h1 className="text-2xl font-medium text-center first-letter:capitalize">
          {title}
        </h1>
        <div className="h-px w-[80%] bg-primary" />
      </div>
    </div>
  );
}
