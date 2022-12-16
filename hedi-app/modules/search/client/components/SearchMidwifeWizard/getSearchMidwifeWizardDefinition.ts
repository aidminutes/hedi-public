import {
  getBodyInstance,
  getLabelInstance,
  IBodyComponent,
  IComponent,
  ILabelComponent,
} from "@/modules/components";

export interface ISearchMidwifeWizardDefinition {
  pgMidwifesearchLabel: ILabelComponent;
  pgMidwifesearchDesc: IBodyComponent;

  pgUserCardLabel: ILabelComponent;
  pgUserCardDesc: IBodyComponent;

  pgPrangnancyDataLabel: ILabelComponent;
  pgPrangnancyDataDesc: IBodyComponent;

  pgReviewLabel: ILabelComponent;
  pgReviewDesc: IBodyComponent;
  pgFinishLabel: ILabelComponent;
  pgFinishDesc: IBodyComponent;
}

export function getSearchMidwifeWizardDefinition(
  components: IComponent[]
): ISearchMidwifeWizardDefinition {
  return {
    pgMidwifesearchLabel: getLabelInstance(
      components,
      "ProgressMidwifeSearchLabel",
      {
        labelKind: "span",
        text: "Hebammensuche",
      }
    ),
    pgMidwifesearchDesc: getBodyInstance(
      components,
      "ProgressMidwifeSearchBody",
      {
        body: "",
      }
    ),

    pgUserCardLabel: getLabelInstance(components, "ProgressUserCardLabel", {
      labelKind: "span",
      text: "Visitenkarte",
    }),

    pgUserCardDesc: getBodyInstance(components, "ProgressUserCardBody", {
      body: "",
    }),
    pgPrangnancyDataLabel: getLabelInstance(
      components,
      "ProgressPrangnancyDataLabel",
      {
        labelKind: "span",
        text: "Schwangerschaft",
      }
    ),
    pgPrangnancyDataDesc: getBodyInstance(
      components,
      "ProgressPrangnancyDataBody",
      {
        body: "",
      }
    ),
    pgReviewLabel: getLabelInstance(components, "ProgressReviewLabel", {
      labelKind: "span",
      text: "Versenden",
    }),
    pgReviewDesc: getBodyInstance(components, "ProgressReviewBody", {
      body: "",
    }),

    pgFinishLabel: getLabelInstance(components, "ProgressFinishLabel", {
      labelKind: "span",
      text: "Fertig",
    }),
    pgFinishDesc: getBodyInstance(components, "ProgressFinishBody", {
      body: "",
    }),
  };
}
