import devLog from "./devLog";

export function vibration({
  duration = 200,
  pattern = [200],
}: {
  duration?: number;
  pattern?: number[];
}) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
    setTimeout(() => {
      navigator.vibrate(0);
    }, duration);
  } else {
    devLog("Vibration not supported");
  }
}
