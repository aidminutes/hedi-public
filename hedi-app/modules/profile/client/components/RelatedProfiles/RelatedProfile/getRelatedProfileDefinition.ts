import { IComponent } from "@/modules/components";
import { getProfileEntryDefinition } from "../..";

export function getRelatedProfileDefinition(uiComponents: IComponent[]) {
  const profileEntryDefinition = getProfileEntryDefinition(uiComponents);
  return profileEntryDefinition;
}
