import { IOrganisation, IProfile, UserProfile } from "../../types";
import { IMetaInfo, IPageConfig } from "@/modules/shell/types";
import { getProfileDefinition } from "../query/getProfileDefinition";
import { IProfileView } from "../../client/components";
import { findGroupInstance, isImage } from "@/modules/components";
import { StylesCache } from "@/modules/media/server/cache";
import { DefinitionCache } from "@/modules/common/server/cache/DefinitionCache";

export const getProfilePage = async (
  content: IOrganisation | UserProfile
): Promise<IProfileView & IPageConfig> => {
  const fetcher = getProfileDefinition(content.lang);

  const { components } = await DefinitionCache.get(
    "profileDefinition",
    content.lang,
    fetcher
  );
  const meta: IMetaInfo = { indexing: true };
  //
  const group = findGroupInstance(components, "images");
  if (group)
    group.components = group.components
      .filter(isImage)
      .map(image => StylesCache.swap(image, "header") ?? image);

  const shell: IPageConfig = {};

  return {
    ...content,
    components,
    ...shell,
    meta,
  };
};
