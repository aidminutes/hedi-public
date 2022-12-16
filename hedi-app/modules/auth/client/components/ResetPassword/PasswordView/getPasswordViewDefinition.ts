import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getTextInputInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IImageComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  ITextInputComponent,
} from "@/modules/components/types";

export interface IPasswordViewDefinition {
  headlineLabel: ILabelComponent;
  successHeadlineLabel: ILabelComponent;
  textBody: IBodyComponent;
  successTextBody: IBodyComponent;
  passwordTextInput: ITextInputComponent;
  passwordRepeatTextInput: ITextInputComponent;
  saveButton: IButtonComponent;
  successImage: IImageComponent;
  successImageCaptionLabel: ILabelComponent;
  successButton: IButtonComponent;
  footerText: IBodyComponent;
  passwordHintBody: IBodyComponent;
  passwordNotMatchingLabel: ILabelComponent;
  InvalidSecurityTokenNotification: IInlineNotificationComponent;
  ExpiredSecurityTokenNotification: IInlineNotificationComponent;
}

export function getPasswordViewDefinition(
  components: IComponent[]
): IPasswordViewDefinition {
  return {
    headlineLabel: getLabelInstance(components, "headlineLabel", {
      labelKind: "h2",
      text: "Neues Passwort wählen.",
    }),
    successHeadlineLabel: getLabelInstance(components, "successHeadlineLabel", {
      labelKind: "h2",
      text: "Passwort zurückgesetzt",
    }),
    textBody: getBodyInstance(components, "textBody", {
      body: "<p>Vergib ein neues Passwort ...</p>",
    }),
    successTextBody: getBodyInstance(components, "successTextBody", {
      body: "<p>Nun kannst du dich mit deinem neuen Passwort anmelden.</p>",
    }),
    passwordTextInput: getTextInputInstance(components, "passwordTextInput", {
      type: "password",
      labelText: "Neues Passwort",
      placeholder: "mindestens 8 Zeichen",
    }),
    passwordRepeatTextInput: getTextInputInstance(
      components,
      "passwordRepeatTextInput",
      {
        type: "password",
        labelText: "Neues Passwort (Wiederholung)",
      }
    ),
    saveButton: getButtonInstance(components, "saveButton", {
      buttonKind: "primary",
      usage: "",
      text: "speichern",
    }),
    successButton: getButtonInstance(components, "successButton", {
      buttonKind: "primary",
      usage: "",
      text: "zur Anmeldung",
    }),
    successImage: getImageInstance(components, "successImage", {
      route: "",
      label: "",
      width: 180,
      height: 180,
    }),
    successImageCaptionLabel: getLabelInstance(
      components,
      "successImageCaptionLabel",
      {
        labelKind: "span",
        text: "Schön dich wieder zu sehen",
      }
    ),
    footerText: getBodyInstance(components, "footerText", {
      body: "<p>Problem. Melde dich.</p>",
    }),
    passwordHintBody: getBodyInstance(components, "passwordHintBody", {
      body:
        "8 Zeichen lang mit mindestens einem Klein- und einem Großbuchstaben einem Sonderzeichen einer Zahl ",
    }),
    passwordNotMatchingLabel: getLabelInstance(
      components,
      "passwordNotMatchingLabel",
      { labelKind: "p", text: "Die Passwörter stimmen nicht überein." }
    ),
    InvalidSecurityTokenNotification: getInlineNotificationInstance(
      components,
      "invalidSecurityToken",
      {
        notificationKind: "error",
        title: "Invalid security token.",
      }
    ),
    ExpiredSecurityTokenNotification: getInlineNotificationInstance(
      components,
      "securityTokenExpired",
      {
        notificationKind: "error",
        title: "The security token is expired.",
      }
    ),
  };
}
