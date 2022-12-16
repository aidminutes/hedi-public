import {
  getButtonInstance,
  getLabelInstance,
  getLinkInstance,
  IComponent,
} from "@/modules/components";

export const getStateContainerDefinition = (components: IComponent[]) => {
  return {
    sendMessageButton: getButtonInstance(components, "sendMessageButton", {
      usage: "",
      buttonKind: "ghost",
      labelText: "Nachricht senden",
    }),
    stateOpenHint: getLabelInstance(components, "stateOpenHint", {
      labelKind: "p",
      text: "Sende eine Zusage oder Absage.",
    }),
    stateOpenPersonalHint: getLabelInstance(
      components,
      "stateOpenPersonalHint",
      {
        labelKind: "p",
        text: "Warte auf Antwort oder ziehe deine Anfrage zurück.",
      }
    ),
    stateAcceptedHint: getLabelInstance(components, "stateAcceptedHint", {
      labelKind: "p",
      text: "Warte auf die Bestätigung oder ziehe deine Zusage zurück.",
    }),
    stateAcceptedPersonalHint: getLabelInstance(
      components,
      "stateAcceptedPersonalHint",
      {
        labelKind: "p",
        text:
          "Nehme das Betreuungsangebot an oder ziehe diese Anfrage zurück. Bei Fragen sende eine Nachricht.",
      }
    ),
    stateCancelledHint: getLabelInstance(components, "stateCancelledHint", {
      labelKind: "p",
      text: "Reaktiviere diese Anfrage bei Bedarf.",
    }),
    stateCancelledPersonalHint: getLabelInstance(
      components,
      "stateCancelledPersonalHint",
      { labelKind: "p", text: "Leider musste dir diese Hebamme absagen." }
    ),
    sinceLabel: getLabelInstance(components, "sinceLabel", {
      labelKind: "span",
      text: "seit",
    }),
    openStateLabel: getLabelInstance(components, "openStateLabel", {
      labelKind: "span",
      text: "offen",
    }),
    stateActiveHintMidwife: getLabelInstance(
      components,
      "stateActiveHintMidwife",
      {
        labelKind: "p",
        text:
          "Schließe diese Betreuung nach Abschluss ab oder beende die Betreuung vorzeitig.",
      }
    ),
    stateActiveHintPersonal: getLabelInstance(
      components,
      "stateActiveHintPersonal",
      {
        labelKind: "p",
        text:
          "Du wirst von dieser Hebamme betreut. Nutze den Chat, um Fragen zu stellen und Informationen zu erhalten.",
      }
    ),
    conversationLink: getLinkInstance(components, "conversationLink", {
      labelText: "Link",
      href: "/",
    }),
  };
};
