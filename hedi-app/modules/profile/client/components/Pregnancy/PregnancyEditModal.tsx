import { IPage } from "@/modules/common/types";
import { InlineNotification, Label } from "@/modules/components";
import { InlineLoading, Modal } from "carbon-components-react";
import { PregnancyEdit } from "..";
import { getPregnancyEditModalViewDefinition } from "./getPregnancyEditModalViewDefinition";
import { usePregnancyEditModal } from "./usePregnancyEditModal";
import { PregnancyViewKind } from "./useUpsertPregnancy";

export const PregnancyEditModal = ({
  content,
  isOpen: isPregnancyEditOpen,
  onSaveSuccess,
  onClose,
  viewKind,
  title,
}: {
  content: Pick<IPage, "lang" | "components">;
  isOpen: boolean;
  onSaveSuccess?: () => void;
  onClose?: () => void;
  viewKind: PregnancyViewKind;
  title?: string;
}) => {
  if (!isPregnancyEditOpen) return null;
  const {
    saveButton,
    resetButton,
    editPregnancyTitleLabel,
    pregnancyErrorNotification,
  } = getPregnancyEditModalViewDefinition(content.components);
  const {
    onResetHandler,
    onSaveHandler,
    hasError,
    isSaving,
    onIsSavingHandler,
    pregnancyEditRef,
  } = usePregnancyEditModal({
    onSaveSuccess,
  });
  return (
    <Modal
      modalHeading={title || editPregnancyTitleLabel.text}
      primaryButtonText={isSaving ? <InlineLoading /> : saveButton.text}
      primaryButtonDisabled={isSaving}
      secondaryButtonText={resetButton.text}
      size="md"
      onRequestClose={() => onClose && onClose()}
      onRequestSubmit={onSaveHandler}
      open={true}
      onSecondarySubmit={onResetHandler}
      className="hedi--search-filter">
      <PregnancyEdit
        content={content}
        viewKind={viewKind}
        showSaveButton={false}
        onSaving={onIsSavingHandler}
        ref={pregnancyEditRef}
      />
      {hasError && <InlineNotification {...pregnancyErrorNotification} />}
    </Modal>
  );
};
