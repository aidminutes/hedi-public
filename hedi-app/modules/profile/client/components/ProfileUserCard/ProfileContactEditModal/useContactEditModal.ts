import { useUser } from "@/modules/auth/client/hooks";
import {
  UserProfile,
  PersonalTypeNameString,
  IMidwifeInput,
  IProfessionalInput,
  IPersonalInput,
} from "@/modules/profile/types";
import { useState } from "react";
import { editMyProfile } from "../../../request/editMyProfile";
import { IProfileContact } from "../ProfileContactEdit/IProfileContact";

export function useContactEditModal(
  profile: UserProfile | null,
  lang: string,
  closeModal: Function,
  onAfterSave?: Function
) {
  const isPersonalProfile = profile?.type === PersonalTypeNameString;
  const [user, userIsLoading] = useUser();
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [resetSignal, sendResetSignal] = useState<number>(0);
  const [isValidData, setIsValidData] = useState<boolean>(true);
  const [data, setData] = useState<IProfileContact | undefined>(undefined);

  const handleSubmit = () => {
    setIsModalLoading(true);
    const input = {
      websites: [
        {
          website: data?.websiteValue || "",
          dataKind: 0,
          dataVisibility: 0,
        },
      ],
      emails: [
        {
          email: data?.emailValue || "",
          dataKind: 0,
          dataVisibility: data?.emailVisibilityValue || 0,
        },
      ],
      phones: [
        {
          phone: data?.phoneValue || "",
          dataKind: 0,
          dataVisibility: 0,
          phoneKind: 0,
        },
      ],
    } as Partial<IPersonalInput & IProfessionalInput & IMidwifeInput>;
    if (isPersonalProfile) delete input.websites;
    editMyProfile(input, lang, user?.role).then(() => {
      setIsModalLoading(false);
      closeModal();
      if (onAfterSave) onAfterSave();
    });
  };

  return {
    isModalLoading,
    handleSubmit,
    resetSignal,
    sendResetSignal,
    isValidData,
    setIsValidData,
    setData,
  };
}
