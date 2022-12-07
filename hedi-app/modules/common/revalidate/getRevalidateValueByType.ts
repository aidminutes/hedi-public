import { getBuildEnv } from "../server/BuildEnv";
import { buildConfigs } from "./buildConfigs";
import { defaultConfig } from "./defaultConfig";
import { ContentType, RevalidateValue } from "./types";

export function getRevalidateValueByType(
  contentTypeString: string
): RevalidateValue {
  let currentConfig = defaultConfig;
  if (getBuildEnv() && getBuildEnv() in buildConfigs) {
    currentConfig = {
      ...defaultConfig,
      ...buildConfigs[getBuildEnv()],
    };
  }

  return (
    currentConfig[contentTypeString.toLocaleLowerCase() as ContentType] ?? true
  );
}
