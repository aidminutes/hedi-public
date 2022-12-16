import {
  getBodyInstance,
  getLabelInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components";

export interface IProfileCapacityViewDefinition {
  capacityTitleLabel: ILabelComponent;
  capacityDescriptionLabel: ILabelComponent;
  capacityTileLabel: ILabelComponent;
  searchContactLabel: ILabelComponent;
  directContactLabel: ILabelComponent;
  networkRequestLabel: ILabelComponent;
  maxDistanceLabel: ILabelComponent;
  etsPerMonthLabel: ILabelComponent;
  activeLabel: ILabelComponent;
  inActiveLabel: ILabelComponent;
  contactSearchTooltipBody: IBodyComponent;
  directRequestTooltipBody: IBodyComponent;
  networkRequestTooltipBody: IBodyComponent;
  profileVisibilityTitle: ILabelComponent;
  profileVisibilitySubtitle: ILabelComponent;
}

export const getProfileCapacityViewDefinition = (
  components: IComponent[]
): IProfileCapacityViewDefinition => ({
  capacityTitleLabel: getLabelInstance(components, "capacityTitleLabel", {
    labelKind: "h3",
    text: "Plane deine Kapazitäten.",
  }),
  capacityDescriptionLabel: getLabelInstance(
    components,
    "capacityDescriptionLabel",
    {
      labelKind: "paragraph",
      text:
        "Plane, wie viele voraussichtliche Geburten du pro Monat betreuen möchtest. Sobald du diese Anzahl erreicht hast, erhältst du keine direkten Anfragen mehr.",
    }
  ),
  capacityTileLabel: getLabelInstance(components, "capacityTileLabel", {
    labelKind: "span",
    text: "Nutzung & Kapazitäten",
  }),

  searchContactLabel: getLabelInstance(components, "searchContactLabel", {
    labelKind: "span",
    text: "Auffindbarkeit in Kontaktsuche",
  }),

  directContactLabel: getLabelInstance(components, "directContactLabel", {
    labelKind: "span",
    text: "Direkte Anfragen erhalten",
  }),
  networkRequestLabel: getLabelInstance(components, "networkRequestLabel", {
    labelKind: "span",
    text: "Neztwerk-Anfragen erhalten",
  }),
  maxDistanceLabel: getLabelInstance(components, "maxDistanceLabel", {
    labelKind: "span",
    text: "Maximale Entfernung",
  }),
  etsPerMonthLabel: getLabelInstance(components, "etsPerMonthLabel", {
    labelKind: "span",
    text: "ETs pro Monat",
  }),
  activeLabel: getLabelInstance(components, "activeLabel", {
    labelKind: "span",
    text: "aktiv",
  }),
  inActiveLabel: getLabelInstance(components, "inactiveLabel", {
    labelKind: "span",
    text: "inaktiv",
  }),
  contactSearchTooltipBody: getBodyInstance(
    components,
    "contactSearchTooltipBody",
    {
      body:
        "<p>Hier steht noch eine Info, die “Kontaktsuche” besser erklärt</p>",
    }
  ),
  directRequestTooltipBody: getBodyInstance(
    components,
    "directRequestTooltipBody",
    {
      body:
        "<p>Hier steht noch eine Info, die direkte “Betreuungsanfrage” besser erklärt</p>",
    }
  ),
  networkRequestTooltipBody: getBodyInstance(
    components,
    "networkRequestTooltipBody",
    {
      body:
        "<p>Hier steht noch eine Info, die “Netzwerk-Anfrage” besser erklärt</p>",
    }
  ),
  profileVisibilityTitle: getLabelInstance(
    components,
    "profileVisibilityTitle",
    {
      labelKind: "span",
      text: "Du bist gerade nicht sichtbar",
    }
  ),
  profileVisibilitySubtitle: getLabelInstance(
    components,
    "profileVisibilitySubtitle",
    {
      labelKind: "span",
      text:
        "Aktiviere eine Nutzungsart damit du auf HEDI wieder zu finden bist. Zur Zeit ist dein Profil für niemanden auffindbar.",
    }
  ),
});
