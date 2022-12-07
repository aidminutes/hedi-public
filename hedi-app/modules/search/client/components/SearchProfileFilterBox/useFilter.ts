import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import { requestGeoCoordinates } from "@/modules/profile/client/request/requestGeoCoordinates";
import { ISelectItem } from "@/modules/components/types/ISelectComponent";
import { Location } from "@/modules/map/types";
import { ISearchProfileFilterProps } from "./ISearchProfileFilterProps";
import { defaultDistance } from "./distanceUtils";
import { validPostalCodeRegex } from "@/modules/react/validation";

export function useFilter({
  onFilter,
  onLocationChange,
  perimeterSelect,
  defaultDistance: propsDefaultDistance,
}: ISearchProfileFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatedLocation, setIsCalculatedLocation] = useState<boolean>(
    true
  );
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [zipcodeInputValue, setZipcodeInputValue] = useState<string | null>(
    null
  );
  const [zipCode, setZipCode] = useState<string>("");
  const [isNotValid, setIsNotValid] = useState<boolean>(false);
  const [distanceItem, setDistanceItem] = useState<ISelectItem | null>(null);
  const [defaultLocation, setDefaultLocation] = useState<Location | null>(null);
  const [isDefaultLocationFetched, setIsDefaultLocationFetched] = useState(
    false
  );
  const [location, setLocation] = useState<Location | null>(null);

  const perimeterDefaultItem = perimeterSelect.items.find(
    item => item.route === (propsDefaultDistance ?? defaultDistance)
  );
  useEffect(() => {
    setDistanceItem(perimeterDefaultItem || null);
  }, [propsDefaultDistance]);

  useEffect(() => {
    if (zipcodeInputValue) setIsInputDisabled(zipcodeInputValue.length !== 5);
  }, [zipcodeInputValue]);

  // NOTE swr key needs to be array with one item instead of the item directly
  // since null would cause swr not to fetch, we do want to pass null however to get ip location
  const { data } = useSWR(
    [zipCode?.length === 5 ? zipCode : null],
    zip => requestGeoCoordinates(zip),
    {
      onSuccess: data => {
        handleGetRespose(data);
      },
      revalidateOnFocus: false,
    }
  );

  const handleGetRespose = (data: Location | null) => {
    let isValid = zipCode.length === 0 || zipCode.length === 5;
    if (zipCode.length === 5 && data && data.zipCode !== zipCode) {
      isValid = false;
    } else {
      setLocation(data);
      setIsCalculatedLocation(zipCode === "");
      if (onLocationChange && data) onLocationChange(data);
      if (!isDefaultLocationFetched) {
        setIsDefaultLocationFetched(true);
        setDefaultLocation(data);
      }
      if (onFilter) {
        onFilter({
          userLocation: data,
          distanceItem,
          isUserDefaultLocation: !zipCode,
        });
      }
    }
    setIsNotValid(!isValid);
    if (zipCode && isValid) {
      handleModalState();
    }
  };

  const handleModalState = () => setIsOpen(!isOpen);

  const handleZipcodeInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const matches = e.target.value?.match(/\d+/);
    if (matches && matches.length > 0) {
      setZipcodeInputValue(matches[0]);
    } else {
      setZipcodeInputValue(null);
    }
    if (matches) {
      setIsNotValid(
        !validPostalCodeRegex.test(matches[0]) ||
          zipcodeInputValue?.length !== 4
      );
    }
  };

  const handleReset = () => {
    setZipcodeInputValue("");
    setZipCode("");
    setDistanceItem(perimeterDefaultItem || null);
    if (onFilter)
      onFilter({
        userLocation: null,
        distanceItem: perimeterDefaultItem || null,
        isUserDefaultLocation: true,
      });
  };

  const handleSubmitKeyPress = (key: string) => {
    if (key === "Enter" && !isInputDisabled) handleSubmit();
  };

  const handleSubmit = () => {
    if (
      zipcodeInputValue &&
      !(zipcodeInputValue.length === 0 || zipcodeInputValue.length === 5)
    ) {
      setIsNotValid(true);
      return;
    }
    if (
      zipcodeInputValue === zipCode &&
      JSON.stringify(location) !== JSON.stringify(defaultLocation)
    ) {
      handleGetRespose(location);
    } else {
      if (zipcodeInputValue) setZipCode(zipcodeInputValue);
    }
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistanceItem({
      route: e.target.value,
      label: e.target.selectedOptions[0].text,
    });
  };

  return {
    handleModalState,
    handleZipcodeInputValueChange,
    handleReset,
    handleSubmit,
    handleSubmitKeyPress,
    handleDistanceChange,
    isOpen,
    isInputDisabled,
    isNotValid,
    isCalculatedLocation,
    zipcodeInputValue,
    defaultLocation,
    distanceItem,
  };
}
