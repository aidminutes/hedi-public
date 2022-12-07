import { useUser } from "@/modules/auth/client/hooks";
import { UserProfile } from "@/modules/profile/types";
import { useState, useEffect } from "react";
import { editMyProfile } from "../../../request/editMyProfile";
import { IPersonEdit } from "../ProfilePersonEdit/IPersonEdit";

export function usePersonEditModal(
  profile: UserProfile | null,
  lang: string,
  closeModal: Function,
  onAfterSave?: Function
) {
  const [user, userIsLoading] = useUser();

  const [hasError, setHasError] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [resetSignal, sendResetSignal] = useState<number>(0);
  const [isValidData, setIsValidData] = useState<boolean>(true);
  const [data, setData] = useState<IPersonEdit | undefined>(undefined);

  const handleSubmit = () => {
    setIsModalLoading(true);
    editMyProfile(
      {
        givenName: data?.givenNameValue || "",
        familyName: data?.familyNameValue || "",
        namePrefix: data?.namePrefixValue || "",
        addresses: [
          {
            city: data?.cityValue || "",
            postalCode: data?.postalCodeValue || "",
            street: data?.streetValue || "",
            streetNumber: data?.streetNumberValue || "",
            // TODO check settings below
            dataKind: 0,
            dataVisibility: 0,
            detailsVisibility: 0,
          },
        ],
      },
      lang,
      user?.role
    ).then(resp => {
      setIsModalLoading(false);
      setHasError(!resp.success);
      if (resp.success) {
        closeModal();
        if (onAfterSave) onAfterSave();
      }
    });
  };

  return {
    isModalLoading,
    hasError,
    handleSubmit,
    resetSignal,
    sendResetSignal,
    isValidData,
    setIsValidData,
    setData,
  };
}
