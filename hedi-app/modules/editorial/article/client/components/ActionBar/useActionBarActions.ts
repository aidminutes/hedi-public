import { IGroupComponent } from "@/modules/components";
import { IActionBarAction } from "@/modules/editorial/article/types";
import { getActionBarDefinition } from "./getActionBarDefinition";
import { useArticlePrintProfile } from "../../hooks/useArticlePrintProfile";
import {
  useCopyToClipboard,
  useAudioPlayer,
} from "@/modules/common/client/components";

export function useActionBarActions(
  actionBar: IGroupComponent | undefined,
  hasAudio: Boolean,
  languageSwitchActions: IActionBarAction[],
  actualContentRoute: string
) {
  const { actionBarLabel } = getActionBarDefinition(actionBar);

  const { printProfile, setPrintProfile } = useArticlePrintProfile();
  const { setShowPlayer, showPlayer } = useAudioPlayer();

  const { addToClipboard } = useCopyToClipboard(
    process.env.NEXT_PUBLIC_APP_URL + decodeURIComponent(actualContentRoute)
  );

  const actions: IActionBarAction[] = [];

  if (actionBarLabel.audio && hasAudio)
    actions.push({
      kind: "Menu",
      type: "audio",
      active: showPlayer,
      iconDescription: actionBarLabel.audio.text || "",
      onClick: () => setShowPlayer(!showPlayer),
    });

  if (actionBarLabel.print.print)
    actions.push({
      kind: "Menu",
      type: "print",
      active: false,
      iconDescription: actionBarLabel.print.print.text || "",
      onClick: () => {},
      children: [
        {
          kind: "Menu",
          type: "print",
          active: false,
          iconDescription:
            actionBarLabel?.print?.article?.text || "Artikel drucken",
          onClick: () => {
            setPrintProfile("Article");
          },
        },
        {
          kind: "Menu",
          type: "print",
          active: false,
          iconDescription:
            actionBarLabel?.print?.contacts?.text || "Kontakte drucken",
          onClick: () => {
            setPrintProfile("Profiles");
          },
        },
        {
          kind: "Menu",
          type: "print",
          active: false,
          iconDescription:
            actionBarLabel?.print?.articleAndContacts?.text ||
            "Artikel + Kontakte drucken",
          onClick: () => {
            setPrintProfile("Article with Profiles");
          },
        },
      ],
    });

  if (actionBarLabel.share)
    actions.push({
      kind: "Menu",
      type: "share",
      active: false,
      iconDescription: actionBarLabel.share.text || "",
      onClick: () => {},
      children: [
        {
          kind: "Menu",
          type: "share",
          active: false,
          iconDescription: actionBarLabel.share.text || "Link kopieren",
          onClick: () => addToClipboard(),
        },
      ],
    });
  if (actionBarLabel.language)
    actions.push({
      kind: "Menu",
      type: "language",
      active: false,
      iconDescription: actionBarLabel.language.text || "",
      onClick: () => {},
      children: languageSwitchActions,
    });

  const printActions: IActionBarAction[] = [];
  if (actionBarLabel.print.articleAndContacts)
    printActions.push({
      kind: "Menu",
      type: "print",
      active: false,
      iconDescription: actionBarLabel.print.articleAndContacts.text || "",
      onClick: () => {
        setPrintProfile("Article with Profiles");
      },
    });
  if (actionBarLabel.print.article)
    printActions.push({
      kind: "Menu",
      type: "print",
      active: false,
      iconDescription: actionBarLabel.print.article.text || "",
      onClick: () => {
        setPrintProfile("Article");
      },
    });
  if (actionBarLabel.print.contacts)
    printActions.push({
      kind: "Menu",
      type: "print",
      active: false,
      iconDescription: actionBarLabel.print.contacts.text || "",
      onClick: () => {
        setPrintProfile("Profiles");
      },
    });

  return {
    actions: { main: actions, print: printActions },
    showPlayer,
    printProfile,
  };
}
