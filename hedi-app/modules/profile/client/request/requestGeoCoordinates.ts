import { jsonPost } from "@/modules/common/utils";
import { geoCoordinatesAPIUrl } from "../../types";
import { Location } from "@/modules/map/types";
import { IAPIResponse } from "@/modules/model";

export const requestGeoCoordinates = (
  zipCode: string | null,
  strict?: boolean
): Promise<Location | null> =>
  
  jsonPost<IAPIResponse<Location>>(geoCoordinatesAPIUrl, {
    zipCode: zipCode,
    strict: !!strict?strict:false
  }).then(res => res?.data ?? null)

export const requestPostalCodeGeoCoordinates = (
  postalCode: string | null
): Promise<Location | null> =>
  new Promise<Location | null>(resolve => {
    if (!postalCode) return resolve(null);
    requestGeoCoordinates(postalCode).then(data => resolve(data));
  });
