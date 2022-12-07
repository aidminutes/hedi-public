import {
  findLinkInstance,
  IComponent,
  ITextInputComponent,
  IButtonComponent,
  IInlineNotificationComponent,
  ILabelComponent,
  getTextInputInstance,
  getButtonInstance,
  getLinkInstance,
  getLabelInstance,
  getInlineNotificationInstance,
  getBodyInstance,
  IBodyComponent,
  IImageComponent,
  getImageInstance,
} from "@/modules/components/types";

export interface ILoginViewDefinition {
  username: ITextInputComponent;
  password: ITextInputComponent;
  success: IInlineNotificationComponent;
  invalid: IInlineNotificationComponent;
  submit: IButtonComponent;
  wizardNextButton: IButtonComponent;
  redirectUrl: string;
  footerText: IBodyComponent;
  loginImage: IImageComponent;
  headline: ILabelComponent;
  lostPasswordBody: IBodyComponent;
  registrationCallBody: IBodyComponent;
  registrationWizardLabel: ILabelComponent;
  registrationWizardLinkLabel: ILabelComponent;
  lostPasswordWizardLabel: ILabelComponent;
}

export function getLoginViewDefinition(
  components: IComponent[]
): ILoginViewDefinition {
  const redirect = findLinkInstance(components, "editprofile");

  return {
    username: getTextInputInstance(components, "username", {
      type: "text",
      labelText: "Benutzername",
    }),
    password: getTextInputInstance(components, "password", {
      type: "password",
      labelText: "Passwort",
    }),
    success: getInlineNotificationInstance(components, "success", {
      notificationKind: "success",
      title: "Success",
    }),
    invalid: getInlineNotificationInstance(components, "invalid", {
      notificationKind: "error",
      title: "Invalid",
    }),
    submit: getButtonInstance(components, "submit", {
      buttonKind: "primary",
      usage: "",
    }),
    wizardNextButton: getButtonInstance(components, "wizardNextButton", {
      buttonKind: "primary",
      usage: "",
    }),
    redirectUrl: redirect?.href || "",
    footerText: getBodyInstance(components, "footerText", {
      body: "<p>Hier steht Footer Text</p>",
    }),
    loginImage: getImageInstance(components, "loginImage", {
      route: "",
      label: "login",
      width: 120,
      height: 100,
    }),
    headline: getLabelInstance(components, "mainHeadline", {
      labelKind: "h1",
      text: "Willkommen",
    }),
    lostPasswordBody: getBodyInstance(components, "lostPasswordBody", {
      body: "<p>Passwort vergessen?</p>",
    }),
    registrationCallBody: getBodyInstance(components, "registrationCallBody", {
      body: "Noch keinen HEDI-Account?",
    }),

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
    lostPasswordWizardLabel: getLabelInstance(
      components,
      "lostPasswordWizardLabel",
      {
        labelKind: "span",
        text: "Passwort vergessen?",
      }
    ),
  };
}
