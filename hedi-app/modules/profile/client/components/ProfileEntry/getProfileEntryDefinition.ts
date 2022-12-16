import {
  IComponent,
  findLabelInstance,
  getButtonInstance,
} from "@/modules/components/types";
import { IProfileEntryDefinition } from "@/modules/profile/types";

export const getProfileEntryDefinition = (
  components: IComponent[]
): IProfileEntryDefinition => {
  return {
    phoneTitle: findLabelInstance(components, "phone")?.text ?? "Telefonnummer",
    emailTitle:
      findLabelInstance(components, "email")?.text ?? "E-Mail Addresse",
    websiteTitle: findLabelInstance(components, "website")?.text ?? "Webseite",
    servicesTitle:
      findLabelInstance(components, "services")?.text ?? "Angebote",
    contactTitle: findLabelInstance(components, "contact")?.text ?? "Kontakt",
    distanceTitle: findLabelInstance(components, "distance")?.text ?? "Distanz",
    profileLinkButton: getButtonInstance(components, "profileLinkButton", {
      buttonKind: "ghost",
      usage: "",
      text: "zum Profil",
    }),
  };
};
