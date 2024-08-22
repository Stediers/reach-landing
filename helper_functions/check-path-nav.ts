export default function checkHere({
  path,
  menuPath,
}: {
  path: string;
  menuPath: string;
}): boolean {
  if (path === "/" && menuPath === "/") {
    return true;
  } else if (
    path.startsWith("/console/callbacks") &&
    menuPath === "/console/callbacks"
  ) {
    return true;
  } else if (path.startsWith("/my-payments") && menuPath === "/my-payments") {
    return true;
  } else if (
    path.startsWith("/explore/partner") &&
    menuPath === "/explore/partner"
  ) {
    return true;
  } else if (path === "/explore" && menuPath === "/explore") {
    return true;
  } else if (path.startsWith("/learn") && menuPath === "/learn") {
    return true;
  } else if (
    path.startsWith("/console/appointments") &&
    menuPath === "/console/appointments"
  ) {
    return true;
  } else if (
    path.startsWith("/console/profile") &&
    menuPath === "/console/profile"
  ) {
    return true;
  } else if (
    path.startsWith("/console/profile/address") &&
    menuPath === "/console/profile/address"
  ) {
    return true;
  } else {
    return false;
  }
}
