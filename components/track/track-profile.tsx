"use client";
import {
  TrackProfileRequest,
  trackProfile,
} from "@api_functions/analytics/track-profile";
import { getItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import { TrackingSource } from "@data/enums";
import devLog from "@helper_functions/devLog";
import {
  getIpAddress,
  getCityStateCountry,
} from "@helper_functions/getIpAddress";
import { useEffect, useRef } from "react";

async function _trackProfile({
  gigId,
  source,
}: {
  gigId: string;
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
    const request: TrackProfileRequest = {
      profileId: gigId,
      guestId: guestId ? guestId : undefined,
      ipAddress: ipAddress ? ipAddress : undefined,
      city: cityStateCountry.city ? cityStateCountry.city : "Unknown",
      state: cityStateCountry.state ? cityStateCountry.state : "Unknown",
      country: cityStateCountry.country ? cityStateCountry.country : "Unknown",
      source,
    };
    await trackProfile(request);
  } catch (e) {
    devLog("Error in tracking profile", e);
  }
}

export default function TrackProfileComponent({
  gigId,
  event,
}: {
  gigId: string;
  event: string | null;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const source =
      event === "instagram"
        ? TrackingSource.INSTAGRAM
        : event === "whatsapp"
        ? TrackingSource.WHATSAPP
        : TrackingSource.SEARCH;

    const timeout = setTimeout(() => {
      _trackProfile({ gigId, source });
    }, 5000);

    return () => clearTimeout(timeout);
  }, [gigId, event]);

  return null;
}
