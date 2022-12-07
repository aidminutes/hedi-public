import { Location } from "@/modules/map/types";
import { LocationCache } from "../cache/LocationCache";
import { parseNominatinJSONResult } from "../functions/parseNominatinJSONResult";

export type INominatinJSONCoordinates = {
  properties: {
    geocoding: {
      postcode: string;
      label: string;
      name: string;
      city: string;
    };
  };
  geometry: {
    coordinates: any;
  };
};

export async function zipToLatLong(zip: string): Promise<Location | null> {
  const fetcher = fetch(process.env.NOMINATIN_ZIP_URL + zip)
    .then(response => response.json())
    .then(data => parseNominatinJSONResult(data?.features, zip));

  const alternativeFetcher = fetch(process.env.NOMINATIN_ZIP_TEXT_URL + zip)
    .then(response => response.json())
    .then(data => parseNominatinJSONResult(data?.features, zip, true));

  return LocationCache.getOrFetch(zip, fetcher, alternativeFetcher);
}
