import { getLatinEquivalent } from "@/modules/common/utils";
import { IGlossary, IGlossaryKeyGroup, IGlossaryTerm } from "../../../types";

export async function glossaryTermsToGlossaryKeyGroup(
  glossary: IGlossary
): Promise<IGlossaryKeyGroup[]> {
  const groupedEntries = glossary.glossaryTerms.reduce(function (
    keyChar: { [keyChar: string]: IGlossaryTerm[] },
    term: IGlossaryTerm
  ) {
    const firstChar = getLatinEquivalent(term.label[0].toUpperCase());
    (keyChar[firstChar] = keyChar[firstChar] || []).push(term);
    return keyChar;
  },
  {});
  const glossaryKeyGroups = Object.entries(groupedEntries)
    .map(([keyChar, glossaryTerms]) => {
      return { keyChar, glossaryTerms };
    })
    .sort((a, b) => a.keyChar.localeCompare(b.keyChar));

  return glossaryKeyGroups as IGlossaryKeyGroup[];
}
