import { openPopupSettings } from "./newTab";

export async function payWindow({ url }: { url: string }) {
  console.log("opening payment link", url);
  const newWindow = window.open(url, "_blank");
  if (!newWindow) {
    alert("Please allow popups for this website");
    //open settings to allow popups
    openPopupSettings();
  } else {
    const interval = setInterval(function () {
      if (newWindow.closed) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);
  }
}
