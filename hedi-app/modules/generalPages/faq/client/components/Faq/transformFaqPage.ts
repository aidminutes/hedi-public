import { IAccordionItemProps } from "@/modules/common/client/components";
import {
  findBodyInstance,
  findGroupInstance,
  findLabelInstance,
  IComponent,
  IGroupComponent,
} from "@/modules/components";

export function transformFaqPage(components: IComponent[]) {
  const questionsGroup = findGroupInstance(components, "questions");

  const questions =
    questionsGroup?.components
      ?.filter(component => component.kind === "Group")
      ?.map(group => {
        const groupComponent = group as IGroupComponent;
        return {
          title: findLabelInstance(groupComponent.components, "question"),
          text: findBodyInstance(groupComponent.components, "answer"),
        } as IAccordionItemProps;
      }) ?? [];

  return { questions };
}
