import { UserProfile } from "@/modules/profile/types";
import { useState } from "react";
import { transformProfileUserCard } from "../transformProfileUserCard";
import { validPostalCodeRegex } from "@/modules/react/validation";
import { requestGeoCoordinates } from "../../../request/requestGeoCoordinates";

export function usePersonEdit(profile: UserProfile | null, lang: string) {
  const {
    givenName,
    familyName,
    namePrefix,
    city,
    postalCode,
    street,
    streetNumber,
  } = transformProfileUserCard(profile);

  const [hasError, setHasError] = useState(false);

  const [givenNameValue, setGivenNameValue] = useState(givenName);
  const handleGivenNameChange = (value: string) => setGivenNameValue(value);
  const [familyNameValue, setFamilyNameValue] = useState(familyName);
  const handleFamilyNameChange = (value: string) => setFamilyNameValue(value);
  const [namePrefixValue, setNamePrefixValue] = useState(namePrefix);
  const handlePrefixChange = (value: string) => setNamePrefixValue(value);
  const [cityValue, setCityValue] = useState(city);
  const handleCityChange = (value: string) => setCityValue(value);
  const [postalCodeValue, setPostalCodeValue] = useState(postalCode);

  const handlePostalCodeChange = (value: string) => {
    const matches = value?.match(/\d+/);
    if (matches && matches.length > 0) {
      setPostalCodeValue(matches[0]);
    } else {
      setPostalCodeValue(null);
    }
  };
  const [streetValue, setStreetValue] = useState(street);
  const handleStreetChange = (value: string) => setStreetValue(value);
  const [streetNumberValue, setStreetNumberValue] = useState(streetNumber);
  const handleStreetNumberChange = (value: string) =>
    setStreetNumberValue(value);

  const [isPostalCodeActive, setIsPostalCodeActive] = useState(false);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false);
  const [isCityActive, setIsCityActive] = useState(false);
  const [isCityValid, setIsCityValid] = useState(false);
  const [isGivenNameActive, setIsGivenNameActive] = useState(false);
  const [isGivenNameValid, setIsGivenNameValid] = useState(false);
  const [isFamilyNameActive, setIsFamilyNameActive] = useState(false);
  const [isFamilyNameValid, setIsFamilyNameValid] = useState(false);

  const handlePostalCodeBlur = (value: string) => {
    setIsPostalCodeActive(true);
    let isValid = validPostalCodeRegex.test(value);
    if (isValid) {
      requestGeoCoordinates(value, true)
        .then(
          location => (
            setIsPostalCodeValid(!!location),
            !!location && location?.city
              ? (setCityValue(location?.city),
                setIsCityActive(true),
                setIsCityValid(location?.city.trim() !== ""))
              : null
          )
        )
        .catch(() => setIsPostalCodeValid(false));
    } else {
      setIsPostalCodeValid(isValid);
    }
  };
  const handleCityBlur = (value: string) => {
    let validCityName = value.trim() !== "";

    let postalCodeValidSyntax = validPostalCodeRegex.test(postalCodeValue??'');

    if (validCityName && postalCodeValue && (isPostalCodeValid || postalCodeValidSyntax)) {
      requestGeoCoordinates(postalCodeValue, true).then(location =>
        !!location && location?.city
          ? (setIsCityActive(true),
            setIsCityValid(value.trim().toLowerCase() == location.city.toLowerCase()))
          : null
      );
    }
    setIsCityActive(true);
    setIsCityValid(validCityName);
  };
  const handleGivenNameBlur = (value: string) => {
    setIsGivenNameActive(true);
    setIsGivenNameValid(value.trim() !== "");
  };
  const handleFamilyNameBlur = (value: string) => {
    setIsFamilyNameActive(true);
    setIsFamilyNameValid(value.trim() !== "");
  };

  const setBackToInitial = () => {
    setGivenNameValue(givenName);
    setFamilyNameValue(familyName);
    setNamePrefixValue(namePrefix);
    setCityValue(city);
    setPostalCodeValue(postalCode);
    setStreetValue(street);
    setStreetNumberValue(streetNumber);

    setIsPostalCodeActive(false);
    setIsPostalCodeValid(false);
    setIsCityActive(false);
    setIsCityValid(false);
    setIsGivenNameActive(false);
    setIsGivenNameValid(false);
    setIsFamilyNameActive(false);
    setIsFamilyNameValid(false);
  };

  return {
    givenNameValue,
    familyNameValue,
    namePrefixValue,
    cityValue,
    postalCodeValue,
    streetValue,
    streetNumberValue,

    isPostalCodeActive,
    isPostalCodeValid,
    hasError,
    isCityActive,
    isCityValid,
    isGivenNameActive,
    isGivenNameValid,
    isFamilyNameActive,
    isFamilyNameValid,
    handleStreetNumberChange,
    handleStreetChange,
    handlePostalCodeChange,
    handleCityChange,
    handlePrefixChange,
    handleFamilyNameChange,
    handleGivenNameChange,
    setBackToInitial,

    handlePostalCodeBlur,
    handleCityBlur,
    handleFamilyNameBlur,
    handleGivenNameBlur,
  };
}
