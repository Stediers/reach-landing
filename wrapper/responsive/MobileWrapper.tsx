"use client";
import { showYesNoPopup } from "@components/notifications/Popup";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { motion } from "framer-motion";
import { ArrowBigLeftDash, ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { PropsWithChildren } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";

export default function MobileWrapper({
  className,
  children,
  header,
  backLink,
  padding = true,
  warnBeforeLeaving,
}: PropsWithChildren<{
  className: string;
  header?: string;
  backLink?: string;
  padding?: boolean;
  warnBeforeLeaving?: boolean;
}>) {
  return (
    <div
      className={`max-w-lg min-h-full lg:hidden w-full flex flex-col pb-5 space-y-3 items-center ${
        padding == true ? "px-5" : ""
      } justify-start`}
      id="mobile-wrapper"
    >
      {header ? (
        <HeaderComponent
          title={header}
          backLink={backLink}
          warnBeforeLeaving={warnBeforeLeaving}
          showLineHeader={backLink ? false : true}
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
  showLineHeader,
}: {
  title: string;
  backLink?: string;
  className?: string;
  warnBeforeLeaving?: boolean;
  showLineHeader?: boolean;
}) {
  const query = useSearchParams();
  const backLinkFromQuery = query && query.get("backLink");
  const link = backLinkFromQuery ? backLinkFromQuery : backLink;
  const router = useRouter();
  return (
    <div
      className={`self-center flex flex-row items-center justify-start space-x-3 pt-5 w-full max-w-lg pb-5 ${className}`}
    >
      {link && link.length > 0 && (
        <motion.div whileTap={{ x: -5 }}>
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
            <BiLeftArrowAlt className="w-6 h-6 cursor-pointer self-start" />
          </div>
        </motion.div>
      )}
      <div className="w-fit flex flex-col items-start space-y-2">
        <h1 className="text-xl font-medium text-center first-letter:capitalize">
          {title}
        </h1>
        {showLineHeader && <div className="w-full h-0.5 bg-primary" />}
      </div>
      {/* {link && link.length > 0 && (
        <Link href={link} passHref>
          <Badge variant="outline">Back</Badge>
        </Link>
      )} */}
    </div>
  );
}
