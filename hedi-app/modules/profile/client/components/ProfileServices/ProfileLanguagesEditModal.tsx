import { IPage } from "@/modules/common/types";
import { InlineNotification, Label } from "@/modules/components";
import { IProfile, PersonalTypeNameString } from "@/modules/profile/types";
import { Column, InlineLoading, Modal } from "carbon-components-react";
import { LanguageSkillsInput } from "../LanguageSkillsInput";
import { getProfileLanguagesEditModalViewDefinition } from "./getProfileLanguagesEditModalViewDefinition";
import { useProfileLanguagesEditModal } from "./useProfileLanguagesEditModal";

export const ProfileLanguagesEditModal = ({
  content,
  profile,
  isLanguagesEditOpen,
  onSaveSuccess,
}: {
  content: Pick<IPage, "lang" | "components">;
  profile: IProfile;
  isLanguagesEditOpen: boolean;
  onSaveSuccess?: () => void;
}) => {
  if (!isLanguagesEditOpen) return null;
  const {
    languageSkillsInputDefinition,
    editLanguagesTitleLabel,
    editLanguagesDescriptionLabel,
    editLanguagesPersonalDescriptionLabel,
    saveButton,
    resetButton,
    languageErrorNotification,
  } = getProfileLanguagesEditModalViewDefinition(content.components);
  const {
    onResetHandler,
    onSaveHandler,
    keyPressHandler,
    languageLevels,
    hasError,
    isSaving,
  } = useProfileLanguagesEditModal({
    lang: content.lang,
    profile,
    onSaveSuccess,
  });
  const isPersonalProfile = profile?.type === PersonalTypeNameString;

  return (
    <Modal
      modalHeading={editLanguagesTitleLabel.text}
      primaryButtonText={isSaving ? <InlineLoading /> : saveButton.text}
      primaryButtonDisabled={isSaving}
      secondaryButtonText={resetButton.text}
      size="md"
      onRequestClose={() => onSaveSuccess && onSaveSuccess()}
      onRequestSubmit={() => onSaveHandler()}
      open={true}
      onSecondarySubmit={() => onResetHandler()}
      onKeyPress={e => keyPressHandler(e.key)}
      className="hedi--search-filter">
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        <div className="hedi--profile__services__info-area mb-07">
          <Label
          {...(isPersonalProfile
            ? editLanguagesPersonalDescriptionLabel
            : editLanguagesDescriptionLabel)}
        />
        </div>
        <div className="hedi--group hedi--group--language-skills">
          <LanguageSkillsInput
            {...languageLevels}
            {...languageSkillsInputDefinition}
          />
        </div>
        {hasError && <InlineNotification {...languageErrorNotification} />}
      </Column>
    </Modal>
  );
};
