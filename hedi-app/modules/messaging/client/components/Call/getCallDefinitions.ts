import { getLabelInstance, IComponent } from "@/modules/components";
import { ICallDefinition } from "./types";

export const getCallDefinition = (
  components: IComponent[]
): ICallDefinition => {
  return {
    answerCallButton: getLabelInstance(components, "answerCallButton", {
      labelKind: "span",
      text: "Annehmen"
    }).text ?? "Annehmen",
    answerCallWithVideoButton: getLabelInstance(components, "answerCallWithVideoButton", {
      labelKind: "span",
      text: "Mit Video annehmen"
    }).text ?? "Mit Video annehmen",
    declineCallButton: getLabelInstance(components, "declineCallButton", {
      labelKind: "span",
      text: "Ablehnen"
    }).text ?? "Ablehnen",
    videoOnButton: getLabelInstance(components, "videoOnButton", {
      labelKind: "span",
      text: "Video ein"
    }).text ?? "Video ein",
    videoOffButton: getLabelInstance(components, "videoOffButton", {
      labelKind: "span",
      text: "Video aus"
    }).text ?? "Video aus",
    microphoneOnButton: getLabelInstance(components, "microphoneOnButton", {
      labelKind: "span",
      text: "Mikrofon ein"
    }).text ?? "Mikrofon ein",
    microphoneOffButton: getLabelInstance(components, "microphoneOffButton", {
      labelKind: "span",
      text: "Mikrofon aus"
    }).text ?? "Mikrofon aus",
    hangUpButton: getLabelInstance(components, "hangUpButton", {
      labelKind: "span",
      text: "Auflegen"
    }).text ?? "Auflegen",
  };
};
