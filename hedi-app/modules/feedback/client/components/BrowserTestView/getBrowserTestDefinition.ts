import {
  getInlineNotificationInstance,
  getButtonInstance,
  getBodyInstance,
  getLabelInstance,
  getImageInstance,
  getLinkInstance,
} from "@/modules/components/types";
import {
  IBrowserTestView,
  IBrowserTestViewDefinition,
} from "@/modules/feedback/types/IBrowserTestView";

export function getBrowserTestDefinition({
  content,
}: {
  content: IBrowserTestView;
}): IBrowserTestViewDefinition {
  const { components } = content;

  const sendButton = getButtonInstance(components, "sendButton", {
    buttonKind: "primary",
    text: "senden",
    usage: "submit",
  });
  const body = getBodyInstance(components, "text", {
    body:
      "Hilf mit, HEDI durch eine einmalige und anonyme Datenspende zu verbessern! So erfahren die Entwickler:innen, welche Endgeräte und Browser häufig genutzt werden und können HEDI bestmöglich anpassen.",
  });
  const failureInlineNotification = getInlineNotificationInstance(
    components,
    "failureInlineNotification",
    { title: "Etwas is schiefgelaufen", notificationKind: "error" }
  );
  const headline = getLabelInstance(components, "headline", {
    text: "Anonyme Datenspende",
    labelKind: "h1",
  });
  const successImage = getImageInstance(components, "successImage", {
    route: "",
    label: "",
    width: 0,
    height: 0,
  });
  const successText = getLabelInstance(components, "successText", {
    text: "Danke!",
    labelKind: "p",
  });
  const backToHomeLink = getLinkInstance(components, "backToHome", {
    href: "/",
    labelText: "zurück zur Startseite",
  });

  return {
    headline,
    sendButton,
    body,
    failureInlineNotification,
    successImage,
    successText,
    backToHomeLink,
  };
}
