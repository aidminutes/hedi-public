import { IPage } from "@/modules/common/types";
import { Body, Label, Select, TextInput } from "@/modules/components";
import { UserProfile } from "@/modules/profile/types";
import { Column, Row } from "carbon-components-react";
import React, { useEffect } from "react";

import { useContactEdit } from "./useContactEdit";
import { getProfileContactEditModalDefinition } from "../ProfileContactEditModal/getProfileContactEditModalDefinition";
import { IProfileContact } from "./IProfileContact";

export const ProfileContactEdit = ({
  content,
  profile,
  resetSignal,
  setIsValidData,
  setData,
}: {
  content: Pick<IPage, "lang" | "components" | "isPartOfWizard">;
  profile: UserProfile | null;
  resetSignal?: number;
  setIsValidData?: Function;
  setData?: (data: IProfileContact) => void;
}) => {
  const {
    phoneExplanationLabel,
    phoneTextInput,
    editContactIntroBody,
    editContactIntroPersonalBody,
    modalContactHeadlineLabel,
    emailTextInput,
    websiteTextInput,
    invalidEmailLabel,
    invalidWebsiteLabel,
    emailVisibilitySelect,
    requiredHint,
  } = getProfileContactEditModalDefinition(content.components);

  const { isPartOfWizard } = content;

  const {
    setBackToInitial,
    handleEmailChange,
    handlePhoneChange,
    handleWebsiteChange,
    handleWebsiteBlur,
    handleEmailBlur,
    handleEmailVisibilityValueChange,
    emailValue,
    websiteValue,
    phoneValue,
    isWebsiteActive,
    isWebsiteValid,
    isEmailActive,
    isEmailValid,
    isPersonalProfile,
    emailVisibilityValue,
  } = useContactEdit(profile, content.lang);
  const filteredVisibilityItems = emailVisibilitySelect.items.filter(
    item => item.index === 0 || item.index === 3
  );

  const defaultVisibilityValue = filteredVisibilityItems.find(
    item => item.index === emailVisibilityValue
  );

  useEffect(() => {
    setBackToInitial();
  }, [resetSignal]);

  useEffect(() => {
    if (setIsValidData) {
      setIsValidData(
        !(
          (isWebsiteActive && !isWebsiteValid) ||
          (isEmailActive && !isEmailValid)
        )
      );
    }
  }, [isWebsiteActive, isWebsiteValid, isEmailActive, isEmailValid]);

  useEffect(() => {
    if (setData) {
      setData({
        emailValue,
        emailVisibilityValue,
        websiteValue,
        phoneValue,
      });
    }
  }, [emailValue, websiteValue, phoneValue, emailVisibilityValue]);

  return (
    <>
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        {!isPartOfWizard ? (
          <div className="hedi--profile-edit-modal__intro-text">
            <Body
              {...(isPersonalProfile
                ? editContactIntroPersonalBody
                : editContactIntroBody)}
            />
          </div>
        ) : (
          <div className="hedi--profile-edit-modal__title">
            <Label {...modalContactHeadlineLabel} labelKind="h4" />
          </div>
        )}
        <Row>
          <Column lg={10} md={6}>
            <div className="hedi--required">
              <TextInput
                {...emailTextInput}
                light
                value={emailValue || ""}
                onChange={e => handleEmailChange(e.target.value)}
                invalid={isEmailActive && !isEmailValid}
                invalidText={invalidEmailLabel.text}
                onBlur={e => handleEmailBlur(e.target.value)}
              />
            </div>
          </Column>
          <Column lg={6} md={2}>
            <Select
              {...emailVisibilitySelect}
              items={filteredVisibilityItems}
              onChange={e => handleEmailVisibilityValueChange(e.target.value)}
              defaultValue={defaultVisibilityValue?.route}
              light
            />
          </Column>
        </Row>
        {!isPersonalProfile && (
          <Row>
            <Column lg={10} md={6}>
              <TextInput
                {...websiteTextInput}
                light
                value={websiteValue || ""}
                onChange={e => handleWebsiteChange(e.target.value)}
                invalid={isWebsiteActive && !isWebsiteValid}
                invalidText={invalidWebsiteLabel.text}
                onBlur={e => handleWebsiteBlur(e.target.value)}
              />
            </Column>
          </Row>
        )}
        <Row>
          <Column lg={10} md={6}>
            <TextInput
              {...phoneTextInput}
              light
              value={phoneValue || ""}
              onChange={e => handlePhoneChange(e.target.value)}
            />
          </Column>
          <Column>
            <p>&nbsp;</p>
            <div className="hedi--required__hint">
              <Label {...phoneExplanationLabel} />{" "}
            </div>
          </Column>
        </Row>
        <div className="hedi--required__hint">
          <Label {...requiredHint} />
        </div>
      </Column>
    </>
  );
};
