"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DownloadApp() {
  const router = useRouter();
  useEffect(() => {
    // Detect iOS device
    //get the userAgent from the browser
    console.log("navigator.userAgent", navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    handleDownload(isIOS);
    router.push("/");
  }, []);

  const handleDownload = (isIOS: boolean) => {
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

  return <div></div>;
}
