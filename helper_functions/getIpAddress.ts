import {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
} from "@api_functions/internal/local-storage";
import { Loader } from "@googlemaps/js-api-loader";
import devLog from "./devLog";

export async function getIpAddress(): Promise<string> {
  const ipAddress = getItemsFromLocalStorage<string>({ key: "ip-address" });
  if (ipAddress) {
    return new Promise((resolve) => resolve(ipAddress));
  } else {
    return fetch("https://api.ipify.org/?format=json")
      .then((res) => res.json())
      .then((data) => {
        const ipAddress = data.ip;
        setItemsToLocalStorage({ key: "ip-address", item: ipAddress });
        return ipAddress;
      });
  }
}

export async function getCityStateCountry(city: string | null): Promise<{
  city: string | null;
  state: string | null;
  country: string | null;
} | null> {
  //use geolocation api
  // const city = getItemsFromLocalStorage<string>({ key: "city" });
  // const state = getItemsFromLocalStorage<string>({ key: "state" });
  // const country = getItemsFromLocalStorage<string>({ key: "country" });
  // if (city && state && country) {
  //   return new Promise((resolve) => resolve({ city, state, country }));
  // }
  if (!city) {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });
    const geocoding = await loader.importLibrary("geocoding");
    if (!geocoding) {
      return Promise.reject("Failed to load geocoding library");
    }
    return await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            {
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
            (results, status) => {
              if (status === "OK" && results && results[0]) {
                const addressComponents = results[0].address_components;
                const city = addressComponents.find((item) =>
                  item.types.includes("locality")
                )?.long_name;
                const state = addressComponents.find((item) =>
                  item.types.includes("administrative_area_level_1")
                )?.long_name;
                const country = addressComponents.find((item) =>
                  item.types.includes("country")
                )?.long_name;
                setItemsToLocalStorage({ key: "city", item: city });
                setItemsToLocalStorage({ key: "state", item: state });
                setItemsToLocalStorage({ key: "country", item: country });
                return resolve({
                  city: (city || "Unknown").toLowerCase(),
                  state: (state || "Unknown").toLowerCase(),
                  country: (country || "Unknown").toLowerCase(),
                });
              } else {
                console.log("Geocoder failed due to: " + status);
                return resolve(null);
              }
            }
          );
        },
        (err) => {
          devLog(err);
          return resolve(null);
        }
      );
    });
  } else {
    return new Promise((resolve) =>
      resolve({ city, state: null, country: null })
    );
  }
}
