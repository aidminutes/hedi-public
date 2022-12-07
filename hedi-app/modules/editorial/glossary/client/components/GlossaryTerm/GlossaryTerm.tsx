import { HTML } from "@/modules/react/html";

import { transformGlossaryTerm, IGlossaryTermProps } from "..";
import { HeadlineWithLinkCopy } from "@/modules/common/client/components";

export const GlossaryTerm = (props: IGlossaryTermProps): JSX.Element => {
  const {
    glossaryTermId,
    label,
    body,
    entryId,
    isSelected,
    termClass,
    germanTerm,
    route,
    headline,
  } = transformGlossaryTerm(props);
  return (
    <div className={termClass} id={glossaryTermId}>
      <div>
        <dt>
          <HeadlineWithLinkCopy {...headline} />
        </dt>

        <div className="hedi--glossary-term--full">
          {germanTerm && (
            <p className="hedi--glossary-term__marked-translation">
              {germanTerm}
            </p>
          )}
        </div>
        <dd>
          <HTML data={body} />
        </dd>
      </div>
    </div>
  );
};
