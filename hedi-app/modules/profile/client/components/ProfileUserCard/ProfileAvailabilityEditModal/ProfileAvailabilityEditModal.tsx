import { IPage } from "@/modules/common/types";
import { Body, Label } from "@/modules/components";
import { IBusinessProfile, UserProfile } from "@/modules/profile/types";
import {
  Column,
  InlineLoading,
  Loading,
  Modal,
  Row,
} from "carbon-components-react";
import React from "react";
import { ConsultationHoursInput } from "../../ConsultationHoursInput";
import { getProfileUserCardDefinition } from "../getProfileUserCardDefinition";
import { getProfileAvailabilityEditModalDefinition } from "./getProfileAvailabilityEditModalDefinition";
import { useAvailabilityEdit } from "./useAvailabilityEdit";

export const ProfileAvailabilityEditModal = ({
  content,
  profile,
  isAvailabilityEditOpen,
  onCloseAvailabilityEdit,
  onAfterSave,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile: UserProfile | null;
  isAvailabilityEditOpen: boolean;
  onCloseAvailabilityEdit: () => void;
  onAfterSave?: () => void;
}) => {
  if (!isAvailabilityEditOpen) return null;

  const { saveLabel, resetLabel } = getProfileUserCardDefinition(
    content.components
  );

  const myProfile = profile as IBusinessProfile;

  const {
    modalAvailabilityHeadlineLabel,
    editAvailabilityIntroBody,
    consultationHoursDefinition,
  } = getProfileAvailabilityEditModalDefinition(content.components);

  const {
    consultationHours,
    hasError,
    isSaving,
    onResetHandler,
    onSaveHandler,
  } = useAvailabilityEdit({
    lang: content.lang,
    profile: myProfile,
    onAfterSave,
  });
  return (
    <Modal
      modalHeading={modalAvailabilityHeadlineLabel.text || ""}
      size="lg"
      open={true}
      onRequestClose={() => {
        // setBackToInitial();
        onCloseAvailabilityEdit();
      }}
      primaryButtonDisabled={isSaving}
      primaryButtonText={isSaving ? <InlineLoading /> : saveLabel.text}
      secondaryButtonText={resetLabel.text}
      onSecondarySubmit={() => onResetHandler()}
      onRequestSubmit={() => onSaveHandler()}
      className="hedi--availability-edit hedi--profile-edit-modal">
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        <div className="hedi--person-edit__intro-text">
          <Body {...editAvailabilityIntroBody} />
        </div>
        <ConsultationHoursInput
          {...consultationHours}
          {...consultationHoursDefinition}
        />
      </Column>
    </Modal>
  );
};
