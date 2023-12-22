import { LocationAttributes } from "@data/types";
import { City, State, Country } from "country-state-city";
import devLog from "./devLog";

export default function verifyLocation(location: LocationAttributes): boolean {
  const indiaCode = Country.getCountryByCode("IN");
  if (!indiaCode) {
    devLog("Country Code is not valid");
    return false;
  }
  const indianStates = State.getStatesOfCountry(indiaCode.isoCode).map(
    (state) => state.name.toLowerCase()
  );

  if (!location) {
    devLog("Location is not valid");
    return false;
  }

  const { lat, lng } = location;

  if (lat < -90 || lat > 90) {
    devLog("LatLong is not valid");
    return false;
  }

  if (lng < -180 || lng > 180) {
    devLog("LatLong is not valid");
    return false;
  }

  if (
    location.city.length < 1 ||
    location.country.length < 1 ||
    location.state.length < 1
  ) {
    devLog("City, Country or State is not valid");
    return false;
  }

  if (!indianStates.includes(location.state.toLowerCase())) {
    devLog("State is not valid");
    return false;
  }

  //Specific to INDIA
  if (location.postalCode.length < 6 || location.postalCode.length > 6) {
    devLog("Postal Code is not valid");
    return false;
  }

  if (location.addressLine2.length < 1) {
    devLog("Address Line 2 is not valid");
    return false;
  } else if (location.addressLine1.length < 1) {
    devLog("Address Line 1 is not valid");
    return false;
  }

  return true;
}
