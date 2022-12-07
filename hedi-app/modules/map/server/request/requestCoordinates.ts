import {
  responseToIHTTPError,
  IHTTPError,
  IsIHTTPError,
} from "@/modules/common/error";
import { INominatimGeoJson } from "../../types/INominatimGeoJson";
import { transformNominatimGeoJsonToLatLong } from "../functions";

export async function requestCoordinates(typedAddress: string) {
  return fetch(
    process.env.NOMINATIM_GEO_LOCATION_URL + encodeURI(typedAddress),
    {
      method: "GET",
    }
  )
    .then<INominatimGeoJson | IHTTPError>(response =>
      response.status === 200 ? response.json() : responseToIHTTPError(response)
    )
    .then(result =>
      IsIHTTPError(result) ? result : transformNominatimGeoJsonToLatLong(result)
    );
}
