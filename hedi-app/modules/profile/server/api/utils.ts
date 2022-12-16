import { sendAPIResult } from "@/modules/common/utils";
import { zipToLatLong } from "@/modules/map/server/queries";
import { IMutationResponse } from "@/modules/model";
import { NextApiResponse } from "next";

export const sendAPIErrorIfInvalidPostalCode = async (
  res: NextApiResponse,
  postalCode?: string
) => {
  let isErrorSent = false;
  if (postalCode) {
    const location = await zipToLatLong(postalCode);
    if (!location || !location.latLong) {
      const responseObj: IMutationResponse = {
        success: false,
        errors: { postalCode: "invalid postal code" },
      };
      sendAPIResult(res, responseObj);
      isErrorSent = true;
    }
  }
  return { isErrorSent };
};
