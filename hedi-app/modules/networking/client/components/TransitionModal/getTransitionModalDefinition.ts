import {
  getBodyInstance,
  getButtonInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  getLinkInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IInlineNotificationComponent,
  ILabelComponent,
} from "@/modules/components";

export interface ITransiotionDialog {
  sendCommitmentHeader: ILabelComponent;
  sendCommitmentBody: IBodyComponent;
  sendCommitmentButton: IButtonComponent;
  cancelButton: IButtonComponent;
  sendCancellationHeader: ILabelComponent;
  sendCancellationBody: IBodyComponent;
  sendCancellationBody_alreadyCommitted: IBodyComponent;
  sendCancellationButton: IButtonComponent;
  sendWithdrawnHeader: ILabelComponent;
  sendWithdrawnBody: IBodyComponent;
  sendWithdrawnButton: IButtonComponent;
  sendConfirmHeader: ILabelComponent;
  sendConfirmBody: IBodyComponent;
  sendConfirmButton: IButtonComponent;
  sendConfirmSecondaryButton: IButtonComponent;
  sendCancelHeader: ILabelComponent;
  sendCancelBody: IBodyComponent;
  sendCancelButton: IButtonComponent;
  sendRecipientCompleteHeader: ILabelComponent;
  sendRecipientCompleteBody: IBodyComponent;
  sendRecipientCompleteButton: IButtonComponent;
  sendRecipientCareCancelHeader: ILabelComponent;
  sendRecipientCareCancelBody: IBodyComponent;
  sendRecipientCareCancelButton: IButtonComponent;
  sendSenderCareCancelHeader: ILabelComponent;
  sendSenderCareCancelBody: IBodyComponent;

  commitmentNotification: IInlineNotificationComponent;
  senderConfirmNotification: IInlineNotificationComponent;
  cancellationNotification: IInlineNotificationComponent;
  withdrawnNotification: IInlineNotificationComponent;
  abortNotification: IInlineNotificationComponent;
  generalError: IInlineNotificationComponent;
  cancelCareNotification: IInlineNotificationComponent;
  finishCareNotification: IInlineNotificationComponent;
}

