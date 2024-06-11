"use client";
import {
  TrackServiceRequest,
  trackService,
} from "@api_functions/analytics/track-service";
import { getItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import devLog from "@helper_functions/devLog";
import {
  getIpAddress,
  getCityStateCountry,
} from "@helper_functions/getIpAddress";
import debounce from "lodash/debounce";
import { useEffect } from "react";

async function _trackService({
  serviceId,
  search,
  whatsApp,
}: {
  serviceId: string;
  search: boolean;
  whatsApp: boolean;
}) {
  try {
    const guestId = getItemsFromLocalStorage<string>({ key: "guest-id" });
    var ipAddress: string | null = null;
    if (!guestId) {
      ipAddress = await getIpAddress();
    }
    const cityStateCountry = await getCityStateCountry();
    devLog("cityStateCountry", cityStateCountry);
    const request: TrackServiceRequest = {
      serviceId,
      ipAddress: ipAddress ? ipAddress : undefined,
      city: cityStateCountry.city,
      state: cityStateCountry.state,
      country: cityStateCountry.country,
      guestId: guestId ? guestId : undefined,
      search: search,
      whatsapp: whatsApp,
    };
    trackService(request);
  } catch (err) {
    devLog(err);
  }
}

const _debounce = debounce(_trackService, 5000);

export default function TrackServiceComponent({
  serviceId,
  event,
}: {
  serviceId: string;
  event: "whatsapp" | "search" | null;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (event === "whatsapp") {
      _debounce({
        serviceId,
        search: false,
        whatsApp: true,
      });
    } else if (event === "search") {
      _debounce({
        serviceId,
        search: true,
        whatsApp: false,
      });
    } else {
      _debounce({
        serviceId,
        search: false,
        whatsApp: false,
      });
    }
  }, [serviceId, event]);
  return null;
}
