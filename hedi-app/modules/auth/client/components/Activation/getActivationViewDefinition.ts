import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getLabelInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IImageComponent,
  ILabelComponent,
} from "@/modules/components";

export interface IActivationViewDefinition {
  welcomeImage: IImageComponent;
  welcomeText: ILabelComponent;
  registrationSuccessText: ILabelComponent;
  registrationFailText: ILabelComponent;
  registrationSuccessBody: IBodyComponent;
  registrationFailBody: IBodyComponent;
  loginButton: IButtonComponent;
  footerText: IBodyComponent;
}

export const getActivationViewDefinition = (
  components: IComponent[]
): IActivationViewDefinition => ({
  welcomeImage: getImageInstance(components, "welcome_image", {
    route: "",
    label: "",
    width: 0,
    height: 0,
  }),
  welcomeText: getLabelInstance(components, "welcome_text", {
    text: "Willkommen bei HEDI",
    labelKind: "span",
  }),

  registrationSuccessText: getLabelInstance(
    components,
    "registration_success_text",
    {
      text: "Registrierung abgeschlossen",
      labelKind: "h1",
    }
  ),
  registrationFailText: getLabelInstance(components, "registration_fail_text", {
    text: "Registrierung fehlgeschlagen",
    labelKind: "h1",
  }),

  registrationSuccessBody: getBodyInstance(
    components,
    "registrationSuccessBody",
    {
      body: "<p>Deine Registrierung war erfolgreich.</p>",
    }
  ),

  registrationFailBody: getBodyInstance(components, "registrationFailBody", {
    body: "<p>Deine Registrierung ist fehlgeschlagen.</p>",
  }),

  loginButton: getButtonInstance(components, "login_button", {
    buttonKind: "button",
    usage: "",
  }),
  footerText: getBodyInstance(components, "footerText", {
    body: "<p>Hier steht Footer Text</p>",
  }),
});
