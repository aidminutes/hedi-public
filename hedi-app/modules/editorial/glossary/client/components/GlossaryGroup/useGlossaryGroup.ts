import { useState, useEffect } from "react";
import { IGlossaryKeyGroup } from "../../../types";
import { IGlossaryTermDefiniton } from "../GlossaryTerm";

export type IGlossaryGroupProps = {} & IGlossaryGroupConfig &
  IGlossaryTermDefiniton;
export interface IGlossaryGroupConfig {
  glossaryKeyGroup: IGlossaryKeyGroup;
  lang?: string;
  selectedTerm?: string;
}

export function useGlossaryGroup(props: IGlossaryGroupProps) {
  const { selectedTerm, lang, glossaryKeyGroup } = props;
  const { keyChar, glossaryTerms } = glossaryKeyGroup;
  const [termUpdated, setTermUpdated] = useState("");
  useEffect(() => {
    setTermUpdated(selectedTerm ?? "");
  }, [selectedTerm]);

  return {
    glossaryKey: keyChar,
    glossaryTerms,
    lang,
    termUpdated,
  };
}
