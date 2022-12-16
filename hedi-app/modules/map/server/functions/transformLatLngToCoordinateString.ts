import { IHTTPError, IsIHTTPError } from "@/modules/common/error";
import { LatLngTuple } from "leaflet";

export function transformLatLngToCoordinateString(
  input: LatLngTuple | IHTTPError | null
): string {
  if (input && !IsIHTTPError(input) && input.length == 2) {
    return input[1].toFixed(6) + "," + input[0].toFixed(6);
  }
  return "";
}
