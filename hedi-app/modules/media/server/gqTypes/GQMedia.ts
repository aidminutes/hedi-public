import {
  GQNumber,
  GQString,
  withInlineFragment,
} from "@/modules/graphql/server/gq-ts";
import { GQIEntityLocalized } from "@/modules/model/server";
import { IFile, IImage } from "../../types";

export const GQIFile: IFile = {
  ...GQIEntityLocalized,
  mime: GQString,
};

export const GQAudio = withInlineFragment(GQIFile, "Audio");

export const GQVideo = withInlineFragment(GQIFile, "Video");

export const GQIImage: IImage = {
  ...GQIFile,
  alt: GQString,
  width: GQNumber,
  height: GQNumber,
  color: GQString,
  blurDataURL: GQString,
};

export const GQImage = withInlineFragment(GQIImage, "Image");
