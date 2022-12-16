import {
  getBodyInstance,
  getButtonInstance,
  getImageInstance,
  getInlineNotificationInstance,
  getLabelInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IImageComponent,
  IInlineNotificationComponent,
  ILabelComponent,
} from "@/modules/components";

export interface ISearchMidwifeNoResultsDefinition {
  noResultsHeadline: ILabelComponent;
  noResultsImage: IImageComponent;
  noResultsQuestionWhyLabel: ILabelComponent;
  noResultsQuestionWhyBody: IBodyComponent;
  noResultsQuestionWhyImage: IImageComponent;
  noResultsQuestionNetworkRequestLabel: ILabelComponent;
  noResultsQuestionNetworkRequestBody: IBodyComponent;
  noResultsQuestionTodoLabel: ILabelComponent;
  noResultsQuestionTodoBody: IBodyComponent;
  noResultsQuestionTodoImage: IImageComponent;
  noResultsQuestionHelpLabel: ILabelComponent;
  noResultsQuestionHelpBody: IBodyComponent;
  noResultsQuestionHelpImage: IImageComponent;
  networkRequestButton: IButtonComponent;
  networkRequestNotification: IInlineNotificationComponent;
}

export const getSearchMidwifeNoResultsDefinition = (
  components: IComponent[]
): ISearchMidwifeNoResultsDefinition => {
  return {
    noResultsHeadline: getLabelInstance(components, "noResultsHeadline", {
      labelKind: "h2",
      text: "Deine Suche war leider ohne Ergebnis",
    }),
    noResultsImage: getImageInstance(components, "noResultsImage", {
      route: "",
      label: "",
      width: 140,
      height: 72,
    }),
    noResultsQuestionWhyLabel: getLabelInstance(
      components,
      "noResultsQuestionWhyLabel",
      { labelKind: "span", text: "Warum wurde keine Hebamme gefunden?" }
    ),
    noResultsQuestionWhyBody: getBodyInstance(
      components,
      "noResultsQuestionWhyBody",
      {
        body:
          "<ul><li>Hebammen können nur eine begrenzte Zahl an Frauen betreuen. Eine Hebamme wird nur vorgeschlagen, wenn sie ausreichend Zeit hat, dich zu betreuen</li><li>Hebammen sind in der Regel aufsuchend tätig. Eine Hebamme wird nur vorgeschlagen, wenn dein Betreuungsort nah genug ist.</li><li>Hebammen bieten unterschiedliche Betreuungsformen an. Eine Hebamme wird nur vorgeschlagen, wenn sie deine gesuchte Betreuungsform anbietet.</li></ul>",
      }
    ),
    noResultsQuestionWhyImage: getImageInstance(
      components,
      "noResultsQuestionWhyImage",
      {
        route: "",
        label: "",
        width: 84,
        height: 64,
      }
    ),
    noResultsQuestionNetworkRequestLabel: getLabelInstance(
      components,
      "noResultsQuestionNetworkRequestLabel",
      { labelKind: "span", text: "Starte eine Netzwerkanfrage." }
    ),
    noResultsQuestionNetworkRequestBody: getBodyInstance(
      components,
      "noResultsQuestionNetworkRequestBody",
      {
        body:
          "<ol><li>Sendest du deine Anfrage als Netzwerk-Anfrage, wird diese an alle Hebammen in deiner Umbegung gesendet. Steht dein errechneter Geburtstermin kurz bevor, wird deine Anfrage als besonders dringend gekennzeichnet.</li><li>Hat eine Hebamme kurzfristig Zeit für eine weitere Betreuung oder ist sie bereit eine zusätzliche Betreuung anzunehmen, kann sie dich unmittelbar kontaktieren.</li><li>Bei Interesse wirst du von HEDI umgehend informiert und kannst dann selbst entscheiden, ob du von dieser Hebamme betreut werden möchtest.</li></ol>",
      }
    ),
    noResultsQuestionTodoLabel: getLabelInstance(
      components,
      "noResultsQuestionTodoLabel",
      {
        labelKind: "span",
        text: "Was kannst du noch tun, um eine Hebamme zu finden?",
      }
    ),
    noResultsQuestionTodoBody: getBodyInstance(
      components,
      "noResultsQuestionTodoBody",
      {
        body:
          "<ul><li>Wiederhole deine Suche nach einigen Wochen. Die Hebammenliste wird regelmäßig aktualisiert.</li><li>Lese den Artikel Wie finde ich eine Hebamme? und schaue welche Möglichkeiten du noch hast.</li><li>Hier steht noch ein Hinweis wie HEDI helfen kann, eine Hebamme zu finden.</li></ul>",
      }
    ),
    noResultsQuestionTodoImage: getImageInstance(
      components,
      "noResultsQuestionTodoImage",
      {
        route: "",
        label: "",
        width: 84,
        height: 64,
      }
    ),
    noResultsQuestionHelpLabel: getLabelInstance(
      components,
      "noResultsQuestionHelpLabel",
      {
        labelKind: "span",
        text: "Wer kann dir weiterhelfen, wenn du keine Hebamme findest?",
      }
    ),
    noResultsQuestionHelpBody: getBodyInstance(
      components,
      "noResultsQuestionHelpBody",
      {
        body:
          "<ul><li>Wenn du auch dann keine Hebamme gefunden hasst, steht dir zur Betreuung der Schwangerschaft dein:e Gynäkolog:in zur Verfügung.</li><li>Hier steht vielleicht noch ein Tipp.</li></ul>",
      }
    ),
    noResultsQuestionHelpImage: getImageInstance(
      components,
      "noResultsQuestionHelpImage",
      {
        route: "",
        label: "",
        width: 84,
        height: 64,
      }
    ),
    networkRequestButton: getButtonInstance(
      components,
      "networkRequestButton",
      { buttonKind: "primary", usage: "", text: "Netzwerkanfrage senden" }
    ),
    networkRequestNotification: getInlineNotificationInstance(
      components,
      "networkRequestNotification",
      {
        notificationKind: "info",
        title:
          "Um eine Netzwerkanfrage zu senden muss mindestens eine Betreuungsform ausgewählt sein.",
      }
    ),
  };
};
