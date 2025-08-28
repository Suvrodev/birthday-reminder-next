// utils/getShortLocation.ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getShortLocation = (data: any): string => {
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
};

export default getShortLocation;
