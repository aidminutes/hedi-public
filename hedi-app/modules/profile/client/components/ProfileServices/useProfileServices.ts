import { useUser } from "@/modules/auth/client/hooks";
import {
  IMidwife,
  IProfessionalProfile,
  isIMidwife,
  UserProfile,
} from "@/modules/profile/types";
import { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks";
import { requestMyProfile } from "../../request";

export const useProfileServices = (lang: string) => {
  const [user, userIsLoading] = useUser();
  const [userProfile, isProfileLoading] = useMyProfile(user, lang);
  const [profile, setProfile] = useState(userProfile);

  const [isServicesEditOpen, setIsServicesEditOpen] = useState(false);
  const [isLanguagesEditOpen, setIsLanguagesEditOpen] = useState(false);
  const [isMidwife, setIsMidwife] = useState(false);
  const [hasServices, setHasServices] = useState(false);
  const [hasCareTypes, setHasCareTypes] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const setStates = (userProfile: UserProfile) => {
    setProfile(userProfile);
    const proProfile = userProfile as IProfessionalProfile;
    setIsMidwife(isIMidwife(proProfile));
    setHasServices(!!proProfile?.services?.length);
    setHasCareTypes(!!(proProfile as IMidwife)?.careTypes?.length);
  };
  useEffect(() => {
    if (userProfile) setStates(userProfile);
  }, [userProfile]);

  const onServicesEdit = () => {
    setIsServicesEditOpen(true);
  };
  const reloadProfile = async () => {
    setIsReloading(true);
    const profile = await requestMyProfile(lang);
    if (profile) setStates(profile);
    setIsReloading(false);
  };
  const servicesEditSuccessHandler = async () => {
    servicesEditCloseHandler();
    reloadProfile();
  };
  const languagesEditSuccessHandler = async () => {
    languagesEditCloseHandler();
    reloadProfile();
  };

  const onLanguagesEdit = () => {
    setIsLanguagesEditOpen(true);
  };
  const servicesEditCloseHandler = () => setIsServicesEditOpen(false);
  const languagesEditCloseHandler = () => setIsLanguagesEditOpen(false);

  return {
    onServicesEdit,
    onLanguagesEdit,
    profile: profile as IProfessionalProfile,
    isMidwife,
    hasServices,
    hasCareTypes,
    isServicesEditOpen,
    isLanguagesEditOpen,
    isReloading,
    isProfileLoading,
    servicesEditSuccessHandler,
    languagesEditSuccessHandler,
    servicesEditCloseHandler,
    languagesEditCloseHandler,
  };
};
