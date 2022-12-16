import { LatLngTuple } from "leaflet";
export type Location = {
  label: string;
  latLong: LatLngTuple;
  zipCode?: string;
  city?: string;
  profession?: "Hebamme";
};

export function isLocation(arg: any): arg is Location {
  if (arg == null || typeof arg !== "object") return false;
  return "latLong" in arg && "zipCode" in arg;
}
