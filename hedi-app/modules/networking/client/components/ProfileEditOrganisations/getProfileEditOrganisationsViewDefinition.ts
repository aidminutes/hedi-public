import {
  getGenericInstance,
  getLabelInstance,
  IComponent,
} from "@/modules/components";

export const getProfileEditOrganisationsViewDefinition = (
  components: IComponent[]
) => {
  return {
    editOrganisationHeadline: getLabelInstance(
      components,
      "editOrganisationHeadline",
      {
        text: "Dein Netzwerk",
        labelKind: "h2",
      }
    ),
    searchOrganisationsHeadline: getLabelInstance(
      components,
      "searchOrganisationsHeadline",
      {
        text: "Organisation suchen",
        labelKind: "h4",
      }
    ),
    pendingHeadline: getLabelInstance(components, "pendingHeadline", {
      text: "Beitrittsanfragen",
      labelKind: "h4",
    }),
    membershipHeadline: getLabelInstance(components, "membershipHeadline", {
      text: "Mitgliedschaften",
      labelKind: "h4",
    }),
    searchPlaceholder: getGenericInstance(components, "searchPlaceholder", {
      usage: "Platzhalter",
      labelText: "Platzhalter",
    }),
  };
};
