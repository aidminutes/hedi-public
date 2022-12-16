import useSWRImmutable from "swr/immutable";
import { Body, ILinkProps, Link } from "@/modules/components";
import { getGlossaryTerm } from "@/modules/editorial/glossary/client/request";
import { InlineLoading } from "carbon-components-react";

export interface GlossaryLinkWithTooltipProps extends ILinkProps {
  tooltipHref?: string;
}

export const GlossaryLinkWithTooltip: React.FC<GlossaryLinkWithTooltipProps> = props => {
  const { tooltipHref, ...linkProps } = props;
  const termRoute = (props.tooltipHref ?? props.href).replace("#", "/");
  const { data: response } = useSWRImmutable(termRoute, getGlossaryTerm);
  const term = response?.data;
  return (
    <span className="hedi--glossary-link-with-tooltip">
      <Link {...linkProps} />
      <span className="hedi--glossary-link-with-tooltip__content">
        {!!term ? (
          <>
            <span className="hedi--glossary-link-with-tooltip__content__headline">
              {term.label}
            </span>
            {props.lang !== "de" && (
              <span className="hedi--glossary-link-with-tooltip__content__german-term">
                {term.germanTerm}
              </span>
            )}
            <Body body={term.body} />
          </>
        ) : (
          <></>
          // TODO InlineLoading sorgt für rotierendes Copy Icon in Article.
          // TODO: Testen mit neuerer Carbon Version
          // <InlineLoading key={termRoute+"is Loading"}/>
        )}
      </span>
    </span>
  );
};
