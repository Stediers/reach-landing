import { eraseCookie } from "@api_functions/internal/cookie";
import { showOkPopup } from "@components/notifications/Popup";
import devLog from "@helper_functions/devLog";
import router from "next/router";

export default function getVitalLocalStoragStingData({
  key,
  onFail = () => {
    eraseCookie("gig-token");
    devLog("Failed to get data from local storage");
    showOkPopup({
      title: "Session Expired",
      message: "Please sign in again to continue",
    });
    router.push("/user/sign-in");
  },
}: {
  key: string;
  onFail?: () => void;
}): string | null {
  const data = localStorage.getItem(key);
  if (!data) {
    onFail();
    return null;
  } else {
    return data;
  }
}
