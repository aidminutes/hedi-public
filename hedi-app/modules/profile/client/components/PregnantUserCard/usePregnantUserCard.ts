import { useUser } from "@/modules/auth/client/hooks";
import { IWizard } from "@/modules/common/types";
import {
  ILanguageLevelInput,
  IPersonalInput,
  PersonalTypeNameString,
  UserProfile,
} from "@/modules/profile/types";
import { profile } from "console";
import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks";
import { requestMyProfile } from "../../request";
import { editMyProfile } from "../../request/editMyProfile";
import { useProfileLanguagesEditModal } from "../ProfileServices/useProfileLanguagesEditModal";
import { IProfileContact } from "../ProfileUserCard/ProfileContactEdit/IProfileContact";
import { IPersonEdit } from "../ProfileUserCard/ProfilePersonEdit/IPersonEdit";

export const usePregnantUserCard = (lang: string, wizard?: IWizard) => {
  const [resetSignal, sendResetSignal] = useState<number>(0);
  const [saveSignal, sendSaveSignal] = useState<number>(0);
  const [isValidData, setIsValidData] = useState<boolean>(true);
  const [user, userIsLoading] = useUser();
  const [profile, profileIsLoading] = useMyProfile(user, lang);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean | undefined>();

  const [personData, setPersonData] = useState<IPersonEdit | undefined>(
    undefined
  );
  const [contactData, setContactData] = useState<IProfileContact | undefined>(
    undefined
  );
  const [profileLanguageLevels, setProfileLanguageLevels] = useState<
    ILanguageLevelInput[] | undefined
  >();

  const {
    onResetHandler,
    languageLevels: theLanguageLevels,
  } = useProfileLanguagesEditModal({ lang, profile });

  useEffect(() => {
    setProfileLanguageLevels(theLanguageLevels?.value);
  }, [theLanguageLevels]);

  const handleSubmit = () => {
    if (profileIsLoading) return;

    const isPersonalProfile = profile?.type === PersonalTypeNameString;
    if (!isPersonalProfile) return;

    setIsSaving(true);
    setHasError(false);

    const input = {
      givenName: personData?.givenNameValue || "",
      familyName: personData?.familyNameValue || "",
      namePrefix: personData?.namePrefixValue || "",
      addresses: [
        {
          city: personData?.cityValue || "",
          postalCode: personData?.postalCodeValue || "",
          street: personData?.streetValue || "",
          streetNumber: personData?.streetNumberValue || "",
          dataKind: 0,
          dataVisibility: 0,
          detailsVisibility: 0,
        },
      ],
      emails: [
        {
          email: contactData?.emailValue || "",
          dataKind: 0,
          dataVisibility: 0,
        },
      ],
      phones: [
        {
          phone: contactData?.phoneValue || "",
          dataKind: 0,
          dataVisibility: 0,
          phoneKind: 0,
        },
      ],
      languageLevels: profileLanguageLevels,
    } as Partial<IPersonalInput>;

    editMyProfile(input, lang, user?.role)
      .then(response => {
        setIsSaving(false);

        if (response.success) {
          if (wizard) {
            wizard.next();
          }
        } else {
          setHasError(true);
        }
      })
      .catch(error => {
        setIsSaving(false);
        setHasError(error);
        return false;
      });
  };

  return {
    userIsLoading,
    profile,
    profileIsLoading,
    setIsSaving,
    onLanguageResetHandler: onResetHandler,
    theLanguageLevels,
    setPersonData,
    setContactData,
    handleSubmit,
    hasError,
    resetSignal,
    sendResetSignal,
    saveSignal,
    sendSaveSignal,
    isValidData,
    setIsValidData,
  };
};
