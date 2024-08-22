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
      className={`hidden flex-1 lg:flex w-full flex-col items-start justify-start`}
      id="desktop-wrapper"
    >
      {title && (
        <div
          className={`flex flex-row items-center justify-start space-x-2 bg-white py-4 px-5 w-full sticky top-0 z-50`}
        >
          <div className="flex flex-row items-center justify-start space-x-2">
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
          </div>
          <div className="flex flex-col items-start justify-start w-full space-y-1">
            {title && <UnderlinedHeader title={title} align="items-start" />}
            {description ? (
              <p className="text-sm lg:text-sm font-normal text-left text-textsubtle">
                {description}
              </p>
            ) : null}
          </div>
        </div>
      )}
      <div className={`w-full ${padding ? "py-6 px-5" : ""} ${className}`}>
        {children}
      </div>
    </div>
  );
}
