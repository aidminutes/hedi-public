import {
  Component,
  findBodyInstance,
  findGroupInstance,
  isGroup,
  getLabelInstance,
  findLabelInstance,
} from "@/modules/components/types";
import { EmailLink } from "./types";

export function transformContactPage(components: Component[]) {
  const emailsGroup = findGroupInstance(components, "contacts");
  const emailLinks =
    emailsGroup?.components?.filter(isGroup)?.map<EmailLink>(groupComponent => {
      return {
        id: groupComponent.id ?? "",
        beforeText: findLabelInstance(groupComponent.components, "beforeText")
          ?.text,
        linkText:
          getLabelInstance(groupComponent.components, "linkText", {
            labelKind: "span",
          })?.text ?? "mail",
        afterText: findLabelInstance(groupComponent.components, "afterText")
          ?.text,
        email:
          getLabelInstance(groupComponent.components, "email", {
            labelKind: "span",
          })?.text ?? "kontakt@hedi.app",
        emailSubject:
          getLabelInstance(groupComponent.components, "emailSubject", {
            labelKind: "span",
          }).text ?? "Feedback",
        emailBody: findBodyInstance(groupComponent.components, "body")?.body,
        addMetaData: groupComponent.id == "technical",
      };
    }) ?? [];

  return {
    emailLinks,
  };
}
