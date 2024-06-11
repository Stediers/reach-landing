"use client";
import {
  TrackProfileRequest,
  trackProfile,
} from "@api_functions/analytics/track-profile";
import { getItemsFromLocalStorage } from "@api_functions/internal/local-storage";
import devLog from "@helper_functions/devLog";
import {
  getIpAddress,
  getCityStateCountry,
} from "@helper_functions/getIpAddress";
import debounce from "lodash/debounce";

async function _trackProfile({
  gigId,
  instgram,
  whatsApp,
}: {
  gigId: string;
  instgram: boolean;
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
    const request: TrackProfileRequest = {
      profileId: gigId,
      guestId: guestId ? guestId : undefined,
      ipAddress: ipAddress ? ipAddress : undefined,
      city: cityStateCountry?.city,
      state: cityStateCountry?.state,
      country: cityStateCountry?.country,
      instagram: instgram,
      whatsapp: whatsApp,
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
  event: "instagram" | "whatsapp" | null;
}) {
  if (event === "instagram") {
    _debounce({
      gigId,
      instgram: true,
      whatsApp: false,
    });
  } else if (event === "whatsapp") {
    _debounce({
      gigId,
      instgram: false,
      whatsApp: true,
    });
  } else {
    _debounce({
      gigId,
      instgram: false,
      whatsApp: false,
    });
  }
  return null;
}
