export type ICopyLinkToClipboard = {
  route: string;
} & ICopyLinkToClipboardConfig &
  ICopyLinkToClipboardDefinition;

export interface ICopyLinkToClipboardDefinition {
  notificationText: string;
}
export interface ICopyLinkToClipboardConfig {
  type?: "icon" | "actionbaritem";
  size?: CopyToClipboardIconSize;
  description?: string;
}

export type CopyToClipboardIconSize = "sm" | "md" | "lg";
