export default function checkHere({
  path,
  menuPath,
}: {
  path: string;
  menuPath: string;
}): boolean {
  if (path === "/" && menuPath === "/") {
    return true;
  } else if (path.startsWith("/booking") && menuPath === "/booking") {
    return true;
  } else if (path.startsWith("/callbacks") && menuPath === "/callbacks") {
    return true;
  } else if (path.startsWith("/chat") && menuPath === "/chat") {
    return true;
  } else if (path.startsWith("/my-payments") && menuPath === "/my-payments") {
    return true;
  } else if (path === "/" && menuPath === "/explore") {
    return true;
  } else if (path.startsWith("/explore") && menuPath === "/explore") {
    return true;
  } else if (path.startsWith("/appointments") && menuPath === "/appointments") {
    return true;
  } else {
    return false;
  }
}
