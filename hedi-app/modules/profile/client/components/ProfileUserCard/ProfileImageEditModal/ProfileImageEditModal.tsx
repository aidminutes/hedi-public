import { IPage } from "@/modules/common/types";
import { UserProfile } from "@/modules/profile/types";
import { InlineLoading, Modal } from "carbon-components-react";
import React, { useState } from "react";
import { getProfileUserCardDefinition } from "../getProfileUserCardDefinition";
import { ProfileImageEdit } from "../ProfileImageEdit/ProfileImageEdit";
import { getProfileImageEditModalDefinition } from "./getProfileImageEditModalDefinition";

export const ProfileImageEditModal = ({
  content,
  profile,
  isImageEditOpen,
  onCloseImageEdit,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard">;
  profile: UserProfile;
  isImageEditOpen: boolean;
  onCloseImageEdit: () => void;
  onAfterSave?: () => void;
}) => {
  if (!isImageEditOpen) return null;

  const { saveLabel, resetLabel } = getProfileUserCardDefinition(
    content.components
  );
  const { modalImageHeadlineLabel } = getProfileImageEditModalDefinition(
    content.components
  );

  const [isSavingImage, setIsSavingImage] = useState<boolean>(false);
  const [saveSignal, sendSaveSignal] = useState<number>(0);
  const [resetSignal, sendResetSignal] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <Modal
      modalHeading={modalImageHeadlineLabel.text || ""}
      size="md"
      open={true}
      onRequestClose={() => {
        sendResetSignal(resetSignal + 1);
        onCloseImageEdit();
      }}
      primaryButtonText={isSavingImage ? <InlineLoading /> : saveLabel.text}
      secondaryButtonText={resetLabel.text}
      onSecondarySubmit={() => sendResetSignal(resetSignal + 1)}
      onRequestSubmit={() => sendSaveSignal(saveSignal + 1)}
      primaryButtonDisabled={isSavingImage || !isValid}
      className="hedi--image-edit hedi--profile-edit-modal">
      <ProfileImageEdit
        {...{
          content,
          profile,
          onCloseImageEdit,
          onAfterSave,
          setIsSavingImage,
          saveSignal,
          resetSignal,
          setIsValid,
        }}
      />
    </Modal>
  );
};
