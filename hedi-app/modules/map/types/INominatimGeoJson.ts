import { LatLngTuple } from "leaflet";

export interface INominatimGeoJson {
  type: string;
  features: {
    type: string;
    properties: Record<string, any>;
    bbox: number[];
    geometry: {
      type: string;
      coordinates: LatLngTuple;
    };
  }[];
}
