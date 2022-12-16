import { useUser } from "@/modules/auth/client/hooks";
import { CURRENT_USER_SWR_KEY } from "@/modules/auth/types";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import { useMyProfile } from "../../hooks";
import { requestMyProfile } from "../../request";

export function useProfileUserCard(lang: string) {
  const { mutate: globalMutate } = useSWRConfig();

  const [user, userIsLoading] = useUser();
  const [profile, profileIsLoading] = useMyProfile(user, lang);
  const [myProfile, setMyProfile] = useState(profile);

  const [isReloading, setIsReloading] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const handlePersonModal = () => setIsPersonModalOpen(!isPersonModalOpen);
  const closePersonModal = () => setIsPersonModalOpen(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const handleContactModal = () => setIsContactModalOpen(!isContactModalOpen);
  const closeContactModal = () => setIsContactModalOpen(false);
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const handleAvailabilityModal = () =>
    setIsAvailabilityModalOpen(!isAvailabilityModalOpen);
  const closeAvailabilityModal = () => setIsAvailabilityModalOpen(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const handleImageModal = () => setIsImageModalOpen(!isImageModalOpen);
  const closeImageModal = () => setIsImageModalOpen(false);
  const [isLanguagesEditOpen, setIsLanguagesEditOpen] = useState(false);
  const closeLanguagesModal = () => setIsLanguagesEditOpen(false);
  const handleLanguagesModal = () =>
    setIsLanguagesEditOpen(!isLanguagesEditOpen);

  const availabilityAfterSaveHandler = () => {
    closeAvailabilityModal();
    reloadUser();
  };
  const personAfterSaveHandler = () => {
    closePersonModal();
    reloadUser();
  };
  const contactAfterSaveHandler = () => {
    closeContactModal();
    reloadUser();
  };
  const imageAfterSaveHandler = () => {
    console.log("imageAfterSaveHandler is called");
    closeImageModal();
    reloadUser();
  };
  const languagesAfterSaveHandler = () => {
    closeLanguagesModal();
    reloadUser();
  };

  const reloadUser = async () => {
    setIsReloading(true);
    const profile = await requestMyProfile(lang);
    if (profile) setMyProfile(profile);

    globalMutate(CURRENT_USER_SWR_KEY);
    setIsReloading(false);
  };

  useEffect(() => {
    setMyProfile(profile);
  }, [profile]);

  return {
    myProfile,
    isPersonModalOpen,
    isContactModalOpen,
    isAvailabilityModalOpen,
    isReloading,
    profileIsLoading,
    isImageModalOpen,
    isLanguagesEditOpen,
    closeLanguagesModal,
    handleImageModal,
    closeImageModal,
    closeAvailabilityModal,
    handleAvailabilityModal,
    handleContactModal,
    closeContactModal,
    handlePersonModal,
    closePersonModal,
    reloadUser,
    availabilityAfterSaveHandler,
    personAfterSaveHandler,
    contactAfterSaveHandler,
    imageAfterSaveHandler,
    languagesAfterSaveHandler,
    handleLanguagesModal,
  };
}
