"use client";
import {
  TrackServiceRequest,
  trackService,
} from "@api_functions/analytics/track-service";
import { getItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { TrackingSource } from "@data/enums";
import devLog from "@helper_functions/devLog";
import {
  getIpAddress,
  getCityStateCountry,
} from "@helper_functions/getIpAddress";
import debounce from "lodash/debounce";
import { useEffect } from "react";

async function _trackService({
  serviceId,
  source,
}: {
  serviceId: string;
  source: TrackingSource;
}) {
  try {
    const guestId = getItemsFromLocalStorage<string>({ key: "guest-id" });
    var ipAddress: string | null = null;
    if (!guestId) {
      ipAddress = await getIpAddress();
    }
    const cityStateCountry = await getCityStateCountry(null);
    devLog("cityStateCountry", cityStateCountry);
    if (!cityStateCountry) return;
    const request: TrackServiceRequest = {
      serviceId,
      ipAddress: ipAddress ? ipAddress : undefined,
      city: cityStateCountry.city ? cityStateCountry.city : "Unknown",
      state: cityStateCountry.state ? cityStateCountry.state : "Unknown",
      country: cityStateCountry.country ? cityStateCountry.country : "Unknown",
      guestId: guestId ? guestId : undefined,
      source: source,
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
        source: TrackingSource.WHATSAPP,
      });
    } else if (event === "search") {
      _debounce({
        serviceId,
        source: TrackingSource.SEARCH,
      });
    } else {
      _debounce({
        serviceId,
        source: TrackingSource.SEARCH,
      });
    }
  }, [serviceId, event]);
  return null;
}
