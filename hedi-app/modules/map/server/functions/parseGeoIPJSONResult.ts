import { LatLngTuple } from "leaflet";
import { Location } from "@/modules/map/types";
import { GeoIPLocation } from "../queries/ipToLatLong";

export function parseGeoIPJSONResult(
  resultJSON: GeoIPLocation | null
): Location | null {
  return resultJSON && resultJSON.status === "success"
    ? {
        latLong: [resultJSON.lat, resultJSON.lon] as LatLngTuple,
        city: resultJSON.city,
        zipCode: resultJSON.zip,
        label: resultJSON.ip,
      }
    : null;
}
