/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Fetch a short location name directly from latitude & longitude.
 */
export async function fetchShortLocation(
  lat: number,
  lon: number
): Promise<string> {
  try {
    if (!lat || !lon) {
      throw new Error("Invalid coordinates");
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (contact@example.com)",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch location data: ${res.statusText}`);
    }

    const data: any = await res.json();

    // Inline short location formatting (no external import)
    const suburb = data.address?.suburb ?? null;
    const city = data.address?.county ?? null;
    const name = data.name ?? null;
    const stateDistrict = data.address?.state_district ?? null;

    if (suburb && city) {
      return `${suburb}, ${city}`;
    } else if (name && city) {
      return `${name}, ${city}`;
    } else if (stateDistrict && name) {
      return `${name}, ${stateDistrict}`;
    } else if (data.display_name) {
      const parts = data.display_name.split(",");
      if (parts.length >= 2) {
        return `${parts[0].trim()}, ${parts[1].trim()}`;
      } else {
        return data.display_name;
      }
    } else {
      return "Unknown Location";
    }
  } catch (err: any) {
    return `Error: ${err.message || "Error fetching location info"}`;
  }
}
