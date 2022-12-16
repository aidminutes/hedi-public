import { useEffect, useState } from "react";
import useSWR from "swr";
import { useUser } from "@/modules/auth/client/hooks";
import { getAge, isBoolean, calculateAge } from "@/modules/common/utils";
import { useMyProfile } from "../../../hooks";
import { IPersonal } from "@/modules/profile/types/IPersonal";
import { requestMyPregnancy } from "../../../request";

export function usePregnancyCompact(lang: string, profile?: IPersonal) {
  const [user, isLoading] = useUser();
  const [myProfile, profileIsLoading] = profile
    ? [profile, false]
    : useMyProfile(user, lang);
  const [age, setAge] = useState(profile ? calculateAge(profile.birthDate) : 0);
  useEffect(() => {
    if (myProfile)
      setAge(myProfile ? calculateAge((myProfile as IPersonal).birthDate) : 0);
  }, [myProfile]);
  const [isPregnancyLoading, setIsPregnancyLoading] = useState(true);
  const [reloadPregnancyKey, setReloadPregnancyKey] = useState(1);
  const { data: pregnancy, error, isValidating } = useSWR(
    (reloadPregnancyKey || 1).toString(),
    _ =>
      requestMyPregnancy().then(resp => {
        setIsPregnancyLoading(false);
        return resp;
      })
  );

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = pregnancy?.expectedDeliveryDate
    ? new Date(pregnancy.expectedDeliveryDate)
    : null;
  const localizedDate = date?.toLocaleDateString(lang, dateOptions);

  const isCurrentPregnancyEmpty = !pregnancy;

  const isHealthdataEmpty =
    !isBoolean(pregnancy?.prevBirthComplication) &&
    !isBoolean(pregnancy?.prevPrematureBirth) &&
    !isBoolean(pregnancy?.prevCSection) &&
    !isBoolean(pregnancy?.prevPostpartumDepression) &&
    !isBoolean(pregnancy?.prevBreastfeedingProblem);

  return {
    ...pregnancy,
    error,
    localizedDate,
    isHealthdataEmpty,
    isCurrentPregnancyEmpty,
    age,
    pregnancy,
    profile,
    isPregnancyLoading,
  };
}
