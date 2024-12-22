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
import debounce from "lodash/debounce";

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

const _debounce = debounce(_trackProfile, 5000);

export default function TrackProfileComponent({
  gigId,
  event,
}: {
  gigId: string;
  event: string | null;
}) {
  if (event === "instagram") {
    _debounce({
      gigId,
      source: TrackingSource.INSTAGRAM,
    });
  } else if (event === "whatsapp") {
    _debounce({
      gigId,
      source: TrackingSource.WHATSAPP,
    });
  } else {
    _debounce({
      gigId,
      source: TrackingSource.SEARCH,
    });
  }
  return null;
}
