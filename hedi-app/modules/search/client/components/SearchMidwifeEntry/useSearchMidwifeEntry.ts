import { useUser } from "@/modules/auth/client/hooks";
import { ISelectItem } from "@/modules/components";
import { transformProfileUserCard } from "@/modules/profile/client/components/ProfileUserCard/transformProfileUserCard";
import { useMyProfile } from "@/modules/profile/client/hooks";
import { validPostalCodeRegex } from "@/modules/react/validation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { transformToTimestamp } from "@/modules/search/utils/transformToTimestamp";
import { requestExpectedDeliveryDateData } from "@/modules/search/utils/requestExpectedDeliveryDateData";
import { ISearchInputParams } from "@/modules/search/types";
import { IPage, IWizard } from "@/modules/common/types";

export function useSearchMidwifeEntry(
  lang: string,
  searchMidwifeUrl: string,
  isPartOfWizard?: boolean,
  wizard?: IWizard
) {
  const [user, userIsLoading] = useUser();
  const [profile, profileIsLoading] = useMyProfile(user, lang);
  const [isLoading, setIsLoading] = useState(false);

  const { expectedDeliveryDate } = requestExpectedDeliveryDateData();

  const postalCode =
    transformProfileUserCard(profile).postalCode?.toString() || "";

  const [postalCodeValue, setPostalCodeValue] = useState<string | null>(null);
  const [expectedDeliveryDateValue, setExpectedDeliveryDateValue] = useState(
    transformToTimestamp(expectedDeliveryDate)
  );
  const [careTypes, setCareTypes] = useState<{
    selectedItems: ISelectItem[];
  }>();
  const [pregnancyLatLong, setPregnancyLatLong] = useState("");

  const handlePostalCodeChange = (value: string) => {
    const matches = value?.match(/\d+/);
    if (matches && matches.length > 0) {
      setPostalCodeValue(matches[0]);
    } else {
      setPostalCodeValue(null);
    }
  };

  const handleExpectedDeliveryDateChange = (value: Date[]) => {
    setExpectedDeliveryDateValue(value[0].getTime());
  };
  const handleCareTypesChange = (value: { selectedItems: ISelectItem[] }) => {
    setCareTypes(value);
  };

  const [isPostalCodeActive, setIsPostalCodeActive] = useState(false);
  const [isPostalCodeValid, setIsPostalCodeValid] = useState(false);

  const handlePostalCodeBlur = (value: string) => {
    setIsPostalCodeActive(true);
    setIsPostalCodeValid(validPostalCodeRegex.test(value));
  };

  useEffect(() => {
    if (!!profile) setPostalCodeValue(postalCode);
  }, [postalCode, profile]);

  useEffect(() => {
    if (!!profile) {
      if (
        profile.addresses?.[0]?.postalCode &&
        profile.addresses?.[0]?.postalCode.toString() == postalCodeValue
      ) {
        setPregnancyLatLong(
          profile.addresses[0].latLong ||
            profile.addresses[0].latLongApprox ||
            ""
        );
      }
    }
  }, [postalCodeValue, profile]);

  useEffect(() => {
    if (postalCodeValue)
      setIsPostalCodeValid(
        validPostalCodeRegex.test(postalCodeValue.toString())
      );
  }, [postalCodeValue]);

  useEffect(() => {
    setExpectedDeliveryDateValue(transformToTimestamp(expectedDeliveryDate));
  }, [expectedDeliveryDate]);

  const router = useRouter();

  const handleSubmit = () => {
    setIsLoading(true);
    const selectedCareTypeRoutes = careTypes?.selectedItems?.map(
      careType => careType.route
    );
    const output: ISearchInputParams = {
      plz: postalCodeValue || "",
      date: expectedDeliveryDateValue?.toString() || "",
      cares: selectedCareTypeRoutes || [],
    };
    if (pregnancyLatLong) output.latlon = pregnancyLatLong;
    const searchParams = JSON.stringify(output);

    if (!!isPartOfWizard && !!wizard) {
      wizard?.next<ISearchInputParams>(undefined, {
        key: "searchParams",
        value: output,
      });
    } else {
      const baseUrl = searchMidwifeUrl;
      router.push(
        baseUrl + "?searchParams=" + encodeURIComponent(btoa(searchParams))
      );
    }
  };

  return {
    isPostalCodeActive,
    isPostalCodeValid,
    postalCodeValue,
    expectedDeliveryDateValue,
    isLoading,
    handlePostalCodeBlur,
    handlePostalCodeChange,
    handleExpectedDeliveryDateChange,
    handleCareTypesChange,
    handleSubmit,
  };
}
