import { AnchorHTMLAttributes } from "react";
import { Link } from "@/modules/components";
import { ParseInfoTransformFn } from ".";
import { GlossaryLinkWithTooltip } from "@/modules/editorial/glossary/client/components/GlossaryLinkWithTooltip";
import { useLocaleInfo } from "@/modules/shell/client/contexts";

export const a: ParseInfoTransformFn = (
  rawHtml,
  elementInfo,
  props?: AnchorHTMLAttributes<any>
) => {
  if (!props) {
    return null;
  }
  const { href: maybeHref, hrefLang, lang, className } = props;
  const href = maybeHref ?? "#";

  const labelText = rawHtml.substring(
    elementInfo.children[0].start,
    elementInfo.children[0].end
  );

  const linkProps = {
    href,
    hrefLang,
    lang,
    className,
    labelText,
  };

  // TODO: This is a rather unreliable way to determine glossary links, but since the glossary url is translatable,
  //       this is how it's implemented for now.
  if (className?.includes("glossary_term")) {
    let tooltipHref = undefined;
    if (props.lang) {
      const attributes = props as Record<string, string>;
      const dataHrefKey = "data-href-" + props.lang;
      tooltipHref = attributes[dataHrefKey];
    }
    return <GlossaryLinkWithTooltip {...linkProps} tooltipHref={tooltipHref} />;
  }

  return <Link {...linkProps} />;
};
