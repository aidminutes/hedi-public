import { LatLngTuple } from "leaflet";
import { INominatimGeoJson } from "../../types/INominatimGeoJson";

export function transformNominatimGeoJsonToLatLong(
  resultJSON: INominatimGeoJson
): LatLngTuple | null {
  return resultJSON && resultJSON.features && resultJSON.features.length
    ? resultJSON.features[0].geometry?.coordinates
    : null;
}
