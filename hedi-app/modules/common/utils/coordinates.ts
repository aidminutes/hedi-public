import { IAddress } from "@/modules/profile/types";
import { LatLngTuple } from "leaflet";
import { Location } from "@/modules/map/types";
import { selectPrimaryData } from "@/modules/profile/utils";

export function parseLatLong(coords: string): LatLngTuple {
  const coordsArray: string[] = coords.split(",");
  return [parseFloat(coordsArray[0]), parseFloat(coordsArray[1])];
}
export function parsePublicAddressCoordinates(
  addresses: IAddress[]
): Location | null {
  const publicAddress = selectPrimaryData(addresses);
  if (!publicAddress || !addresses?.[0]) return null;
  const address = publicAddress ? publicAddress : addresses[0];
  return {
    latLong: parseLatLong(address.latLong ?? ""),
    zipCode: address.postalCode,
    city: address.city,
    label: address.city,
  } as Location;
}
//TODO improvise distance approximation and display
export function geoDistance(
  userCoordinates: LatLngTuple,
  profileCoordinates: LatLngTuple
) {
  const [lat1, lon1] = userCoordinates;
  const [lat2, lon2] = profileCoordinates;
  if (lat1 == lat2 && lon1 == lon2) {
    return "0";
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    const approxDistance = Math.floor(dist);
    return approxDistance + "";
  }
}
