import { GlossaryTerm } from "../GlossaryTerm";
import { Row, Column } from "carbon-components-react";
import { Seperator } from "@/modules/common/client/components";
import { IGlossaryGroupProps, useGlossaryGroup } from "./useGlossaryGroup";

export const GlossaryGroup = (props: IGlossaryGroupProps): JSX.Element => {
  const { glossaryKey, glossaryTerms, lang, termUpdated } = useGlossaryGroup(
    props
  );
  return (
    <>
      <Row className="hedi--glossary__group--title">
        <Column lg={1} md={0} />
        <Column lg={{ span: 13 }} className="hedi--glossary__group--letter">
          <span
            className="hedi--glossary__group--letter__item"
            id={glossaryKey}>
            {glossaryKey}
          </span>
        </Column>
      </Row>
      <Row>
        <Column lg={1} md={0} />
        <Column lg={{ span: 13 }}>
          <Seperator />
        </Column>
      </Row>
      <Row className="bx--row">
        {glossaryTerms.map(term => (
          <>
            <Column lg={1} md={0} className="hedi--glossary__group__offset" />
            <Column md={4} lg={{ span: 6, offset: 1 }} key={term.route}>
              <GlossaryTerm
                {...props}
                glossaryTerm={term}
                lang={lang}
                isSelected={
                  termUpdated !== "" && term.route.endsWith(termUpdated)
                }
              />
            </Column>
          </>
        ))}
      </Row>
    </>
  );
};
