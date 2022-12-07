import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";

export function getSearchMidwifeDoneDefinition(components: IComponent[]) {
  return {
    headline: getLabelInstance(components, "headline", {
      labelKind: "h4",
      text: "Anfrage versendet.",
    }),
    footerText: getBodyInstance(components, "footerText", {
      body: "<p>Brauchst du Hilfe?</p>",
    }),
    footerImage: getImageInstance(components, "footerImage", {
      route: "",
      label: "Image",
      width: 160,
      height: 130,
    }),
    inboxButton: getButtonInstance(components, "inboxButton", {
      buttonKind: "primary",
      usage: "",
      labelText: "Zur Anfrage-Inbox",
    }),
    contentBody: getBodyInstance(components, "contentBody", {
      body:
        "<p>Du kannst dich zurücklehnen. HEDI hat deine Anfrage erfolgreich versendet. Hier steht, was nun passiert.</p><br/><p>Hier steht noch ein kurzer Hinweis, was man in der Zwischenzeit tun kann, bis Rückmeldung kommt.</p>",
    }),
    topicsButton: getButtonInstance(components, "topicsButton", {
      buttonKind: "ghost",
      usage: "",
      labelText: "HEDI-Themenwelt erkunden",
    }),
    topImage: getImageInstance(components, "topImage", {
      route: "",
      label: "",
      width: 180,
      height: 180,
    }),
    topImageCaptionLabel: getLabelInstance(components, "topImageCaptionLabel", {
      labelKind: "span",
      text: "Super. Das hat geklappt.",
    }),
  };
}
