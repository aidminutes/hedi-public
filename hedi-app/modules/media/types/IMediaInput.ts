export type MediaInputType = "file" | "image" | "svg" | "audio" | "video";

export interface IMediaInput {
  label: string; //media.label
  mediatype: MediaInputType;
  filename: string; //media.file.label
  description?: string;
  lang?: string;
  usage?: "UserProfile" | "EventPicture" | "Document";
}
