import { Location } from "@/modules/map/types";
import { LocationCache } from "../cache/LocationCache";
import { parseGeoIPJSONResult } from "../functions/parseGeoIPJSONResult";

export type GeoIPLocation = {
  ip: string;
  status: string;
  countryCode: string;
  country: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
};
export async function ipToLatLong(ip: string): Promise<Location | null> {
  if (ip.trim() !== "") {
    const geoIpUrl = process.env.FREE_GEO_IP_API_URL + ip;
    const fetcher = fetch(geoIpUrl)
      .then(response => response.json())
      .then((data: GeoIPLocation | null) => parseGeoIPJSONResult(data));

    return LocationCache.getOrFetch(ip, fetcher, null);
  }
  return null;
}
