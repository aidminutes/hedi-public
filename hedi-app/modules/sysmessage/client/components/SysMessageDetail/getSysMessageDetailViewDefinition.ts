import {
  getBodyInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";

export const getSysMessageDetailViewDefinition = (components: IComponent[]) => {
  return {
    headline: getLabelInstance(components, "headline", {
      text: "Benachrichtigung",
      labelKind: "h1",
    }),
    statusLabel: getLabelInstance(components, "statusLabel", {
      text: "Status",
      labelKind: "h4",
    }),
    notFoundBody: getBodyInstance(components, "notFound", {}),
  };
};
