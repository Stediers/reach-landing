export function getWindowSize() {
  //handle window is undefined error
  if (typeof window === "undefined") {
    return { innerWidth: 0, innerHeight: 0 };
  } else {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}
