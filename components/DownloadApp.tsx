"use client";
import { useEffect, useState } from "react";
import { showSnackBar } from "./notifications/Snackbar";
import { State } from "@data/enums";

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
    const iosAppUrl = "https://apps.apple.com/in/app/reachgig/id6737802010";
    const androidAppUrl =
      "https://play.google.com/store/apps/details?id=YOUR_APP_ID";
    const deepLink = "your-app-scheme://"; // Your app's custom URL scheme

    if (isIOS) {
      window.location.href = deepLink;
      //new tab
      setTimeout(() => {
        window.open(iosAppUrl, "_blank");
      }, 1000);
    } else {
      //new tab
      showSnackBar({
        message: "We do not support Android Devices yet.",
        state: State.ERROR,
      });
    }
  };

  return <div onClick={handleDownload}>{triggerJSX}</div>;
}
