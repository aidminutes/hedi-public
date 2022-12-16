import { IGlossaryKeyGroup, IGlossaryViewDefinition } from "../../../types";
import { GlossaryGroup } from "../GlossaryGroup";
import { transformGlossary, transformGlossaryGroupComponents } from "..";
import { IComponent, isLabel, isLink, Label, Link } from "@/modules/components";
import { useGlossaryUrlHashTerm } from "./useGlossaryUrlHashTerm";

export type IGlossaryProps = IGlossaryViewDefinition & IGlossaryConfig;

export interface IGlossaryConfig {}

export const Glossary = ({ props }: { props: IGlossaryProps }): JSX.Element => {
  const { alphabets } = transformGlossaryGroupComponents(props);

  const { glossaryKeyGroups, locale, ...rest } = transformGlossary(props);
  const { glossaryUrlTerm } = useGlossaryUrlHashTerm();

  //TODO to include hash value to anchor on page load, hash in URL doesnt work
  return (
    <>
      <div className="hedi--alphabet-links--container">
        {alphabets.length > 0 &&
          alphabets.map(alphabet => (
            <div className="hedi--alphabet-links--wrap">
              {alphabet.map(character =>
                isLabel(character) ? (
                  <Label
                    {...character}
                    id={character.text + "_label"}
                    key={character.text}
                  />
                ) : isLink(character) ? (
                  <Link
                    {...character}
                    className="hedi--alphabet-links"
                    key={character.id}
                  />
                ) : (
                  ""
                )
              )}
            </div>
          ))}
      </div>

      <dl>
        {glossaryKeyGroups.map((glossarykeyGroup: IGlossaryKeyGroup) => (
          <GlossaryGroup
            key={glossarykeyGroup.keyChar}
            glossaryKeyGroup={glossarykeyGroup}
            lang={locale}
            selectedTerm={glossaryUrlTerm}
            {...rest}
          />
        ))}
      </dl>
    </>
  );
};
