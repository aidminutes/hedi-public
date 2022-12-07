import useSWR from "swr";
import { FormEventHandler, useState, useEffect } from "react";
import { requestGeoCoordinates } from "../request/requestGeoCoordinates";
import { Location } from "@/modules/map/types";
import { validPostalCodeRegex } from "@/modules/react/validation";

export function useZipCode() {
  const [zipCode, setZipCode] = useState<string>("");
  const [tempZipCode, setTempZipCode] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isNotValid, setIsNotValid] = useState<boolean>(false);

  // NOTE swr key needs to be array with one item instead of the item directly
  // since null would cause swr not to fetch, we do want to pass null however to get ip location
  const { data } = useSWR(
    [zipCode?.length === 5 ? zipCode : null],
    zip => requestGeoCoordinates(zip),
    {
      onSuccess: data => {
        let isValid = zipCode.length === 0 || zipCode.length === 5;
        if (
          zipCode &&
          zipCode.length === 5 &&
          data &&
          data.zipCode !== zipCode
        ) {
          isValid = false;
        } else {
          setUserLocation(data ?? null);
        }
        if (isValid !== undefined) setIsNotValid(!isValid);
      },
      revalidateOnFocus: false,
    }
  );

  const handleZipCodeSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const {
      zipcode: { value: zipcode },
    } = event.target as typeof event.target & {
      zipcode: { value: string };
    };
    setZipCode(zipcode);
  };

  useEffect(() => {
    console.log(tempZipCode?.length);
    if (tempZipCode && tempZipCode?.length > 0) {
      setIsNotValid(
        !validPostalCodeRegex.test(tempZipCode) || tempZipCode?.length !== 5
      );
    }
  }, [tempZipCode]);

  const handleZipCodeChange = (value: string) => {
    const matches = value?.match(/\d+/);
    if (matches && matches.length > 0) {
      setTempZipCode(matches[0]);
    } else {
      setTempZipCode(null);
    }
  };
  
  return {
    isNotValid,
    userLocation,
    zipCode: tempZipCode,
    handleZipCodeSubmit,
    handleZipCodeChange,
  };
}
