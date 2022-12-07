import { IPage } from "@/modules/common/types";
import { getPageById } from "@/modules/common/server";

export async function getProfileDefinition(lang: string): Promise<IPage> {
  return getPageById(lang, "profile");
}
