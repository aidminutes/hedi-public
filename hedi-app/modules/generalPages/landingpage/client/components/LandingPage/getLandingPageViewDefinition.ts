import {
  findImageInstance,
  getBodyInstance,
  getButtonInstance,
  getFileInstance,
  getGenericInstance,
  getLabelInstance,
  getLinkInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IFileComponent,
  IGenericComponent,
  IImageComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components";

export interface LandingPageViewDefinition {
  imageEULogo?: IImageComponent;
  imageLowerSaxonyEU?: IImageComponent;
  imageBfhdLogo?: IImageComponent;
  headlineSectionOne: ILabelComponent;
  headlineSectionOneTwo: ILabelComponent;
  bodySectionOne: ILabelComponent;
  bodySectionOneTwo: ILabelComponent;
  addtionalBodySectionOne: IBodyComponent;
  buttonOneSectionOne: IButtonComponent;
  buttonTwoSectionOne: IButtonComponent;
  imageSectionOne?: IImageComponent;
  headlineSectionTwoAndThree: ILabelComponent;
  headlineSectionTwo: ILabelComponent;
  headlineSectionTwoNew: ILabelComponent;
  bodySectionTwo: ILabelComponent;
  imageSectionTwo?: IImageComponent;
  buttonOneSectionThree: IButtonComponent;
  headlineSectionThree: ILabelComponent;
  bodySectionThree: ILabelComponent;
  imageSectionThree?: IImageComponent;
  callToActionSectionThree: IButtonComponent;
  headlineSectionFour: ILabelComponent;
  linkToAboutPageMothers: ILinkComponent;
  linkToAboutPageMidwives: ILinkComponent;
  linkToAboutPageDoctors: ILinkComponent;
  imageWomanWithChild?: IImageComponent;
  imageMidwife?: IImageComponent;
  imageDoctor?: IImageComponent;
  headlineFAQ: ILabelComponent;
  buttonFAQ: IButtonComponent;
  newsBarText: ILabelComponent;
  newsBarDownloadFile: IFileComponent;
  newsBarDownloadFileText: ILabelComponent;
  newsBarExpirationDate: IGenericComponent;
}

export const getLandingPageViewDefinition = (
  components: IComponent[]
): LandingPageViewDefinition => {
  return {
    imageEULogo: findImageInstance(components, "imageEULogo"),
    imageBfhdLogo: findImageInstance(components, "imageBfhdLogo"),
    imageLowerSaxonyEU: findImageInstance(components, "imageLowerSaxonyEU"),
    headlineSectionOne: getLabelInstance(components, "headlineSectionOne", {
      labelKind: "h1",
      text: "HEDI – Digitale Hilfe für die Schwangeren versorgung",
    }),
    bodySectionOne: getLabelInstance(components, "bodySectionOne", {
      labelKind: "p",
      text:
        "Mehr als 160 Themen-Artikel und über 300 Kontakte in Südniedersachsen: HEDI verbindet Informationen mit Ansprechpersonen in deiner Nähe!",
    }),
    headlineSectionOneTwo: getLabelInstance(
      components,
      "headlineSectionOneTwo",
      {
        labelKind: "h3",
        text: "Adressen und Kontakte",
      }
    ),
    bodySectionOneTwo: getLabelInstance(components, "bodySectionOneTwo", {
      labelKind: "p",
      text: "HEDI hilft, ...",
    }),
    buttonOneSectionOne: getButtonInstance(components, "buttonOneSectionOne", {
      buttonKind: "primary",
      text: "Artikel lesen",
      usage: "CTA",
    }),
    buttonTwoSectionOne: getButtonInstance(components, "buttonTwoSectionOne", {
      buttonKind: "tertiary",
      text: "Kontakt suche",
      usage: "Link",
    }),
    imageSectionOne: findImageInstance(components, "imageSectionOne"),
    headlineSectionTwoAndThree: getLabelInstance(
      components,
      "headlineSectionTwoAndThree",
      {
        labelKind: "h1",
        text: "Wissen auf einen Blick!",
      }
    ),
    headlineSectionTwo: getLabelInstance(components, "headlineSectionTwo", {
      labelKind: "h3",
      text: "Infos und Kontake",
    }),
    headlineSectionTwoNew: getLabelInstance(
      components,
      "headlineSectionTwoNew",
      { labelKind: "h3", text: "Nützliches Wissen" }
    ),
    bodySectionTwo: getLabelInstance(components, "bodySectionTwo", {
      labelKind: "p",
      text:
        "HEDI bietet informative, multimediale Inhalte, die zusammen mit Expert*innen erarbeitet wurden.",
    }),
    imageSectionTwo: findImageInstance(components, "imageSectionTwo"),
    headlineSectionThree: getLabelInstance(components, "headlineSectionThree", {
      labelKind: "h3",
      text: "Wichtige Begriffe",
    }),
    bodySectionThree: getLabelInstance(components, "bodySectionThree", {
      labelKind: "p",
      text:
        "Fachbegriffe und Fremdwörter rund um Schwangerschaft und Geburt werden im Glossar kurz und einfach erklärt.",
    }),
    buttonOneSectionThree: getButtonInstance(
      components,
      "buttonOneSectionThree",
      { buttonKind: "primary", text: "Artikel suchen", usage: "Link" }
    ),
    callToActionSectionThree: getButtonInstance(
      components,
      "callToActionSectionThree",
      {
        buttonKind: "primary",
        text: "Glossar durchstöbern",
        usage: "CTA",
      }
    ),
    imageSectionThree: findImageInstance(components, "imageSectionThree"),
    headlineSectionFour: getLabelInstance(components, "headlineSectionFour", {
      labelKind: "h2",
      text: "Für wen ist HEDI?",
    }),
    linkToAboutPageMothers: getLinkInstance(
      components,
      "linkToAboutPageMothers",
      { labelText: "Für Schwangere und junge Eltern", href: "/about" }
    ),
    linkToAboutPageMidwives: getLinkInstance(
      components,
      "linkToAboutPageMidwives",
      { labelText: "Für Hebammen", href: "/about" }
    ),
    linkToAboutPageDoctors: getLinkInstance(
      components,
      "linkToAboutPageDoctors",
      { labelText: "Für Ärzt:innen und Beratende", href: "/about" }
    ),
    imageWomanWithChild: findImageInstance(components, "imageWomanWithChild"),
    imageMidwife: findImageInstance(components, "imageMidwife"),
    imageDoctor: findImageInstance(components, "imageDoctor"),
    headlineFAQ: getLabelInstance(components, "headlineFAQ", {
      labelKind: "h2",
      text: "Häufig gestellte Fragen",
    }),
    buttonFAQ: getButtonInstance(components, "buttonFAQ", {
      buttonKind: "ghost",
      iconDescription: "Pfeil nach rechts",
      labelText: "Mehr über HEDI erfahren",
      usage: "FAQ link",
    }),
    newsBarText: getLabelInstance(components, "newsBarText", {
      labelKind: "span",
      text: "Hedi spricht ukrainisch",
    }),
    newsBarDownloadFile: getFileInstance(components, "newsBarDownloadFile", {
      route: "",
      labelText: "",
    }),
    newsBarDownloadFileText: getLabelInstance(
      components,
      "newsBarDownloadFileText",
      {
        labelKind: "span",
        text: "DOWNLOAD PRESSEMITTEILUNG",
      }
    ),
    newsBarExpirationDate: getGenericInstance(
      components,
      "newsBarExpirationDate",
      { usage: "Expiration Date for showing the newsbar" }
    ),
    addtionalBodySectionOne: getBodyInstance(
      components,
      "addtionalBodySectionOne",
      {}
    ),
  };
};
