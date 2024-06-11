import TextInput from "./TextInput";
import { LocationAttributes } from "@data/types";
import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useState } from "react";
import { AddressName, AddressType, State } from "@data/enums";
import { showSnackBar } from "@components/notifications/Snackbar";
import { motion } from "framer-motion";
import TextInputWithDropdown from "./TextInputWithDropdown";
import { City, State as StateType, Country, ICity } from "country-state-city";
import Chip from "@components/Chip";
import LoadingWrapper from "@wrapper/LoadingWrapper";
import devLog from "@helper_functions/devLog";

export default function AddressInput({
  location,
  setLocation,
  title,
}: {
  location: LocationAttributes | null;
  setLocation: React.Dispatch<React.SetStateAction<LocationAttributes | null>>;
  title?: string;
}) {
  const indiaCode = Country.getCountryByCode("IN");
  const states = StateType.getStatesOfCountry("IN");
  const [cities, setCities] = useState<ICity[]>([]);
  const [predictions, setPredictions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [pageState, setPageState] = useState<State>(State.LOADING);

  const [canChangeState, setCanChangeState] = useState<boolean>(false);
  const [canChangeCity, setCanChangeCity] = useState<boolean>(false);
  const [canChangePostalCode, setCanChangePostalCode] =
    useState<boolean>(false);

  useEffect(() => {
    //initialize geocoder and autocomplete service
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
      libraries: ["places"],
    });
    loader
      .importLibrary("places")
      .then(async () => {
        const geocoder = new google.maps.Geocoder();
        setGeocoder(geocoder);
        const autocompleteService =
          new google.maps.places.AutocompleteService();
        setAutocompleteService(autocompleteService);
      })
      .catch((err) => {
        devLog(err);
        setPageState(State.ERROR);
      });
  }, []);

  useEffect(() => {
    setPageState(State.LOADING);
    if (!autocompleteService) return;
    if (!geocoder) return;
    setPageState(State.SUCCESS);
  }, [autocompleteService, geocoder]);

  useEffect(() => {
    if (!location) {
      return;
    }
    if (location.state.length === 0) {
      return;
    }
    const state = states.find((state) => state.name === location.state);
    if (!state) {
      return;
    }
    const cities = City.getCitiesOfState(
      indiaCode?.isoCode as string,
      state.isoCode
    );
    setCities(cities);
  }, [location]);

  useEffect(() => {
    if (!location) {
      // devLog("No location");
      return;
    }
    if (location.city.length === 0) {
      // devLog("No city");
      return;
    }
    if (location.state.length === 0) {
      // devLog("No state");
      return;
    }
    if (location.country.length === 0) {
      // devLog("No country");
      return;
    }
    if (location.postalCode.length === 0) {
      // devLog("No postal code");
      return;
    }
    if (!location.lat || location.lat <= 0) {
      // devLog("No lat");
      return;
    } else if (!location.lng || location.lng <= 0) {
      // devLog("No lng");
      return;
    }
    if (location.addressLine2.length === 0) {
      // devLog("No formatted address");
      return;
    }
    // devLog("can save address");
  }, [location]);

  const [locationQuery, setLocationQuery] = useState(
    location ? location.addressLine2 : ""
  );
  return (
    <LoadingWrapper
      className="flex flex-col items-start justify-center space-y-5 w-full"
      pageState={pageState}
      showLogo={false}
      text="Map is loading, please wait..."
    >
      <TextInput
        placeholder={title || "Eg. Bollineni Hillside"}
        value={locationQuery}
        onChange={(value) => {
          setLocationQuery(value);
          if (value.length === 0) {
            setPredictions([]);
            return;
          }
          if (!autocompleteService) return;
          autocompleteService.getPlacePredictions(
            {
              input: value,
              componentRestrictions: { country: "in" },
            },
            (predictions, status) => {
              if (status !== "OK" || !predictions) {
                return;
              }
              setPredictions(predictions);
            }
          );
        }}
        id="pac-input"
        title="Search for your location"
      />
      {locationQuery.length > 0 && predictions.length > 0 && (
        <div className="flex flex-col space-y-2 relative w-full">
          <Predictions
            predictions={predictions}
            setLocationQuery={setLocationQuery}
            setLocation={setLocation}
            setPredictions={setPredictions}
            geocoder={geocoder}
            setCanChangeState={setCanChangeState}
            setCanChangeCity={setCanChangeCity}
            setCanChangePostalCode={setCanChangePostalCode}
          />
        </div>
      )}
      {location !== null && (
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="col-span-2 lg:col-span-1">
            <TextInput
              title="Primary Details"
              errorText={
                location
                  ? location.addressLine1.length === 0
                    ? "Address cannot be empty"
                    : ""
                  : "Address cannot be empty"
              }
              placeholder="Eg. Flat 404, Floor 4 OR 404, 4 etc.."
              value={location ? location.addressLine1 : ""}
              onChange={(value) => {
                setLocation((prev) => ({
                  addressLine1: value,
                  addressLine2: prev ? prev.addressLine2 : "",
                  city: prev ? prev.city : "",
                  state: prev ? prev.state : "",
                  country: prev ? prev.country : "",
                  lat: prev ? prev.lat : 0,
                  lng: prev ? prev.lng : 0,
                  postalCode: prev ? prev.postalCode : "",
                  landmark:
                    prev && prev.landmark && prev.landmark.length > 0
                      ? prev.landmark
                      : null,
                  addressType: prev ? prev.addressType : AddressType.APARTMENT,
                }));
              }}
            />
          </div>
          <TextInputWithDropdown
            title="State"
            value={location.state}
            disabled={!canChangeState}
            resetAfterSelect={false}
            placeholder="Eg. Tamil Nadu"
            options={states.map((state) => state.name)}
            onSelect={(value) => {
              const state = states.find((state) => state.name === value);
              if (!state) {
                return;
              }
              const cities = City.getCitiesOfState(
                indiaCode?.isoCode as string,
                state.isoCode
              );
              setCities(cities);
              setLocation((prev) => ({
                addressLine1: prev ? prev.addressLine1 : "",
                addressLine2: prev ? prev.addressLine2 : "",
                city: prev ? prev.city : "",
                state: value,
                country: prev ? prev.country : "",
                lat: prev ? prev.lat : 0,
                lng: prev ? prev.lng : 0,
                addressType: prev ? prev.addressType : AddressType.APARTMENT,
                landmark:
                  prev && prev.landmark && prev.landmark.length > 0
                    ? prev.landmark
                    : null,
                postalCode: prev ? prev.postalCode : "",
              }));
            }}
          />
          <TextInputWithDropdown
            title="City"
            disabled={!canChangeCity}
            resetAfterSelect={false}
            value={location.city}
            placeholder="Eg. Chennai"
            options={cities.map((city) => city.name)}
            onSelect={(value) => {
              setLocation((prev) => ({
                addressLine1: prev ? prev.addressLine1 : "",
                addressLine2: prev ? prev.addressLine2 : "",
                city: value,
                state: prev ? prev.state : "",
                country: prev ? prev.country : "",
                lat: prev ? prev.lat : 0,
                lng: prev ? prev.lng : 0,
                addressType: prev ? prev.addressType : AddressType.APARTMENT,
                landmark:
                  prev && prev.landmark && prev.landmark.length > 0
                    ? prev.landmark
                    : null,
                postalCode: prev ? prev.postalCode : "",
              }));
            }}
          />
          <TextInput
            title="Postal Code"
            maxLength={6}
            placeholder="Eg. 600096"
            disabled={!canChangePostalCode}
            value={location.postalCode}
            onChange={(value) => {
              setLocation((prev) => ({
                addressLine1: prev ? prev.addressLine1 : "",
                addressLine2: prev ? prev.addressLine2 : "",
                city: prev ? prev.city : "",
                state: prev ? prev.state : "",
                country: prev ? prev.country : "",
                lat: prev ? prev.lat : 0,
                lng: prev ? prev.lng : 0,
                addressType: prev ? prev.addressType : AddressType.APARTMENT,
                landmark:
                  prev && prev.landmark && prev.landmark.length > 0
                    ? prev.landmark
                    : null,
                postalCode: value,
              }));
            }}
          />
        </div>
      )}
      {/* <CheckList location={location} /> */}
    </LoadingWrapper>
  );
}
export function AddressNameInput({
  addressName,
  setAddressName,
}: {
  addressName: string;
  setAddressName: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col items-start justify-center space-y-3 w-full">
      {/* <RadioInput
        options={[
          {
            icon: (
              <AiFillHome
                className={`text-2xl ${
                  addressName === AddressName.HOME ? "text-white" : ""
                }`}
              />
            ),
            title:
              AddressName.HOME.charAt(0).toUpperCase() +
              AddressName.HOME.slice(1),
            textColor: addressName === AddressName.HOME ? "text-white" : "",
            className: addressName === AddressName.HOME ? "bg-info" : "",
            onClick: () => {
              setAddressName(AddressName.HOME);
            },
          },
          {
            icon: (
              <MdWork
                className={`text-2xl ${
                  addressName === AddressName.OFFICE ? "text-white" : ""
                }`}
              />
            ),
            title:
              AddressName.OFFICE.charAt(0).toUpperCase() +
              AddressName.OFFICE.slice(1),
            textColor: addressName === AddressName.OFFICE ? "text-white" : "",
            className: addressName === AddressName.OFFICE ? "bg-info" : "",
            onClick: () => {
              setAddressName(AddressName.OFFICE);
            },
          },
          {
            icon: (
              <MdApartment
                className={`text-2xl ${
                  addressName !== AddressName.OFFICE &&
                  addressName !== AddressName.HOME
                    ? "text-white"
                    : ""
                }`}
              />
            ),
            title:
              AddressName.OTHER.charAt(0).toUpperCase() +
              AddressName.OTHER.slice(1),
            textColor:
              addressName !== AddressName.HOME &&
              addressName !== AddressName.OFFICE
                ? "text-white"
                : "",
            className:
              addressName !== AddressName.HOME &&
              addressName !== AddressName.OFFICE
                ? "bg-info"
                : "",
            onClick: () => {
              setAddressName("");
            },
          },
        ]}
      /> */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="w-full flex flex-col items-start justify-start space-y-2"
      >
        <TextInput
          title="Name"
          placeholder="Name your address"
          value={addressName}
          onChange={(value) =>
            setAddressName(value.charAt(0).toUpperCase() + value.slice(1))
          }
          errorText={
            addressName.length === 0
              ? "Name cannot be empty"
              : addressName.length > 50
              ? "Name cannot be more than 50 characters"
              : addressName.length < 3
              ? "Name cannot be less than 3 characters"
              : ""
          }
        />
        <div className="flex flex-row items-center justify-start space-x-3 w-full">
          {Object.values(AddressName).map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-row items-center justify-start space-x-1"
              onClick={() => {
                setAddressName(name.charAt(0).toUpperCase() + name.slice(1));
              }}
            >
              <Chip
                title={name.charAt(0).toUpperCase() + name.slice(1)}
                className={`${
                  addressName === name.charAt(0).toUpperCase() + name.slice(1)
                    ? "bg-info text-white"
                    : "border-text border"
                }`}
                titleClassName="text-sm"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Predictions({
  predictions,
  setLocationQuery,
  setLocation,
  setPredictions,
  geocoder,
  setCanChangeState,
  setCanChangeCity,
  setCanChangePostalCode,
}: {
  predictions: google.maps.places.AutocompletePrediction[];
  setLocationQuery: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<LocationAttributes | null>>;
  setPredictions: React.Dispatch<
    React.SetStateAction<google.maps.places.AutocompletePrediction[]>
  >;
  geocoder: google.maps.Geocoder | null;
  setCanChangeState: React.Dispatch<React.SetStateAction<boolean>>;
  setCanChangeCity: React.Dispatch<React.SetStateAction<boolean>>;
  setCanChangePostalCode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute z-10 w-full bg-white shadow-md rounded-md border border-text"
    >
      {predictions.map((option, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-start space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            if (!geocoder) {
              showSnackBar({
                message: "Geocoder not initialized",
                state: State.ERROR,
              });
              return;
            }
            geocoder.geocode(
              { placeId: option.place_id },
              (results, status) => {
                if (status !== "OK" || !results) {
                  showSnackBar({
                    message: "Something went wrong",
                    state: State.ERROR,
                  });
                  return;
                }
                if (results.length === 0) {
                  showSnackBar({
                    message: "No results found for this address",
                    state: State.ERROR,
                  });
                } else if (results.length > 0) {
                  const result = results[0];
                  const addressComponents = result.address_components;
                  const addressLine2 = addressComponents.find(
                    (component) => component.types[0] === "route"
                  )?.long_name as string;

                  const city = addressComponents.find(
                    (component) => component.types[0] === "locality"
                  )?.long_name as string;

                  devLog(city);

                  const state = addressComponents.find(
                    (component) =>
                      component.types[0] === "administrative_area_level_1"
                  )?.long_name as string;

                  const country = addressComponents.find(
                    (component) => component.types[0] === "country"
                  )?.long_name as string;

                  const postalCode = addressComponents.find(
                    (component) => component.types[0] === "postal_code"
                  )?.long_name as string;

                  const lat = result.geometry?.location.lat() ?? 0;
                  const lng = result.geometry?.location.lng() ?? 0;

                  if (!city || city.length === 0) {
                    setCanChangeCity(true);
                  }

                  if (!state || state.length === 0) {
                    setCanChangeState(true);
                  }

                  if (!postalCode || postalCode.length === 0) {
                    setCanChangePostalCode(true);
                  }

                  setLocationQuery(option.description);

                  setLocation((prev) => ({
                    addressLine1: prev ? prev.addressLine1 : "",
                    addressLine2: option.description,
                    city: city ? city : "",
                    state: state ? state : "",
                    country: country ? country : "",
                    lat: lat,
                    lng: lng,
                    addressType: prev
                      ? prev.addressType
                      : AddressType.APARTMENT,
                    landmark:
                      prev && prev.landmark && prev.landmark.length > 0
                        ? prev.landmark
                        : null,
                    postalCode: postalCode ? postalCode : "",
                  }));
                }
              }
            );
            setPredictions([]);
          }}
        >
          <p className="text-base first-letter:capitalize">
            {option.description}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
