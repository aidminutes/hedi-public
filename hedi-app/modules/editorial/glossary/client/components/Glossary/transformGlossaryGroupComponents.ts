import { getAlphabetsByLanguage } from "@/modules/common/utils";
import {
  IComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components";
import { useRouter } from "next/router";
import { IGlossaryKeyGroup } from "../../../types";
import { IGlossaryProps } from "./Glossary";

export function transformGlossaryGroupComponents(props: IGlossaryProps) {
  const usedCharacters: string[] = [];
  const { locale } = useRouter();
  props.glossaryKeyGroups.forEach((obj: IGlossaryKeyGroup) =>
    usedCharacters.push(obj.keyChar)
  );

  const alphabets: IComponent[][] = [];
  const alphabetsArray = getAlphabetsByLanguage(`${locale}`);

  alphabetsArray.forEach((alphabet: string[]) => {
    const alphabetContainer: IComponent[] = [];
    alphabet.forEach((character: string) => {
      const labelObject: ILabelComponent = {
        kind: "Label",
        labelKind: "span",
        text: character,
        id: alphabet + "_label",
        className: "hedi--alphabet-label hedi--alphabet-label--disabled",
      };

      const linkObject: ILinkComponent = {
        kind: "Link",
        href: "#" + character,
        labelText: character,
        id: character + "_link",
      };
      alphabetContainer.push(
        usedCharacters.indexOf(character) != -1 ? linkObject : labelObject
      );
    });
    alphabets.push(alphabetContainer);
  });
  return { alphabets };
}
