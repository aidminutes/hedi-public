import { requestMyPregnancy } from "@/modules/profile/client/request";
import useSWR from "swr";

export const requestExpectedDeliveryDateData = () => {
  const { data: pregancyResponse } = useSWR("myPreganancy", _ =>
    requestMyPregnancy()
  );
  return {
    expectedDeliveryDate: pregancyResponse?.expectedDeliveryDate,
  };
};
