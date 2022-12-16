import { MatrixClient, Room } from "matrix-js-sdk";

export type IRoomHeader = IRoomHeaderContent &
  IRoomHeaderDefinition &
  IRoomHeaderConfig;

export interface IRoomHeaderContent {
  room: Room;
  client: MatrixClient;
  setOtherMemberAvatar?: Function
}

export interface IRoomHeaderDefinition {
  selectedAudioVideoDeviceLabel: string;
  saveLabel: string;
  cancelLabel: string;
  audioDevicesLabel: string;
  videoDevicesLabel: string;
  isTypingLabel: string;
  videoChatLabel: string;
  audioChatLabel: string;
  audioVideoSettingsLabel: string;
  backLabel: string;
}

export interface IRoomHeaderConfig {}
