import { IPage } from "@/modules/common/types";
import { Body, Label, TextInput } from "@/modules/components";
import { UserProfile } from "@/modules/profile/types";
import { InlineLoading, Modal } from "carbon-components-react";
import React from "react";
import { getProfileContactEditModalDefinition } from "./getProfileContactEditModalDefinition";
import { useContactEditModal } from "./useContactEditModal";
import { getProfileUserCardDefinition } from "../getProfileUserCardDefinition";
import { ProfileContactEdit } from "../ProfileContactEdit/ProfileContactEdit";

export const ProfileContactEditModal = ({
  content,
  profile,
  isContactEditOpen,
  onCloseContactEdit,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile: UserProfile | null;
  isContactEditOpen: boolean;
  onCloseContactEdit: () => void;
  onAfterSave?: () => void;
}) => {
  const { saveLabel, resetLabel } = getProfileUserCardDefinition(
    content.components
  );
  const { modalContactHeadlineLabel } = getProfileContactEditModalDefinition(
    content.components
  );

  const {
    isModalLoading,
    handleSubmit,
    resetSignal,
    sendResetSignal,
    isValidData,
    setIsValidData,
    setData,
  } = useContactEditModal(
    profile,
    content.lang,
    onCloseContactEdit,
    onAfterSave
  );

  if (!isContactEditOpen) return null;
  return (
    <Modal
      modalHeading={modalContactHeadlineLabel.text || ""}
      size="md"
      open={true}
      onRequestClose={() => {
        sendResetSignal(resetSignal + 1);
        onCloseContactEdit();
      }}
      primaryButtonText={isModalLoading ? <InlineLoading /> : saveLabel.text}
      secondaryButtonText={resetLabel.text}
      onSecondarySubmit={() => sendResetSignal(resetSignal + 1)}
      onRequestSubmit={() => handleSubmit()}
      className="hedi--contact-edit hedi--profile-edit-modal"
      primaryButtonDisabled={!isValidData || isModalLoading}>
      <ProfileContactEdit
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
