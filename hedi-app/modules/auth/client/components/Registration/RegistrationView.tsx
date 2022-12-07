import { IRegistration } from "../../../types";
import React from "react";
import { useRouter } from "next/router";
import { ChevronLeft24 } from "@carbon/icons-react";
import {
  Loading,
  TileGroup,
  RadioTile,
  PasswordInput,
} from "carbon-components-react";
import {
  Button,
  Body,
  Checkbox,
  Label,
  TextInput,
  Select,
  Image,
} from "@/modules/components";
import { getRegistrationViewDefinition } from "./getRegistrationViewDefinition";
import { useRegistrationSteps } from "./useRegistrationSteps";
import { useStepOne } from "./useStepOne";
import { useStepTwo } from "./useStepTwo";
import { useStepThree } from "./useStepThree";
import { useStepFour } from "./useStepFour";
import { useRegistrationData } from "./useRegistrationData";
import { GlobalWizardStates } from "@/modules/common/types";
export const RegistrationView = ({ content }: { content: IRegistration }) => {
  const {
    passwordTextInput,
    submitButton,
    stepLabel,
    headlineStepOne,
    headlineStepTwo,
    headlineStepThree,
    headlineStepFour,
    bodyStepOne,
    bodyStepTwo,
    bodyStepThree,
    bodyStepFour,
    radioTilePregnant,
    radioTileMidwife,
    languageSelect,
    givenNameTextInput,
    familyNameTextInput,
    emailAddressTextInput,
    emailAddressRepeatTextInput,
    midwifeCheckbox,
    generalTermsCheckbox,
    safetyTermsCheckbox,
    emailNotMatchingLabel,
    emailInvalidLabel,
    passwordHintBody,
    forwardButton,
    footerImage,
    footerText,
    requiredFieldLabel,
    successBody,
    successHeadlineLabel,
    loginLink,
    successImage,
    successCaptionLabel,
    loginButton,
    alreadyAccountBody,
    mailErrorBody,
    mailErrorCaptionLabel,
    mailErrorHeadlineLabel,
    mailErrorImage,
    changeEmailButton,
    radioTilePregnantImage,
    radioTileMidwifeImage,
    alreadyAccountWizardLabel,
    alreadyAccountWizardLinkLabel,
  } = getRegistrationViewDefinition(content.components);

  const { isPartOfWizard, wizard } = content;

  const { registrationData } = useRegistrationData();
  const {
    totalSteps,
    currentStep,
    moveOneStepBack,
    moveOneStepForward,
    setCurrentStep,
  } = useRegistrationSteps();

  const {
    userKind,
    handleUserKindChange,
    isStepOneProgressValid,
    handleStepOne,
    handleLoginInWizard,
  } = useStepOne(registrationData, moveOneStepForward, isPartOfWizard, wizard);

  const {
    givenNameValue,
    familyNameValue,
    selectedLanguage,
    preSelectedLanguage,
    isStepTwoProgressValid,
    handleGivenNameChange,
    handleFamilyNameChange,
    handleLanguageChange,
    handleStepTwo,
  } = useStepTwo(userKind, registrationData, moveOneStepForward);

  const {
    emailInput,
    emailRepeatInput,
    passwordInput,
    isEmailMatching,
    isPasswordValid,
    isEmailRepeatActive,
    isPasswordActive,
    isStepThreeProgressValid,
    isEmailActive,
    isEmailValid,
    handleEmailInputChange,
    handleEmailRepeatInputChange,
    handleEmailRepeatBlur,
    handlePasswordInput,
    handleEmailBlur,
    handleStepThree,
  } = useStepThree(registrationData, moveOneStepForward);

  const {
    isGeneralTermsChecked,
    isSafetyTermsChecked,
    isMidwifeChecked,
    isStepFourProgressValid,
    isLoading,
    handleChangeMidwifeCheckbox,
    handleChangeGeneralTermsCheckbox,
    handleChangeSafetyTermsCheckbox,
    handleStepFour,
    handleBackToStepThree,
  } = useStepFour(
    registrationData,
    userKind,
    setCurrentStep,
    isPartOfWizard,
    wizard
  );

  const { locales } = useRouter();
  const filteredLanguages = languageSelect.items.filter(item =>
    locales?.includes(item.route)
  );

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div
        className={`hedi--account__content-wrap${
          currentStep === 5 || currentStep === 6
            ? " hedi--centered  hedi--account__content-wrap--more-space"
            : ""
        }`}>
        {currentStep <= totalSteps && (
          <div className="hedi--account__header">
            <div className="hedi--registration__back-icon">
              {currentStep > 1 && (
                <ChevronLeft24 onClick={() => moveOneStepBack()} />
              )}
            </div>
            <p className="hedi--registration__step-count">
              <Label {...stepLabel} /> {currentStep}/{totalSteps}
            </p>
          </div>
        )}
        <div className={`hedi--account__headline hedi--centered`}>
          {currentStep === 1 ? (
            <Label {...headlineStepOne} />
          ) : currentStep === 2 ? (
            <Label {...headlineStepTwo} />
          ) : currentStep === 3 ? (
            <Label {...headlineStepThree} />
          ) : currentStep === 4 ? (
            <Label {...headlineStepFour} />
          ) : currentStep === 5 ? (
            <Label {...successHeadlineLabel} />
          ) : currentStep === 6 ? (
            <Label {...mailErrorHeadlineLabel} />
          ) : null}
        </div>
        <div className={`hedi--account__text hedi--centered`}>
          {currentStep === 1 ? (
            <Body {...bodyStepOne} />
          ) : currentStep === 2 ? (
            <Body {...bodyStepTwo} />
          ) : currentStep === 3 ? (
            <Body {...bodyStepThree} />
          ) : currentStep === 4 ? (
            <Body {...bodyStepFour} />
          ) : currentStep === 5 ? (
            <Body {...successBody} />
          ) : currentStep === 6 ? (
            <Body {...mailErrorBody} />
          ) : null}
        </div>
        <div
          className={`hedi--account__content${
            currentStep > 4 ? " hedi--centered" : ""
          }`}>
          {currentStep === 1 ? (
            <>
              <TileGroup
                name="userkind-select"
                defaultSelected={userKind}
                onChange={e => handleUserKindChange(`${e}`)}
                className="hedi--userkind-select">
                {radioTilePregnant && (
                  <RadioTile value={radioTilePregnant.text || ""}>
                    <div className="hedi--userkind-select__content-container">
                      {radioTilePregnant.labelText}
                      <div className="hedi--userkind-select__image">
                        <Image {...radioTilePregnantImage} />
                      </div>
                    </div>
                  </RadioTile>
                )}
                {radioTileMidwife && (
                  <RadioTile value={radioTileMidwife.text || ""}>
                    <div className="hedi--userkind-select__content-container">
                      {radioTileMidwife.labelText}
                      <div className="hedi--userkind-select__image">
                        <Image {...radioTileMidwifeImage} />
                      </div>
                    </div>
                  </RadioTile>
                )}
              </TileGroup>
            </>
          ) : currentStep === 2 ? (
            <>
              <div className="hedi--required">
                <TextInput
                  light
                  value={givenNameValue}
                  {...givenNameTextInput}
                  onChange={e => handleGivenNameChange(e.target.value)}
                />
              </div>
              <div className="hedi--required">
                <TextInput
                  light
                  value={familyNameValue}
                  {...familyNameTextInput}
                  onChange={e => handleFamilyNameChange(e.target.value)}
                />
              </div>
              <div className="hedi--required">
                <Select
                  defaultValue={
                    selectedLanguage !== ""
                      ? selectedLanguage
                      : preSelectedLanguage
                  }
                  {...languageSelect}
                  items={filteredLanguages}
                  light
                  onChange={e => handleLanguageChange(e.target.value)}
                />
              </div>
            </>
          ) : currentStep === 3 ? (
            <>
              <div className="hedi--required">
                <TextInput
                  {...emailAddressTextInput}
                  light
                  value={emailInput}
                  onChange={e => handleEmailInputChange(e.target.value)}
                  onBlur={() => handleEmailBlur()}
                  invalidText={emailInvalidLabel.text}
                  invalid={!isEmailValid && isEmailActive}
                />
              </div>
              <div className="hedi--required">
                <TextInput
                  {...emailAddressRepeatTextInput}
                  light
                  value={emailRepeatInput}
                  onChange={e => handleEmailRepeatInputChange(e.target.value)}
                  onBlur={() => handleEmailRepeatBlur()}
                  invalidText={emailNotMatchingLabel.text}
                  invalid={!isEmailMatching && isEmailRepeatActive}
                />
              </div>
              <div className="hedi--required">
                <PasswordInput
                  value={passwordInput}
                  {...passwordTextInput}
                  light
                  onChange={e => handlePasswordInput(e.target.value)}
                />
              </div>
              {!isPasswordValid && isPasswordActive && (
                <div className="hedi--account__password-hint">
                  <Body {...passwordHintBody} />
                </div>
              )}
            </>
          ) : currentStep === 4 ? (
            <>
              {userKind === "midwife" && (
                <Checkbox
                  {...midwifeCheckbox}
                  onChange={(e: boolean) => handleChangeMidwifeCheckbox(e)}
                  checked={isMidwifeChecked}
                />
              )}
              <Checkbox
                {...generalTermsCheckbox}
                onChange={(e: boolean) => handleChangeGeneralTermsCheckbox(e)}
                checked={isGeneralTermsChecked}
              />
              <Checkbox
                {...safetyTermsCheckbox}
                onChange={(e: boolean) => handleChangeSafetyTermsCheckbox(e)}
                checked={isSafetyTermsChecked}
              />
            </>
          ) : currentStep === 5 ? (
            <div className="hedi--registration__notification-image">
              <Image {...successImage} />
              <Label
                {...successCaptionLabel}
                className="hedi--registration__notification-image-caption"
              />
            </div>
          ) : currentStep === 6 ? (
            <div className="hedi--registration__notification-image">
              <Image {...mailErrorImage} />
              <Label
                {...mailErrorCaptionLabel}
                className="hedi--registration__notification-image-caption"
              />
            </div>
          ) : null}
        </div>

        {currentStep > 1 && currentStep < 4 && (
          <div className="hedi--required__hint">
            <Label {...requiredFieldLabel} />
          </div>
        )}
        <div className="hedi--account__footer">
          <div className="hedi--registration__login-hint">
            {currentStep === 1 && !isPartOfWizard && (
              <Body {...alreadyAccountBody} />
            )}
            {currentStep === 1 && isPartOfWizard ? (
              <div className="hedi--centered hedi--registration__login-hint">
                <Label {...alreadyAccountWizardLabel} />
                &nbsp;
                <a
                  href="javascript:void(0)"
                  onClick={() => handleLoginInWizard()}>
                  {alreadyAccountWizardLinkLabel.text}
                </a>
              </div>
            ) : null}
          </div>
          <div
            className={`hedi--account__footer-buttons${
              currentStep === 6 ? " hedi--account__footer-buttons--column" : ""
            }`}>
            {currentStep < 4 && (
              <Button
                {...forwardButton}
                onClick={() =>
                  currentStep === 1
                    ? handleStepOne()
                    : currentStep === 2
                    ? handleStepTwo()
                    : currentStep === 3
                    ? handleStepThree()
                    : moveOneStepBack()
                }
                disabled={
                  (currentStep === 1 && !isStepOneProgressValid) ||
                  (currentStep === 2 && !isStepTwoProgressValid) ||
                  (currentStep === 3 && !isStepThreeProgressValid)
                }
              />
            )}
            {currentStep === 4 && (
              <Button
                {...submitButton}
                onClick={() => handleStepFour()}
                disabled={!isStepFourProgressValid}
              />
            )}
            {(currentStep === 5 || currentStep === 6) && (
              <Button
                {...loginButton}
                href=""
                onClick={() =>
                  isPartOfWizard
                    ? wizard?.next(GlobalWizardStates.LOGIN)
                    : window.location.assign(loginLink)
                }
              />
            )}
            {currentStep === 6 && (
              <Button
                {...changeEmailButton}
                onClick={() => handleBackToStepThree()}
              />
            )}
          </div>
        </div>
      </div>
      <div className="hedi--account__after-content-wrap">
        <div className="hedi--account__footer-text">
          <Body {...footerText} />
        </div>
        <div className="hedi--account__footer-image">
          <Image {...footerImage} />
        </div>
      </div>
    </>
  );
};
