import { useEffect, useState } from "react";
import { IsIErrorResponse } from "@/modules/common/error";
import { IPage } from "@/modules/common/types";
import { requestMyPregnancy } from "@/modules/profile/client/request";
import { IPregnancy } from "@/modules/profile/types";
import { CareType } from "@/modules/networking/types/ICareType";
import { useSearchMidwife } from "../../hooks";
import { ICareTypeDateRangeForView } from "../../../types";

export function useSearchMidwifeView(props: IPage) {
  const [distance, setDistance] = useState("5"); //TODO pick it up from env file for now 5kms around
  const [location, setLocation] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [myPregnancy, setMyPregnacy] = useState<IPregnancy | null>(null);
  const [careTypeDateRanges, setCareTypeDateRanges] = useState<
    ICareTypeDateRangeForView[]
  >([]);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState<string>("");

  const calcCareTypeDateRanges = (deliveryDate: Date) => {
    const today = new Date();
    // TODO move this business to other place + check durations
    const careTypeDateRanges: ICareTypeDateRangeForView[] = [];
    careTypeDateRanges.push({
      careType: "prenatalCare",
      title: "prenatalCare", // TODO get from components
      fromDate: new Date(
        new Date(deliveryDate).setMonth(new Date(deliveryDate).getMonth() - 6)
      ),
      toDate: deliveryDate,
      enabled: deliveryDate > today,
      selected: deliveryDate > today,
    });
    careTypeDateRanges.push({
      careType: "deliveryCare",
      title: "deliveryCare",
      fromDate: new Date(
        new Date(deliveryDate).setDate(new Date(deliveryDate).getDate() - 14)
      ),
      toDate: new Date(
        new Date(deliveryDate).setDate(new Date(deliveryDate).getDate() + 14)
      ),
      enabled: deliveryDate > today,
      selected: deliveryDate > today,
    });
    careTypeDateRanges.push({
      careType: "postpartumCare",
      title: "postpartumCare",
      fromDate: deliveryDate,
      toDate: new Date(
        new Date(deliveryDate).setDate(new Date(deliveryDate).getDate() + 30)
      ), // TODO why 30 and why not!
      enabled:
        deliveryDate > today ||
        deliveryDate <
          new Date(
            new Date(deliveryDate).setMonth(
              new Date(deliveryDate).getMonth() + 2
            )
          ),
      selected:
        deliveryDate > today ||
        deliveryDate <
          new Date(
            new Date(deliveryDate).setMonth(
              new Date(deliveryDate).getMonth() + 2
            )
          ),
    });
    return careTypeDateRanges;
  };
  useEffect(() => {
    requestMyPregnancy().then(pregnancy => {
      setMyPregnacy(pregnancy);
      if (pregnancy) {
        setExpectedDeliveryDate(pregnancy.expectedDeliveryDate);

        setCareTypeDateRanges(
          calcCareTypeDateRanges(new Date(pregnancy.expectedDeliveryDate))
        );
      }
    });
  }, []);
  useEffect(() => {
    setCareTypeDateRanges(
      calcCareTypeDateRanges(new Date(expectedDeliveryDate))
    );
  }, [expectedDeliveryDate]);

  const handleCareTypeItemDateRangeChange = (
    caretype: CareType,
    dates: Date[]
  ) => {
    setCareTypeDateRanges(prev => {
      const careTypeItem = prev.find(item => item.careType == caretype);
      if (!careTypeItem) return prev;
      careTypeItem.fromDate = dates[0];
      careTypeItem.toDate = dates[1];
      return [...prev];
    });
  };

  const handleCareTypeItemSelectedChange = (
    caretype: CareType,
    selected: boolean
  ) => {
    setCareTypeDateRanges(prev => {
      const careTypeItem = prev.find(item => item.careType == caretype);
      if (!careTypeItem) return prev;
      careTypeItem.selected = selected;
      return [...prev];
    });
  };

  const locations: Location[] = [];

  useEffect(() => {
    setHasFilter(
      `${services.join(" ")}${languages.join(" ")}${location}`.length > 3
    );
  }, [location, services, languages]);

  const handleLocationChanged = async (value: string) => {
    const typedAddress = value.replace(/\s/g, "+");
    setLocation(typedAddress);
  };

  const handleExpectedDeliveryDateChanged = async (value: string) => {
    setExpectedDeliveryDate(value);
  };

  const handleDistanceChange = (value: number) => {
    setDistance(value.toString());
  };

  const handleLanguagesChanged = (value: string) => {
    // TODO use clonable items like address, email, ... see how is this multiple values managed
    // now it's just a simple by space separeted array
    setLanguages(value.trim().replace(/\s+/g, " ").split(" "));
  };

  const handleServicesChanged = (value: string) => {
    // TODO use clonable items like address, email, ... see how is this multiple values managed
    // now it's just a simple by space separeted array
    setServices(value.trim().replace(/\s+/g, " ").split(" "));
  };

  let loading = false;

  const { data, error } = useSearchMidwife(
    services,
    languages,
    props.lang,
    location,
    distance,
    careTypeDateRanges
  );

  if (error || IsIErrorResponse(data)) {
    loading = false;
  } else if (data) {
    loading = false;
  }

  return {
    loading,
    data: data ?? null,
    locations,
    services,
    languages,
    hasFilter,
    careTypeDateRanges,
    expectedDeliveryDate,
    handleLocationChanged,
    handleExpectedDeliveryDateChanged,
    handleDistanceChange,
    handleServicesChanged,
    handleLanguagesChanged,
    handleCareTypeItemDateRangeChange,
    handleCareTypeItemSelectedChange,
  };
}
