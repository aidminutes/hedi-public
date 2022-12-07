import {
  getBodyInstance,
  getButtonInstance,
  getCheckboxInstance,
  getGenericInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getLinkInstance,
  getSelectInstance,
  getTextInputInstance,
  IBodyComponent,
  IButtonComponent,
  ICheckboxComponent,
  IComponent,
  IGenericComponent,
  IImageComponent,
  ILabelComponent,
  ISelectComponent,
  ITextInputComponent,
} from "@/modules/components";

export interface IRegistrationViewDefinition {
  passwordTextInput: ITextInputComponent;
  submitButton: IButtonComponent;
  stepLabel: ILabelComponent;
  headlineStepOne: ILabelComponent;
  headlineStepTwo: ILabelComponent;
  headlineStepThree: ILabelComponent;
  headlineStepFour: ILabelComponent;
  bodyStepOne: IBodyComponent;
  bodyStepTwo: IBodyComponent;
  bodyStepThree: IBodyComponent;
  bodyStepFour: IBodyComponent;
  radioTilePregnant: IGenericComponent;
  radioTileMidwife: IGenericComponent;
  radioTilePregnantImage: IImageComponent;
  radioTileMidwifeImage: IImageComponent;
  givenNameTextInput: ITextInputComponent;
  familyNameTextInput: ITextInputComponent;
  languageSelect: ISelectComponent;
  emailAddressTextInput: ITextInputComponent;
  emailAddressRepeatTextInput: ITextInputComponent;
  midwifeCheckbox: ICheckboxComponent;
  generalTermsCheckbox: ICheckboxComponent;
  safetyTermsCheckbox: ICheckboxComponent;
  emailNotMatchingLabel: ILabelComponent;
  emailInvalidLabel: ILabelComponent;
  passwordHintBody: IBodyComponent;
  forwardButton: IButtonComponent;
  footerImage: IImageComponent;
  footerText: IBodyComponent;
  requiredFieldLabel: ILabelComponent;
  successHeadlineLabel: ILabelComponent;
  successBody: IBodyComponent;
  loginLink: string;
  successImage: IImageComponent;
  successCaptionLabel: ILabelComponent;
  loginButton: IButtonComponent;
  alreadyAccountBody: IBodyComponent;
  mailErrorHeadlineLabel: ILabelComponent;
  mailErrorBody: IBodyComponent;
  mailErrorImage: IImageComponent;
  mailErrorCaptionLabel: ILabelComponent;
  changeEmailButton: IButtonComponent;
  alreadyAccountWizardLabel: ILabelComponent;
  alreadyAccountWizardLinkLabel: ILabelComponent;
}

