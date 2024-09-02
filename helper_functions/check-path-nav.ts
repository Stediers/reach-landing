import { CustomerRoutes } from "@data/enums";

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
    path.startsWith(CustomerRoutes.CALLBACKS) &&
    menuPath === "/console/callbacks"
  ) {
    return true;
  } else if (path.startsWith("/my-payments") && menuPath === "/my-payments") {
    return true;
  } else if (
    path.startsWith(CustomerRoutes.SEARCH_PARTNER) &&
    menuPath === CustomerRoutes.SEARCH_PARTNER
  ) {
    return true;
  } else if (
    path === CustomerRoutes.EXPLORE &&
    menuPath === CustomerRoutes.EXPLORE
  ) {
    return true;
  } else if (
    path.startsWith(CustomerRoutes.LEARN) &&
    menuPath === CustomerRoutes.LEARN
  ) {
    return true;
  } else if (
    path.startsWith(CustomerRoutes.APPOINTMENTS) &&
    menuPath === CustomerRoutes.APPOINTMENTS
  ) {
    return true;
  } else if (
    path.startsWith(CustomerRoutes.PROFILE) &&
    menuPath === CustomerRoutes.PROFILE
  ) {
    return true;
  } else if (
    path.startsWith(CustomerRoutes.EDIT_ADDRESS) &&
    menuPath === CustomerRoutes.EDIT_ADDRESS
  ) {
    return true;
  } else {
    return false;
  }
}
