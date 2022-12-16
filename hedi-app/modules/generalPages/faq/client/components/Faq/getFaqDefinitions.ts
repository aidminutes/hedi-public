import {
  getBodyInstance,
  getImageInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";
export function getFaqDefinition(components: IComponent[]) {
  return {
    mainHeadline: getLabelInstance(components, "mainHeadline", {
      labelKind: "h1",
      text: "Häufig gestellte Fragen",
    }),
    text: getBodyInstance(components, "contact", {}),
  };
}
