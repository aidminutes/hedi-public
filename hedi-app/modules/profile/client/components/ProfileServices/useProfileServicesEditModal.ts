import { useUser } from "@/modules/auth/client/hooks";
import { ICareType } from "@/modules/networking/types/ICareType";
import {
  IMidwife,
  IProfessionalProfile,
  IService,
  IServiceWithChildren,
  isIMidwife,
} from "@/modules/profile/types";
import React, { useState } from "react";
import { editMyProfile } from "../../request/editMyProfile";

export const useProfileServicesEditModal = ({
  lang,
  profile,
  allServices,
  allCareTypes,
  onSaveSuccess,
}: {
  lang: string;
  profile: IProfessionalProfile;
  allServices: IServiceWithChildren[];
  allCareTypes: ICareType[];
  onSaveSuccess?: () => void;
}) => {
  const [user, isLoading] = useUser();
  const isMidwife = isIMidwife(profile);
  const [profileCareTypes, setProfileCareTypes] = useState<ICareType[]>([
    ...(isMidwife ? profile.careTypes : []),
  ]);
  const [profileServices, setProfileServices] = useState<IService[]>([
    ...profile.services,
  ]);

  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const hasServices = !!profile?.services?.length;
  const hasCareTypes = isMidwife && !!(profile as IMidwife)?.careTypes?.length;
  const onResetHandler = () => {
    setProfileCareTypes([...(isMidwife ? profile.careTypes : [])]);
    setProfileServices([...profile.services]);
  };
  const onSaveHandler = () => {
    setIsSaving(true);
    editMyProfile(
      {
        services: profileServices.map(service => service.route),
        careTypes: profileCareTypes.map(service => service.route),
      },
      lang,
      user?.role
    ).then(result => {
      setIsSaving(false);
      setHasError(!result.success);
      if (result.success) onSaveSuccess && onSaveSuccess();
    });
  };
  const keyPressHandler = (key: string) => {
    if (key === "Enter") onSaveHandler();
  };
  const serviceChangeHandler = (
    checked: boolean,
    route: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (checked) {
      setProfileServices(prev => {
        const service = allServices
          .flatMap(group => group.children || [])
          .find(service => service.route === route);
        if (service) prev.push(service);
        return [...prev];
      });
    } else {
      setProfileServices(prev => {
        const itemIndex = prev.findIndex(service => service.route === route);
        if (itemIndex !== -1) prev.splice(itemIndex, 1);
        return [...prev];
      });
    }
  };

  const careTypesChangeHandler = (
    checked: boolean,
    route: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (checked) {
      setProfileCareTypes(prev => {
        const careType = allCareTypes.find(service => service.route === route);
        if (careType) prev.push(careType);
        return [...prev];
      });
    } else {
      setProfileCareTypes(prev => {
        const itemIndex = prev.findIndex(careType => careType.route === route);
        if (itemIndex !== -1) prev.splice(itemIndex, 1);
        return [...prev];
      });
    }
  };

  const getGroupServicesCountLabel = (groupLabel: string) => {
    const count = profileServices.filter(
      service => service.parent?.label === groupLabel
    ).length;
    return count === 0 ? "" : ` (${count})`;
  };

  return {
    onResetHandler,
    onSaveHandler,
    keyPressHandler,
    serviceChangeHandler,
    careTypesChangeHandler,
    getGroupServicesCountLabel,
    profile,
    isMidwife,
    hasServices,
    hasCareTypes,
    profileCareTypes,
    profileServices,
    hasError,
    isSaving,
  };
};
