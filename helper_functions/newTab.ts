import { showSnackBar } from "@components/notifications/Snackbar";
import { State } from "@data/enums";

export function openInNewTab(url: string) {
  const newWindow = window.open(url, "_blank");
  if (!newWindow) {
    alert("Please allow popups for this website");
    openPopupSettings();
    window.location.replace(url);
  } else {
    showSnackBar({
      message: "Opening in new tab",
      state: State.SUCCESS,
    });
    const interval = setInterval(function () {
      if (newWindow.closed) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);
  }
}

export function openPopupSettings() {
  const userAgent = navigator.userAgent.toLowerCase();
  const isChrome = /chrome/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
  const isOpera = /opr/.test(userAgent);
  const isEdge = /edg/.test(userAgent);

  // Chrome
  if (isChrome) {
    window.open("chrome://settings/content/popups");
  }
  // Firefox
  else if (isFirefox) {
    window.open("about:preferences#privacy");
  }
  // Safari
  else if (isSafari) {
    window.open("safari://preferences");
  }
  // Opera
  else if (isOpera) {
    window.open("opera://settings/content");
  }
  // Edge
  else if (isEdge) {
    window.open("edge://settings/content/popups");
  }
  // Other browsers
  else {
    alert("Please allow popups for this website");
  }
}
