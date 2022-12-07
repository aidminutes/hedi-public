import { getImageInstance, IGroupComponent } from "@/modules/components";

export function getProfileHeaderImageDefinition(group: IGroupComponent) {
  return {
    organisationImage: getImageInstance(group.components, "organisation", {
      route: "",
      label: "",
      height: 196,
      width: 1508,
    }),
    professionalImage: getImageInstance(group.components, "professional", {
      route: "",
      label: "",
      height: 196,
      width: 1508,
    }),
    personalImage: getImageInstance(group.components, "personal", {
      route: "",
      label: "",
      height: 196,
      width: 1508,
    }),
  };
}
