import {
  IComponent,
  ITextInputComponent,
  IButtonComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  getTextInputInstance,
  getButtonInstance,
  getLabelInstance,
  getInlineNotificationInstance,
  getBodyInstance,
  IBodyComponent,
  IImageComponent,
  getImageInstance,
} from "@/modules/components/types";
export interface IResetPasswordEmailViewDefinition {
  emailAddressTextInput: ITextInputComponent;
  emailInvalidLabel: ILabelComponent;
  sendEmailButton: IButtonComponent;
  lostPassword: ILabelComponent;
  lostPasswordBody: IBodyComponent;
  registrationCallBody: IBodyComponent;
  footerText: IBodyComponent;
  emailSendFailedNotification: IInlineNotificationComponent;
  emailSendSuccessNotification: IInlineNotificationComponent;
  registrationWizardLabel: ILabelComponent;
  registrationWizardLinkLabel: ILabelComponent;
  footerImage: IImageComponent;
}

export function getResetPasswordEmailViewDefinition(
  components: IComponent[]
): IResetPasswordEmailViewDefinition {
  return {
    emailAddressTextInput: getTextInputInstance(components, "email", {
      type: "text",
      labelText: "E-Mail Adresse",
    }),
    emailInvalidLabel: getLabelInstance(components, "emailInvalidLabel", {
      labelKind: "span",
      text: "Please enter a valid email address",
    }),
    sendEmailButton: getButtonInstance(components, "sendEmail", {
      buttonKind: "primary",
      usage: "",
    }),
    footerText: getBodyInstance(components, "footerText", {
      body: "<p>Hier steht Footer Text</p>",
    }),
    lostPassword: getLabelInstance(components, "lostPassword", {
      labelKind: "h1",
      text: "Passwort Vergessen?",
    }),
    lostPasswordBody: getBodyInstance(components, "lostPasswordBody", {
      body:
        "<p>Kein Problem. Hier kannst du dein Passwort zurück setzen. Bitte gib dazu dein E-mail Adresse ein.</p>",
    }),
    registrationCallBody: getBodyInstance(components, "registrationCallBody", {
      body: "Noch keinen HEDI-Account?",
    }),
    emailSendSuccessNotification: getInlineNotificationInstance(
      components,
      "emailSendSuccessNotification",
      {
        notificationKind: "success",
        title:
          "HEDI hat Ihnen eine E-Mail geschickt. Bitte klicken Sie auf den darin enthaltenen Link, um Ihr Passwort zurückzusetzen.",
      }
    ),
    emailSendFailedNotification: getInlineNotificationInstance(
      components,
      "emailSendFailedNotification",
      {
        notificationKind: "error",
        title:
          "Es ist ein Fehler aufgetreten. HEDI konnte Ihnen keine E-Mail senden.",
      }
    ),
    registrationWizardLabel: getLabelInstance(
      components,
      "registrationWizardLabel",
      {
        labelKind: "span",
        text: "Noch keinen HEDI-Account?",
      }
    ),
    registrationWizardLinkLabel: getLabelInstance(
      components,
      "registrationWizardLinkLabel",
      {
        labelKind: "span",
        text: "Jetzt registrieren.",
      }
    ),
    footerImage: getImageInstance(components, "footerImage", {
      route: "",
      label: "Image",
      width: 160,
      height: 130,
    }),
  };
}
