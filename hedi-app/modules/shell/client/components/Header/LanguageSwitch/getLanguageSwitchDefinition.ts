import { ILanguage } from "@/modules/common/types";
import { IComponent } from "@/modules/components/types";
import { getLanguageSwitchActionDefinition } from "./getLanguageSwitchActionDefinition";
import { ILanguageSwitchDefinition } from "./types";

export function getLanguageSwitchDefinition(
  languages: ILanguage[],
  components: IComponent[]
): ILanguageSwitchDefinition {
  const languageSwitchAction = getLanguageSwitchActionDefinition(components);
  return {
    ...languageSwitchAction,
    options: languages.map(l => ({ labelText: l.label, lang: l.route })),
  };
}