export const getTransitionModalDefinition = (
  components: IComponent[]
): ITransiotionDialog => ({
  sendCommitmentHeader: getLabelInstance(components, "sendCommitmentHeader", {
    labelKind: "span",
    text: "Zusage senden",
  }),
  sendCommitmentBody: getBodyInstance(components, "sendCommitmentBody", {
    body:
      "<p>Bei einer Zusage wir die Chat-Funktion für diese potentielle Klientin aktiviert. Möchtest du jetzt eine Zusage senden?</p>",
  }),

  sendCommitmentButton: getButtonInstance(components, "sendCommitmentButton", {
    text: "Jetzt Zusage senden",
    usage: "",
    buttonKind: "primary",
  }),
  cancelButton: getButtonInstance(components, "cancelButton", {
    text: "abbrechen",
    usage: "",
    buttonKind: "secondary",
  }),

  sendCancellationHeader: getLabelInstance(
    components,
    "sendCancellationHeader",
    {
      labelKind: "span",
      text: "Absage senden",
    }
  ),
  sendCancellationBody: getBodyInstance(components, "sendCancellationBody", {
    body:
      "<p>Bei einer Absage wird die Chat-Funktion deaktiviert. Möchtest du jetzt eine Absage senden?</p>",
  }),
  sendCancellationBody_alreadyCommitted: getBodyInstance(
    components,
    "sendCancellationBody_alreadyCommitted",
    {
      body:
        "<p>Bei einer Absage wird die Chat-Funktion deaktiviert. Du hast zuvor bereits eine Zusage gesendet.Möchtest du trotzdem jetzt eine Absage senden?</p>",
    }
  ),

  sendCancellationButton: getButtonInstance(
    components,
    "sendCancellationButton",
    {
      text: "Jetzt Absage senden",
      usage: "",
      buttonKind: "primary",
    }
  ),

  commitmentNotification: getInlineNotificationInstance(
    components,
    "commitmentNotification",
    {
      notificationKind: "success",
      title: "Zusage gesendet",
      subtitle:
        "<p>Super. Deine Zusage wurde erfolgreich versendet. Warte auf die Bestätigung der Klient:in, um die Betreuung einzugehen.</p>",
    }
  ),
  senderConfirmNotification: getInlineNotificationInstance(
    components,
    "senderConfirmNotification",
    {
      notificationKind: "success",
      title: "Betreuung angenommen",
      subtitle:
        "<p>Du hast eine Hebamme für deine Betreuung gefunden. Für weitere nützliche Infos, schaue in deine Betreuung.</p>",
    }
  ),
  cancellationNotification: getInlineNotificationInstance(
    components,
    "cancellationNotification",
    {
      notificationKind: "success",
      title: "Absage gesendet",
      subtitle:
        "<p>Deine Absage wurde erfolgreich versendet. Du kannst die Anfrage im Archiv wieder reaktivieren.</p>",
    }
  ),

  withdrawnNotification: getInlineNotificationInstance(
    components,
    "withdrawnNotification",
    {
      notificationKind: "success",
      title: "Anfrage zurückgezogen",
      subtitle: "<p>Der Antrag wurde erfolgreich zurückgezogen.</p>",
    }
  ),
  abortNotification: getInlineNotificationInstance(
    components,
    "abortNotification",
    {
      notificationKind: "success",
      title: "Anfrage abgebrochen",
      subtitle: "<p>Die Anfrage wurde erfolgreich abgebrochen.</p>",
    }
  ),
  cancelCareNotification: getInlineNotificationInstance(
    components,
    "cancelCareNotification",
    {
      notificationKind: "success",
      title: "Betreuung abgebrochen",
      subtitle: "<p>Du hast die Betreuung vorzeitig abgebrochen.</p>",
    }
  ),
  finishCareNotification: getInlineNotificationInstance(
    components,
    "finishCareNotification",
    {
      notificationKind: "success",
      title: "Betreuung abgeschlossen",
      subtitle:
        "<p>Die Betreuung wurde erfolgreich geschlossen. Danke 🙏, dass du diese Beteuung übernommen hast.</p>",
    }
  ),
  generalError: getInlineNotificationInstance(components, "generalError", {
    notificationKind: "error",
    title: "Fehler",
    subtitle:
      "<p>Entschuldige. Wir haben gerade ein Problem mit der Verarbeitung deiner Anfrage. Versuche es bitte später noch einmal.</p>",
  }),
  sendWithdrawnHeader: getLabelInstance(components, "sendWithdrawnHeader", {
    labelKind: "span",
    text: "Diese Anfrage zurückziehen",
  }),
  sendWithdrawnBody: getBodyInstance(components, "sendWithdrawnBody", {
    body:
      "<p>Hinweis: Beim zurückziehen deiner Anfrage wird ggf. die Chat-Funktion deaktiviert. Möchtest du jetzt deine Betreuungsanfrage an diese Hebamme zurückziehen? </p>",
  }),
  sendWithdrawnButton: getButtonInstance(components, "sendWithdrawnButton", {
    usage: "",
    buttonKind: "primary",
    labelText: "zurückziehen",
  }),
  sendConfirmHeader: getLabelInstance(components, "sendConfirmHeader", {
    labelKind: "span",
    text: "Betreuungsangebot zusagen",
  }),
  sendConfirmBody: getBodyInstance(components, "sendConfirmBody", {
    body:
      "<p>Super. Diese Hebamme möchte deine Betreuung übernehmen.Möchtest du ihr Angebot jetzt annehmen? Hinweis: Nimmst du das Angebot an, wird diese Anfrage bei weiteren angefragten Hebammen geschlossen.</p>",
  }),
  sendConfirmButton: getButtonInstance(components, "sendConfirmButton", {
    usage: "",
    buttonKind: "primary",
    labelText: "Jetzt zusagen",
  }),
  sendConfirmSecondaryButton: getButtonInstance(
    components,
    "sendConfirmSecondaryButton",
    { usage: "", buttonKind: "primary", labelText: "später" }
  ),
  sendCancelHeader: getLabelInstance(components, "sendCancelHeader", {
    labelKind: "span",
    text: "Betreuungsangebot absagen",
  }),
  sendCancelBody: getBodyInstance(components, "sendCancelBody", {
    body:
      "<p>Diese Hebamme möchte deine Betreuung übernehmen. Möchtest du ihr trotzdem eine Absage senden?</p>",
  }),
  sendCancelButton: getButtonInstance(components, "sendCancelButton", {
    usage: "",
    buttonKind: "primary",
    labelText: "Jetzt absagen",
  }),
  sendRecipientCompleteHeader: getLabelInstance(
    components,
    "sendRecipientCompleteHeader",
    {
      labelKind: "span",
      text: "Betreuung abschließen",
    }
  ),
  sendRecipientCompleteBody: getBodyInstance(
    components,
    "sendRecipientCompleteBody",
    {
      body:
        "<p>Mit dem Beenden einer Betreuung wird die Chat-Funktion mit deiner Klientin deaktiviert. Schließe eine Betreuung ab, wenn ihr alles wichtige geklärt habt und dein Betreuungsauftrag beendet ist. Betreuung jetzt abschließen?</p>",
    }
  ),
  sendRecipientCompleteButton: getButtonInstance(
    components,
    "sendRecipientCompleteButton",
    {
      usage: "",
      buttonKind: "primary",
      labelText: "Betreuung jetzt abschließen",
    }
  ),
  sendRecipientCareCancelHeader: getLabelInstance(
    components,
    "sendRecipientCareCancelHeader",
    {
      labelKind: "span",
      text: "Betreuung vorzeitig beenden",
    }
  ),
  sendRecipientCareCancelBody: getBodyInstance(
    components,
    "sendRecipientCareCancelBody",
    {
      body:
        "<p>Mit dem Beenden dieser Betreuung wird die Chat-Funktion mit dieser Klientin deaktiviert. Möchtest du die Betreuung dieser Klientin trotzdem vorzeitig beenden?</p>",
    }
  ),
  sendRecipientCareCancelButton: getButtonInstance(
    components,
    "sendRecipientCareCancelButton",
    {
      usage: "",
      buttonKind: "primary",
      labelText: "Jetzt beenden",
    }
  ),
  sendSenderCareCancelHeader: getLabelInstance(
    components,
    "sendSenderCareCancelHeader",
    { labelKind: "span", text: "Betreuung vorzeitig beenden" }
  ),
  sendSenderCareCancelBody: getBodyInstance(
    components,
    "sendSenderCareCancelBody",
    {
      body:
        "<p>Mit dem Beenden dieser Betreuung wird die Chat-Funktion mit dieser Hebamme deaktiviert. Möchtest du die Betreuung durch diese Hebamme trotzdem vorzeitig beenden?</p>",
    }
  ),
});
