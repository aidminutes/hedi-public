import { LatLngTuple } from "leaflet";
import { Location } from "@/modules/map/types";
import { INominatinJSONCoordinates } from "../queries/zipToLatLong";

export function parseNominatinJSONResult(
  resultJSON: INominatinJSONCoordinates[] | null,
  zip: string,
  isAlternative?: boolean
): Location | null {
  //revalidate zipcode, there are times geoip incorrectly returns nearest postcode

  let result: Location | null = null;

  if (resultJSON && resultJSON?.length > 0) {
    if (resultJSON[0].properties.geocoding.postcode === zip) {
      result = {
        city:
          resultJSON[0].properties.geocoding.city ||
          resultJSON[1].properties.geocoding.city,
        label: resultJSON[0].properties.geocoding.label,
        latLong: resultJSON[0].geometry.coordinates.reverse() as LatLngTuple,
        zipCode: resultJSON[0].properties.geocoding.postcode,
      } as Location;
    } else if (
      isAlternative &&
      resultJSON[0].properties.geocoding.name.indexOf(" " + zip + " ") !== -1
    ) {
      let pos = resultJSON[0].properties.geocoding.name.indexOf(
        " " + zip + " "
      );
      let city = resultJSON[0].properties.geocoding.name.substring(
        pos + zip.length + 2
      );
      result = {
        city: city,
        label: resultJSON[0].properties.geocoding.label,
        latLong: resultJSON[0].geometry.coordinates.reverse() as LatLngTuple,
        zipCode: zip,
      } as Location;
    }
  }
  return result;
}
