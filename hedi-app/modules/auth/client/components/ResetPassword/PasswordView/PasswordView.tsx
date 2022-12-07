import { IResetPasswordPasswordView } from "@/modules/auth/types/IResetPasswordPasswordView";
import { Button, Label, Image } from "@/modules/components";
import { Body } from "@/modules/components/client/components/Body/Body";
import { Loading, PasswordInput } from "carbon-components-react";
import { InlineNotification } from "@/modules/components";

import React from "react";
import { getPasswordViewDefinition } from "./getPasswordViewDefinition";
import { usePasswordValidation } from "./usePasswordValidation";
import { usePasswordView } from "./usePasswordView";
import { GlobalWizardStates } from "@/modules/common/types";

export const PasswordView = ({
  content,
}: {
  content: IResetPasswordPasswordView;
}) => {
  const { isPartOfWizard, wizard } = content;

  const {
    headlineLabel,
    saveButton,
    successButton,
    successHeadlineLabel,
    successImage,
    successImageCaptionLabel,
    successTextBody,
    textBody,
    passwordRepeatTextInput,
    passwordTextInput,
    footerText,
    passwordHintBody,
    passwordNotMatchingLabel,
    InvalidSecurityTokenNotification,
    ExpiredSecurityTokenNotification,
  } = getPasswordViewDefinition(content.components);

  const {
    isPasswordActive,
    isPasswordMatching,
    isPasswordRepeatActive,
    isPasswordValid,
    isProgressValid,
    passwordInput,
    passwordRepeatInput,
    handlePasswordInput,
    handlePasswordRepeatBlur,
    handlePasswordRepeatInput,
    handleSave,
    isSubmitted,
    isResetSucceed,
  } = usePasswordView(isPartOfWizard);

  const { isValidating, isValid } = usePasswordValidation(isPartOfWizard);

  return (
    <>
      {isValidating ? (
        <Loading />
      ) : isValid ? (
        <>
          <div className="hedi--account__content-wrap hedi--account__content-wrap--more-space">
            {isSubmitted ? (
              isResetSucceed ? (
                <>
                  {" "}
                  <div className="hedi--account__image-wrap">
                    <div className="hedi--account__image">
                      <Image {...successImage} />
                    </div>
                  </div>
                  <div className="hedi--account__image-caption hedi--centered">
                    <Label {...successImageCaptionLabel} />
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="hedi--account__image-caption hedi--centered">
                    <InlineNotification {...ExpiredSecurityTokenNotification} />
                  </div>
                </>
              )
            ) : (
              ""
            )}
            <div className="hedi--account__headline hedi--centered">
              {!isSubmitted && headlineLabel && <Label {...headlineLabel} />}
              {isSubmitted && isResetSucceed && successHeadlineLabel && (
                <Label {...successHeadlineLabel} />
              )}
            </div>

            <div className="hedi--account__content">
              <div className="hedi--centered hedi--account__text">
                {!isSubmitted && textBody && <Body {...textBody} />}
                {isSubmitted && isResetSucceed && successTextBody && (
                  <Body {...successTextBody} />
                )}
              </div>
              {!isSubmitted && passwordTextInput && (
                <PasswordInput
                  light
                  {...passwordTextInput}
                  value={passwordInput}
                  onChange={e => handlePasswordInput(e.target.value)}
                />
              )}
              {!isSubmitted && passwordRepeatTextInput && (
                <PasswordInput
                  light
                  {...passwordRepeatTextInput}
                  onChange={e => handlePasswordRepeatInput(e.target.value)}
                  onBlur={() => handlePasswordRepeatBlur()}
                  invalid={!isPasswordMatching && isPasswordRepeatActive}
                  invalidText={passwordNotMatchingLabel.text}
                  value={passwordRepeatInput}
                />
              )}
              {!isSubmitted && !isPasswordValid && isPasswordActive && (
                <div className="hedi--account__password-hint">
                  <Body {...passwordHintBody} />
                </div>
              )}
            </div>
            <div className="hedi--account__footer">
              <div className="hedi--account__footer-buttons">
                {!isSubmitted && saveButton && (
                  <Button
                    disabled={!isProgressValid}
                    {...saveButton}
                    onClick={() => handleSave()}
                  />
                )}
                {isSubmitted && isResetSucceed && successButton && (
                  <Button
                    {...successButton}
                    href=""
                    onClick={() =>
                      isPartOfWizard
                        ? wizard?.next(GlobalWizardStates.LOGIN)
                        : window.location.assign(successButton.href ?? "")
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className="hedi--account__after-content-wrap">
            <div className="hedi--account__footer-text">
              <Body {...footerText} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hedi--account__content-wrap hedi--account__content-wrap--more-space">
            <div className="hedi--account__headline hedi--centered">
              {InvalidSecurityTokenNotification && (
                <InlineNotification {...InvalidSecurityTokenNotification} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
