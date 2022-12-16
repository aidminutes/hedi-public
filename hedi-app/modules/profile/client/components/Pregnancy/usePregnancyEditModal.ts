import { useRef, useState } from "react";
import { IPregnancyEditTools } from "./PregnancyEdit";

export const usePregnancyEditModal = ({
  onSaveSuccess,
}: {
  onSaveSuccess?: () => void;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const pregnancyEditRef = useRef<IPregnancyEditTools>();

  const onResetHandler = () => {
    pregnancyEditRef.current?.reload();
  };
  const onSaveHandler = () => {
    setIsSaving(true);
    pregnancyEditRef.current?.upsertData(
      () => setIsSaving(true),
      () => {
        setHasError(true);
        setIsSaving(false);
      },
      () => {
        onSaveSuccess && onSaveSuccess();
        setHasError(false);
        setIsSaving(false);
      }
    );
  };

  const onIsSavingHandler = () => setIsSaving(true);

  return {
    onResetHandler,
    onSaveHandler,
    hasError,
    isSaving,
    onIsSavingHandler,
    pregnancyEditRef,
  };
};