export const getRegistrationViewDefinition = (
  components: IComponent[]
): IRegistrationViewDefinition => ({
  languageSelect: getSelectInstance(components, "languageSelect", {
    items: [],
  }),
  alreadyAccountBody: getBodyInstance(components, "alreadyAccountBody", {
    body: "Du hast schon einen Account? Anmelden.",
  }),
  stepLabel: getLabelInstance(components, "stepLabel", {
    labelKind: "span",
    text: "Schritt",
  }),
  headlineStepOne: getLabelInstance(components, "headlineStepOne", {
    labelKind: "h2",
    text: "Accounttyp wählen.",
  }),
  headlineStepTwo: getLabelInstance(components, "headlineStepTwo", {
    labelKind: "h2",
    text: "Hallo. Wer bist du?",
  }),
  headlineStepThree: getLabelInstance(components, "headlineStepThree", {
    labelKind: "h2",
    text: "Login wählen",
  }),
  headlineStepFour: getLabelInstance(components, "headlineStepFour", {
    labelKind: "h2",
    text: "Fast geschafft.",
  }),
  bodyStepOne: getBodyInstance(components, "bodyStepOne", {
    body:
      "<p>Erstelle deinen HEDI-Account und nutze individuelle Funktionen je nach Nutzungstyp – natürlich kostenlos. mehr erfahren</p>",
  }),
  bodyStepTwo: getBodyInstance(components, "bodyStepTwo", {
    body: "<p>Hier steht Text für den zweiten Step.</p>",
  }),
  bodyStepThree: getBodyInstance(components, "bodyStepThree", {
    body:
      "<p>Der dritte Step hat auch seinen eigenen Text. Um was es dort geht, steht hier.</p>",
  }),
  bodyStepFour: getBodyInstance(components, "bodyStepFour", {
    body:
      "<p>Willkommen auf dem letzten Step. Hier steht, worum es bei diesem Step geht. Warum sind hier zb. Checkboxen.</p>",
  }),
  radioTilePregnant: getGenericInstance(components, "radioTilePregnant", {
    usage: "",
    labelText: "Schwangere / Elternteil",
    text: "personal",
  }),
  radioTileMidwife: getGenericInstance(components, "radioTileMidwife", {
    usage: "",
    labelText: "Hebamme",
    text: "midwife",
  }),
  radioTilePregnantImage: getImageInstance(
    components,
    "radioTilePregnantImage",
    {
      route: "",
      label: "",
      width: 50,
      height: 50,
    }
  ),
  radioTileMidwifeImage: getImageInstance(components, "radioTileMidwifeImage", {
    route: "",
    label: "",
    width: 50,
    height: 50,
  }),
  givenNameTextInput: getTextInputInstance(components, "givenNameTextInput", {
    type: "text",
    labelText: "Vorname",
    isRequired: true,
  }),
  familyNameTextInput: getTextInputInstance(components, "familyNameTextInput", {
    type: "text",
    labelText: "Nachname",
    isRequired: true,
  }),
  emailAddressTextInput: getTextInputInstance(
    components,
    "emailAddressTextInput",
    {
      type: "email",
      labelText: "E-Mail Adresse",
      isRequired: true,
      placeholder: "max.mustermann@email.com",
    }
  ),
  emailAddressRepeatTextInput: getTextInputInstance(
    components,
    "emailAddressRepeatTextInput",
    {
      type: "email",
      labelText: "E-Mail Adresse (Wiederholung)",
      isRequired: true,
      placeholder: "E-Mail Adresse wiederholen",
    }
  ),
  emailNotMatchingLabel: getLabelInstance(components, "emailNotMatchingLabel", {
    labelKind: "span",
    text: "Die eingegebenen E-Mail Adressen stimmen nicht überein.",
  }),
  emailInvalidLabel: getLabelInstance(components, "emailInvalidLabel", {
    labelKind: "span",
    text: "Bitte gib eine gültige E-Mail Adresse ein.",
  }),
  midwifeCheckbox: getCheckboxInstance(components, "midwifeCheckbox", {
    labelText:
      "Ich bestätige, dass ich in meinem Herkunfsland eine staatlich zertifizierte Hebamme bin oder mich zur Zeit in einer Ausbildung zur staatlich anerkannten Hebamme befinde.",
  }),
  generalTermsCheckbox: getCheckboxInstance(
    components,
    "generalTermsCheckbox",
    {
      labelText:
        "Ich erkläre mich mit den Allgemeinen Geschäfts- und Nutzungsbedingungen einverstanden.",
    }
  ),
  safetyTermsCheckbox: getCheckboxInstance(components, "safetyTermsCheckbox", {
    labelText: "Ich akzeptiere die Datenschutzbestimmungen.",
  }),
  forwardButton: getButtonInstance(components, "forwardButton", {
    buttonKind: "primary",
    usage: "forward",
    text: "weiter",
  }),
  footerImage: getImageInstance(components, "footerImage", {
    route: "",
    label: "Image",
    width: 160,
    height: 130,
  }),
  footerText: getBodyInstance(components, "footerText", {
    body: "<p>Hier steht Footer Text</p>",
  }),
  successHeadlineLabel: getLabelInstance(components, "successHeadlineLabel", {
    labelKind: "h3",
    text: "Prüfe deine E-Mails",
  }),
  successBody: getBodyInstance(components, "successBody", {
    body:
      "<p>HEDI hat dir eine Mail geschickt. Bestätige dort deine Anmeldung. Sobald du deinen Account aktiviert hast, kannst du dein persönliches Profil vervollständigen.</p>",
  }),
  mailErrorHeadlineLabel: getLabelInstance(
    components,
    "mailErrorHeadlineLabel",
    { labelKind: "h3", text: "Account existiert bereits" }
  ),
  mailErrorBody: getBodyInstance(components, "mailErrorBody", {
    body:
      "<p>Für diese E-Mail-Adresse existiert bereits ein HEDI-Account. Besitzt du vielleicht schon einen HEDI-Account? Setze dein Passwort zurück, falls es dir nicht mehr einfällt. </p>",
  }),
  mailErrorImage: getImageInstance(components, "mailErrorImage", {
    route: "",
    label: "Der Account exitiert bereits",
    width: 160,
    height: 160,
  }),
  mailErrorCaptionLabel: getLabelInstance(components, "mailErrorCaptionLabel", {
    labelKind: "p",
    text: "Etwas ist schief gelaufen.",
  }),
  changeEmailButton: getButtonInstance(components, "changeEmailButton", {
    buttonKind: "ghost",
    usage: "back to email",
    text: "E-Mail ändern",
  }),
  loginLink: getLinkInstance(components, "loginLink", {
    labelText: "anmelden",
    href: "/",
  }).href,
  successImage: getImageInstance(components, "successImage", {
    route: "",
    label: "Success",
    width: 160,
    height: 160,
  }),
  loginButton: getButtonInstance(components, "loginButton", {
    buttonKind: "primary",
    labelText: "Zur Anmeldung",
    usage: "login-redirect",
  }),
  passwordHintBody: getBodyInstance(components, "passwordHintBody", {
    body:
      "8 Zeichen lang mit mindestens einem Klein- und einem Großbuchstaben einem Sonderzeichen einer Zahl ",
  }),
  requiredFieldLabel: getLabelInstance(components, "requiredFieldLabel", {
    labelKind: "p",
    text: "* Pflichtfeld",
  }),
  passwordTextInput: getTextInputInstance(components, "passwordTextInput", {
    labelText: "Password",
    type: "password",
  }),
  submitButton: getButtonInstance(components, "submitButton", {
    buttonKind: "button",
    usage: "",
  }),
  successCaptionLabel: getLabelInstance(components, "successCaptionLabel", {
    labelKind: "p",
    text: "Schön das du da bist",
  }),

  alreadyAccountWizardLabel: getLabelInstance(
    components,
    "alreadyAccountWizardLabel",
    {
      labelKind: "span",
      text: "Du hast bereits einen Account?",
    }
  ),

  alreadyAccountWizardLinkLabel: getLabelInstance(
    components,
    "alreadyAccountWizardLinkLabel",
    {
      labelKind: "span",
      text: "Anmelden.",
    }
  ),
});
