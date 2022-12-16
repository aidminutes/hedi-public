import { getLabelInstance, IComponent } from "@/modules/components";
import { IRoomHeaderDefinition } from "./types";

export const getRoomHeaderDefinition = (
  components: IComponent[]
): IRoomHeaderDefinition => {
  return {
    selectedAudioVideoDeviceLabel:
      getLabelInstance(components, "selectedAudioVideoDeviceLabel", {
        labelKind: "span",
        text: "Audio & Video",
      }).text ?? "Audio & Video",
    saveLabel:
      getLabelInstance(components, "saveLabel", {
        labelKind: "span",
        text: "Speichern",
      }).text ?? "Speichern",
    cancelLabel:
      getLabelInstance(components, "cancelLabel", {
        labelKind: "span",
        text: "Abbrechen",
      }).text ?? "Abbrechen",
    audioDevicesLabel:
      getLabelInstance(components, "audioDevicesLabel", {
        labelKind: "span",
        text: "Mikrofon",
      }).text ?? "Mikrofon",
    videoDevicesLabel:
      getLabelInstance(components, "videoDevicesLabel", {
        labelKind: "span",
        text: "Kamera",
      }).text ?? "Kamera",
    isTypingLabel:
      getLabelInstance(components, "isTypingLabel", {
        labelKind: "span",
        text: "schreibt...",
      }).text ?? "schreibt...",
    videoChatLabel:
      getLabelInstance(components, "videoChatLabel", {
        labelKind: "span",
        text: "Video Anruf",
      }).text ?? "Video Anruf",
    audioChatLabel:
      getLabelInstance(components, "audioChatLabel", {
        labelKind: "span",
        text: "Audio Anruf",
      }).text ?? "Audio Anruf",
    audioVideoSettingsLabel:
      getLabelInstance(components, "audioVideoSettingsLabel", {
        labelKind: "span",
        text: "Audio und Video Einstellungen",
      }).text ?? "Audio und Video Einstellungen",
    backLabel:
      getLabelInstance(components, "backLabel", {
        labelKind: "span",
        text: "zurück",
      }).text || "zurück",
  };
};
