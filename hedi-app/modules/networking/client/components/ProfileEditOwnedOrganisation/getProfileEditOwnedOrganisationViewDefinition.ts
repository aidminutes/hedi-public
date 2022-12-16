import { getLabelInstance, IComponent } from "@/modules/components";

export const getProfileEditOwnedOrganisationViewDefinition = (
  components: IComponent[]
) => {
  return {
    pendingRequestsHeadline: getLabelInstance(
      components,
      "pendingRequestsHeadline",
      {
        text: "Beitrittsanfragen",
        className:
          "hedi--profile-edit-organisations__pending-requests-headline",
        labelKind: "h4",
      }
    ),
    activeConnectionsHeadline: getLabelInstance(
      components,
      "activeConnectionsHeadline",
      {
        text: "Mitglieder",
        className:
          "hedi--profile-edit-organisations__active-connections-headline",
        labelKind: "h4",
      }
    ),
  };
};
