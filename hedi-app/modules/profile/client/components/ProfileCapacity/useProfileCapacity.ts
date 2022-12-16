import { useUpsertMidwifeRequestPreference } from "@/modules/profile/client/components/ProfileCapacity/useUpsertMidwifeRequestPreference";
import { useState } from "react";

export const useProfileCapacity = (lang: string) => {
  const [isCapacityEditOpen, setIsCapacityEditOpen] = useState(false);

  const onCapacityEdit = () => {
    setIsCapacityEditOpen(true);
  };

  const onCapacityEditClose = () => {
    console.log("onCapacityEditClose is called!");
    setIsCapacityEditOpen(false);
    return true;
  };

  const {
    searchable,
    anonymousRequest,
    directCareRequest,
    defaultCapacity, // ets per month
    radius,
    onSaveHandler,
    isSuccessfullySaved,
    isSaving,
    error,
  } = useUpsertMidwifeRequestPreference(lang);

  return {
    onCapacityEdit,
    searchable,
    anonymousRequest,
    directCareRequest,
    defaultCapacity, // ets per month
    radius,
    onSaveHandler,
    isSaving,
    isSuccessfullySaved,
    error,
    isCapacityEditOpen,
    onCapacityEditClose,
  };
};
