import UnderlinedHeader from "@components/UnderlinedHeader";
import { showYesNoPopup } from "@components/notifications/Popup";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

export default function DesktopWrapper({
  className,
  children,
  padding = true,
  title,
  description,
  backLink,
  warnBeforeLeaving,
}: PropsWithChildren<{
  className: string;
  padding?: boolean;
  title?: string;
  description?: string;
  backLink?: string;
  warnBeforeLeaving?: boolean;
}>) {
  const query = useSearchParams();
  const backLinkFromQuery = query && query.get("backLink");
  const link = backLinkFromQuery ? backLinkFromQuery : backLink;
  const router = useRouter();
  return (
    <div
      className={`hidden flex-1 lg:flex w-full flex-col items-start justify-start pb-10`}
      id="desktop-wrapper"
    >
      {title && (
        <div
          className={`flex flex-row items-center justify-start py-10 space-x-2 w-full`}
        >
          <div className="flex flex-col items-start justify-start w-full space-y-3">
            <div className="flex flex-row items-center justify-start space-x-2 w-full">
              {backLink && (
                <motion.div whileTap={{ x: -5 }}>
                  <div
                    onClick={() => {
                      if (warnBeforeLeaving) {
                        showYesNoPopup({
                          title: "Are you sure?",
                          message: "You will lose all unsaved changes",
                        }).then((res) => {
                          if (res) {
                            router.push(backLink);
                          } else {
                            return;
                          }
                        });
                      } else {
                        router.push(backLink);
                      }
                    }}
                  >
                    <BsArrowLeftShort className="text-4xl cursor-pointer self-start" />
                  </div>
                </motion.div>
              )}
              {title && backLink && (
                <h1 className="text-2xl font-medium">{title}</h1>
              )}
              {title && !backLink && (
                <UnderlinedHeader
                  title={title}
                  className="text-2xl font-medium"
                />
              )}
            </div>
            {description ? (
              <p className="text-sm lg:text-lg font-normal text-left text-textsubtle">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      )}
      <div className={`w-full ${className}`}>{children}</div>
    </div>
  );
}
