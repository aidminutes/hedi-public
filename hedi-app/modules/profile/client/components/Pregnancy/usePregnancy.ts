import { useEffect, useState } from "react";
import useSWR from "swr";
import { IPersonal } from "../../../types";
import { requestMyPregnancy } from "../../request";
import { useUser } from "@/modules/auth/client/hooks";
import { getAge, isBoolean, calculateAge } from "@/modules/common/utils";
import { useMyProfile } from "../../hooks";

export type PregnancyViewKind = "pregnancy-part" | "health-part" | "all";

export function usePregnancy(lang: string) {
  const [user, isLoading] = useUser();
  const [profile, profileIsLoading] = useMyProfile(user, lang);
  const [age, setAge] = useState(0);
  useEffect(() => {
    if (profile)
      setAge(profile ? calculateAge((profile as IPersonal).birthDate) : 0);
  }, [profile]);
  const [isPregnancyEditOpen, setIsPregnancyEditOpen] = useState(false);
  const [isHealthyPartEditOpen, setIsHealthyPartEditOpen] = useState(false);
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

  useEffect(() => {
    if (pregnancy) setIsPregnancyLoading(false);
  }, [pregnancy]);

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

  const openPregnancyEditModalHandler = () => setIsPregnancyEditOpen(true);
  const closePregnancyEditModalHandler = () => setIsPregnancyEditOpen(false);

  const openHealthyPartEditModalHandler = () => setIsHealthyPartEditOpen(true);
  const closeHealthyPartEditModalHandler = () =>
    setIsHealthyPartEditOpen(false);

  const closeModalAndReloadHandler = () => {
    setIsPregnancyEditOpen(false);
    setIsHealthyPartEditOpen(false);
    setIsPregnancyLoading(true);
    setReloadPregnancyKey(prev => prev + 1);
  };

  return {
    ...pregnancy,
    isValidating,
    error,
    localizedDate,
    isHealthdataEmpty,
    isCurrentPregnancyEmpty,
    age,
    isPregnancyEditOpen,
    isHealthyPartEditOpen,
    pregnancy,
    profile,
    isPregnancyLoading,
    openPregnancyEditModalHandler,
    closePregnancyEditModalHandler,
    openHealthyPartEditModalHandler,
    closeHealthyPartEditModalHandler,
    closeModalAndReloadHandler,
  };
}
