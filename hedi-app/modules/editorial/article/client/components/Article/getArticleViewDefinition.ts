import {
  getGroupInstance,
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components/types";
import { IArticleView, IArticleViewDefinition } from "../../../types";
import { getCopyLinkToClipboardDefinition } from "@/modules/common/client/components/CopyLinkToClipboard/getCopyLinkToClipboardDefinition";
import { getRelatedProfilesDefinition } from "@/modules/profile/client/components/RelatedProfiles";

import { getProfileCardDefinition } from "@/modules/profile/client/components/ProfileCard";

export function getArticleViewDefinition(
  components: IComponent[]
): IArticleViewDefinition {
  const backLink = getLinkInstance(components, "backLink", {
    href: "/",
    labelText: "zurück",
  });
  const actionBarGroup = getGroupInstance(components, "actionbar", {
    components: [],
    usage: "",
  });
  const notificationText = getCopyLinkToClipboardDefinition(components);

  const articleRelatedProfilesDefinition = getRelatedProfilesDefinition(
    components
  );
  const tagListHeadline = getLabelInstance(components, "tagListHeadline", {
    labelKind: "h3",
    text: "tags",
  });
  const profileCardDefinition = getProfileCardDefinition(components);

  return {
    backLink,
    actionBarGroup,
    notificationText,
    articleRelatedProfilesDefinition,
    tagListHeadline,
    profileCardDefinition,
  };
}
