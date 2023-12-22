import { fetchAPIProtected } from "@api_functions/internal/base-functions";
import { RequestMethod } from "@data/enums";

async function fetchApi(): Promise<Date[] | null> {
  const res = (
    await fetchAPIProtected<Date[]>({
      url: "fetch-appointments-calendar",
      method: RequestMethod.GET,
    })
  ).data;

  if (res) {
    if (!validateResponse(res)) {
      return null;
    } else {
      return res;
    }
  } else {
    return null;
  }
}

export async function fetchAppointmentsCalendar() {
  return await fetchApi();
}

function validateResponse(res: Date[]): boolean {
  if (!Array.isArray(res)) {
    return false;
  }
  res.forEach((date) => {
    try {
      if (new Date(date).toString() === "Invalid Date") {
        throw new Error("Invalid Date");
      }
    } catch (error) {
      return false;
    }
  });
  return true;
}
