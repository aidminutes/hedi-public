import {
  Component,
  findBodyInstance,
  getLabelInstance,
} from "@/modules/components";

export const getContactDefinition = (components: Component[]) => {
  return {
    descriptionBody: findBodyInstance(components, "text"),
    moreContactsBody: findBodyInstance(components, "moreContacts"),
    pageTitle: getLabelInstance(components, "pageTitle", {
      labelKind: "H1",
      text: "Kontakt",
    }),
  };
};
