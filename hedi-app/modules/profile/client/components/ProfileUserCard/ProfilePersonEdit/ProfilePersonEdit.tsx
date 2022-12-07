import { IPage } from "@/modules/common/types";
import {
  Body,
  InlineNotification,
  Label,
  TextInput,
} from "@/modules/components";
import { MidwifeTypeNameString, UserProfile } from "@/modules/profile/types";
import { Column, Row } from "carbon-components-react";
import React, { useEffect, useState } from "react";
import { getProfilePersonEditModalDefinition } from "../ProfilePersonEditModal/getProfilePersonEditModalDefinition";
import { IPersonEdit } from "./IPersonEdit";
import { usePersonEdit } from "./usePersonEdit";

export const ProfilePersonEdit = ({
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
  setData?: (data: IPersonEdit) => void;
}) => {
  const {
    requiredTextPerson: requiredText,
    editPersonIntroBody,
    explanationBodyPerson: explanationBody,
    givenNameTextInput,
    familyNameTextInput,
    namePrefixTextInput,
    cityTextInput,
    postalCodeTextInput,
    streetTextInput,
    streetNumberTextInput,
    invalidPostalCodeLabel,
    errorNotification,
    invalidCityLabel,
    invalidFamilyNameLabel,
    invalidGivenNameLabel,
    modalPersonHeadlineLabel,
  } = getProfilePersonEditModalDefinition(content.components);

  const { isPartOfWizard } = content;

  const {
    givenNameValue,
    familyNameValue,
    namePrefixValue,
    cityValue,
    postalCodeValue,
    streetValue,
    streetNumberValue,
    isPostalCodeActive,
    isPostalCodeValid,
    hasError,
    isCityActive,
    isCityValid,
    isFamilyNameActive,
    isFamilyNameValid,
    isGivenNameActive,
    isGivenNameValid,
    handleStreetNumberChange,
    handleStreetChange,
    handleCityChange,
    handlePostalCodeChange,
    handleFamilyNameChange,
    handlePrefixChange,
    handleGivenNameChange,
    handlePostalCodeBlur,
    handleCityBlur,
    handleFamilyNameBlur,
    handleGivenNameBlur,
    setBackToInitial,
  } = usePersonEdit(profile, content.lang);

  useEffect(() => {
    setBackToInitial();
  }, [resetSignal]);

  useEffect(() => {
    if (setIsValidData) {
      setIsValidData(
        !(
          (isPostalCodeActive && !isPostalCodeValid) ||
          (isCityActive && !isCityValid) ||
          (isGivenNameActive && !isGivenNameValid) ||
          (isFamilyNameActive && !isFamilyNameValid)
        )
      );
    }
  }, [
    isPostalCodeActive,
    isPostalCodeValid,
    isCityActive,
    isCityValid,
    isGivenNameActive,
    isGivenNameValid,
    isFamilyNameActive,
    isFamilyNameValid,
  ]);

  useEffect(() => {
    if (setData) {
      setData({
        givenNameValue,
        familyNameValue,
        namePrefixValue,
        cityValue,
        postalCodeValue,
        streetValue,
        streetNumberValue,
      });
    }
  }, [
    givenNameValue,
    familyNameValue,
    namePrefixValue,
    cityValue,
    postalCodeValue,
    streetValue,
    streetNumberValue,
  ]);

  const isMidwifeProfile = profile?.type === MidwifeTypeNameString;

  return (
    <>
      <Column {...{ sm: 4, md: 8, lg: 16 }}>
        {!isPartOfWizard ? (
          <div className="hedi--profile-edit-modal__intro-text">
            <Body {...editPersonIntroBody} />
          </div>
        ) : (
          <div className="hedi--profile-edit-modal__title">
            <Label {...modalPersonHeadlineLabel} labelKind="h4" />
          </div>
        )}
        <Row>
          <Column lg={10} md={6}>
            <div className="hedi--required">
              <TextInput
                {...givenNameTextInput}
                light
                value={givenNameValue || ""}
                onChange={e => handleGivenNameChange(e.target.value)}
                onBlur={e => handleGivenNameBlur(e.target.value)}
                invalid={isGivenNameActive && !isGivenNameValid}
                invalidText={invalidGivenNameLabel.text}
              />
            </div>
          </Column>
        </Row>
        <Row>
          <Column lg={10} md={6}>
            <div className="hedi--required">
              <TextInput
                {...familyNameTextInput}
                light
                value={familyNameValue || ""}
                onChange={e => handleFamilyNameChange(e.target.value)}
                onBlur={e => handleFamilyNameBlur(e.target.value)}
                invalid={isFamilyNameActive && !isFamilyNameValid}
                invalidText={invalidFamilyNameLabel.text}
              />
            </div>
          </Column>
          <Column lg={4} md={2}>
            <TextInput
              {...namePrefixTextInput}
              light
              value={namePrefixValue || ""}
              onChange={e => handlePrefixChange(e.target.value)}
            />
          </Column>
        </Row>
        <Row>
          <Column lg={10} md={6}>
            <div className="hedi--required">
              <TextInput
                {...cityTextInput}
                light
                value={cityValue || ""}
                onChange={e => handleCityChange(e.target.value)}
                onBlur={e => handleCityBlur(e.target.value)}
                invalid={isCityActive && !isCityValid}
                invalidText={invalidCityLabel.text}
              />
            </div>
          </Column>
          <Column lg={4} md={2}>
            <div className="hedi--required">
              <TextInput
                {...postalCodeTextInput}
                light
                value={postalCodeValue || ""}
                onChange={e => handlePostalCodeChange(e.target.value)}
                onBlur={e => handlePostalCodeBlur(e.target.value)}
                invalid={isPostalCodeActive && !isPostalCodeValid}
                invalidText={invalidPostalCodeLabel.text}
              />
            </div>
          </Column>
        </Row>
        <Row>
          <Column lg={10} md={6}>
            <TextInput
              {...streetTextInput}
              light
              value={streetValue || ""}
              onChange={e => handleStreetChange(e.target.value)}
            />
          </Column>
          <Column lg={4} md={2}>
            <TextInput
              {...streetNumberTextInput}
              light
              value={streetNumberValue || ""}
              onChange={e => handleStreetNumberChange(e.target.value)}
            />
          </Column>
        </Row>
        {!isPartOfWizard && (
          <>
            <Row>
              <Column
                lg={14}
                md={8}
                className="hedi--profile-edit-modal__explanation">
                {isMidwifeProfile && <Body {...explanationBody} />}
              </Column>
            </Row>
            <div className="hedi--required__hint">
              <Label {...requiredText} />
            </div>
          </>
        )}
      </Column>
      {hasError && (
        <Row>
          <Column>
            <InlineNotification {...errorNotification} />
          </Column>
        </Row>
      )}
    </>
  );
};
