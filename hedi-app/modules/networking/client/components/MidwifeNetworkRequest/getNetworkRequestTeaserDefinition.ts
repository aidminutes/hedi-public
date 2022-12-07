import {
  getBodyInstance,
  getImageInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";

export function getNetworkRequestTeaserDefinition(components: IComponent[]) {
  return {
    teaserSubheadlineLabel: getLabelInstance(
      components,
      "teaserSubheadlineLabel",
      {
        labelKind: "h6",
        text: "Für deine Planungssicherheit",
      }
    ),
    teaserHeadlineLabel: getLabelInstance(components, "teaserHeadlineLabel", {
      labelKind: "h4",
      text: "Die Netzwerk-Anfrage -  bald für dich da.",
    }),
    teaserBody: getBodyInstance(components, "teaserBody", {
      body:
        "<p>Schwangere und Eltern können öffentliche Anfragen an das HEDI-Netzwerk stellen. Entscheide selbst, wem du ein Betreuungsangebot senden möchtest. Unterstütze damit Frauen und Familien, die besonders dringend oder sehr individuelle Unterstützung benötigen.</p>",
    }),
    teaserImage: getImageInstance(components, "teaserImage", {
      width: 134,
      height: 104,
      route: "",
      label: "",
    }),
  };
}
