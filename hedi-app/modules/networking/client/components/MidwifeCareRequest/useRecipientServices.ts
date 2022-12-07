import { IConnectionProfile } from "@/modules/networking/types";
import { useEffect, useState } from "react";

export const useRecipientServices = (profile?: IConnectionProfile) => {
  const [hasServices, setHasServices] = useState(false);
  const [hasCareTypes, setHasCareTypes] = useState(false);

  useEffect(() => {
    if (profile) {
      setHasServices(!!profile.services?.length);
      setHasCareTypes(!!profile.careTypes?.length);
    }
  }, [profile]);

  return {
    hasServices,
    hasCareTypes,
  };
};
