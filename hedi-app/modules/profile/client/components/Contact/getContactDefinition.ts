import {
  IComponent,
  findLabelInstance,
  getImageInstance,
} from "@/modules/components/types";
import { IContactDefinition } from ".";

export const getContactDefinition = (
  components: IComponent[]
): IContactDefinition => {
  return {
    locationTitle: findLabelInstance(components, "city")?.text ?? "Ort",
    phoneTitle: findLabelInstance(components, "phone")?.text ?? "Telefonnummer",
    emailTitle:
      findLabelInstance(components, "email")?.text ?? "E-Mail Addresse",
    websiteTitle: findLabelInstance(components, "website")?.text ?? "Webseite",
  };
};
