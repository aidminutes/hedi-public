import { useUser } from "@/modules/auth/client/hooks";
import {
  consultationHourToInput,
  IBusinessProfile,
  IBusinessProfileInput,
  IConsultationHourInput,
} from "@/modules/profile/types";
import { IInputStateMap } from "@/modules/react/hooks";
import { useState } from "react";
import { editMyProfile } from "../../../request/editMyProfile";

export function useAvailabilityEdit({
  lang,
  profile,
  onAfterSave,
}: {
  lang: string;
  profile: IBusinessProfile;
  onAfterSave?: () => void;
}) {
  const [user, userIsLoading] = useUser();
  const [profileConsultationHours, setProfileConsultationHours] = useState(
    profile.consultationHours.map(item => consultationHourToInput(item))
  );
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const stateMap = {
    consultationHours: {
      value: profileConsultationHours,
      onChange: (newValue: IConsultationHourInput[]) => {
        setProfileConsultationHours(newValue);
      },
    },
  } as IInputStateMap<Pick<IBusinessProfileInput, "consultationHours">>;

  const onResetHandler = () => {
    setProfileConsultationHours(
      profile.consultationHours.map(item => consultationHourToInput(item))
    );
  };
  const onSaveHandler = () => {
    setIsSaving(true);
    editMyProfile(
      { consultationHours: profileConsultationHours } as IBusinessProfileInput,
      lang,
      user?.role
    ).then(result => {
      setIsSaving(false);
      setHasError(!result.success);
      if (result.success) onAfterSave && onAfterSave();
    });
  };

  return {
    onResetHandler,
    onSaveHandler,
    profile,
    hasError,
    isSaving,
    ...stateMap,
  };
}
