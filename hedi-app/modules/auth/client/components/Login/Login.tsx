import React from "react";
import { getLoginViewDefinition } from "./getLoginViewDefinition";
import { ILogin } from "../../../types";
import { useLogin } from "./useLogin";
import {
  Body,
  Button,
  InlineNotification,
  Label,
  TextInput,
  Image,
} from "@/modules/components";
import { Form, Loading, PasswordInput } from "carbon-components-react";

import { useRouter } from "next/router";

export const Login = ({ content }: { content: ILogin }) => {
  const {
    username,
    password,
    success,
    invalid,
    submit,
    wizardNextButton,
    footerText,
    headline,
    loginImage,
    lostPasswordBody,
    registrationCallBody,
    redirectUrl: fallbackRedirectUrl,
    registrationWizardLabel,
    registrationWizardLinkLabel,
    lostPasswordWizardLabel,
  } = getLoginViewDefinition(content.components);

  const { isPartOfWizard, wizard } = content;

  const router = useRouter();
  const {
    handleLogin,
    handleRegisterInWizard,
    handleForgotPasswordInWizard,
    goWizardNext,
    isLoading,
    hasError,
    isSuccess,
    isLoggedIn,
  } = useLogin(
    (router.query["redirect"] as string) ?? fallbackRedirectUrl,
    isPartOfWizard,
    wizard
  );
  return !isLoading ? (
    <>
      <div className="hedi--account__content-wrap hedi--login__content-wrap">
        <Form onSubmit={(e: any) => handleLogin(e)}>
          <div className="hedi--account__headline hedi--centered hedi--login__headline">
            <Label {...headline} />
            <div className="hedi--login__image-wrap">
              <div className="hedi--login__image">
                <Image {...loginImage} />
              </div>
            </div>
          </div>
          <div className="hedi--account__content">
            {!isLoggedIn ? (
              !isPartOfWizard ? (
                <div className="hedi--login__lost-password">
                  <Body {...lostPasswordBody} />
                </div>
              ) : (
                <div className="hedi--login__lost-password">
                  <a
                    href="javascript:void(0)"
                    onClick={() => handleForgotPasswordInWizard()}>
                    {lostPasswordWizardLabel.text}
                  </a>
                </div>
              )
            ) : null}

            {username && !isLoggedIn && <TextInput {...username} light />}
            {password && !isLoggedIn && <PasswordInput light {...password} />}
            {invalid && hasError && <InlineNotification {...invalid} />}
            {success && isSuccess && <InlineNotification {...success} />}
          </div>
          {!isLoggedIn ? (
            !isPartOfWizard ? (
              <div className="hedi--centered hedi--login__registration-call">
                <Body {...registrationCallBody} />
              </div>
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
            )
          ) : null}
          <div className="hedi--account__footer">
            <div className="hedi--account__footer-buttons">
              {submit && !isLoggedIn && <Button {...submit} />}
              {wizardNextButton && isPartOfWizard && isLoggedIn && (
                <Button {...wizardNextButton} onClick={() => goWizardNext()} />
              )}
            </div>
          </div>
        </Form>
      </div>
      <div className="hedi--account__after-content-wrap">
        <div className="hedi--account__footer-text">
          <Body {...footerText} />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};
