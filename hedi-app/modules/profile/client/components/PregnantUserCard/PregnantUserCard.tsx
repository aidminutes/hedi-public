import { IPage } from "@/modules/common/types";
import { Label, Button, Body, InlineNotification } from "@/modules/components";
import { Column, InlineLoading, Row } from "carbon-components-react";
import { useState } from "react";
import { LanguageSkillsInput } from "../LanguageSkillsInput";
import { getProfileLanguagesEditModalViewDefinition } from "../ProfileServices/getProfileLanguagesEditModalViewDefinition";
import { ProfileContactEdit } from "../ProfileUserCard/ProfileContactEdit";
import { ProfileImageEdit } from "../ProfileUserCard/ProfileImageEdit/ProfileImageEdit";
import { ProfilePersonEdit } from "../ProfileUserCard/ProfilePersonEdit";

import { getPregnantUserCardViewDefinition } from "./getPregnantUserCardViewDefinition";
import { usePregnantUserCard } from "./usePregnantUserCard";

export const PregnantUserCard = ({
  content,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard" | "wizard">;
}) => {
  const { isPartOfWizard, wizard } = content;
  const {
    titleLabel,
    titleBody,
    resetButton,
    nextButton,
    imageHeadlineLabel,
    generalSaveErrorNotification,
  } = getPregnantUserCardViewDefinition(content.components);

  const {
    profile,
    profileIsLoading,
    userIsLoading,
    onLanguageResetHandler,
    theLanguageLevels,
    setPersonData,
    setContactData,
    handleSubmit,
    hasError,
    resetSignal,
    sendResetSignal,
    saveSignal,
    sendSaveSignal,
    isValidData,
    setIsValidData,
  } = usePregnantUserCard(content.lang, wizard);

  const {
    languageSkillsInputDefinition,
    editLanguagesTitleLabel,
  } = getProfileLanguagesEditModalViewDefinition(content.components);

  return (
    <>
      {profileIsLoading || userIsLoading ? (
        <InlineLoading />
      ) : (
        <div className="hedi--common-wizard__wrap">
          <Row>
            <Column>
              <div className="hedi--common-wizard__intro_text">
                <Label {...titleLabel} labelKind="h3" />
              </div>
              <div className="hedi--common-wizard__explanation">
                <Body {...titleBody} />
              </div>
            </Column>
          </Row>
          <Row>
            <Column>
              <div className="hedi--common-wizard__block">
                <ProfilePersonEdit
                  content={content}
                  profile={profile}
                  resetSignal={resetSignal}
                  setIsValidData={setIsValidData}
                  setData={setPersonData}
                />
              </div>
            </Column>
          </Row>

          <Row>
            <Column>
              <div className="hedi--common-wizard__block">
                <ProfileContactEdit
                  {...{
                    content,
                    profile,
                    resetSignal,
                    setIsValidData,
                    setData: setContactData,
                  }}
                />
              </div>
            </Column>
          </Row>
          {theLanguageLevels && (
            <Row>
              <Column>
                <div className="hedi--common-wizard__block">
                  <div className="hedi--profile-edit-modal__title withLeftSpace">
                    <Label {...editLanguagesTitleLabel} labelKind="h4" />
                  </div>
                  <div className="hedi--group hedi--group--language-skills withLeftSpace">
                    <LanguageSkillsInput
                      {...theLanguageLevels}
                      {...languageSkillsInputDefinition}
                      isShowLanguageNotice={isPartOfWizard}
                    />
                  </div>
                </div>
              </Column>
            </Row>
          )}
          <Row>
            <Column>
              {profile && (
                <div className="hedi--common-wizard__block">
                  <div className="withLeftSpace">
                    <div className="hedi--profile-edit-modal__title">
                      <Label {...imageHeadlineLabel} labelKind="h4" />
                    </div>
                    <ProfileImageEdit
                      {...{
                        content,
                        profile,
                        resetSignal,
                        saveSignal,
                        setIsValidData,
                        onAfterSave: handleSubmit,
                      }}
                    />
                  </div>
                </div>
              )}
            </Column>
          </Row>
          {isPartOfWizard && (
            <Row>
              <Column>
                <Button
                  {...resetButton}
                  onClick={() => {
                    sendResetSignal(resetSignal + 1);
                    onLanguageResetHandler();
                  }}
                />
              </Column>
              <Column>
                <div className="hedi--common-wizard__button_right">
                  <Button
                    {...nextButton}
                    buttonKind="primary"
                    disabled={!isValidData}
                    onClick={() => {
                      sendSaveSignal(saveSignal + 1);
                    }}
                  />
                </div>
              </Column>
            </Row>
          )}
          <Row>
            <Column>
              {hasError && (
                <InlineNotification {...generalSaveErrorNotification} />
              )}
            </Column>
          </Row>
        </div>
      )}
    </>
  );
};
