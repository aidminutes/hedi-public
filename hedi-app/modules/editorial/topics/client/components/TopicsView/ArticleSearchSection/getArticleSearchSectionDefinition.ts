import {
  findImageInstance,
  getButtonInstance,
  getLabelInstance,
  getTextInputInstance,
  IComponent,
} from "@/modules/components";

export const getArticleSearchSectionDefinition = (components: IComponent[]) => {
  return {
    searchInput: getTextInputInstance(components, "search", {
      type: "text",
      labelText: "",
    }),
    searchHeadline: getLabelInstance(components, "searchHeadline", {
      labelKind: "h3",
    }),
    searchButton: getButtonInstance(components, "searchButton", {
      buttonKind: "primary",
      usage: "trigger search",
    }),
    searchImage: findImageInstance(components, "searchImage"),
  };
};
