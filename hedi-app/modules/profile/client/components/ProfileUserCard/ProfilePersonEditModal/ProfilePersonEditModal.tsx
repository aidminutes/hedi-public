import { IPage } from "@/modules/common/types";

import { UserProfile } from "@/modules/profile/types";
import { InlineLoading, Modal } from "carbon-components-react";
import React, { useMemo, useState } from "react";
import { getProfilePersonEditModalDefinition } from "./getProfilePersonEditModalDefinition";
import { usePersonEditModal } from "./usePersonEditModal";
import { getProfileUserCardDefinition } from "../getProfileUserCardDefinition";
import { ProfilePersonEdit } from "../ProfilePersonEdit/ProfilePersonEdit";
import { IPersonEdit } from "../ProfilePersonEdit/IPersonEdit";

export const ProfilePersonEditModal = ({
  content,
  profile,
  isPersonEditOpen,
  onClosePersonEdit,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard">;
  profile: UserProfile | null;
  isPersonEditOpen: boolean;
  onClosePersonEdit: () => void;
  onAfterSave?: () => void;
}) => {
  if (!isPersonEditOpen) return null;

  const { saveLabel, resetLabel } = getProfileUserCardDefinition(
    content.components
  );

  const {
    requiredTextPerson: requiredText,
    explanationBodyPerson: explanationBody,
    modalPersonHeadlineLabel,
  } = getProfilePersonEditModalDefinition(content.components);

  const {
    isModalLoading,
    handleSubmit,
    resetSignal,
    sendResetSignal,
    isValidData,
    setIsValidData,
    setData,
  } = usePersonEditModal(profile, content.lang, onClosePersonEdit, onAfterSave);

  return (
    <Modal
      primaryButtonDisabled={!isValidData || isModalLoading}
      modalHeading={modalPersonHeadlineLabel.text || ""}
      size="md"
      open={true}
      onRequestClose={() => {
        sendResetSignal(resetSignal + 1);
        onClosePersonEdit();
      }}
      primaryButtonText={
        isModalLoading ? <InlineLoading /> : saveLabel.text || ""
      }
      secondaryButtonText={resetLabel.text || ""}
      onSecondarySubmit={() => sendResetSignal(resetSignal + 1)}
      onRequestSubmit={() => handleSubmit()}
      className="hedi--person-edit hedi--profile-edit-modal">
      <ProfilePersonEdit
        {...{
          content,
          profile,
          resetSignal,
          setIsValidData,
          setData,
        }}
      />
    </Modal>
  );
};
