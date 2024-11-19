"use client";
import { useEffect, useState } from "react";

export default function AppDownload({
  triggerJSX,
}: {
  triggerJSX: React.ReactNode;
}) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS device
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  const handleDownload = () => {
    console.log("isIOS", isIOS);
    const iosAppUrl = "https://apps.apple.com/in/app/reachgig/id6737802010";
    const androidAppUrl =
      "https://play.google.com/store/apps/details?id=com.reachtech.partnerapp&pcampaignid=web_share";

    if (isIOS) {
      //new tab
      setTimeout(() => {
        window.open(iosAppUrl, "_blank");
      }, 1000);
    } else {
      //new tab
      window.open(androidAppUrl, "_blank");
    }
  };

  return <div onClick={handleDownload}>{triggerJSX}</div>;
}
