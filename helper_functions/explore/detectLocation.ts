export async function detectLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
}

export async function getStateFromLocation(): Promise<string | null> {
  try {
    const position = await detectLocation();
    const { latitude, longitude } = position.coords;

    // Use a reverse geocoding service (example with Nominatim OpenStreetMap)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();

    // The state information is typically in the 'address' object
    const state = data.address.state || null;

    return state;
  } catch (error) {
    console.error("Error getting state:", error);
    return null;
  }
}
