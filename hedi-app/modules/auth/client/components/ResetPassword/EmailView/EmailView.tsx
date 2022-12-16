import React from "react";
import { IResetPasswordEmailView } from "../../../../types";
import {
  Body,
  Button,
  InlineNotification,
  Label,
  TextInput,
  Image,
} from "@/modules/components";
import { Form, InlineLoading } from "carbon-components-react";

import { useRouter } from "next/router";
import { getResetPasswordEmailViewDefinition } from "./getResetPasswordEmailViewDefinition";
import { useResetPasswordEmailView } from "./useResetPasswordEmailView";

export const EmailView = ({
  content,
}: {
  content: IResetPasswordEmailView;
}) => {
  const {
    emailAddressTextInput,
    emailInvalidLabel,
    sendEmailButton,
    footerText,
    lostPassword,
    lostPasswordBody,
    registrationCallBody,
    emailSendSuccessNotification,
    emailSendFailedNotification,
    registrationWizardLabel,
    registrationWizardLinkLabel,
    footerImage,
  } = getResetPasswordEmailViewDefinition(content.components);

  const { isPartOfWizard, wizard } = content;

  const router = useRouter();
  const {
    handleEmailInputChange,
    handleEmailBlur,
    handleSendEmailAction,
    handleRegisterInWizard,
    emailInput,
    isEmailActive,
    isEmailValid,
    isEmailSent,
    loading,
    response,
  } = useResetPasswordEmailView(isPartOfWizard, wizard);

  return (
    <>
      <div className="hedi--account__content-wrap hedi--centered hedi--login__content-wrap">
        <Form onSubmit={(e: any) => handleSendEmailAction(e)}>
          <div className="hedi--account__headline hedi--centered hedi--login__headline">
            <Label {...lostPassword} />
            {!isEmailSent || !response.success ? (
              <div className="hedi--centered hedi--login__registration-call">
                <Body {...lostPasswordBody} />
              </div>
            ) : (
              ""
            )}
          </div>
          {isEmailSent && response.success ? (
            <InlineNotification {...emailSendSuccessNotification} />
          ) : (
            <>
              <div className="hedi--account__content">
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
              </div>
              <div className="hedi--centered hedi--login__registration-call">
                {!isPartOfWizard ? (
                  <Body {...registrationCallBody} />
                ) : (
                  <>
                    <div className="hedi--centered hedi--login__registration-call">
                      <Label {...registrationWizardLabel} />
                    </div>
                    <div className="hedi--centered hedi--login__registration-link">
                      <a
                        href="javascript:void(0)"
                        onClick={() => handleRegisterInWizard()}>
                        {registrationWizardLinkLabel.text}
                      </a>
                    </div>
                  </>
                )}
              </div>
              <div className="hedi--account__footer">
                <div className="hedi--account__footer-buttons">
                  {loading ? (
                    <InlineLoading />
                  ) : (
                    sendEmailButton && (
                      <Button disabled={!isEmailValid} {...sendEmailButton} />
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {isEmailSent && !response.success ? (
            <div className="hedi--centered hedi--login__registration-call">
              <InlineNotification {...emailSendFailedNotification} />
            </div>
          ) : (
            ""
          )}
        </Form>
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
