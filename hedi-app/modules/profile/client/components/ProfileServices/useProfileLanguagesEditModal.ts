import { useUser } from "@/modules/auth/client/hooks";
import {
  ILanguageLevelInput,
  IProfile,
  IProfileInput,
  languageLevelToInput,
  UserProfileInput,
} from "@/modules/profile/types";
import { IInputStateMap } from "@/modules/react/hooks";
import { useEffect, useState } from "react";
import { editMyProfile } from "../../request/editMyProfile";

export const useProfileLanguagesEditModal = ({
  lang,
  profile,
  onSaveSuccess,
}: {
  lang: string;
  profile: IProfile | null;
  onSaveSuccess?: () => void;
}) => {
  const [user, isLoading] = useUser();
  const [profileLanguageLevels, setProfileLanguageLevels] = useState<
    ILanguageLevelInput[] | undefined
  >();

  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stateMap, setStateMap] = useState<
    IInputStateMap<Pick<IProfileInput, "languageLevels">>
  >();

  useEffect(() => {
    setProfileLanguageLevels(
      profile?.languageLevels.map(item => languageLevelToInput(item))
    );
  }, [profile]);

  useEffect(() => {
    setStateMap({
      languageLevels: {
        value: profileLanguageLevels,
        onChange: (newValue: ILanguageLevelInput[]) => {
          setProfileLanguageLevels(newValue);
        },
      },
    } as IInputStateMap<Pick<IProfileInput, "languageLevels">>);
  }, [profileLanguageLevels]);

  const onResetHandler = () => {
    setProfileLanguageLevels(
      profile?.languageLevels.map(item => languageLevelToInput(item))
    );
  };
  const onSaveHandler = () => {
    setIsSaving(true);
    editMyProfile(
      { languageLevels: profileLanguageLevels } as UserProfileInput,
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

  return {
    onResetHandler,
    onSaveHandler,
    keyPressHandler,
    profile,
    hasError,
    isSaving,
    ...stateMap,
  };
};
