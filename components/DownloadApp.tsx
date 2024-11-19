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
    //get the userAgent from the browser
    console.log("navigator.userAgent", navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    setIsIOS(isIOS);
  }, []);

  const handleDownload = () => {
    console.log("isIOS", isIOS);
    const iosAppUrl = "https://apps.apple.com/in/app/reachgig/id6737802010";
    const androidAppUrl =
      "https://play.google.com/store/apps/details?id=com.reachtech.partnerapp&pcampaignid=web_share";

    if (isIOS) {
      //new tab
      setTimeout(() => {
        //open the app store link replacing the current tab
        window.open(iosAppUrl);
      }, 1000);
    } else {
      //new tab
      window.open(androidAppUrl);
    }
  };

  return <div onClick={handleDownload}>{triggerJSX}</div>;
}
