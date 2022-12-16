import { useRouter } from "next/router";
import { IGlossaryProps } from "./Glossary";
import { getCopyLinkToClipboardDefinition } from "@/modules/common/client/components/CopyLinkToClipboard/getCopyLinkToClipboardDefinition";

export function transformGlossary(props: IGlossaryProps) {
  const { locale } = useRouter();
  const { glossaryKeyGroups, components } = props;

  const { notificationText } = getCopyLinkToClipboardDefinition(components);

  return {
    glossaryKeyGroups,
    locale,
    notificationText,
  };
}
