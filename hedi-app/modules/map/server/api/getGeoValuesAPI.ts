import { getUserAuthHeader } from "@/modules/auth/server";
import {
  parsePublicAddressCoordinates,
  sendAPIResult,
} from "@/modules/common/utils";
import { Location } from "@/modules/map/types";
import { getMyProfile } from "@/modules/profile/server";

import { NextApiHandler } from "next";
import { parseRequestIP } from "../functions/parseRequestIP";
import { ipToLatLong, zipToLatLong } from "../queries";

export const getGeoValuesAPI: NextApiHandler<Location | null> = async (
  req,
  res
) => {
  let location = null;
  // NOTE
  // 1) zipCode provided, try get lat long
  // no zipcode or invalid
  // 2) try user profile address location if available
  // 3) fallback to http request ip location

  const { zipCode, strict } = JSON.parse(req.body) as {
    zipCode: string;
    strict?: boolean;
  };
  if (zipCode) {
    // 1)
    location = await zipToLatLong(zipCode);
  }
  if (!strict) {
    if (!location) {
      // 2)
      const authHeader = await getUserAuthHeader(req);
      const profile = authHeader ? await getMyProfile("de", authHeader) : null;
      location = profile
        ? parsePublicAddressCoordinates(profile.addresses)
        : null;
    }

    if (!location) {
      // 3)
      const ip = parseRequestIP(req);
      if (!ip) {
        console.info(
          "Failed to retrieve the ip " +
            req.connection.remoteAddress +
            " - not an error on local dev, but should not happen online"
        );
      } else {
        location = await ipToLatLong(ip ?? "");
      }
    }
  }

  sendAPIResult(res, location, true);
};
