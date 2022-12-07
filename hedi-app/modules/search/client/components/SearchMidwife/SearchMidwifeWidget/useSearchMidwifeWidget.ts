import { ISelectItem } from "@/modules/components";
import { ICareType } from "@/modules/networking/types/ICareType";
import { requestPostalCodeGeoCoordinates } from "@/modules/profile/client/request/requestGeoCoordinates";
import { validPostalCodeRegex } from "@/modules/react/validation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ISearchMidwifeWidgetInput } from "./SearchMidwifeWidget";

export function useSearchMidwifeWidget(
  input: ISearchMidwifeWidgetInput,
  allCareTypes: ISelectItem[],
  onSearch?: (input: ISearchMidwifeWidgetInput) => void,
  callSearchOnLoad?: boolean
) {
  const [postalCodeValue, setPostalCodeValue] = useState<null | string>(
    input.postalCode
  );
  const [postalCodeToFetchLocation, setPostalCodeToFetchLocation] = useState<
    null | string
  >(null);
  const [
    expectedDeliveryDateValue,
    setExpectedDeliveryDateValue,
  ] = useState<Date>(new Date(input.deliveryDate));
  const [pregnancyLatLong, setPregnacyLatLong] = useState<string>(
    input.pregnancyLatLong || ""
  );

  const initialSelectedCareTypes = input.careTypes
    .map(ct => allCareTypes.find(careType => careType.route == ct.route))
    .filter(x => x) as ISelectItem[];
  const [isCareTypeChanged, setIsCareTypeChanged] = useState(false);
  const [careTypes, setCareTypes] = useState<ISelectItem[]>(
    initialSelectedCareTypes
  );

  const [isPostalCodeActive, setIsPostalCodeActive] = useState(false);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false);

  const handlePostalCodeChange = (value: string) => {
    const matches = value.match(/\d+/);
    if (matches && matches.length > 0) {
      setPostalCodeValue(matches[0]);
    } else setPostalCodeValue(null);
    setPregnacyLatLong("");
    setIsPostalCodeActive(true);
    const isValid = validPostalCodeRegex.test(value);
    setIsPostalCodeValid(isValid);
    if (isValid) {
      setPostalCodeToFetchLocation(value);
    }
  };
  const handleExpectedDeliveryDateChange = (value: Date[]) => {
    setExpectedDeliveryDateValue(value[0]);
  };

  const handleCareTypesChange = (value: { selectedItems: ISelectItem[] }) => {
    setCareTypes(value.selectedItems);
    setIsCareTypeChanged(true);
  };

  const careTypesState = {
    items: allCareTypes,
    selectedItems: isCareTypeChanged ? careTypes : initialSelectedCareTypes,
  };

  const { isValidating: isGeoDataLoading } = useSWR(
    [postalCodeToFetchLocation ? postalCodeToFetchLocation : input.postalCode],
    zip =>
      requestPostalCodeGeoCoordinates(zip).then(data => {
        const fetchedPostalCode = postalCodeToFetchLocation
          ? postalCodeToFetchLocation
          : input.postalCode;
        if (fetchedPostalCode && data && data.zipCode == fetchedPostalCode) {
          const latLong = `${data.latLong[0].toFixed(
            6
          )},${data.latLong[1].toFixed(6)}`;
          setPregnacyLatLong(latLong);

          (window as any).callSearchOnLoadCheckCounter =
            ((window as any).callSearchOnLoadCheckCounter || 0) + 1;
          if (
            (window as any).callSearchOnLoadCheckCounter == 2 &&
            callSearchOnLoad &&
            !isPostalCodeActive &&
            onSearch
          ) {
            onSearch({ ...input, pregnancyLatLong: latLong });
          }
        } else if (fetchedPostalCode) setPregnacyLatLong("");
      }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (postalCodeValue)
      setIsPostalCodeValid(
        validPostalCodeRegex.test(postalCodeValue.toString())
      );
  }, [postalCodeValue]);

  useEffect(() => {
    (window as any).callSearchOnLoadCheckCounter =
      ((window as any).callSearchOnLoadCheckCounter || 0) + 1;
    if (
      (window as any).callSearchOnLoadCheckCounter == 2 &&
      callSearchOnLoad &&
      onSearch &&
      pregnancyLatLong &&
      !isPostalCodeActive
    ) {
      onSearch({ ...input, pregnancyLatLong });
    }
  }, []);

  useEffect(() => {
    if (!callSearchOnLoad) delete (window as any).callSearchOnLoadCheckCounter;
  }, [callSearchOnLoad]);

  const handleSearch = () => {
    if (onSearch) {
      const searchInput: ISearchMidwifeWidgetInput = {
        careTypes: careTypes as ICareType[],
        postalCode: isPostalCodeValid && postalCodeValue ? postalCodeValue : "",
        deliveryDate: expectedDeliveryDateValue,
        pregnancyLatLong,
      };
      onSearch(searchInput);
    }
  };

  return {
    isGeoDataLoading,
    isPostalCodeActive,
    isPostalCodeValid,
    postalCode: input.postalCode,
    expectedDeliveryDate: isNaN(expectedDeliveryDateValue as any)
      ? input.deliveryDate
      : expectedDeliveryDateValue,
    careTypesState,
    pregnancyLatLong,
    postalCodeValue,
    handleExpectedDeliveryDateChange,
    handlePostalCodeChange,
    handleCareTypesChange,
    handleSearch,
  };
}
