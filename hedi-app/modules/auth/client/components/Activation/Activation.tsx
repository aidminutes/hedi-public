import { IActivation } from "../../../types";
import React from "react";
import { Loading } from "carbon-components-react";
import { Button, Label, Image, Body } from "@/modules/components";
import { useActivation } from "./useActivation";
import { getActivationViewDefinition } from "./getActivationViewDefinition";
import { GlobalWizardStates } from "@/modules/common/types";
export const Activation = ({ content }: { content: IActivation }) => {
  const {
    welcomeImage,
    welcomeText,
    registrationSuccessText,
    registrationFailText,
    registrationFailBody,
    registrationSuccessBody,
    loginButton,
    footerText,
  } = getActivationViewDefinition(content.components);

  const { isPartOfWizard, wizard } = content;

  const { isLoading, isSuccess, errors } = useActivation(isPartOfWizard);
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="hedi--activation hedi--centered hedi--account__content-wrap">
        <div className="hedi--activation__image-wrap">
          <div className="hedi--activation__image">
            <Image
              {...welcomeImage}
              placeholder="empty"
              priority // NOTE: this can block the loading of the page if the image is too big or the connection too slow
            />
          </div>
        </div>
        <div className="hedi--activation__image-caption">
          <Label {...welcomeText} />
        </div>

        <div>
          {!isSuccess && <Label {...registrationFailText} />}
          {isSuccess && <Label {...registrationSuccessText} />}
        </div>

        <div className="hedi--activation__text">
          {!isSuccess && <Body {...registrationFailBody} />}
          {isSuccess && <Body {...registrationSuccessBody} />}
        </div>

        <div className="hedi--account__footer">
          <div className="hedi--account__footer-buttons">
            <Button
              {...loginButton}
              href=""
              onClick={() => {
                if (isPartOfWizard) {
                  wizard?.next(GlobalWizardStates.LOGIN);
                } else window.location.assign(loginButton.href ?? "");
              }}
            />
          </div>
        </div>
      </div>
      <div className="hedi--account__after-content-wrap">
        <div className="hedi--account__footer-text">
          <Body {...footerText} />
        </div>
      </div>
    </>
  );
};
